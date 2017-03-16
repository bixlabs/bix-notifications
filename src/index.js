import NotificationController from './notifications/controller';

class Notification {
  constructor(database) {
    this.notificationController = new NotificationController(database);
  }

  startServer(socketIO) {
    const self = this;
    self.io = socketIO;

    self.io.on('connection', (socket) => {
      socket.emit('who-are-you');

      socket.on('check-in', (user, ack) => {
        self.io.sockets[user.id] = socket;
        self.sendUnread(user.id);

        ack();
      });

      socket.on('check-news', (user) => {
        self.sendUnsent(user.id);
      });
    });
  }

  /**
   * Send notification using socket
   * @param  {string} event        custom socket event
   * @param  {object} notification object representation for notification
   */
  send(event, notification) {
    const user = notification.to;
    const notificationUpdate = new Promise((resolve, reject) => {
      this.io.sockets[user].emit(event, notification, (ack) => {
        if (ack) {
          this.notificationController
            .update(notification._id, { sent: true }) //eslint-disable-line
            .then(updatedNotification => resolve(updatedNotification))
            .catch((err) => {
              reject(err);
            });
        } else {
          resolve();
        }
      });
    });
    return notificationUpdate;
  }

  /**
   * Sends all the unread notifications by user id
   * @param  {string} userId user identifier
   */
  sendUnread(userId) {
    if (userId) {
      const notificatonsSent = new Promise((resolve, reject) => {
        this.notificationController
          .getAllUnread(userId)
          .then((notifications) => {
            const sentNotifications = notifications.map((notification) => {
              const sentNotification = this.send('unread', notification);
              return sentNotification;
            });
            return Promise.all(sentNotifications);
          })
          .then((notifications) => {
            resolve(notifications);
          })
          .catch((err) => {
            reject(err);
          });
      });
      return notificatonsSent;
    }

    return null;
  }

  /**
   * Sends all unsent notifications by user id-
   * @param  {string} userId User identifier
   */
  sendUnsent(userId) {
    if (userId) {
      const notificatonsSent = new Promise((resolve, reject) => {
        this.notificationController
          .getAllUnsent(userId)
          .then((notifications) => {
            const sentNotifications = notifications.map((notification) => {
              const sentNotification = this.send('news', notification);
              return sentNotification;
            });
            return Promise.all(sentNotifications);
          })
          .then((notifications) => {
            resolve(notifications);
          })
          .catch((err) => {
            reject(err);
          });
      });
      return notificatonsSent;
    }

    return null;
  }

  /**
   * Register a new notification in the database
   * @param  {string} data.type  type of the notification
   * @param  {string} data.to    user indentifier
   * @param  {string} data.title title fo the notification
   * @param  {string} data.msg   notification content
   */
  create(data) {
    return this.notificationController
      .create(data)
      .then(result => result)
      .catch((err) => {
        throw err;
      });
  }
}

export default Notification;
