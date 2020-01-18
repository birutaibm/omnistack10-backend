const socketio = require('socket.io');
const Parse = require('./utils/Parse');
const Location = require('./utils/Location');
const calcDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
  io = socketio(server);

  io.on('connection', socket => {
    
    const {latitude, longitude, techs} = socket.handshake.query;
    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: Parse.stringToArray(techs),
    });
  });
}

function findConnections(coordinates, techs) {
  return connections.filter(connection => {
    const distance = calcDistance(coordinates, connection.coordinates);
    return (distance <= 10) &&
        connection.techs.some(item => techs.includes(item));
  });
}

function sendMessage(to, type, message) {
  to.forEach(connection => {
    io.to(connection.id).emit(type, message);
  });
}

function devChange(dev, type) {
  const location = Location.ofDev(dev);
  const watchingDevs = findConnections(location, dev.techs);
  sendMessage(watchingDevs, type, dev);
}

exports.devIn = dev => {
  console.log('new-dev', dev);
  devChange(dev, 'new-dev');
};

exports.devOut = dev => {
  console.log('remove-dev', dev);
  devChange(dev, 'remove-dev');
};
