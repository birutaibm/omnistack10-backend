module.exports = {
  create: (longitude, latitude) => {
    return {
      type: 'Point',
      coordinates: [longitude, latitude]
    };
  },
};