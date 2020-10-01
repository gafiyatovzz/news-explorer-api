const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (value) => /\w/.test(value)
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => isEmail(value),
      message: 'Почта должна содержать минимум 2 символа и соответствовать шаблону example@email.com'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 2,
    select: false,  //TODO: посомтреть что это значит
  }
});

// TODO: findUserByCredentials - вернуться к конспектам и ознакомиться с этим методом.
userSchema.statics.findUserByCredentials = function(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль.'))
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль.'))
          }
          console.log('user', user);
          return user;
        });
    });
}

module.exports = mongoose.model('user', userSchema);
