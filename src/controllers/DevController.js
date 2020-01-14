const Dev = require('../models/Dev');
const DevServices = require('../services/DevServices');

module.exports = {
  index: async (request, response) => {
    const devs = await Dev.find();

    return response.json(devs);
  },

  store: async (request, response) => {
    const { body } = request;
    const { github_username } = body;

    const dev = await Dev.findOne({ github_username }) ||
                await DevServices.createDev(body);
  
    return response.json(dev);
  },
};