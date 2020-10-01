const express = require('express');

const router = express.Router();

const controller = require('../controllers/user');

const { Joi, celebrate } = require('../node_modules/celebrate');

router.get('/me', controller.getUser);
router.get('/', controller.getAll);
module.exports = router;
