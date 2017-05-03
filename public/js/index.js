var socket = io();

socket.on('connect', function() {
  console.log('connect to server');

  // socket.emit('createEmail', {
  //   to: 'andrew@example.com',
  //   text: 'hey buddy',
  // });
});
socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.emit('createMessage', {
  from: 'Marwan',
  text: 'hello'
}, function() {
  console.log('hello');
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'Anonymous',
    text: jQuery('[name=message]').val()
  }, function() {

  });
});
