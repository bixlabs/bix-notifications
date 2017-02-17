const NotificationModel = require('./model.js');

const self = this;

/**
 * Method for exposed endpoint. Get all notifications by User id.
 * GET <BASE API>/all/:userId
 * @pathParam {userid} Notification Id
 */
exports.getAll = (req, res) => {
  NotificationModel
  .find({ to: req.params.userid },
    (err, data) => {
      if (err) res.send(err);
      res.send(data);
    });
};

/**
 * Method for exposed endpoint. Update unread field to false
 * PUT <BASE API>/:notificationId
 * @pathParam {notificationId} Notification Id
 */
exports.updateUnread = (req, res) => {
  const id = req.params.notificationId;
  self
  .update(id, { unread: false },
    (err, data) => {
      if (err) res.send(err);
      res.send(data);
    });
};

/**
 * Method for exposed endpoint. Update all unread notifications.
 * PUT <BASE API>/all
 */
exports.updateAllUnread = (req, res) => {
  NotificationModel
  .update({ unread: true }, { unread: false }, { multi: true },
    (err, data) => {
      if (err) res.send(err);
      res.send(data);
    });
};

/**
 * Method for exposed endpoint. Remove notificaton by id
 * DELETE <BASE API>/:notificationId
 * @pathParam {notificationId} Notification Id
 */
exports.delete = (req, res) => {
  const id = req.params.notificationId;
  NotificationModel
  .findByIdAndRemove(id,
    (err, data) => {
      if (err) res.send(err);
      res.send(data);
    });
};

/**
 * Get unread notification by User id. All the notifications unread.
 * @param  {String}   userId User id
 * @param  {Function} cb     Callback
 */
exports.getUnread = (userId, cb) => {
  NotificationModel.find({ to: userId, unread: true }, cb);
};


/**
 * Get new notifications by User id. All the unsent notifications.
 * @param  {String}   userId User id
 * @param  {Function} cb     Callback
 */
exports.getUnsent = (userId, cb) => {
  NotificationModel.find({ to: userId, sent: false }, cb);
};


/**
 * Update notification by id
 * @param  {String}   id   Notification Id
 * @param  {Object}   data New values for notification
 * @param  {Function} cb   Callback
 */
exports.update = (id, data, cb) => {
  NotificationModel.findByIdAndUpdate(id, data, cb);
};

/**
 * Create ew notification
 * @param  {object}   data Object representation for notification. Check model schema.
 * @param  {Function} cb   Callback
 */
exports.create = (data, cb) => {
  const newNotification = new NotificationModel(data);
  newNotification.save(cb);
};
