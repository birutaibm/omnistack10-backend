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
    const dev = await Dev.findByIdAndDelete(id);

    return response.json(dev);
  },

  update: async (request, response) => {
    const {id} = request.params;
    const oldValue = await Dev.findById(id);
    if (oldValue) {
      const updatedValues = DevServices.onlyUpdatableFields(request.body);
      await Dev.update(oldValue, updatedValues);

      return response.json({
        oldValue,
        updatedValues,
        message: 'Success update!'
      });
    } else {
      return response.json({message: 'id '+id+' not found!'});
    }
  },
};