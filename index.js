const express = require('express');
const coockieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, URI = 'mongodb://localhost:27017/news-explorer-db' } = process.env;

const indexRoute = require('./routes/index');

// *************** MONGO_DB ****************** //

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
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080',
  allowedHeaders: 'Content-Type, Coockie'
}));
// *************** ROUTES ****************** //

app.use('/', indexRoute);

app.use(errorLogger);

app.use(errors());

// *************** ERRORS ****************** //

app.use((err, req, res, next) => {
  if (!err.statuseCode) {
    const { statuseCode = 500, message } = err;
    res.status(statuseCode)
      .send({
        message: statuseCode === 500
          ? 'На сервере произошла ошибка'
          : message,
        statuseCode,
      });
  } else {
    res.status(err.statuseCode).send({
      Error: {
        message: err.message,
        statuseCode: err.statuseCode,
      },
    });
  } next();
});

// *************** APP ****************** //

app.listen(PORT, () => {
  console.log('Local server launch on port', PORT);
});
