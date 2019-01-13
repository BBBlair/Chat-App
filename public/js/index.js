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

//target="_blank" tells the broswer to open a new tab, not redirecting the current one
socket.on('newLocMsg', function(msg) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current Location</a>');

  li.text(`${msg.from}: `);
  a.attr('href', msg.url);
  li.append(a);
  jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMsg', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});


var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  };

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMsg', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function() {
    alert('Unable to fetch location.');
  });
});
