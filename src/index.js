import db from './notifications/db';
import Configuration from './notifications/config';
import notificationController from './notifications/controller';

class Notification {
  constructor(config) {
    this.config = new Configuration(config);
    this.configDatabase = this.config.database;
    this.baseApi = this.config.baseApi;
  }

  /**
   * This method will be modified!
   */
  startServer(app) {
    const self = this;
    self.app = app;
    self.io = app.io;
    db.connect(this.configDatabase);

    // Expose endpoints
    self.app.get(`${self.baseApi}/all/:userid`, notificationController.getAll);
    self.app.put(`${self.baseApi}/:notificationId`, notificationController.updateUnread);
    self.app.delete(`${self.baseApi}/:notificationId`, notificationController.delete);
    self.app.post(`${self.baseApi}/all`, notificationController.updateAllUnread);

    self.io.on('connection', (socket) => {
      socket.emit('who-are-you');

      socket.on('check-in', (user, ack) => {
        self.io.sockets[user.id] = socket;
        self.sendUnread(user.id);

        // Send to client endpoint base route forexposed endpoints
        ack(`{"baseApi":"${self.baseApi}"}`);
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
    this.io.sockets[user].emit(event, notification, (ack) => {
      if (ack) {
        notificationController
        .update(notification._id, { sent: true }, //eslint-disable-line
          (err) => {
            if (err) throw err;
          });
      }
    });
  }

  /**
   * Sends all the unread notifications by user id
   * @param  {string} userId user identifier
   */
  sendUnread(userId) {
    const self = this;
    if (userId) {
      notificationController
      .getUnread(userId, (err, data) => {
        if (err) throw err;
        data.forEach((notification) => {
          self.send('unread', notification);
        });
      });
    }
  }

  /**
   * Sends all unsent notifications by user id-
   * @param  {string} userId User identifier
   */
  sendUnsent(userId) {
    const self = this;
    if (userId) {
      notificationController
      .getUnsent(userId, (err, data) => {
        if (err) throw err;
        data.forEach((notification) => {
          self.send('news', notification);
        });
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
    notificationController.create(data, (err) => {
      if (err) throw err;
    });
  }
}

export default Notification;
