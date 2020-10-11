const express = require('express');
const coockieParser = require('cookie-parser');
require('dotenv').config();

console.log(process.env.NODE_ENV);

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const keys = require('./config/keys');

// const { PORT = 3000 } = process.env;
// const URI = 'mongodb://localhost:27017/news-explorer-db';

const indexRoute = require('./routes/index');

// *************** MONGO_DB ****************** //

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(keys.URI, options)
  .then(() => console.log('MongoDB - connected'))
  .catch((err) => console.log('MongoDB does not connected. ERR: ', err));

// *************** CONFIG ****************** //
app.use(coockieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(requestLogger);

// *************** ROUTES ****************** //

app.use('/', indexRoute);

// *************** ERRORS ****************** //

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (!err.statuseCode) {
    const { statuseCode = 500, message } = err;
    res.status(statuseCode)
      .send({
        message: statuseCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });
  } else {
    res.status(err.statuseCode).send({ message: err.message });
  } next();
});

// *************** APP ****************** //

app.listen(keys.PORT, () => {
  console.log('Local server launch on port', keys.PORT);
});
