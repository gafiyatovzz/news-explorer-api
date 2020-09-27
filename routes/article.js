const express = require('express');

const router = require('router');
const controller = require('../controllers/');

const { Joi, celebrate } = require('../node_modules/celebrate');

router.get('/users/me', controller.getUser);

module.exports = router;
