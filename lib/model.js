'use strict';

const mongoose = require('mongoose');

// create a schema
const notificationSchema = new mongoose.Schema({
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


const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
