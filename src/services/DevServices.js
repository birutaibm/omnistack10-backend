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
};