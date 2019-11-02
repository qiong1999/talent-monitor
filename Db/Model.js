const mongoose = require('mongoose');
const Schemas = require('./Schemas');
const Models = {
  quesUnitForm: mongoose.model(
    'QuesUnitForm',
    Schemas.ques_unit_formSchema,
    'ques_unit_form',
  ),
  quesUnitUser: mongoose.model(
    'QuesUnitUser',
    Schemas.ques_unit_userSchema,
    'ques_unit_user',
  ),
};

module.exports = Models;