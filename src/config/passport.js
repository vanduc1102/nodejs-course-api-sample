const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const authenticationService = require('../service/authentication.service');
const config = require('./config');
const jwt = require('jwt-simple');
const SECRET = 'key_cat_here_he_he_he_he';



passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
}, async (email, password, done) => {
  let isMatch = await authenticationService.checkAuth({ email: email, pass: password });
  if (isMatch) {
    let token = jwt.encode({
      timestamp: Date.now(),
      email: email
    }, SECRET);
    await authenticationService.updateUserToken(email, token);
    return done(null, {
      token,
      email
    });
  }
  return done(null, false);
}));

passport.use(new BearerStrategy(async (token, done) => {
  try {
    let user = await authenticationService.findUserByToken(token);
    if (!user) {
      return done(null, false);
    }
    const { email } = jwt.decode(token, SECRET);
    done(null, { email });
  } catch (error) {
    console.log('error', error);
    done(null, false);
  }
}));

// config
passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL,
  profileFields: ['id', 'displayName', 'email']
},
  async (accessToken, refreshToken, profile, done) => {
    let result = await authenticationService.facebookOauth(accessToken, refreshToken, profile);
    let token = jwt.encode({
      timestamp: Date.now(),
      email: result.user.email
    }, SECRET);
    await authenticationService.updateUserToken(result.user.email, token);
    result.user.token = token;
    return done(result.err, result.user);
  }
));


module.exports = passport;
