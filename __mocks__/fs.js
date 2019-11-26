'use strict';

module.exports = exports = {};

let fileContents = '{}';

exports.readFile = async (file, cb) => {
  if (file) {
    if (file.match(/bad/i)) {
      cb('Invalid File');
    } else {
      cb(undefined, Buffer.from(fileContents));
    }
  } else {
    return new Error();
  }
};
exports.writeFile = async (file, buffer, cb) => {
  if (file) {
    if (file.match(/bad/i)) {
      cb('Invalid File');
    } else {
      fileContents = buffer;
      cb(undefined, true);
    }
  } else {
    return new Error();
  }
};
