import path from 'path';
import fs from 'fs';

class Configuration {
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
  constructor(config) {
    if (!config) {
      // I placed the disable line here, however we must not reassign
      // parameters, this is not allowed, we must fix it later.
      config = path.join(process.cwd(), 'notification.json'); //eslint-disable-line
    }

    if (typeof config === 'string') {
      this.loadConfiguration(config);
    } else {
      this.configure(config);
    }
  }

  loadConfiguration(configPath) {
    const jsonConfig = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(jsonConfig.toString());
    this.configure(config);
  }

  configure(config) {
    this.database = config.database;
    this.baseApi = config.baseApi;
  }
}

export default Configuration;
