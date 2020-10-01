const express = require('express');

const router = express.Router();

const controller = require('../controllers/user');
const { Joi, celebrate } = require('../node_modules/celebrate');

router.get('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .alphanum(),
    email: Joi.string().required().email(),
  }),
}), controller.getUser);

module.exports = router;
