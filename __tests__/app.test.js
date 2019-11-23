'use strict';

jest.mock('fs');
const fileChanger = require('../src/file-changer');

describe('Proper functionality of file-changer module', () => {
  it('Causes a file-saver event when it receives a valid file', async () => {
    const log = jest.spyOn(global.console, 'log');
    await fileChanger.alterFile('Laddi Daddy Da');
    expect(log).toHaveBeenCalledWith(
      'SUCCESS: Changing file Laddi Daddy Da succeeded'
    );
  });
});
