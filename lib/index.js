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

var _html = require('./html');

Object.keys(_html).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _html[key];
    }
  });
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cycleReact = require('cycle-react');

var _cycleReact2 = _interopRequireDefault(_cycleReact);

var _component2 = require('./component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapEvent = exports.mapEvent = (0, _component2.mapEvent)(_react2.default, _cycleReact2.default);
var component = exports.component = (0, _component2.component)(_react2.default, _cycleReact2.default);