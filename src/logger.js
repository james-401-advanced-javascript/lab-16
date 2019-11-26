'use strict';

const net = require('net');
const socket = new net.Socket();

let config = {
  port: 3001,
  host: 'localhost'
};

// Listen for a 'connect' event, and call the anon function specified
socket.on('connect', () => {
  console.log('Logger.js >> connected!');
});

// Connect to TCP server
socket.connect(config, () => {});

socket.on('close', () => {
  console.log('Logger.js closing!');
});

// Listen for the 'data' event, and call the anon function specified
socket.on('data', payload => {
  const answer = payload.toString().split(' ')[0];
  console.log(answer);
});
