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

## How to provide your own Database Implementation
Check this [Database Contract inside the project](https://github.com/bixlabs/bix-notifications/blob/master/src/notifications/contracts/database.js).

You will need to implement each of the functions defined in that contract with whatever database you are using, 
for now each function must return a promise which should result to the value specified 
in the JSDOC of the function (We said should because in reality it can resolve to whatever 
make sense to you as long as it is wrapped in a promise).

After having your own implementation (for simplicity sake let's call it _MySQLNotificationAdapter_) you just have to pass it to the controller like this:

```JavaScript
const notificationController = new NotificationController(new MySQLNotificationAdapter());
// After this you are going to be able to do:
notificationController.create(notification); // <--- will create a notification.
```

This is a [Mongo Database Implementation](https://github.com/bixlabs/bix-notifications/blob/master/src/notifications/contracts/mongo-database-example.js) example using a [Mongoose Model](https://github.com/bixlabs/bix-notifications/blob/master/src/notifications/contracts/mongo-model-example.js)

## How to activate Debug mode
You just need  to run your server with a specific DEBUG environment variable like this:

```bash
$ DEBUG=web-notifications <Your-start-command-here>
```
That will do the job.

If this documentation still doesn't make sense to you go to [Debug](https://www.npmjs.com/package/debug) documentation 
which is the library we are using.
