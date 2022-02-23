require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { establishTunnel } = require('./tunnel');
const { createContainer, deleteContainer } = require('./controler');
const { createHash } = require('crypto');

const corsOptions = {
  origin: process.env.CLIENT_HOST,
  methods: ['GET', 'POST'],
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions,
});

io.on('connection', async (socket) => {
  console.log('socket connected');
  const container_name = 'env-' + Math.random().toString(36).substring(2, 12);
  console.log(container_name);
  // run a container
  await createContainer(container_name);

  // create a tunnel between the frontend and the container
  // establishTunnel(socket, sshHost);
});

httpServer.listen(process.env.SERVER_PORT, () =>
  console.log(`listen on port ${process.env.SERVER_PORT}`)
);
