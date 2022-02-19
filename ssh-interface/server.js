const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const SERVER_PORT = 3001;
const CLIENT_HOST = 'http://localhost:3000';

const app = express();

const corsOptions = {
  origin: CLIENT_HOST,
  methods: ['GET', 'POST'],
};

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: corsOptions,
});

io.on('connection', (socket) => {
  socket.emit('data', '\r\n*** SSH CONNECTION ESTABLISHED ***\r\n');
  console.log('connected');

  socket.on('data', (data) => {
    console.log(data);
    // socket.emit('data', data);
  });
});

httpServer.listen(SERVER_PORT, () =>
  console.log(`listen on port ${SERVER_PORT}`)
);
