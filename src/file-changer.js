'use strict';

const fs = require('fs');
const util = require('util');
const faker = require('faker');
const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);
const net = require('net');
const socket = new net.Socket();

let config = {
  port: 3001,
  host: 'localhost'
};

socket.on('connect', () => {
  console.log('File-changer connected');
});

socket.connect(config, () => {});

module.exports = exports = {};

/**
 *
 * @param {json} file
 * @function readPromise
 */
exports.loadFile = async function(file) {
  return await readFromFile(file);
};

exports.saveFile = async file => {
  let data = faker.lorem.sentence();
  let text = data.toString().toUpperCase();
  await writeToFile(file, Buffer.from(text));
};

exports.alterFile = async file => {
  try {
    await exports.loadFile(file);
    await exports.saveFile(file);

    socket.write(
      JSON.stringify({
        status: 1,
        event: 'file-saved',
        file: file,
        text: 'saved'
      })
    );
  } catch (e) {
    socket.write(
      JSON.stringify({
        status: 0,
        event: 'file-error',
        file: file,
        text: e
      })
    );
  }
};
