const Article = require('../models/Article');
const NotFoundError = require('../utils/NotFoundError');

module.exports.getAllArticles = (req, res, next) => {
  Article.find({})
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Неверный параметр запроса. Ошибка 404.');
      }
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
      console.log('arti === ', article);
      res.send({ data: article });
    })
    .catch(next);
};

module.exports.removeArtiqle = (req, res, next) => {
  Article.findById(req.params.id)
    .then((art) => {
      if (art === null) {
        res.send({ message: 'Новость не найдена' });
      } else if (art.owner.toString() === req.user._id) {
        Article.findByIdAndRemove(art._id);
        res.status(200).json({ message: 'Новость удалена' });
      }
      res
        .status(401)
        .send({
          message:
            'Отказ в доступе. Запрещено удалять чужие новости.',
        });
    })
    .catch(next);
};
