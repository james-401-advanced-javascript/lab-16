'use strict';

const fileChanger = require('./src/file-changer');

/*
To start with, you should find that the app.js file has some existing content. This code will read the contents of the specified file from the command line arguments, and convert the contents of the file into uppercase letters. Instead of converting the content to uppercase, use the module faker to generate a fake “lorem ipsum” sentence and replace the contents of the file with this new sentence.
*/

let file = process.argv.slice(2).shift();

fileChanger.alterFile(file);

const net = require('net');
const socket = new net.Socket();

let config = {
  port: 3000,
  host: 'localhost'
};

socket.on('connect', () => {
  console.log('App.js >> connected!');
});

socket.connect(config, () => {
  fileChanger.alterFile(file);
});

// setTimeout(function() {
//   socket.write('App.js >> I am pinging the server');
// }, 2000);

setTimeout(function() {
  socket.destroy();
}, 4000);

socket.on('data', data => {
  console.log('App.js >> I just wrote a thing!');
});
