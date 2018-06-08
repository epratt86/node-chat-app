const socket = io();

socket.on('newMessage', function (message) {
  console.log('newMessage', message);

  const li = document.createElement('li');
  li.innerHTML = `${message.from}: ${message.text}`;

  document.getElementById('messages').appendChild(li);

});

const messageForm = document.getElementById('message-form');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'user',
    text: document.getElementsByName('message')[0].value
  });
});
