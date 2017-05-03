var expect = require('expect');

var {
  generateMessage,
  generateLocationMessage
} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Marwan';
    var text = 'some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    // expect(message).toInclude({
    //   from,
    //   text
    // });
  });
})

describe('generateLocationMessage', () => {
  it('should generate correct location message object', () => {
    var from = 'Marwan';
    var lat = 39;
    var long = -86;
    var url = 'http://www.google.com/maps?q=39,-86'
    var message = generateLocationMessage(from, lat, long);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      url
    });
  });
})
