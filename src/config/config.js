const ids = {
  facebook: {
    clientID: process.env.CONFIG_FACEBOOK_CLIENT_ID,
    clientSecret: process.env.CONFIG_FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:' + process.env.PORT + '/oauth/facebook/callback'
  }
};
module.exports = ids;
