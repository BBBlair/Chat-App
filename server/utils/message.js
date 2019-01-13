var moment = require('moment');

var generateMsg = (from, text) => {
  return {
    from,
    text,
    createAt: moment().valueOf()
  };
};

var generateLocMsg = (from, lat, lon) => {
  return {
    from,
    url:`https://www.google.com/maps?q=${lat},${lon}`,
    createAt: moment().valueOf()
  };
};

module.exports = {generateMsg, generateLocMsg};
