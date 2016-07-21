'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beginnerProgram = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _rx = require('rx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ----- main functions ------
// this only works on web
var beginnerProgram = exports.beginnerProgram = function beginnerProgram(_ref, rootEl) {
  var model = _ref.model;
  var update = _ref.update;
  var view = _ref.view;

  var rootEvent$ = new _rx.Subject();
  var handleEvent = function handleEvent(msg) {
    return rootEvent$.onNext(msg);
  };

  var store$ = _rx.Observable.just(model).concat(rootEvent$).scan(function (model, msg) {
    return update(msg, model);
  });

  store$.subscribe(function (model) {
    var root = _react2.default.createElement(view, { model: model, onEvent: handleEvent });

    _reactDom2.default.render(root, rootEl);
  });
}; // TODO peer dependencies?