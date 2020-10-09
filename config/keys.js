const prodKey = require('./keys.prod');
const devKey = require('./keys.dev');

const URI = 'mongodb://localhost:27017/news-explorer-db';
const PORT = 3000;

if (process.env.NODE_ENV === 'production') {
  module.exports = prodKey;
} else {
  module.exports = {
    devKey,
    URI,
    PORT,
  };
}
