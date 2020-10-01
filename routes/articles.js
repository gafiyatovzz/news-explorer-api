const express = require('express');

const router = express.Router();
const controller = require('../controllers/article');

const { Joi, celebrate } = require('../node_modules/celebrate');

router.get('/', controller.getAllArticles);

router.post('/', controller.createArtiqle);

router.delete('/articleId', controller.removeArtiqle);

module.exports = router;
