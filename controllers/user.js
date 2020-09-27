const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const NotFoundError = require('../utils/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

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
      const token = jwt.sign(
        { _id: user.id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      res
        .coockie('jwt', token, {
          maxAge: 360000,
          httpOnly: true,
        })
        .end()
    })
    .catch(next);
};

module.exports.createUser = () => {
  User.finOne({ email: req.body.email })
    .then((hash) => {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
        .then((user) => {
          res.status(201).send({
            data: {
              _id: user._id,
              name: user.name,
              email: user.email,
            }
          })
        })
    })
    .catch(next);
};
