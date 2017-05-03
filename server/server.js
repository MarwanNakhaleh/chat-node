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
  console.log('user has connected');

  socket.emit('newMessage', {
    from: 'marwan@gmail.com',
    text: 'what\'s up?',
    createdAt: 12345
  });

  socket.on('createEmail', (email) => {
    console.log('createEmail', email);
  })

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  })

  socket.on('disconnect', () => {
    console.log('connection lost');
  })
})

server.listen(port, () => {
  console.log(`Server is up on ${port}.`);
});
