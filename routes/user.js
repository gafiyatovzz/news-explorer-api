const express = require('express');

const router = require('router');
const controller = require('../controllers/');

const { Joi, celebrate } = require('../node_modules/celebrate');

router.get('/articles', controller.getArticles);

router.post('/articles', controller.createArticles);

router.delete('/articles/articleId', controller.removeArticles);

module.exports = router;
