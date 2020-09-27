const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorozation } = req.headers;

  // Если в заголовке header нет токена возвращаем ошибку со статусом
  // 401 вместе с сообщением
  if (!authorozation || !authorozation.startWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' })
  }

  // Токен в заголовке найден, очищаем его от Bearer и верифицируем

  const token = authorozation.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(toke, 'super-strong-secret');
  } catch (err) {
    return res
    .status(401)
    .send({ message: 'Необходима авторизация' });
  }

  // отправляем валидные данные
  req.user = payload;
  next();
}