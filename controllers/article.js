const Article = require('../models/Article');
const { ForbiddenError, BadRequestError } = require('../utils/index');
const NotFoundError = require('../utils/index');

module.exports.getAllArticles = (req, res, next) => {
  Article.find({})
    .then((article) => {
      if (!article) throw new BadRequestError('Ошибка запроса');
      res.send({ data: article });
    })
    .catch(next);
};

module.exports.createArtiqle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => {
      if (!article) {
        throw new BadRequestError('Ошибка запроса. Данные некорректны.');
      }
      res.send({ data: article });
    })
    .catch(next);
};

module.exports.removeArtiqle = (req, res, next) => {
  Article.findById(req.params.id)
    .then((art) => {
      if (art === null) {
        throw new NotFoundError('Такой новости не существует');
      } else if (art.owner.toString() === req.user._id) {
        Article.findByIdAndRemove(art._id)
          .then(() => {
            res.send({ message: 'Новость удалена!' });
          })
          .catch(next);
      } else {
        throw new ForbiddenError('Запрещено удалять чужие новости');
      }
    })
    .catch(next);
};
