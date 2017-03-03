'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

var _mongoModelExample = require('./mongo-model-example');

var _mongoModelExample2 = _interopRequireDefault(_mongoModelExample);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This is just an example that can be use for tests later and also as documentation.
/* eslint-disable */
var MongoNotificationDatabase = function (_NotificationDatabase) {
  (0, _inherits3.default)(MongoNotificationDatabase, _NotificationDatabase);

  function MongoNotificationDatabase() {
    (0, _classCallCheck3.default)(this, MongoNotificationDatabase);
    return (0, _possibleConstructorReturn3.default)(this, (MongoNotificationDatabase.__proto__ || (0, _getPrototypeOf2.default)(MongoNotificationDatabase)).apply(this, arguments));
  }

  (0, _createClass3.default)(MongoNotificationDatabase, [{
    key: 'create',
    value: function create(data) {
      return new _mongoModelExample2.default(data).save();
    }
  }, {
    key: 'update',
    value: function update(id, data) {
      return _mongoModelExample2.default.findByIdAndUpdate(id, data);
    }
  }, {
    key: 'remove',
    value: function remove(id) {
      return _mongoModelExample2.default.findByIdAndRemove(id);
    }
  }, {
    key: 'setAsRead',
    value: function setAsRead(id) {
      return _mongoModelExample2.default.update(id, { unread: false });
    }

    //In here I guess we should use this userId somehow?

  }, {
    key: 'setAllAsRead',
    value: function setAllAsRead(userId) {
      return _mongoModelExample2.default.update({ unread: true }, { unread: false }, { multi: true });
    }
  }, {
    key: 'getAllUnread',
    value: function getAllUnread(userId) {
      return _mongoModelExample2.default.find({ to: userId, unread: true });
    }
  }, {
    key: 'getAllUnsent',
    value: function getAllUnsent(userId) {
      return _mongoModelExample2.default.find({ to: userId, sent: false });
    }
  }, {
    key: 'findAllByUser',
    value: function findAllByUser(userId) {
      return _mongoModelExample2.default.find({ to: userId });
    }
  }]);
  return MongoNotificationDatabase;
}(_database2.default);

exports.default = MongoNotificationDatabase;
module.exports = exports['default'];