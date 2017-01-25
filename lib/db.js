'use strict';

const mongoose = require('mongoose');

exports.connect = (config) => {
  const uri = ['mongodb://', config.host, ':27017/', config.name].join('');

  const options = {
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
  mongoose.connection.on('connected', () => {
    console.log('[Notification module] mongo connection open to ' + uri);
  });

  // If the connection throws an error
  mongoose.connection.on('error', (err) => {
    console.log('[Notification module] mongo connection error: ' + err);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    console.log(' [Notification module] mongo connection disconnected');
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('[Notification module] mongo connection disconnected through app termination');
      process.exit(0);
    });
  });
};
