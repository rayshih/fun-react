'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.component = exports.mapEvent = undefined;

var _rx = require('rx');

var _bridge = require('./bridge');

var _bridge2 = _interopRequireDefault(_bridge);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var mapEvent = exports.mapEvent = function mapEvent(React, Cycle) {
  return function (mapper, element) {
    var Wrapped = Cycle.component('Wrapped', function (interactions) {
      var event$ = interactions.get('on_event').map(mapper);

      return {
        view: _rx.Observable.just(React.cloneElement(element, {
          onEvent: interactions.listener('on_event')
        })),
        events: {
          onEvent: event$
        }
      };
    });

    return React.createElement(Wrapped);
  };
};

var component = exports.component = function component(React, Cycle) {
  return function (componentName, defFn, componentOptions) {
    // binding context
    var bridge = (0, _bridge2.default)(React, Cycle);
    var map = mapEvent(React, Cycle);

    var cycleDefFn = function cycleDefFn(interactions, props, self, lifecycles) {
      // event system
      var eventTypes = [];
      var event$ = new _rx.Subject();
      var sendEvent = function sendEvent(event) {
        event$.onNext(event);
      };

      var forwardEvent = function forwardEvent(eventType, evt$) {
        return evt$.subscribe(function (payload) {
          sendEvent({ eventType: eventType, payload: payload });
        });
      };

      // register function
      var registerEvent = function registerEvent(eventType) {
        var transform = arguments.length <= 1 || arguments[1] === undefined ? _util.id : arguments[1];

        // eventTypeName
        var etn = eventType.typeName;
        if (!eventTypes.includes(etn)) {
          eventTypes.push(etn);
          forwardEvent(etn, interactions.get(etn).map(transform));
        }

        return interactions.listener(etn);
      };

      // link
      var linkEvent = function linkEvent(element) {
        return React.cloneElement(element, {
          onEvent: sendEvent
        });
      };

      // map
      var mapEventWithObj = function mapEventWithObj(obj, element) {
        var otherwise = obj._otherwise;
        var mapper = function mapper(evt) {
          var fn = obj[evt.eventType];
          if (fn) {
            return fn(evt.payload);
          }

          if (otherwise) {
            return otherwise(evt);
          }
        };

        return map(mapper, element);
      };

      var mapOrdinaryEvent = function mapOrdinaryEvent(eventMap, element) {
        var mapper = function mapper(evt) {
          return eventMap[evt.eventType](evt.payload);
        };
        return map(mapper, bridge.apply(undefined, [element].concat(_toConsumableArray(Object.keys(eventMap)))));
      };

      // map and link
      var mapAndLinkEvent = function mapAndLinkEvent(mapper, element) {
        return linkEvent(map(mapper, element));
      };

      var mapAndLinkEventWithObj = function mapAndLinkEventWithObj(obj, element) {
        return linkEvent(mapEventWithObj(obj, element));
      };

      var mapAndLinkOrdinaryEvent = function mapAndLinkOrdinaryEvent(eventHandlerMap, element) {
        return linkEvent(mapOrdinaryEvent(eventHandlerMap, element));
      };

      // binding API
      linkEvent.map = mapAndLinkEvent;
      linkEvent.mapWithObj = mapAndLinkEventWithObj;
      linkEvent.mapOrdinary = mapAndLinkOrdinaryEvent;

      var fun = {
        event: registerEvent,
        link: linkEvent,

        map: map,
        mapWithObj: mapEventWithObj,
        mapOrdinary: mapOrdinaryEvent,

        interactions: interactions };

      // cycle compatible
      var cycleDef = defFn(fun, props, self, lifecycles);

      var _ref = cycleDef.view ? cycleDef : { view: cycleDef, events: {} };

      var view = _ref.view;
      var cycleEvents = _ref.events;


      Object.keys(cycleEvents).forEach(function (eventType) {
        var obs$ = cycleEvents[eventType];
        forwardEvent(eventType, obs$);
      });

      return {
        view: view,
        events: {
          onEvent: event$
        }
      };
    };

    return Cycle.component(componentName, cycleDefFn, componentOptions);
  };
};