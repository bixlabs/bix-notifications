'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// This is just an example that can be use for tests later and also as documentation.
var mongoose = require('mongoose');

// create a schema
var notificationSchema = new mongoose.Schema({
  to: String,
  type: String,
  title: String,
  message: String,
  unread: {
    type: Boolean,
    default: true
  },
  sent: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

var Notification = mongoose.model('Notification', notificationSchema);

exports.default = Notification;
module.exports = exports['default'];