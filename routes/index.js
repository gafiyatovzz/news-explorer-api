const express = require('express');
const app = express();

const { Joi, celebrate } = require('celebrate');
const userRoute = require('./user/user');
const articleRoute = require('./articles/articles');

const controllerUser = require('../controllers/user');
const auth = require('../middlewares/auth');

app.post('/signup', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
}), controllerUser.createUser);
app.post('/signin', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
}),
    controllerUser.login);

app.use(auth);

app.use('/users', userRoute);
app.use('/articles', articleRoute);

module.exports = app;
