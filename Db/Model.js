const mongoose = require('mongoose');
const Schemas = require('./Schemas');
const Models = {
  quesUnitForm: mongoose.model(
    'QuesUnitForm',
    Schemas.ques_unit_formSchema,
    'company_forms'
  ),
  quesUnitUser: mongoose.model(
    'QuesUnitUser',
    Schemas.ques_unit_userSchema,
    'company_users'
  ),
};

module.exports = Models;
