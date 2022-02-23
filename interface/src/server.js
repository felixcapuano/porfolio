require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { establishTunnel } = require('./tunnel');
const { createContainer, deleteContainer } = require('./controler');

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
  // run a container
  await createContainer('jelkfjle');

  // create a tunnel between the frontend and the container
  // establishTunnel(socket);
});

httpServer.listen(process.env.SERVER_PORT, () =>
  console.log(`listen on port ${process.env.SERVER_PORT}`)
);
