const Dev = require('../models/Dev');
const Parse = require('../utils/Parse');
const Location = require('../utils/Location');

module.exports = {
  index: async (request, response) => {
    const {latitude, longitude} = request.query;
    const techs = Parse.stringToArray(request.query.techs);

    const devs = await Dev.find({
      techs: {
        $in: techs
      },
      location: {
        $near: {
          $geometry: Location.create(longitude, latitude),
          $maxDistance: 10000,
        },
      },
    });

    return response.json(devs);
  },
}