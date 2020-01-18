const Dev = require('../models/Dev');
const Github = require('../services/Github');
const Parse = require('../utils/Parse');
const Location = require('../utils/Location');
const { devIn, devOut } = require('../websocket');

function onlyUpdatableFields(newValue) {
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
}

function socketNeedsToKnow(updatedValues) {
  return updatedValues.techs || updatedValues.location;
}

function notifySocket(oldValue, newValue) {
  devOut(oldValue);
  devIn(newValue);
}

module.exports = {
  createDev: async function(info) {
    const github = await Github.getUser(info.github_username);
    const dev = await Dev.create({
      github_username: info.github_username,
      avatar_url: github.avatar_url,
      name: info.name || github.name || info.github_username,
      bio: info.bio || github.bio,
      techs: Parse.stringToArray(info.techs),
      location: Location.create(info.longitude, info.latitude),
    });
    devIn(dev);
    return dev;
  },
  
  delete: async function(id) {
    const dev = await Dev.findByIdAndDelete(id);
    devOut(dev);
    return dev;
  },
  
  change: async function(dev) {
    const oldValue = await Dev.findById(dev._id).lean();
    if (oldValue) {
      const updatedValues = onlyUpdatableFields(dev);
      if (updatedValues.techs) {
        updatedValues.techs = Parse.stringToArray(updatedValues.techs);
      }
      const newValue = {...oldValue, ...updatedValues};

      if (socketNeedsToKnow(updatedValues)) {
        notifySocket(oldValue, newValue)
      }

      await Dev.update(oldValue, updatedValues);

      return {
        oldValue,
        newValue,
        message: 'Success update!'
      };
    } else {
      return {message: 'id '+dev._id+' not found!'};
    }
  },
};
