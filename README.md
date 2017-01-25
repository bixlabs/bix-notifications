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
const Notification = require('bix-notificacions');

const notification = new Notification({
  baseApi: '/api/notifications',
  database: {
    host: process.env.MONGODB_SERVICE_HOST,
    name: process.env.MONGODB_DATABASE,
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASSWORD
  }
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
    app.io = socketIo(app.start());
    notification.startServer(app);
});
```
