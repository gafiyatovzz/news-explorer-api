const express = require('express');

const router = express.Router();

const { Joi, celebrate } = require('celebrate');

const controller = require('../../controllers/article');

const regx = /http[s]?:\/\/(www\.)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(\w+\.[a-zA-Z]{2,6}))(:\d{2,5})?(\/[a-zA-Z0-9\\/]*)?#?/i;

router.get('/', controller.getAllArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().regex(regx),
    image: Joi.string().required().regex(regx),
    owner: Joi.string().required(),
  }),
}), controller.createArtiqle);

router.delete('/articleId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required().alphanum(),
  }),
}),
  controller.removeArtiqle);

module.exports = router;
