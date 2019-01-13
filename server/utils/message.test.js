var expect = require('expect');

var {generateMsg, generateLocMsg} = require('./message');

describe('generateMsg', () => {
  it('should generate correct message object', () => {
    var from = 'Jane';
    var text = 'Some Msg';
    var message = generateMsg(from, text);

    expect(typeof message.createAt).toBe('number');
    expect(message).toMatchObject({from,text});
  });
});

describe('generateLocMsg', () => {
  it('should generate correct location object', () => {
    var from = 'Jane';
    var lat = 40;
    var lon = -74;
    var url = 'https://www.google.com/maps?q=40,-74';
    var message = generateLocMsg(from, lat, lon);

    expect(typeof message.createAt).toBe('number');
    expect(message).toMatchObject({from, url});
  });
});
