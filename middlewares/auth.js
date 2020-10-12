const jwt = require('jsonwebtoken');
const ForbiddenError = require('../utils/errors/ForbiddenError/ForbiddenError');

const { NODE_ENV, JWT_SECRET, JWT_DEV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // прилетает ключ без Bearer, условия if(!auth || !auth.startWith('Bearer ')) не подходит
  if (!authorization) {
    throw new ForbiddenError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production'
        ? JWT_SECRET
        : JWT_DEV,
    );
  } catch (err) {
    throw new ForbiddenError('Необходима авторизация');
  }

  req.user = payload;
  return next();
};
