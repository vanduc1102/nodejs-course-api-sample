const passportConfig = require('../config/passport');
const AuthService = require('../service/authentication.service');

module.exports = function (app) {
  app.post(
    '/api/v1/login',
    passportConfig.authenticate('local', { session: false }),
    function (req, res) {
      if (!req.user) {
        res.status(401);
        res.send('authorization error');
        return;
      }
      res.send({
        token: req.user.token,
      });
    }
  );

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
    function (req, res) {
      console.log("logout-user", req.user);
      AuthService.saveUserToken(req.user.email, '');
      res.status = 401;
      res.end("Logged out");
    }
  );
}
