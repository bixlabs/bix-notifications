class NotificationDatabaseContract {
  /* eslint-disable */

  /**
   * @param notification
   * @return {Promise} which resolves to the Object representing the notification that was created.
   */
  create(notification) {}

  /**
   * @param id
   * @param notification
   * @return {Promise} which resolves to an Object representing the notification that was updated.
   */
  update(id, notification) {}

  /**
   * @param id
   * @return {Promise} which resolves to an Object representing the notification that was removed.
   */
  remove(id) {}

  /**
   * @param id
   * @return {Promise} which resolves to an Object representing the notification that was change to read.
   */
  setAsRead(id) {}

  /**
   * @param userId
   * @return {Promise} which resolves to an Array with all the notifications that were set as read for the given user id.
   */
  setAllAsRead(userId) {}

  /**
   * @param userId
   * @return {Promise} which resolves to an Array with all the notifications that are unread for the given user id.
   */
  getAllUnread(userId) {}

  /**
   * @param userId
   * @return {Promise} which resolves to an Array with all the notifications that are unsent for the given user id.
   */
  getAllUnsent(userId) {}

  /**
   * @param userId
   * @return {Promise} which resolves to an Array with all the notifications for the given user id.
   */
  findAllByUser(userId) {}
}

export default NotificationDatabaseContract;
