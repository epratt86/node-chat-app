const socket = io();

const messageForm = document.getElementById('message-form');
const locationButton = document.getElementById('send-location');

socket.on('newMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = document.getElementById('message-template').innerHTML;
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  document.getElementById('messages').innerHTML += html;
});

socket.on('newLocationMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = document.getElementById('location-message-template').innerHTML;
  let html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  document.getElementById('messages').innerHTML += html;
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
