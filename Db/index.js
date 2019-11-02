const mongoose = require('mongoose');
const saslprep = require('saslprep');
saslprep;
const Models = require('./Model');
const Schemas = require('./Schemas');
mongoose.connect(
  'mongodb://keanuo:19980411@192.168.1.9:27017/talent?authSourse=talent',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = {
  mongoose,
  Models,
  Schemas,
};
