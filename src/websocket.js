const socketio = require('socket.io');
const Parse = require('./utils/Parse');
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

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    const distance = calcDistance(coordinates, connection.coordinates);
    return (distance <= 10) &&
        connection.techs.some(item => techs.includes(item));
  });
};

exports.sendMessage = (to, type, message) => {
  to.forEach(connection => {
    io.to(connection.id).emit(type, message);
  });
}