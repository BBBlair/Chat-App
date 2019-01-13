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
  var formattedTime = moment(msg.createAt).format('h:mm a, Do MMM  YYYY');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    createAt: formattedTime
  });

  jQuery('#messages').append(html);

  // console.log('New Msg', msg);
  // var li = jQuery('<li></li>');
  // li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
  // jQuery('#messages').append(li);
});

// socket.emit('createMsg', {
//   from: 'Frank',
//   text:'Hi'
//   }, function(data) {
//   console.log('Got it', data);
// });

//target="_blank" tells the broswer to open a new tab, not redirecting the current one
socket.on('newLocMsg', function(msg) {
  var formattedTime = moment(msg.createAt).format('h:mm a, Do MMM  YYYY');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: msg.from,
    url: msg.url,
    createAt: formattedTime
  });

  jQuery('#messages').append(html);
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

  locationButton.attr('disabled','disabled').text('Sending ...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMsg', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location.');
  });
});
