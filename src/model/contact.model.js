'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ContactSchema = new Schema({
  primaryNumber: { type: String, index: { unique: true } },
  firstName: String,
  lastName: String,
  title: String,
  company: String,
  jobTitle: String,
  otherNumbers: [String],
  primaryEmail: String,
  email: [String],
  groups: [String],
  createdAt: { type: Date, required: true, default: Date.now }
});

module.exports.Contact = mongoose.model('Contact', ContactSchema);


