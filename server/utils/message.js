var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

var generateLocationMessage = (from, lat, long) => {
  return {
    from,
    lat,
    long,
    url: `http://www.google.com/maps?q=${lat},${long}`,
    createdAt: new Date().getTime()
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage
};
