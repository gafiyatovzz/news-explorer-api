const express = require('express');
const coockieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, URI } = process.env;

const userController = require('./controllers/user');
const indexRoute = require('./routes/index');

console.log(process.env.NODE_ENV)

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
