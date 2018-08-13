'use strict';

let contactController = require('../controller/contact.controller');
let multer = require('multer');
let fileUpload = require('../util/fileUpload');
let upload = multer(fileUpload);

module.exports = (app) => {
  // Contacts collection routes
  app.route('/api/v1/contacts/')
    .get(contactController.list)
    .post(contactController.create);

  // Single article routes
  app.route('/api/v1/contacts/:contactId')
    .get(contactController.read)
    .put(contactController.update)
    .delete(contactController.delete);

  app.route('/api/v1/contacts/form-data')
    .post(upload.single('avatar'), contactController.createByFormData);
  app.route('/api/v1/contacts/:contactId/avatar')
    .get(contactController.getAvatar)
};
