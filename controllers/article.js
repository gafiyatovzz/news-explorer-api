const Article = require('../models/Article');
const { NotFoundError, ForbiddenError, BadRequestError } = require('../utils/errors/index');

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
      if (!article) throw new BadRequestError('Ошибка запроса. Данные некорректны.');
      else res.send({ data: article });
    })
    .catch(next);
};

module.exports.removeArtiqle = (req, res, next) => {
  Article.findById(req.body._id)
    .then((art) => {
      if (art.owner.toString() === req.user._id) {
        Article.findByIdAndRemove(art._id)
          .then(() => {
            res.send({ message: 'Новость удалена!' });
          })
          .catch(next);
      } else {
        throw new ForbiddenError('Запрещено удалять чужие новости');
      }
    })
    .catch((e) => {
      if (e) {
        throw new NotFoundError('Новость не найдена')
      }
    })
    .catch(next);
};

// if (!art) {
  // throw new NotFoundError('Такой новости не существует');
// } else 
