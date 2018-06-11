const socket = io();

const messageForm = document.getElementById('message-form');
const locationButton = document.getElementById('send-location');

socket.on('newMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');

  const li = document.createElement('li');
  li.innerHTML = `${message.from} ${formattedTime}: ${message.text}`;

  document.getElementById('messages').appendChild(li);

});

socket.on('newLocationMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  const li = document.createElement('li');
  const a = document.createElement('a');

  a.setAttribute('href', `${message.url}`);
  a.setAttribute('target', '_blank');
  a.textContent = 'My Current Location';

  li.innerHTML = `${message.from}: ${formattedTime}`;


  document.getElementById('messages').appendChild(li);
  li.appendChild(a);
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const messageTextBox = document.getElementsByName('message')[0];

  socket.emit('createMessage', {
    from: 'user',
    text: messageTextBox.value
  }, function () {
    messageTextBox.value = ""
  });
});

locationButton.addEventListener('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser!');
  }

  locationButton.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttribute('disabled');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttribute('disabled');
    alert('Unable to fetch location.');
  });
});
