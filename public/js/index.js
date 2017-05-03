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
  console.log('newMessage', message);
});
