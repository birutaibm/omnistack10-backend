const Dev = require('../models/Dev');
const DevServices = require('../services/DevServices');
const Location = require('../utils/Location');

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

  show: async (request, response) => {
    const {id} = request.params;
    const dev = await Dev.findById(id);

    return response.json(dev);
  },

  destroy: async (request, response) => {
    const {id} = request.params;
    const dev = await DevServices.delete(id);

    return response.json(dev);
  },

  update: async (request, response) => {
    const result = await DevServices.change({
      ...request.body,
      _id: request.params.id,
    });
    console.log(result);
    return response.json(result);
  },
};