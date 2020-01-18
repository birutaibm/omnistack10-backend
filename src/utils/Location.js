module.exports = {
  create: (longitude, latitude) => {
    return {
      type: 'Point',
      coordinates: [Number(longitude), Number(latitude)],
    };
  },

  ofDev: dev => {
    const {coordinates} = dev.location;
    return {
      longitude: coordinates[0],
      latitude: coordinates[1],
    };
  }
};