'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.component = exports.mapEvent = undefined;

var _architecture = require('./architecture');

Object.keys(_architecture).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _architecture[key];
    }
  });
});

var _reactNative = require('react-native');

var _reactNative2 = _interopRequireDefault(_reactNative);

var _native = require('cycle-react/native');

var _native2 = _interopRequireDefault(_native);

var _component2 = require('./component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapEvent = exports.mapEvent = (0, _component2.mapEvent)(_reactNative2.default, _native2.default);
var component = exports.component = (0, _component2.component)(_reactNative2.default, _native2.default);