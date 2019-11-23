'use strict';

// The net module provides an asynchronous network API for creating stream-based TCP or IPC servers (net.createServer()) and clients
const net = require('net');

// Definde port number and start TCP server
const port = process.env.PORT || 3000;
const server = net.createServer();

server.listen(port, () => {
  console.log('PORT: ', port);
  console.log(`Server up on ${port}`);
});

// Creat object to store socket pool on this server
let socketPool = {};

// When a socket connection to this server via TCP
// Run the code inside this funciton
// Creat a random number as the id
// Creat a new property on the socketPool object, and make the curent socket its value
// When the socket receives data
// dispatch the buffer event that was passed into the socket.on method
// On close, remove/delete the focket by its pool ID
server.on('connection', socket => {
  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  socket.on('data', buffer => dispatchEvent(buffer));
  socket.on('close', () => {
    delete socketPool[id];
  });
});

// This function takes in a buffer, removes all white space from it, and turns it to a string
// Then, it iterates throught the socketPool, and writes that data, or rather emits the data event
let dispatchEvent = buffer => {
  let text = buffer.toString().trim();
  for (let socket in socketPool) {
    socketPool[socket].write(`${event} ${text}`);
  }
};
