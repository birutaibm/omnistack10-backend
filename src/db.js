require('dotenv').config({  
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});
const mongoose = require('mongoose');

const url = process.env.DB_PROTOCOL + '://' +
    process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_CLUSTER + '/' +
    process.env.DB_COLLECTION + '?' + process.env.DB_QUERY;

const connect = () => mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {connect};