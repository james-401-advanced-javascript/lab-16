'use strict';

const net = require('net');
const socket = new net.Socket();

let config = {
  port: 3000,
  host: 'localhost'
};

// Socket is a client in a TCP connection

// Connect sockets to client
// 

// Listen for a 'connect' event, and call the anon function specified
console.log('wntoantir: ', socket)
socket.on('connect', () => {
  console.log('Logger.js >> connected!');
});

// Connect to TCP server
socket.connect(config, () => {});

socket.on('close', () => {
  console.log('I am closing!');
});

// Listen for the 'data' event, and call the anon function specified
socket.on('data', data => {
  console.log('Logger.js >> I just received data from an outside source!');
  console.log('Logger.js >> That data is:', data.toString());
});

socket.on('file-saved', payload => {
  console.log(`SUCCESS: Changing file ${payload.file} succeeded`);
});
socket.on('file-error', payload => {
  console.log(
    `ERROR: Changing file ${payload.file} failed with error ${payload.text}`
  );
});
