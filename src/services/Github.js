const axios = require('axios');

const baseUrl = 'https://api.github.com/';

module.exports = {
  getUser: async function (username) {
    const endPoint = 'users/';
    const routeParam = username;
    const url = baseUrl+endPoint+routeParam;
    console.log(url);
    const { data } = await axios.get(url);
    return data;
  },
};