'use strict';

const emitter = require('./emitter');
const fs = require('fs');
const util = require('util');
const faker = require('faker');
const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);
const logger = require('./logger');
// write code just to get rid eslint errors from importing logger
if (!fs) console.log(logger);

module.exports = exports = {};

emitter.on('file-saved', file => {
  console.log(file.text);
  return file.text;
});

emitter.on('file-error', file => {
  console.error(file.text);
  return file.text;
});

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
    emitter.emit('file-saved', {
      status: 1,
      file: file,
      text: 'saved'
    });
  } catch (e) {
    emitter.emit('file-error', {
      status: 0,
      file: file,
      text: e
    });
  }
};
