module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-underscore-dangle': 'off',
    'no-useless-escape': 'off',
    'func-names': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
  },
};
