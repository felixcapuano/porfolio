import React, { useEffect } from 'react';
import './Terminal.css';
import { Terminal as Term } from 'xterm';
import '../node_modules/xterm/css/xterm.css';
// import { FitAddon } from 'xterm-addon-fit';
const { io } = require('socket.io-client');

const SERVER_HOST = 'http://localhost:3001';

const Terminal = () => {
  useEffect(() => {
    // terminalConfiguration
    const term = new Term({ cursorBlink: true });
    // term.loadAddon(new FitAddon());
    const terminalElement = document.getElementById('terminal');
    // term.fit();
    term.open(terminalElement);

    const socket = io(SERVER_HOST);
    socket.on('connect', () => {
      term.write('\r\n*** Connected to backend***\r\n');
    });

    // term.onKey((e) => {
    //   const ev = e.domEvent;
    //   console.log(ev);
    //   const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

    //   if (ev.key === 'Backspace') {
    //     // if (term._core.buffer.x > 0)
    //     term.write('\b \b');
    //   } else if (ev.key === 'Enter') term.prompt();
    //   else if (printable) term.write(e.key);
    // });

    // Browser -> Backend
    term.onData((data) => socket.emit('data', data));

    // Backend -> Browser
    socket.on('data', (data) => term.write(data));

    socket.on('disconnect', () => {
      term.write('\r\n*** Disconnected from backend***\r\n');
    });

    return () => {};
  }, []);

  return <div className='Terminal' id='terminal' />;
};

export default Terminal;
