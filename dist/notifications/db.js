'use strict';

var mongoose = require('mongoose');

exports.connect = function (config) {
  var uri = ['mongodb://', config.host, ':27017/', config.name].join('');

  var options = {
    user: config.user,
    pass: config.pass,
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  };

  // Create the database connection
  mongoose.connect(uri, options);

  // Connection events
  mongoose.connection.on('connected', function () {
    // This code will be removed so it doesn't matter that we are using console.log.
    // for logging we must just a library like debug.
    console.log('[Notification module] mongo connection open to ' + uri); //eslint-disable-line
  });

  // If the connection throws an error
  mongoose.connection.on('error', function (err) {
    console.log('[Notification module] mongo connection error: ' + err); //eslint-disable-line
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {
    console.log(' [Notification module] mongo connection disconnected'); //eslint-disable-line
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('[Notification module] mongo connection disconnected through app termination'); //eslint-disable-line
      process.exit(0);
    });
  });
};