const mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports.checkAuth = (credential) => {
  return new Promise((response, reason) => {
    User.findOne({ email: credential.email }, function (err, user) {
      if (err) throw err;
      if (!user) {
        return response(false);
      }
      user.comparePassword(credential.pass, function (err, isMatch) {
        if (err) throw err;
        return response(isMatch);
      });
    }).select("+password");
  })
}

module.exports.updateUserToken = (email, token) => {
  return new Promise((response, reason) => {
    User.findOneAndUpdate({ email: email }, { $set: { token: token } }, function (err, user) {
      if (err) throw err;
      return response(user);
    });
  });
}

module.exports.findUserByToken = (token) => {
  return new Promise((response, reason) => {
    User.findOne({ token: token }, function (err, user) {
      if (err) throw err;
      return response(user);
    });
  });
}

module.exports.facebookOauth = (accessToken, refreshToken, profile) => {
  let email = profile.emails[0].value;
  return new Promise((response, reason) => {
    User.findOne({ email: email }, function (err, user) {
      let result = { err: null };
      if (err) {
        result.err = err;
        response(result);
      }
      if (!err && user !== null) {
        result.user = user;
        response(result);
        return;
      }
      user = new User({
        email: email,
        displayName: profile.displayName,
        fbToken: accessToken,
        created: Date.now()
      });
      user.save(function (err) {
        if (err) {
          console.log(err);  // handle errors!
          result.err = err;
          response(result);
          return;
        }
        result.user = user;
        response(result);
      });
    })
  });
}
