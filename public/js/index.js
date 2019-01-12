var socket = io();

socket.on('connect', function () {
  console.log('Connected to Server');

  //This happens when the client and server connect
  // socket.emit('createEmail', {
  //   to: 'jen@example.com',
  //   text: 'Hey'
  // });

  //This happens when the client and server connect
  // socket.emit('createMsg', {
  //   from: 'Blair',
  //   text: 'It works for me'
  // });

});

socket.on('disconnect', function () {
  console.log('Disconnected from Server');
});

socket.on('newMsg', function(msg) {
  console.log('New Msg', msg);
});
