var socket = io();

function scrollToBottom() {
  var messages = jQuery('#messages');
  var newestMessage = messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newestMessage.innerHeight();
  var penultimateMessageHeight = newestMessage.prev().innerHeight();
  if (clientHeight + scrollTop + newMessageHeight + penultimateMessageHeight >= scrollHeight) {
    // move to bottom
    messages.scrollTop(scrollHeight);
  }
}

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
  var formattedTime = moment(message.createdAt).format('LLL');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
  // var formattedTime = moment(message.createdAt).format('LLL');
  // var li = jQuery('<li></li>');
  // li.text(`${message.from}\t${formattedTime}: ${message.text}`);
  // jQuery('#messages').append(li);
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
    jQuery('[name=message]').val("");
  });
});

socket.on('newLocationMessage', function(locMessage) {
  var formattedTime = moment(locMessage.createdAt).format('LLL');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: locMessage.from,
    url: locMessage.url,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
  // var li = jQuery('<li></li>');
  // var ayy = jQuery(`<a href='${locMessage.url}' target='_blank'>${locMessage.lat}, ${locMessage.long}</a>`);
  // li.text(`${locMessage.from}\t${formattedTime}: I am at `);
  // li.append(ayy);
  // jQuery('#messages').append(li);
})

jQuery('#send-location').on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported on this browser!');
  }
  jQuery('#send-location').attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position) {
    jQuery('#send-location').removeAttr('disabled').text('Send location');;
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    jQuery('#send-location').removeAttr('disabled').text('Send location');;
    alert('Unable to fetch location.');
  })
})
