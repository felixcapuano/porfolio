const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { Client } = require('ssh2');

const SERVER_PORT = 3001;
const CLIENT_HOST = 'http://localhost:3000';

const SSH_PASSWORD = 'test';
const SSH_USERNAME = 'test';
const SSH_HOST = 'localhost';

const sshOptions = {
  host: SSH_HOST,
  port: 22,
  username: SSH_USERNAME,
  password: SSH_PASSWORD,
};

const corsOptions = {
  origin: CLIENT_HOST,
  methods: ['GET', 'POST'],
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions,
});

const createStream = (ssh, socket) => {
  ssh.shell((err, stream) => {
    if (err)
      return socket.emit(
        'data',
        '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n'
      );

    stream.on('close', () => ssh.end());
    dataFlowHandler(stream, socket);
  });
};

const dataFlowHandler = (stream, socket) => {
  // Container -> Browser
  stream.on('data', (data) => socket.emit('data', data.toString('binary')));

  // Browser -> Container
  socket.on('data', (data) => stream.write(data));
};

io.on('connection', async (socket) => {
  console.log('socket connected');
  const ssh = new Client();
  ssh.on('ready', () => createStream(ssh, socket)).connect(sshOptions);
});

httpServer.listen(SERVER_PORT, () =>
  console.log(`listen on port ${SERVER_PORT}`)
);
