# Bix notifications
Notifications module

## Installation

    $ npm install bix-notifications

## Usage

#### Start service (Loopback)

```javascript
const loopback = require('loopback');
const boot = require('loopback-boot');
const socketIo = require('socket.io');
const MongoNotificationDatabase = require('mongo-database-example');
const Notification = require('bix-notificacions');

const notificationDatabase = new MongoNotificationDatabase({
    host: process.env.MONGODB_SERVICE_HOST,
    name: process.env.MONGODB_DATABASE,
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASSWORD
});

const notification = new Notification(notificationDatabase);

app.get(`/notification/all/:userid`, (req, res) => {
    notification.getAll(req.body.userId)
        .then((result) => {
            return res.send(result);
        }, (err) => {
            return res.send(err);
        });
app.put(`/notification/:notificationId`, (req, res) => {
    notification.setAsRead(req.body.notificationId)
        .then((result) => {
            return res.send(result);
        }, (err) => {
            return res.send(err);
        });
});
app.delete(`/notification/:notificationId`, (req, res) => {
    notification.remove(req.body.notificationId)
        .then((result) => {
            return res.send(result);
        }, (err) => {
            return res.send(err);
        });
});
app.post(`/notification/all`, (req, res) => {
    notification.setAllAsRead(req.body.userId)
        .then((result) => {
            return res.send(result);
        }, (err) => {
            return res.send(err);
        });
});

app.start = function() {
  ...
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    const io = socketIo(app.start());
    notification.startServer(io);
});
```
