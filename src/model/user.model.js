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
  email: { type: String, required: true, index: { unique: true } },
  password: {
    type: String,
    required: true,
    select: false,
  },
  token: {
    type: String,
    select: false,
  }
});

UserSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


module.exports.User = mongoose.model('User', UserSchema);


