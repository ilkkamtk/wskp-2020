// Controller
'use strict';
const userModel = require('../models/userModel');

const users = userModel.users;

const user_list_get = (req, res) => {
  res.json(users);
};

const user_get = (req, res) => {
  const id = req.params.id;
  const user = users.filter(kissa => kissa.id === id).pop();
  res.json(user);
};

module.exports = {
  user_list_get,
  user_get,
};
