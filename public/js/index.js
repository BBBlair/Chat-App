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
  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  jQuery('#messages').append(li);
});

// socket.emit('createMsg', {
//   from: 'Frank',
//   text:'Hi'
//   }, function(data) {
//   console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMsg', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
