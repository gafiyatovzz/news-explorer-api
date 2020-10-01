const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // Если в заголовке header нет токена возвращаем ошибку со статусом
  // 401 вместе с сообщением
  if (!authorization) {
  console.log('auth', authorization);

    return res
      .status(401)
      .send({ message: 'Необходима авторизация' })
  }

  // Токен в заголовке найден, очищаем его от Bearer и верифицируем
  const token = authorization.replace('Bearer ', '');
  console.log('token', token);
  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
console.log('payload', payload);

  } catch (err) {
console.log('err', err);
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  // отправляем валидные данные
  req.user = payload;
  next();
}