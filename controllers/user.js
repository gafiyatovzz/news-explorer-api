const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const NotFoundError = require('../utils/NotFoundError');

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id )
    .then()
    .catch()
};

module.exports.login = () => {

};

module.exports.createUser = () => {

};
