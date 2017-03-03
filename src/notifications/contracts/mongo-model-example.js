// This is just an example that can be use for tests later and also as documentation.
const mongoose = require('mongoose');

// create a schema
const notificationSchema = new mongoose.Schema({
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


const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
