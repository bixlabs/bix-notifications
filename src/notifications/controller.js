import Debug from './debug';
import {tryCallbackOrPromise, tryCallbackOrThrowError} from './util';

class NotificationController {
  db;

  /**
   * @constructor
   * @param {NotificationDatabaseContract} notificationDatabase
   */
  constructor(notificationDatabase) {
    this.db = notificationDatabase;
    Debug.info('Notifications were initialized');
  }

  /**
   * Creates a new notification.
   * @param  {Object} data, object representing a notification.
   * @param  {Function} callback
   */
  async create(data, callback = null) {
    try {
      const notification = await this.db.create(data);
      Debug.info(`Notification was created at ${new Date()} with values: ${JSON.stringify(notification)}`);
      return tryCallbackOrPromise(notification, callback);
    } catch (error) {
      Debug.error(`An error was thrown while trying to create a Notification: ${error}`);
      tryCallbackOrThrowError(error, callback);
    }
  }

  /**
   * Updates a notification by id.
   * @param  {String} id
   * @param  {Object} data, values to update
   * @param  {Function} callback
   */
  async update(id, data, callback = null) {
    try {
      const notification = await this.db.update(id, data);
      Debug.info(`Notification was updated at ${new Date()} with values: ${JSON.stringify(notification)}`);
      return tryCallbackOrPromise(notification, callback);
    } catch (error) {
      Debug.error(`An error was thrown while trying to update a Notification: ${id} -- ${error}`);
      tryCallbackOrThrowError(error, callback);
    }
  }

  /**
   * Gets all notifications by user id.
   * @param {String} userId
   * @param {Function} callback
   */
  async findAllByUser(userId, callback = null) {
    try {
      const notifications = await this.db.findAllByUser(userId);
      Debug.info(`All Notifications for user: ${userId} were retrieved at ${new Date()}`);
      return tryCallbackOrPromise(notifications, callback);
    } catch (error) {
      Debug.error(`An error was thrown while trying to find all Notifications of a user: ${userId} -- ${error}`);
      tryCallbackOrThrowError(error, callback);
    }
  }

  /**
   * Sets unread field to false, meaning that the
   * notification is read.
   * @param {String} id
   * @param {Function} callback
   */
  async setAsRead(id, callback = null) {
    try {
      const notification = await this.db.setAsRead(id);
      Debug.info(`Notification with id: ${id} was read at ${new Date()}`);
      return tryCallbackOrPromise(notification, callback);
    } catch (error) {
      Debug.error(`An error was thrown while trying to set as read a Notification: ${id} -- ${error}`);
      tryCallbackOrThrowError(error, callback);
    }
  }

  /**
   * Sets all unread notifications as read,
   * basically, sets unread field to be false.
   * @param {String} userId
   * @param {Function} callback
   */
  async setAllAsRead(userId, callback = null) {
    try {
      const notifications = await this.db.setAllAsRead(userId);
      Debug.info(`All Notifications for user: ${userId} were set as read at ${new Date()}`);
      return tryCallbackOrPromise(notifications, callback);
    } catch (error) {
      Debug.error(`An error was thrown while trying to set all Notifications as read of user: ${userId} -- ${error}`);
      tryCallbackOrThrowError(error, callback);
    }
  }

  /**
   * Removes a notification by id.
   * @param {String} id
   * @param {Function} callback
   */
  async remove(id, callback = null) {
    try {
      const notification = await this.db.remove(id);
      Debug.info(`Notification with id: ${id} was removed at ${new Date()}`);
      return tryCallbackOrPromise(notification, callback);
    } catch (error) {
      Debug.error(`An error was thrown while trying to remove a Notification: ${id} -- ${error}`);
      tryCallbackOrThrowError(error, callback);
    }
  }

  /**
   * Gets all unread notifications of a user.
   * @param  {String} userId
   * @param  {Function} callback
   */
  async getAllUnread(userId, callback = null) {
    try {
      const notifications = await this.db.getAllUnread(userId);
      Debug.info(`Unread Notifications for user: ${userId} were retrieved at ${new Date()}`);
      return tryCallbackOrPromise(notifications, callback);
    } catch (error) {
      Debug.error(`An error was thrown while trying to get all unread 
        Notifications of a user: ${userId} as read -- ${error}`);
      tryCallbackOrThrowError(error, callback);
    }
  }

  /**
   * Gets all unsent notifications of a user.
   * @param  {String} userId User id
   * @param  {Function} callback
   */
  async getAllUnsent(userId, callback = null) {
    try {
      const notifications = await this.db.getAllUnsent(userId);
      Debug.info(`Unsent Notifications for user: ${userId} were retrieved at ${new Date()}`);
      return tryCallbackOrPromise(notifications, callback);
    } catch (error) {
      Debug.error(`An error was thrown while trying to get all unsent 
        Notifications of a user: ${userId} -- ${error}`);
      tryCallbackOrThrowError(error, callback);
    }
  }


}

export default NotificationController;
