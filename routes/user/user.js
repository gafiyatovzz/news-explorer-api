const express = require('express');

const router = express.Router();
const { Joi, celebrate } = require('celebrate');

const controller = require('../../controllers/user');

router.get('/me', controller.getUser);

module.exports = router;
