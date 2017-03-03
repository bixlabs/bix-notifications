class NotificationDatabaseContract {
  /* eslint-disable */

  create(data) {}

  update(notificationId, data) {}

  remove(notificationId) {}

  setAsRead(id) {}

  setAllAsRead(userId) {}

  getAllUnread(userId) {}

  getAllUnsent(userId) {}

  findAllByUser(userId) {}
}

export default NotificationDatabaseContract;
