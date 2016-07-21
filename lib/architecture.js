"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// ----- events -----
var createEventTypes = exports.createEventTypes = function createEventTypes() {
  for (var _len = arguments.length, typeNames = Array(_len), _key = 0; _key < _len; _key++) {
    typeNames[_key] = arguments[_key];
  }

  return typeNames.reduce(function (r, n) {
    var ctor = function ctor(payload) {
      return {
        eventType: n,
        payload: payload
      };
    };

    ctor.typeName = n;
    ctor.toString = function () {
      return n;
    };

    r[n] = ctor;
    return r;
  }, {});
};

// ----- updates -----
var createUpdate = exports.createUpdate = function createUpdate(updateMap) {
  return function (msg, model) {
    return updateMap[msg.eventType](msg.payload, model);
  };
};