"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (React) {
  return function (element) {
    for (var _len = arguments.length, eventTypesList = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      eventTypesList[_key - 1] = arguments[_key];
    }

    var Bridged = function (_React$Component) {
      _inherits(Bridged, _React$Component);

      function Bridged() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Bridged);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Bridged)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.dispatchEvent = function (evt) {
          _this.props.onEvent(evt);
        }, _this.eventHandlers = eventTypesList.reduce(function (r, eventType) {
          r[eventType] = function (payload) {
            _this.dispatchEvent({ eventType: eventType, payload: payload });
          };
          return r;
        }, {}), _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(Bridged, [{
        key: "render",
        value: function render() {
          return React.cloneElement(element, this.eventHandlers);
        }
      }]);

      return Bridged;
    }(React.Component);

    return React.createElement(Bridged);
  };
};