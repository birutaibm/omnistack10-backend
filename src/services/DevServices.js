const Dev = require('../models/Dev');
const Github = require('../services/Github');
const Parse = require('../utils/Parse');
const Location = require('../utils/Location');

module.exports = {
  createDev: async function(info) {
    const data = await Github.getUser(info.github_username);
    
    return await Dev.create({
      github_username: info.github_username,
      avatar_url: data.avatar_url,
      name: info.name || data.name || info.github_username,
      bio: info.bio || data.bio,
      techs: Parse.stringToArray(info.techs),
      location: Location.create(info.longitude, info.latitude),
    });
  },

  onlyUpdatableFields: newValue => {
    const allowed = ['name', 'bio', 'techs', 'longitude', 'latitude', 'location'];

    Object.keys(newValue)
      .filter(key => !allowed.includes(key))
      .forEach(key => delete newValue[key]);

    if (!newValue.hasOwnProperty('location') &&
        newValue.hasOwnProperty('longitude') &&
        newValue.hasOwnProperty('latitude')) {
      const longitude = newValue.longitude;
      const latitude = newValue.latitude;
      
      newValue.location = Location.create(longitude, latitude);
    }

    delete newValue.longitude;
    delete newValue.latitude;

    return newValue;
  },
};