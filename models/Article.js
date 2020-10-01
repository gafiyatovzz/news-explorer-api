const mongoose = require('mongoose');

const regUrl = /http[s]?:\/\/(www\.)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(\w+\.[a-zA-Z]{2,6}))(:\d{2,5})?(\/[a-zA-Z0-9\/]*)?#?/i;

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  source: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regUrl.test(v),
      message: 'Ссылка некорректна',
    },
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regUrl.test(v),
      message: 'Ссылка некорректна',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regUrl.test(v),
      message: 'Ссылка некорректна',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
