const passportConfig = require('../config/passport');
const AuthService = require('../service/authentication.service');

module.exports = function (app) {
  app.use(passportConfig.initialize());

  app.get('/oauth/facebook',
    passportConfig.authenticate('facebook', { session: false }),
    function (req, res) {
      console.log('/oauth/facebook', req);
    });

  app.get('/oauth/facebook/callback',
    passportConfig.authenticate('facebook', { failureRedirect: '/', session: false }),
    function (req, res) {
      res.json({
        email:req.user.email,
        token:req.user.token
      })
    });

  app.post(
    '/api/v1/login',
    passportConfig.authenticate('local', { session: false }),
    function (req, res) {
      if (!req.user) {
        res.status(401);
        res.send('authorization error');
        return;
      }
      res.header('Access-Control-Expose-Headers', req.user.token);
      res.send({
        token: req.user.token,
      });
    }
  );

  // check all request for token Bearer.
  app.use(passportConfig.authenticate('bearer', { session: false }), (req, res, next) => {
    if (!req.user) {
      res.status(401);
      res.send('authorization error');
      return;
    }
    next();
  });

  app.get(
    '/api/v1/logout',
    async (req, res) => {
      console.log("logout-user", req.user);
      await AuthService.saveUserToken(req.user.email, '');
      delete req.user;
      res.status = 401;
      res.end("Logged out");
    }
  );
}
