const express = require('express');

const app = express.Router();

const userRoute = require('./user/user');
const articleRoute = require('./articles/articles');

app.use('/user', userRoute);
app.use('/articles', articleRoute);

module.exports = app;
