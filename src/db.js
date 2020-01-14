const mongoose = require('mongoose');

const mongo = {
  protocol: 'mongodb+srv://',
  user: 'omnistack',
  password: 'omnistack',
  cluster: 'birutaibm-mjbkw.gcp.mongodb.net',
  db: 'semana10',
  query: 'retryWrites=true&w=majority',
};
mongo.url = mongo.protocol+mongo.user+':'+mongo.password+'@'+mongo.cluster+'/'+mongo.db+'?'+mongo.query;

const connect = () => mongoose.connect(mongo.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {connect};