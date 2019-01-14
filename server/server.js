const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMsg, generateLocMsg} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newMsg', {
  //   from: 'John',
  //   text: 'See you then',
  //   createAt: 123123
  // });

  // socket.on('createEmail', (newEmail) => {
    //   console.log('createEmail', newEmail);
    // });

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are both required.');
    };

    socket.join(params.room);
    //socket.leave('The office Fans')

    //io.emit -> io.to('The office Fans').emit
    //socket.broadcast.emit -> socket.broadcast.to('The office Fans').emit
    //socket.emit

    socket.emit('newMsg', generateMsg('Admin','Welcome to the chat room'));
    socket.broadcast.to(params.room).emit('newMsg', generateMsg('Admin',`${params.name} has joined`));

    callback();
  });

  //socket.emit() only emits an event to one user but io.emit() does it to every connection
  socket.on('createMsg', (msg, callback) => {
    console.log('createMsg', msg);
    io.emit('newMsg', generateMsg(msg.from, msg.text));
    callback('This is from the server');
    // socket.broadcast.emit('newMsg', {
    //   from: msg.from,
    //   text: msg.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMsg', (coords) => {
    io.emit('newLocMsg', generateLocMsg('Admin',coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from Server');
  });

});

server.listen(port, () => {
  console.log(`Server is up on ${port}!`);
});
