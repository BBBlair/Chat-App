var moment = require('moment');

//new Date.getTime()
var sTimestamp = moment().valueOf();
console.log(sTimestamp);

var createAt = 1234;
var date = moment(createAt);
//date.add(1, 'hour').subtract(1, 'year');
console.log(date.format('h:mm a'));
