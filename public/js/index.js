var socket = io();

socket.on('connect', function() {
  console.log('connect to server');

  // socket.emit('createEmail', {
  //   to: 'andrew@example.com',
  //   text: 'hey buddy',
  // });

  socket.emit('createMessage', {
    from: 'andrew@example.com',
    text: 'hey buddy',
  })
});
socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newEmail', function(email) {
  console.log('new email', email)
});

socket.on('newMessage', function(message) {
  console.log(message);
});
