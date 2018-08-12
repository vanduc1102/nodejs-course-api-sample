'use strict';

let contactController = require('../controller/contact.controller');

module.exports =  (app) => {
  // Contacts collection routes
  app.route('/api/v1/contacts/')
    .get(contactController.list)
    .post(contactController.create);

  // Single article routes
  app.route('/api/v1/contacts/:contactId')
    .get(contactController.read)
    .put(contactController.update)
    .delete(contactController.delete);
};
