const express = require('express');
const coockieParser = require('coockieParser');
require('.dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger')

const userController = require('./controllers/user');
const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/articles');

// *************** MONGO_DB ****************** //

const URI = 'mongodb://localhost:27017/news-exlprer-db';
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(URI, options)
  .then(() => console.log('MongoDB - connected'))
  .catch((err) => console.log('MongoDB does not connected. ERR: ', err));

// *************** CONFIG ****************** //
app.use(coockieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(requestLogger);

// *************** ROUTES ****************** //
app.post('/signin', userController.login);
app.post('/signup', userController.createUser);

app.use(auth);

app.use('/user', userRoutes);
app.use('/articles', articleRoutes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res) => {
  if(!err.statusCode) {
    const { statusCode = 500, message } = err;

    res
      .status(statusCode)
      .send({
        message: statusCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });
  }
  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log('Server launch on port', PORT);
});
