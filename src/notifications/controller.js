class NotificationController {
  db;

  /**
   * @constructor
   * @param {NotificationDatabaseContract} notificationDatabase
   */
  constructor(notificationDatabase) {
    this.db = notificationDatabase;
  }

  /**
   * Creates a new notification.
   * @param  {Object} data, object representing a notification.
   */
  create(data) {
    return this.db.create(data);
  }

  /**
   * Updates a notification by id.
   * @param  {String} id
   * @param  {Object} data, values to update
   */
  update(id, data) {
    return this.db.update(id, data);
  }

  /**
   * Gets all notifications by user id.
   * @param {String} userId
   */
  findAllByUser(userId) {
    return this.db.findAllByUser(userId);
  }

  /**
   * Sets unread field to false, meaning that the
   * notification is read.
   * @param {String} id
   */
  setAsRead(id) {
    return this.db.setAsRead(id);
  }

  /**
   * Sets all unread notifications as read,
   * basically, sets unread field to be false.
   * @param {String} userId
   */
  setAllAsRead(userId) {
    return this.db.setAllAsRead(userId);
  }

  /**
   * Removes a notification by id.
   * @param {String} id
   */
  remove(id) {
    return this.db.remove(id);
  }

  /**
   * Gets all unread notifications of a user.
   * @param  {String} userId
   */
  getAllUnread(userId) {
    return this.db.getAllUnread(userId);
  }

  /**
   * Gets all unsent notifications of a user.
   * @param  {String} userId User id
   */
  getAllUnsent(userId) {
    return this.db.getAllUnsent(userId);
  }
}

export default NotificationController;
