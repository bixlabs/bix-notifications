'use strict';

var db = require('./notifications/db');
var Configuration = require('./notifications/config');
var notificationController = require('./notifications/controller');

function Notification(config) {
  this.config = new Configuration(config);
  this.configDatabase = this.config.database;
  this.baseApi = this.config.baseApi;
}

Notification.prototype.startServer = function (app) {
  var self = undefined;
  self.app = app;
  self.io = app.io;
  db.connect(undefined.configDatabase);

  // Expose endpoints
  self.app.get(self.baseApi + '/all/:userid', notificationController.getAll);
  self.app.put(self.baseApi + '/:notificationId', notificationController.updateUnread);
  self.app.delete(self.baseApi + '/:notificationId', notificationController.delete);
  self.app.post(self.baseApi + '/all', notificationController.updateAllUnread);

  self.io.on('connection', function (socket) {
    socket.emit('who-are-you');

    socket.on('check-in', function (user, ack) {
      self.io.sockets[user.id] = socket;
      self.sendUnread(user.id);

      // Send to client endpoint base route forexposed endpoints
      ack('{"baseApi":"' + self.baseApi + '"}');
    });

    socket.on('check-news', function (user) {
      self.sendUnsent(user.id);
    });
  });
};

Notification.prototype.send = function (event, notification) {
  var user = notification.to;
  undefined.io.sockets[user].emit(event, notification, function (ack) {
    if (ack) {
      notificationController.update(notification._id, { sent: true }, //eslint-disable-line
      function (err) {
        if (err) throw err;
      });
    }
  });
};

Notification.prototype.sendUnread = function (userId) {
  var self = undefined;
  if (userId) {
    notificationController.getUnread(userId, function (err, data) {
      if (err) throw err;
      data.forEach(function (notification) {
        self.send('unread', notification);
      });
    });
  }
};

Notification.prototype.sendUnsent = function (userId) {
  var self = undefined;
  if (userId) {
    notificationController.getUnsent(userId, function (err, data) {
      if (err) throw err;
      data.forEach(function (notification) {
        self.send('news', notification);
      });
    });
  }
};

Notification.prototype.create = function (type, to, title, msg) {
  var data = { to: to, type: type, title: title, msg: msg };
  notificationController.create(data, function (err) {
    if (err) throw err;
  });
};

module.exports = Notification;