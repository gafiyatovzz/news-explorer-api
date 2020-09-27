const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const NotFoundError = require('../utils/NotFoundError');

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send({
        data: {
          name: user.name,
          email: user.email,
        },
      })
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.user;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if(!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
    })
};

module.exports.createUser = () => {

};
