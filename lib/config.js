'use strict';

const path = require('path');
const fs = require('fs');

/**
 * Construct a configuration object.
 *
 * A configuration object may be constructed with either
 * a path to a `notification.json` file (which defaults to
 * `$PWD/notification.json` if not present, or with a configuration
 * object.
 *
 * @param {String|Object} config Configuration path or details.
 *
 * @constructor
 */
function Configuration(config) {
  if (!config) {
    config = path.join(process.cwd(), 'notification.json');
  }

  if (typeof config === 'string') {
    this.loadConfiguration(config);
  } else {
    this.configure(config);
  }
}

Configuration.prototype.loadConfiguration = function loadConfiguration(configPath) {
  const json = fs.readFileSync(configPath);
  const config = JSON.parse(json.toString());
  this.configure(config);
};


Configuration.prototype.configure = function configure(config) {
  this.database = config.database;
  this.baseApi = config.baseApi;
};

module.exports = Configuration;
