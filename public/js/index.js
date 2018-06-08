const socket = io();

const messageForm = document.getElementById('message-form');
const locationButton = document.getElementById('send-location');

socket.on('newMessage', function (message) {
  console.log('newMessage', message);

  const li = document.createElement('li');
  li.innerHTML = `${message.from}: ${message.text}`;

  document.getElementById('messages').appendChild(li);

});

socket.on('newLocationMessage', function (message) {
  const li = document.createElement('li');
  const a = document.createElement('a');

  a.setAttribute('href', `${message.url}`);
  a.setAttribute('target', '_blank');
  a.textContent = 'My Current Location';

  li.innerHTML = `${message.from}: `;


  document.getElementById('messages').appendChild(li);
  li.appendChild(a);
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'user',
    text: document.getElementsByName('message')[0].value
  });
});

locationButton.addEventListener('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser!');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
  });
});
