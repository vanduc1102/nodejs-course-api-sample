'use strict';

/**
 * Module dependencies
 */
const mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema,
  SALT_WORK_FACTOR = 10;


/**
 * Article Schema
 */
var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  displayName: String,
  email: { type: String, required: true, index: { unique: true } },
  password: {
    type: String,
    select: false,
  },
  token: {
    type: String,
    select: false,
  },
  fbToken: { type: String, select: false }
});

UserSchema.pre('save', async function (next) {
  let user = this;

  if (!user.isModified('password')) return next();

  let hashResult = await UserSchema.statics.getHashPassword(user.password);
  if (hashResult.err) {
    return next(err);
  }
  user.password = hashResult.hash;
  next();
});

UserSchema.statics.getHashPassword = (password) => {
  return new Promise((response, reason) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return response({ err: err, hash: null });

      bcrypt.hash(password, salt, function (err, hash) {
        if (err) return response({ err: err, hash: null });

        response({ err: err, hash: hash });
      });
    });
  });
}

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


module.exports.User = mongoose.model('User', UserSchema);


