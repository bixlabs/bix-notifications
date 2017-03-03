// This is just an example that can be use for tests later and also as documentation.
/* eslint-disable */
import NotificationDatabaseContract from './database';
import Notification from './mongo-model-example';
import databaseConnection from './mongo-connection-example';

class MongoNotificationDatabase extends NotificationDatabaseContract {
  constructor(config) {
    databaseConnection.connect(config);
  }

  create(data) {
    return new Notification(data).save();
  }

  update(id, data) {
    return Notification.findByIdAndUpdate(id, data);
  }

  remove(id) {
    return Notification.findByIdAndRemove(id);
  }

  setAsRead(id) {
    return Notification.update(id, { unread: false });
  }

  setAllAsRead(userId) {
    return Notification.update({ unread: true, to: userId }, { unread: false }, { multi: true });
  }

  getAllUnread(userId) {
    return Notification.find({ to: userId, unread: true });
  }

  getAllUnsent(userId) {
    return Notification.find({ to: userId, sent: false });

  }

  findAllByUser(userId) {
    return Notification.find({ to: userId });
  }
}

export default MongoNotificationDatabase;

