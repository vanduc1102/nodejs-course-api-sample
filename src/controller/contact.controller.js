'use strict';

/**
 * Module dependencies
 */
const mongoose = require('mongoose'),
  fs = require('fs'),
  Contact = mongoose.model('Contact');


/**
* Create an Contact
*/
exports.createByFormData = function (req, res) {
  req.body.avatarUrl = req.file.path;
  req.body.createdUser = req.user.email;
  let contact = new Contact(req.body);
  contact.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: err
      });
    } else {
      res.json(contact);
    }
  });
};

exports.getAvatar = function (req, res) {
  let contactId = req.params.contactId;
  Contact.findById(contactId).exec(function (err, contact) {
    fs.readFile(contact.avatarUrl, function (err, data) {
      if (err) {
        return res.status(422).send({
          message: err
        });
      }
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(data);
    });
  });
};

/**
 * Create an Contact
 */
exports.create = function (req, res) {
  req.body.createdUser = req.user.email;
  let contact = new Contact(req.body);
  contact.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: err
      });
    } else {
      res.json(contact);
    }
  });
};

/**
 * Show the current Contact
 */
exports.read = function (req, res) {
  let contactId = req.params.contactId;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).send({
      message: 'Contact is invalid'
    });
  }

  Contact.findById(contactId).exec(function (err, contact) {
    if (err) {
      return next(err);
    } else if (!contact) {
      return res.status(404).send({
        message: 'No Contact with ' + contactId + ' identifier has been found'
      });
    }
    req.contact = contact;
    res.json(contact);
  });
};

/**
 * Update an Contact
 */
exports.update = function (req, res) {
  let contactId = req.params.contactId;
  req.body.updatedUser = req.user.email;

  Contact.findByIdAndUpdate(contactId, { $set: req.body }, { new: true }, function (err, contact) {
    if (err) {
      return res.status(500).send({
        message: err
      });
    }
    res.send(contact);
  });
};

/**
 * Delete an Contact
 */
exports.delete = function (req, res) {
  let contactId = req.params.contactId;

  Contact.remove({ _id: contactId }, (err) => {
    if (err) {
      return res.status(500).send({
        message: err
      });
    } else {
      res.json({
        message: "Deleted: " + contactId
      });
    }
  });
};

/**
 * List of Contacts
 */
exports.list = function (req, res) {
  Contact.find().sort('createdAt').exec(function (err, contacts) {
    if (err) {
      return res.status(422).send({
        message: err
      });
    } else {
      res.json(contacts);
    }
  });
};
