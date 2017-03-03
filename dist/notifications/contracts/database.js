"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotificationDatabaseContract = function () {
  function NotificationDatabaseContract() {
    (0, _classCallCheck3.default)(this, NotificationDatabaseContract);
  }

  (0, _createClass3.default)(NotificationDatabaseContract, [{
    key: "create",

    /* eslint-disable */

    value: function create(data) {}
  }, {
    key: "update",
    value: function update(notificationId, data) {}
  }, {
    key: "remove",
    value: function remove(notificationId) {}
  }, {
    key: "setAsRead",
    value: function setAsRead(id) {}
  }, {
    key: "setAllAsRead",
    value: function setAllAsRead(userId) {}
  }, {
    key: "getAllUnread",
    value: function getAllUnread(userId) {}
  }, {
    key: "getAllUnsent",
    value: function getAllUnsent(userId) {}
  }, {
    key: "findAllByUser",
    value: function findAllByUser(userId) {}
  }]);
  return NotificationDatabaseContract;
}();

exports.default = NotificationDatabaseContract;
module.exports = exports["default"];