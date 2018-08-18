const mongoose = require('mongoose'),
  User = mongoose.model('User');

function checkAuth(credential) {
  return new Promise((response, reason) => {
    User.findOne({ email: credential.email }, function (err, user) {
      if (err) throw err;
      if(!user){
        return response(false);
      }
      user.comparePassword(credential.pass, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          response(isMatch);
        }
      });
    }).select("+password");
  })
}

function saveUserToken(email, token) {
  return new Promise((response, reason) => {
    User.findOneAndUpdate({ email: email }, { $set: { token: token } }, function (err, user) {
      if (err) throw err;
      return response(user);
    });
  });
}

function findUserByToken(token) {
  return new Promise((response, reason) => {
    User.findOne({ token: token }, function (err, user) {
      if (err) throw err;
      return response(user);
    });
  });
}


module.exports = {
  checkAuth, saveUserToken, findUserByToken
}
