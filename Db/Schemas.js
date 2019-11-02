const mongoose = require('mongoose');
const Schemas = {
  ques_unit_userSchema: mongoose.Schema({
    _user_name: String,
    _user_password: String,
    _user_code: String,
    _submit_status: Number,
    _company_name: String,
    _user_role: Number,
    _id: Object,
  }),
  ques_unit_formSchema: mongoose.Schema({
    _from_user: String,
    _confirmed: Boolean, 
    _id:Object,
  }),
};

module.exports = Schemas;