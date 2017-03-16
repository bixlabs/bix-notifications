import NotificationController from './notifications/controller';

class Notification {
  constructor(database) {
    this.notificationController = new NotificationController(database);

    this.getAllUnread = this.notificationController.getAllUnread;
    this.setAsRead = this.notificationController.setAsRead;
    this.remove = this.notificationController.remove;
    this.setAllAsRead = this.notificationController.setAllAsRead;
  }

  startServer(socketIO) {
    this.io = socketIO;

    this.io.on('connection', (socket) => {
      socket.emit('who-are-you');

      socket.on('check-in', (user) => {
        this.io.sockets[user.id] = socket;
        this.sendUnread(user.id);
      });

      socket.on('check-news', (user) => {
        this.sendUnsent(user.id);
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
    this.io.sockets[user].emit(event, notification, (ack) => {
      if (ack) {
        this.notificationController
          .update(notification._id, { sent: true }) //eslint-disable-line
          .then((result) => {
            return result;
          });
      }
    });
  }

  /**
   * Sends all the unread notifications by user id
   * @param  {string} userId user identifier
   */
  sendUnread(userId) {
    if (userId) {
      this.notificationController
        .getAllUnread(userId)
        .then((data) => {
          data.forEach((notification) => {
            this.send('unread', notification);
          });
        }, (err) => {
          throw err;
        });
    }
  }

  /**
   * Sends all unsent notifications by user id-
   * @param  {string} userId User identifier
   */
  sendUnsent(userId) {
    if (userId) {
      this.notificationController
        .getAllUnsent(userId)
        .then((data) => {
          data.forEach((notification) => {
            this.send('news', notification);
          });
        }, (err) => {
          throw err;
        });
    }
  }

  /**
   * Register a new notification in the database
   * @param  {string} data.type  type of the notification
   * @param  {string} data.to    user indentifier
   * @param  {string} data.title title fo the notification
   * @param  {string} data.msg   notification content
   */
  static create(data) {
    this.notificationController
      .create(data)
      .then((result) => {
        return result;
      }, (err) => {
        throw err;
      });
  }
}

export default Notification;
