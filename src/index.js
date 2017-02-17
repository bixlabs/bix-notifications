const db = require('./notifications/db');
const Configuration = require('./notifications/config');
const notificationController = require('./notifications/controller');

function Notification(config) {
  this.config = new Configuration(config);
  this.configDatabase = this.config.database;
  this.baseApi = this.config.baseApi;
}

Notification.prototype.startServer = (app) => {
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
};

Notification.prototype.send = (event, notification) => {
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
};

Notification.prototype.sendUnread = (userId) => {
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
};

Notification.prototype.sendUnsent = (userId) => {
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
};

Notification.prototype.create = (type, to, title, msg) => {
  const data = { to, type, title, msg };
  notificationController.create(data, (err) => {
    if (err) throw err;
  });
};

module.exports = Notification;
