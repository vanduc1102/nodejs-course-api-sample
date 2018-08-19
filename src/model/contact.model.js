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
  primaryNumber:  String,
  firstName: String,
  lastName: String,
  title: String,
  company: String,
  jobTitle: String,
  otherNumbers: [String],
  primaryEmail: String,
  email: [String],
  groups: [String],
  avatarUrl: String,
  createdUser:String,
  createdAt: { type: Date, required: true, default: Date.now() }
});

module.exports.Contact = mongoose.model('Contact', ContactSchema);


