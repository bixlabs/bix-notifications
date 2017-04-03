import Promise from 'bluebird';
import NotificationDatabaseContract from '../../src/notifications/contracts/database';

class MockNotificationDatabase extends NotificationDatabaseContract {
  notification = { id: 1 };

  create(data) {
    if (data.shouldFail) {
      return Promise.reject(new Error());
    }

    return MockNotificationDatabase
      .addSupportForFailCase(data, Object.assign(this.notification, data));
  }

  static addSupportForFailCase(data, positiveCase) {
    if (data.shouldFail) {
      return Promise.reject(new Error());
    }

    return Promise.resolve(positiveCase);
  }

  update(id, data) {
    return MockNotificationDatabase.addSupportForFailCase(data,
      Object.assign(this.notification, Object.assign(data, { id })));
  }

  remove(id) {
    return MockNotificationDatabase.addSupportForFailCase(id,
      Object.assign(this.notification, { id }));
  }

  setAsRead(id) {
    return MockNotificationDatabase.addSupportForFailCase(id,
      Object.assign(this.notification, { unread: false, id }));
  }

  setAllAsRead(userId) {
    return MockNotificationDatabase.addSupportForFailCase(userId,
      [Object.assign(this.notification, { unread: false })]);
  }

  getAllUnread(userId) {
    return MockNotificationDatabase.addSupportForFailCase(userId,
      [Object.assign(this.notification, { unread: true })]);
  }

  getAllUnsent(userId) {
    return MockNotificationDatabase.addSupportForFailCase(userId,
      [Object.assign(this.notification, { sent: false })]);
  }

  findAllByUser(userId) {
    return MockNotificationDatabase.addSupportForFailCase(userId, [this.notification]);
  }
}

export default MockNotificationDatabase;
