'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResilientComponent = function ResilientComponent(_ref) {
  var FallbackComponent = _ref.FallbackComponent;
  return function (ChildComponent) {
    var Resilient = function (_Component) {
      _inherits(Resilient, _Component);

      function Resilient(props) {
        _classCallCheck(this, Resilient);

        var _this = _possibleConstructorReturn(this, (Resilient.__proto__ || Object.getPrototypeOf(Resilient)).call(this, props));

        _this.state = {
          error: null,
          retries: 0
        };
        return _this;
      }

      _createClass(Resilient, [{
        key: 'unstable_handleError',
        value: function unstable_handleError(error) {
          var onError = this.props.onError;


          this.setState(function (prevState) {
            return {
              error: error,
              retries: prevState.retries + 1
            };
          });

          onError && onError(error);
        }
      }, {
        key: 'render',
        value: function render() {
          var _state = this.state,
              error = _state.error,
              retries = _state.retries;

          var _props = this.props,
              maxRetries = _props.maxRetries,
              onError = _props.onError,
              other = _objectWithoutProperties(_props, ['maxRetries', 'onError']);

          return error && retries > maxRetries ? _react2.default.createElement(FallbackComponent, other) : _react2.default.createElement(ChildComponent, other);
        }
      }]);

      return Resilient;
    }(_react.Component);

    Resilient.propTypes = {
      onError: _react.PropTypes.func,
      maxRetries: _react.PropTypes.number
    };

    Resilient.defaultProps = {
      maxRetries: 0
    };

    return Resilient;
  };
};

ResilientComponent.propTypes = {
  FallbackComponent: _react.PropTypes.node
};

ResilientComponent.defaultProps = {
  FallbackComponent: function FallbackComponent() {
    return null;
  }
};

exports.default = ResilientComponent;
