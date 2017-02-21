'use strict';

var mongoose = require('mongoose');

// create a schema
var notificationSchema = new mongoose.Schema({
  to: String,
  type: String,
  title: String,
  msg: String,
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

module.exports = Notification;