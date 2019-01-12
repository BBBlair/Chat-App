const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

//socket.emit() only emits an event to one user but io.emit() does it to every connection
  socket.on('createMsg', (msg) => {
    console.log('createMsg', msg);
    io.emit('newMsg', {
      from: msg.from,
      text: msg.text,
      createdAt: new Date().getTime()
    })
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from Server');
  });

});

server.listen(port, () => {
  console.log(`Server is up on ${port}!`);
});
