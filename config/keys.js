const prodKey = require('./keys.prod');
const devKey = require('./keys.dev');

if (process.env.NODE_ENV === 'production') {
  module.exports = prodKey;
} else {
  module.exports = devKey;
}
