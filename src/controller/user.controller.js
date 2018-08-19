'use strict';

/**
 * Module dependencies
 */
const mongoose = require('mongoose'),
  User = mongoose.model('User');

/**
 * Create an User
 */
exports.create = async function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  if (!password || !email) {
    return res.status(400).send({
      message: 'Invalid user data, missing email or password.'
    });
  }
  let updateUser = req.body;
  let hashResult = await User.getHashPassword(password);
  if(hashResult.err){
    return res.json(hashResult.err);
  }
  updateUser.password = hashResult.hash;
  User.findOneAndUpdate({ email: email }, { $set: updateUser }, function (err, userFound) {
    if (err) throw err;
    if (userFound) return res.json(userFound);
    let user = new User(req.body);
    user.save(function (err) {
      if (err) {
        return res.status(422).send({
          message: err.message
        });
      } else {
        let { _id, email } = user;
        res.json({
          _id: _id,
          email: email
        });
      }
    });
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

