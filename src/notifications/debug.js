import debug from 'debug';

const WEB_NOTIFICATIONS = 'web-notifications';

class Debug {
  static initialize() {
    Debug.configureInfo();
    Debug.configureError();
    return Debug;
  }

  static configureInfo() {
    Debug.infoDebug = debug(`${WEB_NOTIFICATIONS}:info`);
    Debug.infoDebug.log = console.info.bind(console); // eslint-disable-line
  }

  static configureError() {
    Debug.errorDebug = debug(`${WEB_NOTIFICATIONS}:error`);
    Debug.errorDebug.log = console.error.bind(console); // eslint-disable-line
  }

  static info(message) {
    return Debug.infoDebug(message);
  }

  static error(message) {
    return Debug.errorDebug(message);
  }
}

export default Debug.initialize();
