const socket = io();

socket.on('connect', function () {

  socket.emit('createMessage', {
    to: 'server@email.com',
    text: 'This is coming from client side.'
  });
});

socket.on('newMessage', function (message) {
  console.log(message);
});
