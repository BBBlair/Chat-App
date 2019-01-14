const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
  // it('should allow string', () => {
  //   var str = 'Jane';
  //   expect(isRealString(str)).toBe(true);
  // });

  it('should reject non-string values', () => {
    var num = 123;
    expect(isRealString(num)).toBe(false);
  });

  it('should reject string with only space', () => {
    var emptyStr = '   ';
    expect(isRealString(emptyStr)).toBe(false);
  });

  it('should allow string with non-space values', () => {
    var specialChac = '  ++  ';
    expect(isRealString(specialChac)).toBe(true);
  });

});
