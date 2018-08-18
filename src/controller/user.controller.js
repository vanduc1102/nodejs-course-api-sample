'use strict';

/**
 * Module dependencies
 */
const mongoose = require('mongoose'),
  User = mongoose.model('User');

/**
 * Create an User
 */
exports.create = function (req, res) {
  let user = new User(req.body);
  user.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: err.message
      });
    } else {
      let {_id, email} = user;
      res.json({
        id:_id,
        email: email
      });
    }
  });
};
/**
 * List of Users
 */
exports.list = function (req, res) {
  User.find().exec(function (err, users) {
    if (err) {
      return res.status(422).send({
        message: err
      });
    } else {
      res.json(users);
    }
  });
};

