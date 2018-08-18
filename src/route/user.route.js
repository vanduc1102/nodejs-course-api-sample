'use strict';

let userController = require('../controller/user.controller');

module.exports = (app) => {
  // Users collection routes
  app.route('/api/v1/users/')
    .get(userController.list);
};
