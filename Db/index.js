const mongoose = require('mongoose');
const saslprep = require('saslprep');
saslprep;
const Models = require('./Model');
const Schemas = require('./Schemas');
mongoose.connect('mongodb://localhost:27017/talent2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  mongoose,
  Models,
  Schemas,
};
