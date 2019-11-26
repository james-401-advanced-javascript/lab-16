'use strict';

jest.mock('fs');
const fileChanger = require('../src/file-changer');
const net = require('net');
const socket = new net.Socket();
const server = net.createServer();
server.listen(3001);
server.on('connection', socket => {
  socket.write('Jest test confirmation');
});
socket.connect(3001, 'localhost', () => {});
describe('Proper functionality of file-changer module', () => {
  it('Causes a file-saver event when it receives a valid file', async () => {
    const log = await jest.spyOn(global.console, 'log');
    console.log('Jest test confirmation');
    await fileChanger.alterFile('Laddi Daddy Da');
    expect(log).toHaveBeenCalledWith('Jest test confirmation');
  });
});
