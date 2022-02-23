const { Client } = require('ssh2');

const sshOptions = {
  host: process.env.SSH_HOST,
  port: 22,
  username: process.env.SSH_USERNAME,
  password: process.env.SSH_PASSWORD,
};

const establishTunnel = (socket) => {
  const ssh = new Client();
  ssh.on('ready', () => createStream(ssh, socket)).connect(sshOptions);
};

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

  console.log('ssh tunnel ready');
};

module.exports = { establishTunnel };
