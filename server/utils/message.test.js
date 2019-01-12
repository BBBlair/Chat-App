var expect = require('expect');

var {generateMsg} = require('./message');

describe('generateMsg', () => {
  it('should generate correct message object', () => {
    var from = 'Jane';
    var text = 'Some Msg';
    var message = generateMsg(from, text);

    expect(typeof message.createAt).toBe('number');
    expect(message).toMatchObject({from,text});
  });
});
