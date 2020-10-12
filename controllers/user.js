const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { NotFoundError, BadRequestError } = require('../utils/errors');

const { NODE_ENV, JWT_SECRET, JWT_DEV } = process.env;

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Некорректный запрос.');
      }
      res.send({
        data: {
          name: user.name,
          email: user.email,
          id: req.user._id,
        },
      });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 360000,
          httpOnly: true,
        })
        .end();
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        throw new BadRequestError('Пользователь существует');
      }
    })
    .catch(next);

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
        .then((us) => {
          res.status(201).send({
            data: {
              _id: us._id,
              name: us.name,
              email: us.email,
            },
          });
        })
        .catch(next);
    })
    .catch(next);
};
