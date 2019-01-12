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

  socket.emit('newMsg', {
    from: 'John',
    text: 'See you then',
    createAt: 123123
  });

    // socket.on('createEmail', (newEmail) => {
    //   console.log('createEmail', newEmail);
    // });

  socket.on('createMsg', (msg) => {
    console.log('createMsg', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from Server');
  });

});

server.listen(port, () => {
  console.log(`Server is up on ${port}!`);
});
