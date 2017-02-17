'use strict';

var NotificationModel = require('./model.js');

var self = undefined;

/**
 * Method for exposed endpoint. Get all notifications by User id.
 * GET <BASE API>/all/:userId
 * @pathParam {userid} Notification Id
 */
exports.getAll = function (req, res) {
  NotificationModel.find({ to: req.params.userid }, function (err, data) {
    if (err) res.send(err);
    res.send(data);
  });
};

/**
 * Method for exposed endpoint. Update unread field to false
 * PUT <BASE API>/:notificationId
 * @pathParam {notificationId} Notification Id
 */
exports.updateUnread = function (req, res) {
  var id = req.params.notificationId;
  self.update(id, { unread: false }, function (err, data) {
    if (err) res.send(err);
    res.send(data);
  });
};

/**
 * Method for exposed endpoint. Update all unread notifications.
 * PUT <BASE API>/all
 */
exports.updateAllUnread = function (req, res) {
  NotificationModel.update({ unread: true }, { unread: false }, { multi: true }, function (err, data) {
    if (err) res.send(err);
    res.send(data);
  });
};

/**
 * Method for exposed endpoint. Remove notificaton by id
 * DELETE <BASE API>/:notificationId
 * @pathParam {notificationId} Notification Id
 */
exports.delete = function (req, res) {
  var id = req.params.notificationId;
  NotificationModel.findByIdAndRemove(id, function (err, data) {
    if (err) res.send(err);
    res.send(data);
  });
};

/**
 * Get unread notification by User id. All the notifications unread.
 * @param  {String}   userId User id
 * @param  {Function} cb     Callback
 */
exports.getUnread = function (userId, cb) {
  NotificationModel.find({ to: userId, unread: true }, cb);
};

/**
 * Get new notifications by User id. All the unsent notifications.
 * @param  {String}   userId User id
 * @param  {Function} cb     Callback
 */
exports.getUnsent = function (userId, cb) {
  NotificationModel.find({ to: userId, sent: false }, cb);
};

/**
 * Update notification by id
 * @param  {String}   id   Notification Id
 * @param  {Object}   data New values for notification
 * @param  {Function} cb   Callback
 */
exports.update = function (id, data, cb) {
  NotificationModel.findByIdAndUpdate(id, data, cb);
};

/**
 * Create ew notification
 * @param  {object}   data Object representation for notification. Check model schema.
 * @param  {Function} cb   Callback
 */
exports.create = function (data, cb) {
  var newNotification = new NotificationModel(data);
  newNotification.save(cb);
};