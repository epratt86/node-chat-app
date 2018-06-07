const socket = io();

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});
