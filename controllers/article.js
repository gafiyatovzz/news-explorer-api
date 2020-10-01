const Article = require('../models/Article');
const NotFoundError = require('../utils/NotFoundError');

module.exports.getAllArticles = (req, res, next) => {
  Article.find({})
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Неверный параметр запроса. Ошибка 404.')
      }
      res.send({ data: article })
    })
    .catch(next)
};

module.exports.createArtiqle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body

  Article.create({
    keyword, title, text, date, source, link, image: req.user._id,
  })
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Неверный параметр запроса.');
      }
      res.send({ data: article });
    })
    .catch(next)
}

module.exports.removeArtiqle = (req, res, next) => {
  Article.findById(req.params.id)
    .then((artcle) => {
      if (article.owner.toString() === req.user._id) {
        Article.findByIdAndRemove(artcle._id, () => {
          res.send({ message: 'Новость удалена'});
        });
      } else if (artcle === null) {
        throw NotFoundError('Такой новости не существует')
      } else {
        res.status(401).send({ message: 'Отказ в доступе. Запрещено удалять чужие новости.' })
      }
    })
    .catch(next);
}