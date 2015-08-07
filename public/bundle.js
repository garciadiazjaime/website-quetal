require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canMutationObserver = typeof window !== 'undefined'
    && window.MutationObserver;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    var queue = [];

    if (canMutationObserver) {
        var hiddenDiv = document.createElement("div");
        var observer = new MutationObserver(function () {
            var queueList = queue.slice();
            queue.length = 0;
            queueList.forEach(function (fn) {
                fn();
            });
        });

        observer.observe(hiddenDiv, { attributes: true });

        return function nextTick(fn) {
            if (!queue.length) {
                hiddenDiv.setAttribute('yes', 'no');
            }
            queue.push(fn);
        };
    }

    if (canPost) {
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],2:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _PanelGroup = require('./PanelGroup');

var _PanelGroup2 = _interopRequireDefault(_PanelGroup);

var Accordion = _react2['default'].createClass({
  displayName: 'Accordion',

  render: function render() {
    return _react2['default'].createElement(
      _PanelGroup2['default'],
      _extends({}, this.props, { accordion: true }),
      this.props.children
    );
  }
});

exports['default'] = Accordion;
module.exports = exports['default'];
},{"./PanelGroup":53,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91}],3:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _AffixMixin = require('./AffixMixin');

var _AffixMixin2 = _interopRequireDefault(_AffixMixin);

var _utilsDomUtils = require('./utils/domUtils');

var _utilsDomUtils2 = _interopRequireDefault(_utilsDomUtils);

var Affix = _react2['default'].createClass({
  displayName: 'Affix',

  statics: {
    domUtils: _utilsDomUtils2['default']
  },

  mixins: [_AffixMixin2['default']],

  render: function render() {
    var holderStyle = { top: this.state.affixPositionTop };

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, this.state.affixClass),
        style: holderStyle }),
      this.props.children
    );
  }
});

exports['default'] = Affix;
module.exports = exports['default'];
},{"./AffixMixin":4,"./utils/domUtils":81,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],4:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _utilsDomUtils = require('./utils/domUtils');

var _utilsDomUtils2 = _interopRequireDefault(_utilsDomUtils);

var _utilsEventListener = require('./utils/EventListener');

var _utilsEventListener2 = _interopRequireDefault(_utilsEventListener);

var AffixMixin = {
  propTypes: {
    offset: _react2['default'].PropTypes.number,
    offsetTop: _react2['default'].PropTypes.number,
    offsetBottom: _react2['default'].PropTypes.number
  },

  getInitialState: function getInitialState() {
    return {
      affixClass: 'affix-top'
    };
  },

  getPinnedOffset: function getPinnedOffset(DOMNode) {
    if (this.pinnedOffset) {
      return this.pinnedOffset;
    }

    DOMNode.className = DOMNode.className.replace(/affix-top|affix-bottom|affix/, '');
    DOMNode.className += DOMNode.className.length ? ' affix' : 'affix';

    this.pinnedOffset = _utilsDomUtils2['default'].getOffset(DOMNode).top - window.pageYOffset;

    return this.pinnedOffset;
  },

  checkPosition: function checkPosition() {
    var DOMNode = undefined,
        scrollHeight = undefined,
        scrollTop = undefined,
        position = undefined,
        offsetTop = undefined,
        offsetBottom = undefined,
        affix = undefined,
        affixType = undefined,
        affixPositionTop = undefined;

    // TODO: or not visible
    if (!this.isMounted()) {
      return;
    }

    DOMNode = _react2['default'].findDOMNode(this);
    scrollHeight = document.documentElement.offsetHeight;
    scrollTop = window.pageYOffset;
    position = _utilsDomUtils2['default'].getOffset(DOMNode);

    if (this.affixed === 'top') {
      position.top += scrollTop;
    }

    offsetTop = this.props.offsetTop != null ? this.props.offsetTop : this.props.offset;
    offsetBottom = this.props.offsetBottom != null ? this.props.offsetBottom : this.props.offset;

    if (offsetTop == null && offsetBottom == null) {
      return;
    }
    if (offsetTop == null) {
      offsetTop = 0;
    }
    if (offsetBottom == null) {
      offsetBottom = 0;
    }

    if (this.unpin != null && scrollTop + this.unpin <= position.top) {
      affix = false;
    } else if (offsetBottom != null && position.top + DOMNode.offsetHeight >= scrollHeight - offsetBottom) {
      affix = 'bottom';
    } else if (offsetTop != null && scrollTop <= offsetTop) {
      affix = 'top';
    } else {
      affix = false;
    }

    if (this.affixed === affix) {
      return;
    }

    if (this.unpin != null) {
      DOMNode.style.top = '';
    }

    affixType = 'affix' + (affix ? '-' + affix : '');

    this.affixed = affix;
    this.unpin = affix === 'bottom' ? this.getPinnedOffset(DOMNode) : null;

    if (affix === 'bottom') {
      DOMNode.className = DOMNode.className.replace(/affix-top|affix-bottom|affix/, 'affix-bottom');
      affixPositionTop = scrollHeight - offsetBottom - DOMNode.offsetHeight - _utilsDomUtils2['default'].getOffset(DOMNode).top;
    }

    this.setState({
      affixClass: affixType,
      affixPositionTop: affixPositionTop
    });
  },

  checkPositionWithEventLoop: function checkPositionWithEventLoop() {
    setTimeout(this.checkPosition, 0);
  },

  componentDidMount: function componentDidMount() {
    this._onWindowScrollListener = _utilsEventListener2['default'].listen(window, 'scroll', this.checkPosition);
    this._onDocumentClickListener = _utilsEventListener2['default'].listen(_utilsDomUtils2['default'].ownerDocument(this), 'click', this.checkPositionWithEventLoop);
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this._onWindowScrollListener) {
      this._onWindowScrollListener.remove();
    }

    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.remove();
    }
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    if (prevState.affixClass === this.state.affixClass) {
      this.checkPositionWithEventLoop();
    }
  }
};

exports['default'] = AffixMixin;
module.exports = exports['default'];
},{"./utils/EventListener":73,"./utils/domUtils":81,"babel-runtime/helpers/interop-require-default":91}],5:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var Alert = _react2['default'].createClass({
  displayName: 'Alert',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    onDismiss: _react2['default'].PropTypes.func,
    dismissAfter: _react2['default'].PropTypes.number,
    closeLabel: _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'alert',
      bsStyle: 'info',
      closeLabel: 'Close Alert'
    };
  },

  renderDismissButton: function renderDismissButton() {
    return _react2['default'].createElement(
      'button',
      {
        type: "button",
        className: "close",
        'aria-label': this.props.closeLabel,
        onClick: this.props.onDismiss },
      _react2['default'].createElement(
        'span',
        { 'aria-hidden': "true" },
        '×'
      )
    );
  },

  render: function render() {
    var classes = this.getBsClassSet();
    var isDismissable = !!this.props.onDismiss;

    classes['alert-dismissable'] = isDismissable;

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { role: 'alert', className: _classnames2['default'](this.props.className, classes) }),
      isDismissable ? this.renderDismissButton() : null,
      this.props.children
    );
  },

  componentDidMount: function componentDidMount() {
    if (this.props.dismissAfter && this.props.onDismiss) {
      this.dismissTimer = setTimeout(this.props.onDismiss, this.props.dismissAfter);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this.dismissTimer);
  }
});

exports['default'] = Alert;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],6:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Badge = _react2['default'].createClass({
  displayName: 'Badge',

  propTypes: {
    pullRight: _react2['default'].PropTypes.bool
  },

  hasContent: function hasContent() {
    return _utilsValidComponentChildren2['default'].hasValidComponent(this.props.children) || _react2['default'].Children.count(this.props.children) > 1 || typeof this.props.children === 'string' || typeof this.props.children === 'number';
  },

  render: function render() {
    var classes = {
      'pull-right': this.props.pullRight,
      'badge': this.hasContent()
    };
    return _react2['default'].createElement(
      'span',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  }
});

exports['default'] = Badge;
module.exports = exports['default'];
},{"./utils/ValidComponentChildren":75,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],7:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _styleMaps = require('./styleMaps');

var _styleMaps2 = _interopRequireDefault(_styleMaps);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var BootstrapMixin = {
  propTypes: {
    /**
     * bootstrap className
     * @private
     */
    bsClass: _utilsCustomPropTypes2['default'].keyOf(_styleMaps2['default'].CLASSES),
    /**
     * Style variants
     * @type {("default"|"primary"|"success"|"info"|"warning"|"danger"|"link")}
     */
    bsStyle: _utilsCustomPropTypes2['default'].keyOf(_styleMaps2['default'].STYLES),
    /**
     * Size variants
     * @type {("xsmall"|"small"|"medium"|"large")}
     */
    bsSize: _utilsCustomPropTypes2['default'].keyOf(_styleMaps2['default'].SIZES)
  },

  getBsClassSet: function getBsClassSet() {
    var classes = {};

    var bsClass = this.props.bsClass && _styleMaps2['default'].CLASSES[this.props.bsClass];
    if (bsClass) {
      classes[bsClass] = true;

      var prefix = bsClass + '-';

      var bsSize = this.props.bsSize && _styleMaps2['default'].SIZES[this.props.bsSize];
      if (bsSize) {
        classes[prefix + bsSize] = true;
      }

      var bsStyle = this.props.bsStyle && _styleMaps2['default'].STYLES[this.props.bsStyle];
      if (this.props.bsStyle) {
        classes[prefix + bsStyle] = true;
      }
    }

    return classes;
  },

  prefixClass: function prefixClass(subClass) {
    return _styleMaps2['default'].CLASSES[this.props.bsClass] + '-' + subClass;
  }
};

exports['default'] = BootstrapMixin;
module.exports = exports['default'];
},{"./styleMaps":71,"./utils/CustomPropTypes":72,"babel-runtime/helpers/interop-require-default":91}],8:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var _ButtonInput = require('./ButtonInput');

var _ButtonInput2 = _interopRequireDefault(_ButtonInput);

var Button = _react2['default'].createClass({
  displayName: 'Button',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    active: _react2['default'].PropTypes.bool,
    disabled: _react2['default'].PropTypes.bool,
    block: _react2['default'].PropTypes.bool,
    navItem: _react2['default'].PropTypes.bool,
    navDropdown: _react2['default'].PropTypes.bool,
    /**
     * You can use a custom element for this component
     */
    componentClass: _utilsCustomPropTypes2['default'].elementType,
    href: _react2['default'].PropTypes.string,
    target: _react2['default'].PropTypes.string,
    /**
     * Defines HTML button type Attribute
     * @type {("button"|"reset"|"submit")}
     */
    type: _react2['default'].PropTypes.oneOf(_ButtonInput2['default'].types)
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'button',
      bsStyle: 'default'
    };
  },

  render: function render() {
    var classes = this.props.navDropdown ? {} : this.getBsClassSet();
    var renderFuncName = undefined;

    classes = _extends({
      active: this.props.active,
      'btn-block': this.props.block
    }, classes);

    if (this.props.navItem) {
      return this.renderNavItem(classes);
    }

    renderFuncName = this.props.href || this.props.target || this.props.navDropdown ? 'renderAnchor' : 'renderButton';

    return this[renderFuncName](classes);
  },

  renderAnchor: function renderAnchor(classes) {

    var Component = this.props.componentClass || 'a';
    var href = this.props.href || '#';
    classes.disabled = this.props.disabled;

    return _react2['default'].createElement(
      Component,
      _extends({}, this.props, {
        href: href,
        className: _classnames2['default'](this.props.className, classes),
        role: "button" }),
      this.props.children
    );
  },

  renderButton: function renderButton(classes) {
    var Component = this.props.componentClass || 'button';

    return _react2['default'].createElement(
      Component,
      _extends({}, this.props, {
        type: this.props.type || 'button',
        className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  },

  renderNavItem: function renderNavItem(classes) {
    var liClasses = {
      active: this.props.active
    };

    return _react2['default'].createElement(
      'li',
      { className: _classnames2['default'](liClasses) },
      this.renderAnchor(classes)
    );
  }
});

exports['default'] = Button;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./ButtonInput":10,"./utils/CustomPropTypes":72,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],9:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var ButtonGroup = _react2['default'].createClass({
  displayName: 'ButtonGroup',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    vertical: _react2['default'].PropTypes.bool,
    justified: _react2['default'].PropTypes.bool,
    /**
     * Display block buttons, only useful when used with the "vertical" prop.
     * @type {bool}
     */
    block: _utilsCustomPropTypes2['default'].all([_react2['default'].PropTypes.bool, function (props, propName, componentName) {
      if (props.block && !props.vertical) {
        return new Error('The block property requires the vertical property to be set to have any effect');
      }
    }])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'button-group'
    };
  },

  render: function render() {
    var classes = this.getBsClassSet();
    classes['btn-group'] = !this.props.vertical;
    classes['btn-group-vertical'] = this.props.vertical;
    classes['btn-group-justified'] = this.props.justified;
    classes['btn-block'] = this.props.block;

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  }
});

exports['default'] = ButtonGroup;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./utils/CustomPropTypes":72,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],10:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _FormGroup = require('./FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _InputBase2 = require('./InputBase');

var _InputBase3 = _interopRequireDefault(_InputBase2);

var _utilsChildrenValueInputValidation = require('./utils/childrenValueInputValidation');

var _utilsChildrenValueInputValidation2 = _interopRequireDefault(_utilsChildrenValueInputValidation);

var ButtonInput = (function (_InputBase) {
  _inherits(ButtonInput, _InputBase);

  function ButtonInput() {
    _classCallCheck(this, ButtonInput);

    _InputBase.apply(this, arguments);
  }

  ButtonInput.prototype.renderFormGroup = function renderFormGroup(children) {
    var _props = this.props;
    var bsStyle = _props.bsStyle;
    var value = _props.value;

    var other = _objectWithoutProperties(_props, ['bsStyle', 'value']);

    return _react2['default'].createElement(
      _FormGroup2['default'],
      other,
      children
    );
  };

  ButtonInput.prototype.renderInput = function renderInput() {
    var _props2 = this.props;
    var children = _props2.children;
    var value = _props2.value;

    var other = _objectWithoutProperties(_props2, ['children', 'value']);

    var val = children ? children : value;
    return _react2['default'].createElement(_Button2['default'], _extends({}, other, { componentClass: "input", ref: "input", key: "input", value: val }));
  };

  return ButtonInput;
})(_InputBase3['default']);

ButtonInput.types = ['button', 'reset', 'submit'];

ButtonInput.defaultProps = {
  type: 'button'
};

ButtonInput.propTypes = {
  type: _react2['default'].PropTypes.oneOf(ButtonInput.types),
  bsStyle: function bsStyle(props) {
    //defer to Button propTypes of bsStyle
    return null;
  },
  children: _utilsChildrenValueInputValidation2['default'],
  value: _utilsChildrenValueInputValidation2['default']
};

exports['default'] = ButtonInput;
module.exports = exports['default'];
},{"./Button":8,"./FormGroup":25,"./InputBase":29,"./utils/childrenValueInputValidation":76,"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91,"babel-runtime/helpers/object-without-properties":93}],11:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var ButtonToolbar = _react2['default'].createClass({
  displayName: 'ButtonToolbar',

  mixins: [_BootstrapMixin2['default']],

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'button-toolbar'
    };
  },

  render: function render() {
    var classes = this.getBsClassSet();

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        role: "toolbar",
        className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  }
});

exports['default'] = ButtonToolbar;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],12:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _Glyphicon = require('./Glyphicon');

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var Carousel = _react2['default'].createClass({
  displayName: 'Carousel',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    slide: _react2['default'].PropTypes.bool,
    indicators: _react2['default'].PropTypes.bool,
    interval: _react2['default'].PropTypes.number,
    controls: _react2['default'].PropTypes.bool,
    pauseOnHover: _react2['default'].PropTypes.bool,
    wrap: _react2['default'].PropTypes.bool,
    onSelect: _react2['default'].PropTypes.func,
    onSlideEnd: _react2['default'].PropTypes.func,
    activeIndex: _react2['default'].PropTypes.number,
    defaultActiveIndex: _react2['default'].PropTypes.number,
    direction: _react2['default'].PropTypes.oneOf(['prev', 'next']),
    prevIcon: _react2['default'].PropTypes.node,
    nextIcon: _react2['default'].PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      slide: true,
      interval: 5000,
      pauseOnHover: true,
      wrap: true,
      indicators: true,
      controls: true,
      prevIcon: _react2['default'].createElement(_Glyphicon2['default'], { glyph: "chevron-left" }),
      nextIcon: _react2['default'].createElement(_Glyphicon2['default'], { glyph: "chevron-right" })
    };
  },

  getInitialState: function getInitialState() {
    return {
      activeIndex: this.props.defaultActiveIndex == null ? 0 : this.props.defaultActiveIndex,
      previousActiveIndex: null,
      direction: null
    };
  },

  getDirection: function getDirection(prevIndex, index) {
    if (prevIndex === index) {
      return null;
    }

    return prevIndex > index ? 'prev' : 'next';
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var activeIndex = this.getActiveIndex();

    if (nextProps.activeIndex != null && nextProps.activeIndex !== activeIndex) {
      clearTimeout(this.timeout);
      this.setState({
        previousActiveIndex: activeIndex,
        direction: nextProps.direction != null ? nextProps.direction : this.getDirection(activeIndex, nextProps.activeIndex)
      });
    }
  },

  componentDidMount: function componentDidMount() {
    this.waitForNext();
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this.timeout);
  },

  next: function next(e) {
    if (e) {
      e.preventDefault();
    }

    var index = this.getActiveIndex() + 1;
    var count = _utilsValidComponentChildren2['default'].numberOf(this.props.children);

    if (index > count - 1) {
      if (!this.props.wrap) {
        return;
      }
      index = 0;
    }

    this.handleSelect(index, 'next');
  },

  prev: function prev(e) {
    if (e) {
      e.preventDefault();
    }

    var index = this.getActiveIndex() - 1;

    if (index < 0) {
      if (!this.props.wrap) {
        return;
      }
      index = _utilsValidComponentChildren2['default'].numberOf(this.props.children) - 1;
    }

    this.handleSelect(index, 'prev');
  },

  pause: function pause() {
    this.isPaused = true;
    clearTimeout(this.timeout);
  },

  play: function play() {
    this.isPaused = false;
    this.waitForNext();
  },

  waitForNext: function waitForNext() {
    if (!this.isPaused && this.props.slide && this.props.interval && this.props.activeIndex == null) {
      this.timeout = setTimeout(this.next, this.props.interval);
    }
  },

  handleMouseOver: function handleMouseOver() {
    if (this.props.pauseOnHover) {
      this.pause();
    }
  },

  handleMouseOut: function handleMouseOut() {
    if (this.isPaused) {
      this.play();
    }
  },

  render: function render() {
    var classes = {
      carousel: true,
      slide: this.props.slide
    };

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes),
        onMouseOver: this.handleMouseOver,
        onMouseOut: this.handleMouseOut }),
      this.props.indicators ? this.renderIndicators() : null,
      _react2['default'].createElement(
        'div',
        { className: "carousel-inner", ref: "inner" },
        _utilsValidComponentChildren2['default'].map(this.props.children, this.renderItem)
      ),
      this.props.controls ? this.renderControls() : null
    );
  },

  renderPrev: function renderPrev() {
    return _react2['default'].createElement(
      'a',
      { className: "left carousel-control", href: "#prev", key: 0, onClick: this.prev },
      this.props.prevIcon
    );
  },

  renderNext: function renderNext() {
    return _react2['default'].createElement(
      'a',
      { className: "right carousel-control", href: "#next", key: 1, onClick: this.next },
      this.props.nextIcon
    );
  },

  renderControls: function renderControls() {
    if (!this.props.wrap) {
      var activeIndex = this.getActiveIndex();
      var count = _utilsValidComponentChildren2['default'].numberOf(this.props.children);

      return [activeIndex !== 0 ? this.renderPrev() : null, activeIndex !== count - 1 ? this.renderNext() : null];
    }

    return [this.renderPrev(), this.renderNext()];
  },

  renderIndicator: function renderIndicator(child, index) {
    var className = index === this.getActiveIndex() ? 'active' : null;

    return _react2['default'].createElement('li', {
      key: index,
      className: className,
      onClick: this.handleSelect.bind(this, index, null) });
  },

  renderIndicators: function renderIndicators() {
    var indicators = [];
    _utilsValidComponentChildren2['default'].forEach(this.props.children, function (child, index) {
      indicators.push(this.renderIndicator(child, index),

      // Force whitespace between indicator elements, bootstrap
      // requires this for correct spacing of elements.
      ' ');
    }, this);

    return _react2['default'].createElement(
      'ol',
      { className: "carousel-indicators" },
      indicators
    );
  },

  getActiveIndex: function getActiveIndex() {
    return this.props.activeIndex != null ? this.props.activeIndex : this.state.activeIndex;
  },

  handleItemAnimateOutEnd: function handleItemAnimateOutEnd() {
    this.setState({
      previousActiveIndex: null,
      direction: null
    }, function () {
      this.waitForNext();

      if (this.props.onSlideEnd) {
        this.props.onSlideEnd();
      }
    });
  },

  renderItem: function renderItem(child, index) {
    var activeIndex = this.getActiveIndex();
    var isActive = index === activeIndex;
    var isPreviousActive = this.state.previousActiveIndex != null && this.state.previousActiveIndex === index && this.props.slide;

    return _react.cloneElement(child, {
      active: isActive,
      ref: child.ref,
      key: child.key ? child.key : index,
      index: index,
      animateOut: isPreviousActive,
      animateIn: isActive && this.state.previousActiveIndex != null && this.props.slide,
      direction: this.state.direction,
      onAnimateOutEnd: isPreviousActive ? this.handleItemAnimateOutEnd : null
    });
  },

  handleSelect: function handleSelect(index, direction) {
    clearTimeout(this.timeout);

    var previousActiveIndex = this.getActiveIndex();
    direction = direction || this.getDirection(previousActiveIndex, index);

    if (this.props.onSelect) {
      this.props.onSelect(index, direction);
    }

    if (this.props.activeIndex == null && index !== previousActiveIndex) {
      if (this.state.previousActiveIndex != null) {
        // If currently animating don't activate the new index.
        // TODO: look into queuing this canceled call and
        // animating after the current animation has ended.
        return;
      }

      this.setState({
        activeIndex: index,
        previousActiveIndex: previousActiveIndex,
        direction: direction
      });
    }
  }
});

exports['default'] = Carousel;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./Glyphicon":26,"./utils/ValidComponentChildren":75,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],13:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsTransitionEvents = require('./utils/TransitionEvents');

var _utilsTransitionEvents2 = _interopRequireDefault(_utilsTransitionEvents);

var CarouselItem = _react2['default'].createClass({
  displayName: 'CarouselItem',

  propTypes: {
    direction: _react2['default'].PropTypes.oneOf(['prev', 'next']),
    onAnimateOutEnd: _react2['default'].PropTypes.func,
    active: _react2['default'].PropTypes.bool,
    animateIn: _react2['default'].PropTypes.bool,
    animateOut: _react2['default'].PropTypes.bool,
    caption: _react2['default'].PropTypes.node,
    index: _react2['default'].PropTypes.number
  },

  getInitialState: function getInitialState() {
    return {
      direction: null
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      animation: true
    };
  },

  handleAnimateOutEnd: function handleAnimateOutEnd() {
    if (this.props.onAnimateOutEnd && this.isMounted()) {
      this.props.onAnimateOutEnd(this.props.index);
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      this.setState({
        direction: null
      });
    }
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    if (!this.props.active && prevProps.active) {
      _utilsTransitionEvents2['default'].addEndEventListener(_react2['default'].findDOMNode(this), this.handleAnimateOutEnd);
    }

    if (this.props.active !== prevProps.active) {
      setTimeout(this.startAnimation, 20);
    }
  },

  startAnimation: function startAnimation() {
    if (!this.isMounted()) {
      return;
    }

    this.setState({
      direction: this.props.direction === 'prev' ? 'right' : 'left'
    });
  },

  render: function render() {
    var classes = {
      item: true,
      active: this.props.active && !this.props.animateIn || this.props.animateOut,
      next: this.props.active && this.props.animateIn && this.props.direction === 'next',
      prev: this.props.active && this.props.animateIn && this.props.direction === 'prev'
    };

    if (this.state.direction && (this.props.animateIn || this.props.animateOut)) {
      classes[this.state.direction] = true;
    }

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.children,
      this.props.caption ? this.renderCaption() : null
    );
  },

  renderCaption: function renderCaption() {
    return _react2['default'].createElement(
      'div',
      { className: "carousel-caption" },
      this.props.caption
    );
  }
});

exports['default'] = CarouselItem;
module.exports = exports['default'];
},{"./utils/TransitionEvents":74,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],14:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styleMaps = require('./styleMaps');

var _styleMaps2 = _interopRequireDefault(_styleMaps);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var Col = _react2['default'].createClass({
  displayName: 'Col',

  propTypes: {
    /**
     * The number of columns you wish to span
     *
     * for Extra small devices Phones (<768px)
     *
     * class-prefix `col-xs-`
     */
    xs: _react2['default'].PropTypes.number,
    /**
     * The number of columns you wish to span
     *
     * for Small devices Tablets (≥768px)
     *
     * class-prefix `col-sm-`
     */
    sm: _react2['default'].PropTypes.number,
    /**
     * The number of columns you wish to span
     *
     * for Medium devices Desktops (≥992px)
     *
     * class-prefix `col-md-`
     */
    md: _react2['default'].PropTypes.number,
    /**
     * The number of columns you wish to span
     *
     * for Large devices Desktops (≥1200px)
     *
     * class-prefix `col-lg-`
     */
    lg: _react2['default'].PropTypes.number,
    /**
     * Move columns to the right
     *
     * for Extra small devices Phones
     *
     * class-prefix `col-xs-offset-`
     */
    xsOffset: _react2['default'].PropTypes.number,
    /**
     * Move columns to the right
     *
     * for Small devices Tablets
     *
     * class-prefix `col-sm-offset-`
     */
    smOffset: _react2['default'].PropTypes.number,
    /**
     * Move columns to the right
     *
     * for Medium devices Desktops
     *
     * class-prefix `col-md-offset-`
     */
    mdOffset: _react2['default'].PropTypes.number,
    /**
     * Move columns to the right
     *
     * for Large devices Desktops
     *
     * class-prefix `col-lg-offset-`
     */
    lgOffset: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the right
     *
     * for Extra small devices Phones
     *
     * class-prefix `col-xs-push-`
     */
    xsPush: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the right
     *
     * for Small devices Tablets
     *
     * class-prefix `col-sm-push-`
     */
    smPush: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the right
     *
     * for Medium devices Desktops
     *
     * class-prefix `col-md-push-`
     */
    mdPush: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the right
     *
     * for Large devices Desktops
     *
     * class-prefix `col-lg-push-`
     */
    lgPush: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the left
     *
     * for Extra small devices Phones
     *
     * class-prefix `col-xs-pull-`
     */
    xsPull: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the left
     *
     * for Small devices Tablets
     *
     * class-prefix `col-sm-pull-`
     */
    smPull: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the left
     *
     * for Medium devices Desktops
     *
     * class-prefix `col-md-pull-`
     */
    mdPull: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the left
     *
     * for Large devices Desktops
     *
     * class-prefix `col-lg-pull-`
     */
    lgPull: _react2['default'].PropTypes.number,
    /**
     * You can use a custom element for this component
     */
    componentClass: _utilsCustomPropTypes2['default'].elementType
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render: function render() {
    var ComponentClass = this.props.componentClass;
    var classes = {};

    _Object$keys(_styleMaps2['default'].SIZES).forEach(function (key) {
      var size = _styleMaps2['default'].SIZES[key];
      var prop = size;
      var classPart = size + '-';

      if (this.props[prop]) {
        classes['col-' + classPart + this.props[prop]] = true;
      }

      prop = size + 'Offset';
      classPart = size + '-offset-';
      if (this.props[prop] >= 0) {
        classes['col-' + classPart + this.props[prop]] = true;
      }

      prop = size + 'Push';
      classPart = size + '-push-';
      if (this.props[prop] >= 0) {
        classes['col-' + classPart + this.props[prop]] = true;
      }

      prop = size + 'Pull';
      classPart = size + '-pull-';
      if (this.props[prop] >= 0) {
        classes['col-' + classPart + this.props[prop]] = true;
      }
    }, this);

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  }
});

exports['default'] = Col;
module.exports = exports['default'];
},{"./styleMaps":71,"./utils/CustomPropTypes":72,"babel-runtime/core-js/object/keys":86,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],15:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _Transition = require('./Transition');

var _Transition2 = _interopRequireDefault(_Transition);

var _utilsDomUtils = require('./utils/domUtils');

var _utilsDomUtils2 = _interopRequireDefault(_utilsDomUtils);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var capitalize = function capitalize(str) {
  return str[0].toUpperCase() + str.substr(1);
};

// reading a dimension prop will cause the browser to recalculate,
// which will let our animations work
var triggerBrowserReflow = function triggerBrowserReflow(node) {
  return node.offsetHeight;
};

var MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};

function getDimensionValue(dimension, elem) {
  var value = elem['offset' + capitalize(dimension)];
  var computedStyles = _utilsDomUtils2['default'].getComputedStyles(elem);
  var margins = MARGINS[dimension];

  return value + parseInt(computedStyles[margins[0]], 10) + parseInt(computedStyles[margins[1]], 10);
}

var Collapse = (function (_React$Component) {
  _inherits(Collapse, _React$Component);

  function Collapse(props, context) {
    _classCallCheck(this, Collapse);

    _React$Component.call(this, props, context);

    this.onEnterListener = this.handleEnter.bind(this);
    this.onEnteringListener = this.handleEntering.bind(this);
    this.onEnteredListener = this.handleEntered.bind(this);
    this.onExitListener = this.handleExit.bind(this);
    this.onExitingListener = this.handleExiting.bind(this);
  }

  Collapse.prototype.render = function render() {
    var enter = _utilsCreateChainedFunction2['default'](this.onEnterListener, this.props.onEnter);
    var entering = _utilsCreateChainedFunction2['default'](this.onEnteringListener, this.props.onEntering);
    var entered = _utilsCreateChainedFunction2['default'](this.onEnteredListener, this.props.onEntered);
    var exit = _utilsCreateChainedFunction2['default'](this.onExitListener, this.props.onExit);
    var exiting = _utilsCreateChainedFunction2['default'](this.onExitingListener, this.props.onExiting);

    return _react2['default'].createElement(
      _Transition2['default'],
      _extends({
        ref: 'transition'
      }, this.props, {
        'aria-expanded': this.props['in'],
        className: this._dimension() === 'width' ? 'width' : '',
        exitedClassName: 'collapse',
        exitingClassName: 'collapsing',
        enteredClassName: 'collapse in',
        enteringClassName: 'collapsing',
        onEnter: enter,
        onEntering: entering,
        onEntered: entered,
        onExit: exit,
        onExiting: exiting,
        onExited: this.props.onExited
      }),
      this.props.children
    );
  };

  /* -- Expanding -- */

  Collapse.prototype.handleEnter = function handleEnter(elem) {
    var dimension = this._dimension();
    elem.style[dimension] = '0';
  };

  Collapse.prototype.handleEntering = function handleEntering(elem) {
    var dimension = this._dimension();

    elem.style[dimension] = this._getScrollDimensionValue(elem, dimension);
  };

  Collapse.prototype.handleEntered = function handleEntered(elem) {
    var dimension = this._dimension();
    elem.style[dimension] = null;
  };

  /* -- Collapsing -- */

  Collapse.prototype.handleExit = function handleExit(elem) {
    var dimension = this._dimension();

    elem.style[dimension] = this.props.getDimensionValue(dimension, elem) + 'px';
  };

  Collapse.prototype.handleExiting = function handleExiting(elem) {
    var dimension = this._dimension();

    triggerBrowserReflow(elem);
    elem.style[dimension] = '0';
  };

  Collapse.prototype._dimension = function _dimension() {
    return typeof this.props.dimension === 'function' ? this.props.dimension() : this.props.dimension;
  };

  //for testing

  Collapse.prototype._getTransitionInstance = function _getTransitionInstance() {
    return this.refs.transition;
  };

  Collapse.prototype._getScrollDimensionValue = function _getScrollDimensionValue(elem, dimension) {
    return elem['scroll' + capitalize(dimension)] + 'px';
  };

  return Collapse;
})(_react2['default'].Component)

// Explicitly copied from Transition for doc generation.
// TODO: Remove duplication once #977 is resolved.

;

Collapse.propTypes = {
  /**
   * Show the component; triggers the expand or collapse animation
   */
  'in': _react2['default'].PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is collapsed
   */
  unmountOnExit: _react2['default'].PropTypes.bool,

  /**
   * Run the expand animation when the component mounts, if it is initially
   * shown
   */
  transitionAppear: _react2['default'].PropTypes.bool,

  /**
   * Duration of the collapse animation in milliseconds, to ensure that
   * finishing callbacks are fired even if the original browser transition end
   * events are canceled
   */
  duration: _react2['default'].PropTypes.number,

  /**
   * Callback fired before the component expands
   */
  onEnter: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component starts to expand
   */
  onEntering: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component has expanded
   */
  onEntered: _react2['default'].PropTypes.func,
  /**
   * Callback fired before the component collapses
   */
  onExit: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component starts to collapse
   */
  onExiting: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component has collapsed
   */
  onExited: _react2['default'].PropTypes.func,

  /**
   * The dimension used when collapsing, or a function that returns the
   * dimension
   *
   * _Note: Bootstrap only partially supports 'width'!
   * You will need to supply your own CSS animation for the `.width` CSS class._
   */
  dimension: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.oneOf(['height', 'width']), _react2['default'].PropTypes.func]),

  /**
   * Function that returns the height or width of the animating DOM node
   *
   * Allows for providing some custom logic for how much the Collapse component
   * should animate in its specified dimension. Called with the current
   * dimension prop value and the DOM node.
   */
  getDimensionValue: _react2['default'].PropTypes.func
};

Collapse.defaultProps = {
  'in': false,
  duration: 300,
  unmountOnExit: false,
  transitionAppear: false,

  dimension: 'height',
  getDimensionValue: getDimensionValue
};

exports['default'] = Collapse;
module.exports = exports['default'];
},{"./Transition":68,"./utils/createChainedFunction":77,"./utils/domUtils":81,"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91}],16:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _utilsTransitionEvents = require('./utils/TransitionEvents');

var _utilsTransitionEvents2 = _interopRequireDefault(_utilsTransitionEvents);

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

var warned = false;

var CollapsibleMixin = {

  propTypes: {
    defaultExpanded: _react2['default'].PropTypes.bool,
    expanded: _react2['default'].PropTypes.bool
  },

  getInitialState: function getInitialState() {
    var defaultExpanded = this.props.defaultExpanded != null ? this.props.defaultExpanded : this.props.expanded != null ? this.props.expanded : false;

    return {
      expanded: defaultExpanded,
      collapsing: false
    };
  },

  componentWillMount: function componentWillMount() {
    if (!warned) {
      _utilsDeprecationWarning2['default']('CollapsibleMixin', 'Collapse Component');
      warned = true;
    }
  },

  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    var willExpanded = nextProps.expanded != null ? nextProps.expanded : nextState.expanded;
    if (willExpanded === this.isExpanded()) {
      return;
    }

    // if the expanded state is being toggled, ensure node has a dimension value
    // this is needed for the animation to work and needs to be set before
    // the collapsing class is applied (after collapsing is applied the in class
    // is removed and the node's dimension will be wrong)

    var node = this.getCollapsibleDOMNode();
    var dimension = this.dimension();
    var value = '0';

    if (!willExpanded) {
      value = this.getCollapsibleDimensionValue();
    }

    node.style[dimension] = value + 'px';

    this._afterWillUpdate();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    // check if expanded is being toggled; if so, set collapsing
    this._checkToggleCollapsing(prevProps, prevState);

    // check if collapsing was turned on; if so, start animation
    this._checkStartAnimation();
  },

  // helps enable test stubs
  _afterWillUpdate: function _afterWillUpdate() {},

  _checkStartAnimation: function _checkStartAnimation() {
    if (!this.state.collapsing) {
      return;
    }

    var node = this.getCollapsibleDOMNode();
    var dimension = this.dimension();
    var value = this.getCollapsibleDimensionValue();

    // setting the dimension here starts the transition animation
    var result = undefined;
    if (this.isExpanded()) {
      result = value + 'px';
    } else {
      result = '0px';
    }
    node.style[dimension] = result;
  },

  _checkToggleCollapsing: function _checkToggleCollapsing(prevProps, prevState) {
    var wasExpanded = prevProps.expanded != null ? prevProps.expanded : prevState.expanded;
    var isExpanded = this.isExpanded();
    if (wasExpanded !== isExpanded) {
      if (wasExpanded) {
        this._handleCollapse();
      } else {
        this._handleExpand();
      }
    }
  },

  _handleExpand: function _handleExpand() {
    var _this = this;

    var node = this.getCollapsibleDOMNode();
    var dimension = this.dimension();

    var complete = function complete() {
      _this._removeEndEventListener(node, complete);
      // remove dimension value - this ensures the collapsible item can grow
      // in dimension after initial display (such as an image loading)
      node.style[dimension] = '';
      _this.setState({
        collapsing: false
      });
    };

    this._addEndEventListener(node, complete);

    this.setState({
      collapsing: true
    });
  },

  _handleCollapse: function _handleCollapse() {
    var _this2 = this;

    var node = this.getCollapsibleDOMNode();

    var complete = function complete() {
      _this2._removeEndEventListener(node, complete);
      _this2.setState({
        collapsing: false
      });
    };

    this._addEndEventListener(node, complete);

    this.setState({
      collapsing: true
    });
  },

  // helps enable test stubs
  _addEndEventListener: function _addEndEventListener(node, complete) {
    _utilsTransitionEvents2['default'].addEndEventListener(node, complete);
  },

  // helps enable test stubs
  _removeEndEventListener: function _removeEndEventListener(node, complete) {
    _utilsTransitionEvents2['default'].removeEndEventListener(node, complete);
  },

  dimension: function dimension() {
    return typeof this.getCollapsibleDimension === 'function' ? this.getCollapsibleDimension() : 'height';
  },

  isExpanded: function isExpanded() {
    return this.props.expanded != null ? this.props.expanded : this.state.expanded;
  },

  getCollapsibleClassSet: function getCollapsibleClassSet(className) {
    var classes = {};

    if (typeof className === 'string') {
      className.split(' ').forEach(function (subClasses) {
        if (subClasses) {
          classes[subClasses] = true;
        }
      });
    }

    classes.collapsing = this.state.collapsing;
    classes.collapse = !this.state.collapsing;
    classes['in'] = this.isExpanded() && !this.state.collapsing;

    return classes;
  }
};

exports['default'] = CollapsibleMixin;
module.exports = exports['default'];
},{"./utils/TransitionEvents":74,"./utils/deprecationWarning":80,"babel-runtime/helpers/interop-require-default":91}],17:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _Collapse = require('./Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var CollapsibleNav = _react2['default'].createClass({
  displayName: 'CollapsibleNav',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    onSelect: _react2['default'].PropTypes.func,
    activeHref: _react2['default'].PropTypes.string,
    activeKey: _react2['default'].PropTypes.any,
    collapsible: _react2['default'].PropTypes.bool,
    expanded: _react2['default'].PropTypes.bool,
    eventKey: _react2['default'].PropTypes.any
  },

  render: function render() {
    /*
     * this.props.collapsible is set in NavBar when an eventKey is supplied.
     */
    var classes = this.props.collapsible ? 'navbar-collapse' : null;
    var renderChildren = this.props.collapsible ? this.renderCollapsibleNavChildren : this.renderChildren;

    var nav = _react2['default'].createElement(
      'div',
      { eventKey: this.props.eventKey, className: _classnames2['default'](this.props.className, classes) },
      _utilsValidComponentChildren2['default'].map(this.props.children, renderChildren)
    );

    if (this.props.collapsible) {
      return _react2['default'].createElement(
        _Collapse2['default'],
        { 'in': this.props.expanded },
        nav
      );
    } else {
      return nav;
    }
  },

  getChildActiveProp: function getChildActiveProp(child) {
    if (child.props.active) {
      return true;
    }
    if (this.props.activeKey != null) {
      if (child.props.eventKey === this.props.activeKey) {
        return true;
      }
    }
    if (this.props.activeHref != null) {
      if (child.props.href === this.props.activeHref) {
        return true;
      }
    }

    return child.props.active;
  },

  renderChildren: function renderChildren(child, index) {
    var key = child.key ? child.key : index;
    return _react.cloneElement(child, {
      activeKey: this.props.activeKey,
      activeHref: this.props.activeHref,
      ref: 'nocollapse_' + key,
      key: key,
      navItem: true
    });
  },

  renderCollapsibleNavChildren: function renderCollapsibleNavChildren(child, index) {
    var key = child.key ? child.key : index;
    return _react.cloneElement(child, {
      active: this.getChildActiveProp(child),
      activeKey: this.props.activeKey,
      activeHref: this.props.activeHref,
      onSelect: _utilsCreateChainedFunction2['default'](child.props.onSelect, this.props.onSelect),
      ref: 'collapsible_' + key,
      key: key,
      navItem: true
    });
  }
});

exports['default'] = CollapsibleNav;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./Collapse":15,"./utils/ValidComponentChildren":75,"./utils/createChainedFunction":77,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],18:[function(require,module,exports){
/* eslint react/prop-types: [2, {ignore: "bsSize"}] */
/* BootstrapMixin contains `bsSize` type validation */

'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _DropdownStateMixin = require('./DropdownStateMixin');

var _DropdownStateMixin2 = _interopRequireDefault(_DropdownStateMixin);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _ButtonGroup = require('./ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

var _DropdownMenu = require('./DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var DropdownButton = _react2['default'].createClass({
  displayName: 'DropdownButton',

  mixins: [_BootstrapMixin2['default'], _DropdownStateMixin2['default']],

  propTypes: {
    pullRight: _react2['default'].PropTypes.bool,
    dropup: _react2['default'].PropTypes.bool,
    title: _react2['default'].PropTypes.node,
    href: _react2['default'].PropTypes.string,
    id: _react2['default'].PropTypes.string,
    onClick: _react2['default'].PropTypes.func,
    onSelect: _react2['default'].PropTypes.func,
    navItem: _react2['default'].PropTypes.bool,
    noCaret: _react2['default'].PropTypes.bool,
    buttonClassName: _react2['default'].PropTypes.string,
    className: _react2['default'].PropTypes.string,
    children: _react2['default'].PropTypes.node
  },

  render: function render() {
    var renderMethod = this.props.navItem ? 'renderNavItem' : 'renderButtonGroup';

    var caret = this.props.noCaret ? null : _react2['default'].createElement('span', { className: "caret" });

    return this[renderMethod]([_react2['default'].createElement(
      _Button2['default'],
      _extends({}, this.props, {
        ref: "dropdownButton",
        className: _classnames2['default']('dropdown-toggle', this.props.buttonClassName),
        onClick: _utilsCreateChainedFunction2['default'](this.props.onClick, this.handleDropdownClick),
        key: 0,
        navDropdown: this.props.navItem,
        navItem: null,
        title: null,
        pullRight: null,
        dropup: null }),
      this.props.title,
      ' ',
      caret
    ), _react2['default'].createElement(
      _DropdownMenu2['default'],
      {
        ref: "menu",
        'aria-labelledby': this.props.id,
        pullRight: this.props.pullRight,
        key: 1 },
      _utilsValidComponentChildren2['default'].map(this.props.children, this.renderMenuItem)
    )]);
  },

  renderButtonGroup: function renderButtonGroup(children) {
    var groupClasses = {
      'open': this.state.open,
      'dropup': this.props.dropup
    };

    return _react2['default'].createElement(
      _ButtonGroup2['default'],
      {
        bsSize: this.props.bsSize,
        className: _classnames2['default'](this.props.className, groupClasses) },
      children
    );
  },

  renderNavItem: function renderNavItem(children) {
    var classes = {
      'dropdown': true,
      'open': this.state.open,
      'dropup': this.props.dropup
    };

    return _react2['default'].createElement(
      'li',
      { className: _classnames2['default'](this.props.className, classes) },
      children
    );
  },

  renderMenuItem: function renderMenuItem(child, index) {
    // Only handle the option selection if an onSelect prop has been set on the
    // component or it's child, this allows a user not to pass an onSelect
    // handler and have the browser preform the default action.
    var handleOptionSelect = this.props.onSelect || child.props.onSelect ? this.handleOptionSelect : null;

    return _react.cloneElement(child, {
      // Capture onSelect events
      onSelect: _utilsCreateChainedFunction2['default'](child.props.onSelect, handleOptionSelect),
      key: child.key ? child.key : index
    });
  },

  handleDropdownClick: function handleDropdownClick(e) {
    e.preventDefault();

    this.setDropdownState(!this.state.open);
  },

  handleOptionSelect: function handleOptionSelect(key) {
    if (this.props.onSelect) {
      this.props.onSelect(key);
    }

    this.setDropdownState(false);
  }
});

exports['default'] = DropdownButton;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./Button":8,"./ButtonGroup":9,"./DropdownMenu":19,"./DropdownStateMixin":20,"./utils/ValidComponentChildren":75,"./utils/createChainedFunction":77,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],19:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var DropdownMenu = _react2['default'].createClass({
  displayName: 'DropdownMenu',

  propTypes: {
    pullRight: _react2['default'].PropTypes.bool,
    onSelect: _react2['default'].PropTypes.func
  },

  render: function render() {
    var classes = {
      'dropdown-menu': true,
      'dropdown-menu-right': this.props.pullRight
    };

    return _react2['default'].createElement(
      'ul',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes),
        role: "menu" }),
      _utilsValidComponentChildren2['default'].map(this.props.children, this.renderMenuItem)
    );
  },

  renderMenuItem: function renderMenuItem(child, index) {
    return _react.cloneElement(child, {
      // Capture onSelect events
      onSelect: _utilsCreateChainedFunction2['default'](child.props.onSelect, this.props.onSelect),

      // Force special props to be transferred
      key: child.key ? child.key : index
    });
  }
});

exports['default'] = DropdownMenu;
module.exports = exports['default'];
},{"./utils/ValidComponentChildren":75,"./utils/createChainedFunction":77,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],20:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _utilsDomUtils = require('./utils/domUtils');

var _utilsDomUtils2 = _interopRequireDefault(_utilsDomUtils);

var _utilsEventListener = require('./utils/EventListener');

/**
 * Checks whether a node is within
 * a root nodes tree
 *
 * @param {DOMElement} node
 * @param {DOMElement} root
 * @returns {boolean}
 */

var _utilsEventListener2 = _interopRequireDefault(_utilsEventListener);

function isNodeInRoot(node, root) {
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}

var DropdownStateMixin = {
  getInitialState: function getInitialState() {
    return {
      open: false
    };
  },

  setDropdownState: function setDropdownState(newState, onStateChangeComplete) {
    if (newState) {
      this.bindRootCloseHandlers();
    } else {
      this.unbindRootCloseHandlers();
    }

    this.setState({
      open: newState
    }, onStateChangeComplete);
  },

  handleDocumentKeyUp: function handleDocumentKeyUp(e) {
    if (e.keyCode === 27) {
      this.setDropdownState(false);
    }
  },

  handleDocumentClick: function handleDocumentClick(e) {
    // If the click originated from within this component
    // don't do anything.
    // e.srcElement is required for IE8 as e.target is undefined
    var target = e.target || e.srcElement;
    if (isNodeInRoot(target, _react2['default'].findDOMNode(this))) {
      return;
    }

    this.setDropdownState(false);
  },

  bindRootCloseHandlers: function bindRootCloseHandlers() {
    var doc = _utilsDomUtils2['default'].ownerDocument(this);

    this._onDocumentClickListener = _utilsEventListener2['default'].listen(doc, 'click', this.handleDocumentClick);
    this._onDocumentKeyupListener = _utilsEventListener2['default'].listen(doc, 'keyup', this.handleDocumentKeyUp);
  },

  unbindRootCloseHandlers: function unbindRootCloseHandlers() {
    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.remove();
    }

    if (this._onDocumentKeyupListener) {
      this._onDocumentKeyupListener.remove();
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.unbindRootCloseHandlers();
  }
};

exports['default'] = DropdownStateMixin;
module.exports = exports['default'];
},{"./utils/EventListener":73,"./utils/domUtils":81,"babel-runtime/helpers/interop-require-default":91}],21:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _Transition = require('./Transition');

var _Transition2 = _interopRequireDefault(_Transition);

var Fade = (function (_React$Component) {
  _inherits(Fade, _React$Component);

  function Fade() {
    _classCallCheck(this, Fade);

    _React$Component.apply(this, arguments);
  }

  Fade.prototype.render = function render() {
    return _react2['default'].createElement(
      _Transition2['default'],
      _extends({}, this.props, {
        className: 'fade',
        enteredClassName: 'in',
        enteringClassName: 'in'
      }),
      this.props.children
    );
  };

  return Fade;
})(_react2['default'].Component)

// Explicitly copied from Transition for doc generation.
// TODO: Remove duplication once #977 is resolved.

;

Fade.propTypes = {
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  'in': _react2['default'].PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: _react2['default'].PropTypes.bool,

  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  transitionAppear: _react2['default'].PropTypes.bool,

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  duration: _react2['default'].PropTypes.number,

  /**
   * Callback fired before the component fades in
   */
  onEnter: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the has component faded in
   */
  onEntered: _react2['default'].PropTypes.func,
  /**
   * Callback fired before the component fades out
   */
  onExit: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component has faded out
   */
  onExited: _react2['default'].PropTypes.func
};

Fade.defaultProps = {
  'in': false,
  duration: 300,
  unmountOnExit: false,
  transitionAppear: false
};

exports['default'] = Fade;
module.exports = exports['default'];
},{"./Transition":68,"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91}],22:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _utilsDomUtils = require('./utils/domUtils');

var _utilsDomUtils2 = _interopRequireDefault(_utilsDomUtils);

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

// TODO: listen for onTransitionEnd to remove el

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

function getElementsAndSelf(root, classes) {
  var els = root.querySelectorAll('.' + classes.join('.'));

  els = [].map.call(els, function (e) {
    return e;
  });

  for (var i = 0; i < classes.length; i++) {
    if (!root.className.match(new RegExp('\\b' + classes[i] + '\\b'))) {
      return els;
    }
  }
  els.unshift(root);
  return els;
}

var warned = false;

exports['default'] = {
  componentWillMount: function componentWillMount() {
    if (!warned) {
      _utilsDeprecationWarning2['default']('FadeMixin', 'Fade Component');
      warned = true;
    }
  },

  _fadeIn: function _fadeIn() {
    var els = undefined;

    if (this.isMounted()) {
      els = getElementsAndSelf(_react2['default'].findDOMNode(this), ['fade']);

      if (els.length) {
        els.forEach(function (el) {
          el.className += ' in';
        });
      }
    }
  },

  _fadeOut: function _fadeOut() {
    var els = getElementsAndSelf(this._fadeOutEl, ['fade', 'in']);

    if (els.length) {
      els.forEach(function (el) {
        el.className = el.className.replace(/\bin\b/, '');
      });
    }

    setTimeout(this._handleFadeOutEnd, 300);
  },

  _handleFadeOutEnd: function _handleFadeOutEnd() {
    if (this._fadeOutEl && this._fadeOutEl.parentNode) {
      this._fadeOutEl.parentNode.removeChild(this._fadeOutEl);
    }
  },

  componentDidMount: function componentDidMount() {
    if (document.querySelectorAll) {
      // Firefox needs delay for transition to be triggered
      setTimeout(this._fadeIn, 20);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    var els = getElementsAndSelf(_react2['default'].findDOMNode(this), ['fade']);
    var container = this.props.container && _react2['default'].findDOMNode(this.props.container) || _utilsDomUtils2['default'].ownerDocument(this).body;

    if (els.length) {
      this._fadeOutEl = document.createElement('div');
      container.appendChild(this._fadeOutEl);
      this._fadeOutEl.appendChild(_react2['default'].findDOMNode(this).cloneNode(true));
      // Firefox needs delay for transition to be triggered
      setTimeout(this._fadeOut, 20);
    }
  }
};
module.exports = exports['default'];
},{"./utils/deprecationWarning":80,"./utils/domUtils":81,"babel-runtime/helpers/interop-require-default":91}],23:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _InputBase2 = require('../InputBase');

var _InputBase3 = _interopRequireDefault(_InputBase2);

var _utilsChildrenValueInputValidation = require('../utils/childrenValueInputValidation');

var _utilsChildrenValueInputValidation2 = _interopRequireDefault(_utilsChildrenValueInputValidation);

var Static = (function (_InputBase) {
  _inherits(Static, _InputBase);

  function Static() {
    _classCallCheck(this, Static);

    _InputBase.apply(this, arguments);
  }

  Static.prototype.getValue = function getValue() {
    var _props = this.props;
    var children = _props.children;
    var value = _props.value;

    return children ? children : value;
  };

  Static.prototype.renderInput = function renderInput() {
    return _react2['default'].createElement(
      'p',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'form-control-static'), ref: "input", key: "input" }),
      this.getValue()
    );
  };

  return Static;
})(_InputBase3['default']);

Static.propTypes = {
  value: _utilsChildrenValueInputValidation2['default'],
  children: _utilsChildrenValueInputValidation2['default']
};

exports['default'] = Static;
module.exports = exports['default'];
},{"../InputBase":29,"../utils/childrenValueInputValidation":76,"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],24:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _Static2 = require('./Static');

var _Static3 = _interopRequireDefault(_Static2);

exports.Static = _Static3['default'];
},{"./Static":23,"babel-runtime/helpers/interop-require-default":91}],25:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var FormGroup = (function (_React$Component) {
  _inherits(FormGroup, _React$Component);

  function FormGroup() {
    _classCallCheck(this, FormGroup);

    _React$Component.apply(this, arguments);
  }

  FormGroup.prototype.render = function render() {
    var classes = {
      'form-group': !this.props.standalone,
      'form-group-lg': !this.props.standalone && this.props.bsSize === 'large',
      'form-group-sm': !this.props.standalone && this.props.bsSize === 'small',
      'has-feedback': this.props.hasFeedback,
      'has-success': this.props.bsStyle === 'success',
      'has-warning': this.props.bsStyle === 'warning',
      'has-error': this.props.bsStyle === 'error'
    };

    return _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](classes, this.props.groupClassName) },
      this.props.children
    );
  };

  return FormGroup;
})(_react2['default'].Component);

FormGroup.defaultProps = {
  standalone: false
};

FormGroup.propTypes = {
  standalone: _react2['default'].PropTypes.bool,
  hasFeedback: _react2['default'].PropTypes.bool,
  bsSize: function bsSize(props) {
    if (props.standalone && props.bsSize !== undefined) {
      return new Error('bsSize will not be used when `standalone` is set.');
    }

    return _react2['default'].PropTypes.oneOf(['small', 'medium', 'large']).apply(null, arguments);
  },
  bsStyle: _react2['default'].PropTypes.oneOf(['success', 'warning', 'error']),
  groupClassName: _react2['default'].PropTypes.string
};

exports['default'] = FormGroup;
module.exports = exports['default'];
},{"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],26:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _styleMaps = require('./styleMaps');

var _styleMaps2 = _interopRequireDefault(_styleMaps);

var Glyphicon = _react2['default'].createClass({
  displayName: 'Glyphicon',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    glyph: _react2['default'].PropTypes.oneOf(_styleMaps2['default'].GLYPHS).isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'glyphicon'
    };
  },

  render: function render() {
    var classes = this.getBsClassSet();

    classes['glyphicon-' + this.props.glyph] = true;

    return _react2['default'].createElement(
      'span',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  }
});

exports['default'] = Glyphicon;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./styleMaps":71,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],27:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var Grid = _react2['default'].createClass({
  displayName: 'Grid',

  propTypes: {
    /**
     * Turn any fixed-width grid layout into a full-width layout by this property.
     *
     * Adds `container-fluid` class.
     */
    fluid: _react2['default'].PropTypes.bool,
    /**
     * You can use a custom element for this component
     */
    componentClass: _utilsCustomPropTypes2['default'].elementType
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render: function render() {
    var ComponentClass = this.props.componentClass;
    var className = this.props.fluid ? 'container-fluid' : 'container';

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, className) }),
      this.props.children
    );
  }
});

exports['default'] = Grid;
module.exports = exports['default'];
},{"./utils/CustomPropTypes":72,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],28:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _InputBase2 = require('./InputBase');

var _InputBase3 = _interopRequireDefault(_InputBase2);

var _FormControls = require('./FormControls');

var FormControls = _interopRequireWildcard(_FormControls);

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

var Input = (function (_InputBase) {
  _inherits(Input, _InputBase);

  function Input() {
    _classCallCheck(this, Input);

    _InputBase.apply(this, arguments);
  }

  Input.prototype.render = function render() {
    if (this.props.type === 'static') {
      _utilsDeprecationWarning2['default']('Input type=static', 'StaticText');
      return _react2['default'].createElement(FormControls.Static, this.props);
    }

    return _InputBase.prototype.render.call(this);
  };

  return Input;
})(_InputBase3['default']);

Input.propTypes = {
  type: _react2['default'].PropTypes.string
};

exports['default'] = Input;
module.exports = exports['default'];
},{"./FormControls":24,"./InputBase":29,"./utils/deprecationWarning":80,"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91,"babel-runtime/helpers/interop-require-wildcard":92}],29:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FormGroup = require('./FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var InputBase = (function (_React$Component) {
  _inherits(InputBase, _React$Component);

  function InputBase() {
    _classCallCheck(this, InputBase);

    _React$Component.apply(this, arguments);
  }

  InputBase.prototype.getInputDOMNode = function getInputDOMNode() {
    return _react2['default'].findDOMNode(this.refs.input);
  };

  InputBase.prototype.getValue = function getValue() {
    if (this.props.type === 'static') {
      return this.props.value;
    } else if (this.props.type) {
      if (this.props.type === 'select' && this.props.multiple) {
        return this.getSelectedOptions();
      } else {
        return this.getInputDOMNode().value;
      }
    } else {
      throw 'Cannot use getValue without specifying input type.';
    }
  };

  InputBase.prototype.getChecked = function getChecked() {
    return this.getInputDOMNode().checked;
  };

  InputBase.prototype.getSelectedOptions = function getSelectedOptions() {
    var values = [];

    Array.prototype.forEach.call(this.getInputDOMNode().getElementsByTagName('option'), function (option) {
      if (option.selected) {
        var value = option.getAttribute('value') || option.innerHtml;
        values.push(value);
      }
    });

    return values;
  };

  InputBase.prototype.isCheckboxOrRadio = function isCheckboxOrRadio() {
    return this.props.type === 'checkbox' || this.props.type === 'radio';
  };

  InputBase.prototype.isFile = function isFile() {
    return this.props.type === 'file';
  };

  InputBase.prototype.renderInputGroup = function renderInputGroup(children) {
    var addonBefore = this.props.addonBefore ? _react2['default'].createElement(
      'span',
      { className: "input-group-addon", key: "addonBefore" },
      this.props.addonBefore
    ) : null;

    var addonAfter = this.props.addonAfter ? _react2['default'].createElement(
      'span',
      { className: "input-group-addon", key: "addonAfter" },
      this.props.addonAfter
    ) : null;

    var buttonBefore = this.props.buttonBefore ? _react2['default'].createElement(
      'span',
      { className: "input-group-btn" },
      this.props.buttonBefore
    ) : null;

    var buttonAfter = this.props.buttonAfter ? _react2['default'].createElement(
      'span',
      { className: "input-group-btn" },
      this.props.buttonAfter
    ) : null;

    var inputGroupClassName = undefined;
    switch (this.props.bsSize) {
      case 'small':
        inputGroupClassName = 'input-group-sm';break;
      case 'large':
        inputGroupClassName = 'input-group-lg';break;
    }

    return addonBefore || addonAfter || buttonBefore || buttonAfter ? _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](inputGroupClassName, 'input-group'), key: "input-group" },
      addonBefore,
      buttonBefore,
      children,
      addonAfter,
      buttonAfter
    ) : children;
  };

  InputBase.prototype.renderIcon = function renderIcon() {
    var classes = {
      'glyphicon': true,
      'form-control-feedback': true,
      'glyphicon-ok': this.props.bsStyle === 'success',
      'glyphicon-warning-sign': this.props.bsStyle === 'warning',
      'glyphicon-remove': this.props.bsStyle === 'error'
    };

    return this.props.hasFeedback ? _react2['default'].createElement('span', { className: _classnames2['default'](classes), key: "icon" }) : null;
  };

  InputBase.prototype.renderHelp = function renderHelp() {
    return this.props.help ? _react2['default'].createElement(
      'span',
      { className: "help-block", key: "help" },
      this.props.help
    ) : null;
  };

  InputBase.prototype.renderCheckboxAndRadioWrapper = function renderCheckboxAndRadioWrapper(children) {
    var classes = {
      'checkbox': this.props.type === 'checkbox',
      'radio': this.props.type === 'radio'
    };

    return _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](classes), key: "checkboxRadioWrapper" },
      children
    );
  };

  InputBase.prototype.renderWrapper = function renderWrapper(children) {
    return this.props.wrapperClassName ? _react2['default'].createElement(
      'div',
      { className: this.props.wrapperClassName, key: "wrapper" },
      children
    ) : children;
  };

  InputBase.prototype.renderLabel = function renderLabel(children) {
    var classes = {
      'control-label': !this.isCheckboxOrRadio()
    };
    classes[this.props.labelClassName] = this.props.labelClassName;

    return this.props.label ? _react2['default'].createElement(
      'label',
      { htmlFor: this.props.id, className: _classnames2['default'](classes), key: "label" },
      children,
      this.props.label
    ) : children;
  };

  InputBase.prototype.renderInput = function renderInput() {
    if (!this.props.type) {
      return this.props.children;
    }

    switch (this.props.type) {
      case 'select':
        return _react2['default'].createElement(
          'select',
          _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'form-control'), ref: "input", key: "input" }),
          this.props.children
        );
      case 'textarea':
        return _react2['default'].createElement('textarea', _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'form-control'), ref: "input", key: "input" }));
      case 'static':
        return _react2['default'].createElement(
          'p',
          _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'form-control-static'), ref: "input", key: "input" }),
          this.props.value
        );
    }

    var className = this.isCheckboxOrRadio() || this.isFile() ? '' : 'form-control';
    return _react2['default'].createElement('input', _extends({}, this.props, { className: _classnames2['default'](this.props.className, className), ref: "input", key: "input" }));
  };

  InputBase.prototype.renderFormGroup = function renderFormGroup(children) {
    return _react2['default'].createElement(
      _FormGroup2['default'],
      this.props,
      children
    );
  };

  InputBase.prototype.renderChildren = function renderChildren() {
    return !this.isCheckboxOrRadio() ? [this.renderLabel(), this.renderWrapper([this.renderInputGroup(this.renderInput()), this.renderIcon(), this.renderHelp()])] : this.renderWrapper([this.renderCheckboxAndRadioWrapper(this.renderLabel(this.renderInput())), this.renderHelp()]);
  };

  InputBase.prototype.render = function render() {
    var children = this.renderChildren();
    return this.renderFormGroup(children);
  };

  return InputBase;
})(_react2['default'].Component);

InputBase.propTypes = {
  type: _react2['default'].PropTypes.string,
  label: _react2['default'].PropTypes.node,
  help: _react2['default'].PropTypes.node,
  addonBefore: _react2['default'].PropTypes.node,
  addonAfter: _react2['default'].PropTypes.node,
  buttonBefore: _react2['default'].PropTypes.node,
  buttonAfter: _react2['default'].PropTypes.node,
  bsSize: _react2['default'].PropTypes.oneOf(['small', 'medium', 'large']),
  bsStyle: _react2['default'].PropTypes.oneOf(['success', 'warning', 'error']),
  hasFeedback: _react2['default'].PropTypes.bool,
  id: _react2['default'].PropTypes.string,
  groupClassName: _react2['default'].PropTypes.string,
  wrapperClassName: _react2['default'].PropTypes.string,
  labelClassName: _react2['default'].PropTypes.string,
  multiple: _react2['default'].PropTypes.bool,
  disabled: _react2['default'].PropTypes.bool,
  value: _react2['default'].PropTypes.any
};

exports['default'] = InputBase;
module.exports = exports['default'];
},{"./FormGroup":25,"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],30:[function(require,module,exports){
// https://www.npmjs.org/package/react-interpolate-component
// TODO: Drop this in favor of es6 string interpolation

'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var REGEXP = /\%\((.+?)\)s/;

var Interpolate = _react2['default'].createClass({
  displayName: 'Interpolate',

  propTypes: {
    component: _react2['default'].PropTypes.node,
    format: _react2['default'].PropTypes.string,
    unsafe: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return { component: 'span' };
  },

  render: function render() {
    var format = _utilsValidComponentChildren2['default'].hasValidComponent(this.props.children) || typeof this.props.children === 'string' ? this.props.children : this.props.format;
    var parent = this.props.component;
    var unsafe = this.props.unsafe === true;
    var props = _extends({}, this.props);

    delete props.children;
    delete props.format;
    delete props.component;
    delete props.unsafe;

    if (unsafe) {
      var content = format.split(REGEXP).reduce(function (memo, match, index) {
        var html = undefined;

        if (index % 2 === 0) {
          html = match;
        } else {
          html = props[match];
          delete props[match];
        }

        if (_react2['default'].isValidElement(html)) {
          throw new Error('cannot interpolate a React component into unsafe text');
        }

        memo += html;

        return memo;
      }, '');

      props.dangerouslySetInnerHTML = { __html: content };

      return _react2['default'].createElement(parent, props);
    } else {
      var kids = format.split(REGEXP).reduce(function (memo, match, index) {
        var child = undefined;

        if (index % 2 === 0) {
          if (match.length === 0) {
            return memo;
          }

          child = match;
        } else {
          child = props[match];
          delete props[match];
        }

        memo.push(child);

        return memo;
      }, []);

      return _react2['default'].createElement(parent, props, kids);
    }
  }
});

exports['default'] = Interpolate;
module.exports = exports['default'];
},{"./utils/ValidComponentChildren":75,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91}],31:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var Jumbotron = _react2['default'].createClass({
  displayName: 'Jumbotron',

  propTypes: {
    /**
     * You can use a custom element for this component
     */
    componentClass: _utilsCustomPropTypes2['default'].elementType
  },

  getDefaultProps: function getDefaultProps() {
    return { componentClass: 'div' };
  },

  render: function render() {
    var ComponentClass = this.props.componentClass;

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'jumbotron') }),
      this.props.children
    );
  }
});

exports['default'] = Jumbotron;
module.exports = exports['default'];
},{"./utils/CustomPropTypes":72,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],32:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var Label = _react2['default'].createClass({
  displayName: 'Label',

  mixins: [_BootstrapMixin2['default']],

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'label',
      bsStyle: 'default'
    };
  },

  render: function render() {
    var classes = this.getBsClassSet();

    return _react2['default'].createElement(
      'span',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  }
});

exports['default'] = Label;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],33:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var ListGroup = (function (_React$Component) {
  _inherits(ListGroup, _React$Component);

  function ListGroup() {
    _classCallCheck(this, ListGroup);

    _React$Component.apply(this, arguments);
  }

  ListGroup.prototype.render = function render() {
    var _this = this;

    var items = _utilsValidComponentChildren2['default'].map(this.props.children, function (item, index) {
      return _react.cloneElement(item, { key: item.key ? item.key : index });
    });

    var childrenAnchors = false;

    if (!this.props.children) {
      return this.renderDiv(items);
    } else {
      _react2['default'].Children.forEach(this.props.children, function (child) {
        if (_this.isAnchor(child.props)) {
          childrenAnchors = true;
        }
      });
    }

    if (childrenAnchors) {
      return this.renderDiv(items);
    } else {
      return this.renderUL(items);
    }
  };

  ListGroup.prototype.isAnchor = function isAnchor(props) {
    return props.href || props.onClick;
  };

  ListGroup.prototype.renderUL = function renderUL(items) {
    var listItems = _utilsValidComponentChildren2['default'].map(items, function (item, index) {
      return _react.cloneElement(item, { listItem: true });
    });

    return _react2['default'].createElement(
      'ul',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, 'list-group') }),
      listItems
    );
  };

  ListGroup.prototype.renderDiv = function renderDiv(items) {
    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, 'list-group') }),
      items
    );
  };

  return ListGroup;
})(_react2['default'].Component);

ListGroup.propTypes = {
  className: _react2['default'].PropTypes.string,
  id: _react2['default'].PropTypes.string
};

exports['default'] = ListGroup;
module.exports = exports['default'];
},{"./utils/ValidComponentChildren":75,"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],34:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var ListGroupItem = _react2['default'].createClass({
  displayName: 'ListGroupItem',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    bsStyle: _react2['default'].PropTypes.oneOf(['danger', 'info', 'success', 'warning']),
    className: _react2['default'].PropTypes.string,
    active: _react2['default'].PropTypes.any,
    disabled: _react2['default'].PropTypes.any,
    header: _react2['default'].PropTypes.node,
    listItem: _react2['default'].PropTypes.bool,
    onClick: _react2['default'].PropTypes.func,
    eventKey: _react2['default'].PropTypes.any,
    href: _react2['default'].PropTypes.string,
    target: _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'list-group-item'
    };
  },

  render: function render() {
    var classes = this.getBsClassSet();

    classes.active = this.props.active;
    classes.disabled = this.props.disabled;

    if (this.props.href || this.props.onClick) {
      return this.renderAnchor(classes);
    } else if (this.props.listItem) {
      return this.renderLi(classes);
    } else {
      return this.renderSpan(classes);
    }
  },

  renderLi: function renderLi(classes) {
    return _react2['default'].createElement(
      'li',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.header ? this.renderStructuredContent() : this.props.children
    );
  },

  renderAnchor: function renderAnchor(classes) {
    return _react2['default'].createElement(
      _SafeAnchor2['default'],
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes)
      }),
      this.props.header ? this.renderStructuredContent() : this.props.children
    );
  },

  renderSpan: function renderSpan(classes) {
    return _react2['default'].createElement(
      'span',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.header ? this.renderStructuredContent() : this.props.children
    );
  },

  renderStructuredContent: function renderStructuredContent() {
    var header = undefined;
    if (_react2['default'].isValidElement(this.props.header)) {
      header = _react.cloneElement(this.props.header, {
        key: 'header',
        className: _classnames2['default'](this.props.header.props.className, 'list-group-item-heading')
      });
    } else {
      header = _react2['default'].createElement(
        'h4',
        { key: 'header', className: "list-group-item-heading" },
        this.props.header
      );
    }

    var content = _react2['default'].createElement(
      'p',
      { key: 'content', className: "list-group-item-text" },
      this.props.children
    );

    return [header, content];
  }
});

exports['default'] = ListGroupItem;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./SafeAnchor":60,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],35:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var MenuItem = _react2['default'].createClass({
  displayName: 'MenuItem',

  propTypes: {
    header: _react2['default'].PropTypes.bool,
    divider: _react2['default'].PropTypes.bool,
    href: _react2['default'].PropTypes.string,
    title: _react2['default'].PropTypes.string,
    target: _react2['default'].PropTypes.string,
    onSelect: _react2['default'].PropTypes.func,
    eventKey: _react2['default'].PropTypes.any,
    active: _react2['default'].PropTypes.bool,
    disabled: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      active: false
    };
  },

  handleClick: function handleClick(e) {
    if (this.props.disabled) {
      e.preventDefault();
      return;
    }
    if (this.props.onSelect) {
      e.preventDefault();
      this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
    }
  },

  renderAnchor: function renderAnchor() {
    return _react2['default'].createElement(
      _SafeAnchor2['default'],
      { onClick: this.handleClick, href: this.props.href, target: this.props.target, title: this.props.title, tabIndex: "-1" },
      this.props.children
    );
  },

  render: function render() {
    var classes = {
      'dropdown-header': this.props.header,
      'divider': this.props.divider,
      'active': this.props.active,
      'disabled': this.props.disabled
    };

    var children = null;
    if (this.props.header) {
      children = this.props.children;
    } else if (!this.props.divider) {
      children = this.renderAnchor();
    }

    return _react2['default'].createElement(
      'li',
      _extends({}, this.props, { role: "presentation", title: null, href: null,
        className: _classnames2['default'](this.props.className, classes) }),
      children
    );
  }
});

exports['default'] = MenuItem;
module.exports = exports['default'];
},{"./SafeAnchor":60,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],36:[function(require,module,exports){
/*eslint-disable react/prop-types */
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsDomUtils = require('./utils/domUtils');

var _utilsDomUtils2 = _interopRequireDefault(_utilsDomUtils);

var _utilsEventListener = require('./utils/EventListener');

var _utilsEventListener2 = _interopRequireDefault(_utilsEventListener);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _Fade = require('./Fade');

var _Fade2 = _interopRequireDefault(_Fade);

var _ModalDialog = require('./ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _ModalBody = require('./ModalBody');

var _ModalBody2 = _interopRequireDefault(_ModalBody);

var _ModalHeader = require('./ModalHeader');

var _ModalHeader2 = _interopRequireDefault(_ModalHeader);

var _ModalTitle = require('./ModalTitle');

var _ModalTitle2 = _interopRequireDefault(_ModalTitle);

var _ModalFooter = require('./ModalFooter');

/**
 * Gets the correct clientHeight of the modal container
 * when the body/window/document you need to use the docElement clientHeight
 * @param  {HTMLElement} container
 * @param  {ReactElement|HTMLElement} context
 * @return {Number}
 */

var _ModalFooter2 = _interopRequireDefault(_ModalFooter);

function containerClientHeight(container, context) {
  var doc = _utilsDomUtils2['default'].ownerDocument(context);

  return container === doc.body || container === doc.documentElement ? doc.documentElement.clientHeight : container.clientHeight;
}

function getContainer(context) {
  return context.props.container && _react2['default'].findDOMNode(context.props.container) || _utilsDomUtils2['default'].ownerDocument(context).body;
}

var currentFocusListener = undefined;

/**
 * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
 * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
 *
 * We only allow one Listener at a time to avoid stack overflows
 *
 * @param  {ReactElement|HTMLElement} context
 * @param  {Function} handler
 */
function onFocus(context, handler) {
  var doc = _utilsDomUtils2['default'].ownerDocument(context);
  var useFocusin = !doc.addEventListener;
  var remove = undefined;

  if (currentFocusListener) {
    currentFocusListener.remove();
  }

  if (useFocusin) {
    document.attachEvent('onfocusin', handler);
    remove = function () {
      return document.detachEvent('onfocusin', handler);
    };
  } else {
    document.addEventListener('focus', handler, true);
    remove = function () {
      return document.removeEventListener('focus', handler, true);
    };
  }

  currentFocusListener = { remove: remove };

  return currentFocusListener;
}

var scrollbarSize = undefined;

function getScrollbarSize() {
  if (scrollbarSize !== undefined) {
    return scrollbarSize;
  }

  var scrollDiv = document.createElement('div');

  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';

  document.body.appendChild(scrollDiv);
  scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  scrollDiv = null;
  return scrollbarSize;
}

var Modal = _react2['default'].createClass({
  displayName: 'Modal',

  propTypes: _extends({}, _Portal2['default'].propTypes, _ModalDialog2['default'].propTypes, {

    /**
     * Include a backdrop component. Specify 'static' for a backdrop that doesn't trigger an "onHide" when clicked.
     */
    backdrop: _react2['default'].PropTypes.oneOf(['static', true, false]),
    /**
     * Close the modal when escape key is pressed
     */
    keyboard: _react2['default'].PropTypes.bool,

    /**
     * Open and close the Modal with a slide and fade animation.
     */
    animation: _react2['default'].PropTypes.bool,

    /**
     * When `true` The modal will automatically shift focus to itself when it opens, and replace it to the last focused element when it closes.
     * Generally this should never be set to false as it makes the Modal less accessible to assistive technologies, like screen-readers.
     */
    autoFocus: _react2['default'].PropTypes.bool,

    /**
     * When `true` The modal will prevent focus from leaving the Modal while open.
     * Consider leaving the default value here, as it is necessary to make the Modal work well with assistive technologies,
     * such as screen readers.
     */
    enforceFocus: _react2['default'].PropTypes.bool
  }),

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'modal',
      show: false,
      animation: true,
      backdrop: true,
      keyboard: true,
      autoFocus: true,
      enforceFocus: true
    };
  },

  getInitialState: function getInitialState() {
    return { exited: !this.props.show };
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var animation = _props.animation;
    var backdrop = _props.backdrop;

    var props = _objectWithoutProperties(_props, ['children', 'animation', 'backdrop']);

    var onExit = props.onExit;
    var onExiting = props.onExiting;
    var onEnter = props.onEnter;
    var onEntering = props.onEntering;
    var onEntered = props.onEntered;

    var show = !!props.show;

    var mountModal = show || animation && !this.state.exited;
    if (!mountModal) {
      return null;
    }

    var modal = _react2['default'].createElement(
      _ModalDialog2['default'],
      _extends({}, props, {
        ref: this._setDialogRef,
        className: _classnames2['default']({ 'in': show && !animation }),
        onClick: backdrop === true ? this.handleBackdropClick : null
      }),
      this.renderContent()
    );

    if (animation) {
      modal = _react2['default'].createElement(
        _Fade2['default'],
        {
          transitionAppear: true,
          unmountOnExit: true,
          'in': show,
          duration: Modal.TRANSITION_DURATION,
          onExit: onExit,
          onExiting: onExiting,
          onExited: this.handleHidden,
          onEnter: onEnter,
          onEntering: onEntering,
          onEntered: onEntered
        },
        modal
      );
    }

    if (backdrop) {
      modal = this.renderBackdrop(modal);
    }

    return _react2['default'].createElement(
      _Portal2['default'],
      { container: props.container },
      modal
    );
  },

  renderContent: function renderContent() {
    var _this = this;

    return _react2['default'].Children.map(this.props.children, function (child) {
      // TODO: use context in 0.14
      if (child && child.type && child.type.__isModalHeader) {
        return _react.cloneElement(child, {
          onHide: _utilsCreateChainedFunction2['default'](_this.props.onHide, child.props.onHide)
        });
      }
      return child;
    });
  },

  renderBackdrop: function renderBackdrop(modal) {
    var _props2 = this.props;
    var animation = _props2.animation;
    var bsClass = _props2.bsClass;

    var duration = Modal.BACKDROP_TRANSITION_DURATION;

    var backdrop = _react2['default'].createElement('div', { ref: "backdrop",
      className: _classnames2['default'](bsClass + '-backdrop', { 'in': this.props.show && !animation }),
      onClick: this.handleBackdropClick
    });

    return _react2['default'].createElement(
      'div',
      { ref: 'modal' },
      animation ? _react2['default'].createElement(
        _Fade2['default'],
        { transitionAppear: true, 'in': this.props.show, duration: duration },
        backdrop
      ) : backdrop,
      modal
    );
  },

  _setDialogRef: function _setDialogRef(ref) {
    this.refs.dialog = ref;

    //maintains backwards compat with older component breakdown
    if (!this.props.backdrop) {
      this.refs.modal = ref;
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.setState({ exited: false });
    } else if (!nextProps.animation) {
      // Otherwise let handleHidden take care of marking exited.
      this.setState({ exited: true });
    }
  },

  componentWillUpdate: function componentWillUpdate(nextProps) {
    if (nextProps.show) {
      this.checkForFocus();
    }
  },

  componentDidMount: function componentDidMount() {
    if (this.props.show) {
      this.onShow();
    }
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    var animation = this.props.animation;

    if (prevProps.show && !this.props.show && !animation) {
      //otherwise handleHidden will call this.
      this.onHide();
    } else if (!prevProps.show && this.props.show) {
      this.onShow();
    }
  },

  onShow: function onShow() {
    var _this2 = this;

    var doc = _utilsDomUtils2['default'].ownerDocument(this);
    var win = _utilsDomUtils2['default'].ownerWindow(this);

    this._onDocumentKeyupListener = _utilsEventListener2['default'].listen(doc, 'keyup', this.handleDocumentKeyUp);

    this._onWindowResizeListener = _utilsEventListener2['default'].listen(win, 'resize', this.handleWindowResize);

    if (this.props.enforceFocus) {
      this._onFocusinListener = onFocus(this, this.enforceFocus);
    }

    var container = getContainer(this);

    container.className += container.className.length ? ' modal-open' : 'modal-open';

    this._containerIsOverflowing = container.scrollHeight > containerClientHeight(container, this);

    this._originalPadding = container.style.paddingRight;

    if (this._containerIsOverflowing) {
      container.style.paddingRight = parseInt(this._originalPadding || 0, 10) + getScrollbarSize() + 'px';
    }

    if (this.props.backdrop) {
      this.iosClickHack();
    }

    this.setState(this._getStyles(), //eslint-disable-line react/no-did-mount-set-state
    function () {
      return _this2.focusModalContent();
    });
  },

  onHide: function onHide() {
    this._onDocumentKeyupListener.remove();
    this._onWindowResizeListener.remove();

    if (this._onFocusinListener) {
      this._onFocusinListener.remove();
    }

    var container = getContainer(this);

    container.style.paddingRight = this._originalPadding;

    container.className = container.className.replace(/ ?modal-open/, '');

    this.restoreLastFocus();
  },

  handleHidden: function handleHidden() {
    this.setState({ exited: true });

    this.onHide();

    if (this.props.onExited) {
      var _props3;

      (_props3 = this.props).onExited.apply(_props3, arguments);
    }
  },

  handleBackdropClick: function handleBackdropClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    this.props.onHide();
  },

  handleDocumentKeyUp: function handleDocumentKeyUp(e) {
    if (this.props.keyboard && e.keyCode === 27) {
      this.props.onHide();
    }
  },

  handleWindowResize: function handleWindowResize() {
    this.setState(this._getStyles());
  },

  checkForFocus: function checkForFocus() {
    if (_utilsDomUtils2['default'].canUseDom) {
      try {
        this.lastFocus = document.activeElement;
      } catch (e) {} // eslint-disable-line no-empty
    }
  },

  focusModalContent: function focusModalContent() {
    var modalContent = _react2['default'].findDOMNode(this.refs.dialog);
    var current = _utilsDomUtils2['default'].activeElement(this);
    var focusInModal = current && _utilsDomUtils2['default'].contains(modalContent, current);

    if (modalContent && this.props.autoFocus && !focusInModal) {
      this.lastFocus = current;
      modalContent.focus();
    }
  },

  restoreLastFocus: function restoreLastFocus() {
    if (this.lastFocus && this.lastFocus.focus) {
      this.lastFocus.focus();
      this.lastFocus = null;
    }
  },

  enforceFocus: function enforceFocus() {
    if (!this.isMounted()) {
      return;
    }

    var active = _utilsDomUtils2['default'].activeElement(this);
    var modal = _react2['default'].findDOMNode(this.refs.dialog);

    if (modal && modal !== active && !_utilsDomUtils2['default'].contains(modal, active)) {
      modal.focus();
    }
  },

  iosClickHack: function iosClickHack() {
    // IOS only allows click events to be delegated to the document on elements
    // it considers 'clickable' - anchors, buttons, etc. We fake a click handler on the
    // DOM nodes themselves. Remove if handled by React: https://github.com/facebook/react/issues/1169
    _react2['default'].findDOMNode(this.refs.modal).onclick = function () {};
    _react2['default'].findDOMNode(this.refs.backdrop).onclick = function () {};
  },

  _getStyles: function _getStyles() {
    if (!_utilsDomUtils2['default'].canUseDom) {
      return {};
    }

    var node = _react2['default'].findDOMNode(this.refs.modal);
    var scrollHt = node.scrollHeight;
    var container = getContainer(this);
    var containerIsOverflowing = this._containerIsOverflowing;
    var modalIsOverflowing = scrollHt > containerClientHeight(container, this);

    return {
      dialogStyles: {
        paddingRight: containerIsOverflowing && !modalIsOverflowing ? getScrollbarSize() : void 0,
        paddingLeft: !containerIsOverflowing && modalIsOverflowing ? getScrollbarSize() : void 0
      }
    };
  }

});

Modal.Body = _ModalBody2['default'];
Modal.Header = _ModalHeader2['default'];
Modal.Title = _ModalTitle2['default'];
Modal.Footer = _ModalFooter2['default'];

Modal.Dialog = _ModalDialog2['default'];

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

exports['default'] = Modal;
module.exports = exports['default'];
},{"./Fade":21,"./ModalBody":37,"./ModalDialog":38,"./ModalFooter":39,"./ModalHeader":40,"./ModalTitle":41,"./Portal":55,"./utils/EventListener":73,"./utils/createChainedFunction":77,"./utils/domUtils":81,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"babel-runtime/helpers/object-without-properties":93,"classnames":110}],37:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var ModalBody = (function (_React$Component) {
  _inherits(ModalBody, _React$Component);

  function ModalBody() {
    _classCallCheck(this, ModalBody);

    _React$Component.apply(this, arguments);
  }

  ModalBody.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, this.props.modalClassName) }),
      this.props.children
    );
  };

  return ModalBody;
})(_react2['default'].Component);

ModalBody.propTypes = {
  /**
   * A css class applied to the Component
   */
  modalClassName: _react2['default'].PropTypes.string
};

ModalBody.defaultProps = {
  modalClassName: 'modal-body'
};

exports['default'] = ModalBody;
module.exports = exports['default'];
},{"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],38:[function(require,module,exports){
/*eslint-disable react/prop-types */
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var ModalDialog = _react2['default'].createClass({
  displayName: 'ModalDialog',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {

    /**
     * A Callback fired when the header closeButton or non-static backdrop is clicked.
     * @type {function}
     * @required
     */
    onHide: _react2['default'].PropTypes.func.isRequired,

    /**
     * A css class to apply to the Modal dialog DOM node.
     */
    dialogClassName: _react2['default'].PropTypes.string

  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'modal',
      closeButton: true
    };
  },

  render: function render() {
    var modalStyle = { display: 'block' };
    var bsClass = this.props.bsClass;
    var dialogClasses = this.getBsClassSet();

    delete dialogClasses.modal;
    dialogClasses[bsClass + '-dialog'] = true;

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        title: null,
        tabIndex: "-1",
        role: "dialog",
        style: modalStyle,
        className: _classnames2['default'](this.props.className, bsClass)
      }),
      _react2['default'].createElement(
        'div',
        { className: _classnames2['default'](this.props.dialogClassName, dialogClasses) },
        _react2['default'].createElement(
          'div',
          { className: bsClass + '-content', role: 'document' },
          this.props.children
        )
      )
    );
  }
});

exports['default'] = ModalDialog;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],39:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var ModalFooter = (function (_React$Component) {
  _inherits(ModalFooter, _React$Component);

  function ModalFooter() {
    _classCallCheck(this, ModalFooter);

    _React$Component.apply(this, arguments);
  }

  ModalFooter.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, this.props.modalClassName) }),
      this.props.children
    );
  };

  return ModalFooter;
})(_react2['default'].Component);

ModalFooter.propTypes = {
  /**
   * A css class applied to the Component
   */
  modalClassName: _react2['default'].PropTypes.string
};

ModalFooter.defaultProps = {
  modalClassName: 'modal-footer'
};

exports['default'] = ModalFooter;
module.exports = exports['default'];
},{"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],40:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var ModalHeader = (function (_React$Component) {
  _inherits(ModalHeader, _React$Component);

  function ModalHeader() {
    _classCallCheck(this, ModalHeader);

    _React$Component.apply(this, arguments);
  }

  ModalHeader.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, this.props.modalClassName)
      }),
      this.props.closeButton && _react2['default'].createElement(
        'button',
        {
          className: 'close',
          onClick: this.props.onHide
        },
        _react2['default'].createElement(
          'span',
          { 'aria-hidden': "true" },
          '×'
        )
      ),
      this.props.children
    );
  };

  return ModalHeader;
})(_react2['default'].Component)

//used in liue of parent contexts right now to auto wire the close button
;

ModalHeader.__isModalHeader = true;

ModalHeader.propTypes = {
  /**
   * The 'aria-label' attribute is used to define a string that labels the current element.
   * It is used for Assistive Technology when the label text is not visible on screen.
   */
  'aria-label': _react2['default'].PropTypes.string,
  /**
   * A css class applied to the Component
   */
  modalClassName: _react2['default'].PropTypes.string,
  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: _react2['default'].PropTypes.bool,
  /**
   * A Callback fired when the close button is clicked. If used directly inside a Modal component, the onHide will automatically
   * be propagated up to the parent Modal `onHide`.
   */
  onHide: _react2['default'].PropTypes.func
};

ModalHeader.defaultProps = {
  'aria-label': 'Close',
  modalClassName: 'modal-header',
  closeButton: false
};

exports['default'] = ModalHeader;
module.exports = exports['default'];
},{"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],41:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var ModalTitle = (function (_React$Component) {
  _inherits(ModalTitle, _React$Component);

  function ModalTitle() {
    _classCallCheck(this, ModalTitle);

    _React$Component.apply(this, arguments);
  }

  ModalTitle.prototype.render = function render() {
    return _react2['default'].createElement(
      'h4',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, this.props.modalClassName) }),
      this.props.children
    );
  };

  return ModalTitle;
})(_react2['default'].Component);

ModalTitle.propTypes = {
  /**
   * A css class applied to the Component
   */
  modalClassName: _react2['default'].PropTypes.string
};

ModalTitle.defaultProps = {
  modalClassName: 'modal-title'
};

exports['default'] = ModalTitle;
module.exports = exports['default'];
},{"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],42:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _Collapse = require('./Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var Nav = _react2['default'].createClass({
  displayName: 'Nav',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    activeHref: _react2['default'].PropTypes.string,
    activeKey: _react2['default'].PropTypes.any,
    bsStyle: _react2['default'].PropTypes.oneOf(['tabs', 'pills']),
    stacked: _react2['default'].PropTypes.bool,
    justified: _react2['default'].PropTypes.bool,
    onSelect: _react2['default'].PropTypes.func,
    collapsible: _react2['default'].PropTypes.bool,
    /**
     * CSS classes for the wrapper `nav` element
     */
    className: _react2['default'].PropTypes.string,
    /**
     * HTML id for the wrapper `nav` element
     */
    id: _react2['default'].PropTypes.string,
    /**
     * CSS classes for the inner `ul` element
     */
    ulClassName: _react2['default'].PropTypes.string,
    /**
     * HTML id for the inner `ul` element
     */
    ulId: _react2['default'].PropTypes.string,
    expanded: _react2['default'].PropTypes.bool,
    navbar: _react2['default'].PropTypes.bool,
    eventKey: _react2['default'].PropTypes.any,
    pullRight: _react2['default'].PropTypes.bool,
    right: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'nav',
      expanded: true
    };
  },

  render: function render() {
    var classes = this.props.collapsible ? 'navbar-collapse' : null;

    if (this.props.navbar && !this.props.collapsible) {
      return this.renderUl();
    }

    return _react2['default'].createElement(
      _Collapse2['default'],
      { 'in': this.props.expanded },
      _react2['default'].createElement(
        'nav',
        _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
        this.renderUl()
      )
    );
  },

  renderUl: function renderUl() {
    var classes = this.getBsClassSet();

    classes['nav-stacked'] = this.props.stacked;
    classes['nav-justified'] = this.props.justified;
    classes['navbar-nav'] = this.props.navbar;
    classes['pull-right'] = this.props.pullRight;
    classes['navbar-right'] = this.props.right;

    return _react2['default'].createElement(
      'ul',
      _extends({}, this.props, {
        role: this.props.bsStyle === 'tabs' ? 'tablist' : null,
        className: _classnames2['default'](this.props.ulClassName, classes),
        id: this.props.ulId,
        ref: "ul"
      }),
      _utilsValidComponentChildren2['default'].map(this.props.children, this.renderNavItem)
    );
  },

  getChildActiveProp: function getChildActiveProp(child) {
    if (child.props.active) {
      return true;
    }
    if (this.props.activeKey != null) {
      if (child.props.eventKey === this.props.activeKey) {
        return true;
      }
    }
    if (this.props.activeHref != null) {
      if (child.props.href === this.props.activeHref) {
        return true;
      }
    }

    return child.props.active;
  },

  renderNavItem: function renderNavItem(child, index) {
    return _react.cloneElement(child, {
      role: this.props.bsStyle === 'tabs' ? 'tab' : null,
      active: this.getChildActiveProp(child),
      activeKey: this.props.activeKey,
      activeHref: this.props.activeHref,
      onSelect: _utilsCreateChainedFunction2['default'](child.props.onSelect, this.props.onSelect),
      key: child.key ? child.key : index,
      navItem: true
    });
  }
});

exports['default'] = Nav;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./Collapse":15,"./utils/ValidComponentChildren":75,"./utils/createChainedFunction":77,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],43:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var NavItem = _react2['default'].createClass({
  displayName: 'NavItem',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    linkId: _react2['default'].PropTypes.string,
    onSelect: _react2['default'].PropTypes.func,
    active: _react2['default'].PropTypes.bool,
    disabled: _react2['default'].PropTypes.bool,
    href: _react2['default'].PropTypes.string,
    role: _react2['default'].PropTypes.string,
    title: _react2['default'].PropTypes.node,
    eventKey: _react2['default'].PropTypes.any,
    target: _react2['default'].PropTypes.string,
    'aria-controls': _react2['default'].PropTypes.string
  },

  render: function render() {
    var _props = this.props;
    var role = _props.role;
    var linkId = _props.linkId;
    var disabled = _props.disabled;
    var active = _props.active;
    var href = _props.href;
    var title = _props.title;
    var target = _props.target;
    var children = _props.children;
    var ariaControls = _props['aria-controls'];

    var props = _objectWithoutProperties(_props, ['role', 'linkId', 'disabled', 'active', 'href', 'title', 'target', 'children', 'aria-controls']);

    var classes = {
      active: active,
      disabled: disabled
    };
    var linkProps = {
      role: role,
      href: href,
      title: title,
      target: target,
      id: linkId,
      onClick: this.handleClick
    };

    if (!role && href === '#') {
      linkProps.role = 'button';
    }

    return _react2['default'].createElement(
      'li',
      _extends({}, props, { role: 'presentation', className: _classnames2['default'](props.className, classes) }),
      _react2['default'].createElement(
        _SafeAnchor2['default'],
        _extends({}, linkProps, { 'aria-selected': active, 'aria-controls': ariaControls }),
        children
      )
    );
  },

  handleClick: function handleClick(e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    }
  }
});

exports['default'] = NavItem;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./SafeAnchor":60,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"babel-runtime/helpers/object-without-properties":93,"classnames":110}],44:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var Navbar = _react2['default'].createClass({
  displayName: 'Navbar',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    fixedTop: _react2['default'].PropTypes.bool,
    fixedBottom: _react2['default'].PropTypes.bool,
    staticTop: _react2['default'].PropTypes.bool,
    inverse: _react2['default'].PropTypes.bool,
    fluid: _react2['default'].PropTypes.bool,
    role: _react2['default'].PropTypes.string,
    /**
     * You can use a custom element for this component
     */
    componentClass: _utilsCustomPropTypes2['default'].elementType,
    brand: _react2['default'].PropTypes.node,
    toggleButton: _react2['default'].PropTypes.node,
    toggleNavKey: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
    onToggle: _react2['default'].PropTypes.func,
    navExpanded: _react2['default'].PropTypes.bool,
    defaultNavExpanded: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'navbar',
      bsStyle: 'default',
      role: 'navigation',
      componentClass: 'nav'
    };
  },

  getInitialState: function getInitialState() {
    return {
      navExpanded: this.props.defaultNavExpanded
    };
  },

  shouldComponentUpdate: function shouldComponentUpdate() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleToggle: function handleToggle() {
    if (this.props.onToggle) {
      this._isChanging = true;
      this.props.onToggle();
      this._isChanging = false;
    }

    this.setState({
      navExpanded: !this.state.navExpanded
    });
  },

  isNavExpanded: function isNavExpanded() {
    return this.props.navExpanded != null ? this.props.navExpanded : this.state.navExpanded;
  },

  render: function render() {
    var classes = this.getBsClassSet();
    var ComponentClass = this.props.componentClass;

    classes['navbar-fixed-top'] = this.props.fixedTop;
    classes['navbar-fixed-bottom'] = this.props.fixedBottom;
    classes['navbar-static-top'] = this.props.staticTop;
    classes['navbar-inverse'] = this.props.inverse;

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      _react2['default'].createElement(
        'div',
        { className: this.props.fluid ? 'container-fluid' : 'container' },
        this.props.brand || this.props.toggleButton || this.props.toggleNavKey != null ? this.renderHeader() : null,
        _utilsValidComponentChildren2['default'].map(this.props.children, this.renderChild)
      )
    );
  },

  renderChild: function renderChild(child, index) {
    return _react.cloneElement(child, {
      navbar: true,
      collapsible: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.eventKey,
      expanded: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.eventKey && this.isNavExpanded(),
      key: child.key ? child.key : index
    });
  },

  renderHeader: function renderHeader() {
    var brand = undefined;

    if (this.props.brand) {
      if (_react2['default'].isValidElement(this.props.brand)) {
        brand = _react.cloneElement(this.props.brand, {
          className: _classnames2['default'](this.props.brand.props.className, 'navbar-brand')
        });
      } else {
        brand = _react2['default'].createElement(
          'span',
          { className: "navbar-brand" },
          this.props.brand
        );
      }
    }

    return _react2['default'].createElement(
      'div',
      { className: "navbar-header" },
      brand,
      this.props.toggleButton || this.props.toggleNavKey != null ? this.renderToggleButton() : null
    );
  },

  renderToggleButton: function renderToggleButton() {
    var children = undefined;

    if (_react2['default'].isValidElement(this.props.toggleButton)) {

      return _react.cloneElement(this.props.toggleButton, {
        className: _classnames2['default'](this.props.toggleButton.props.className, 'navbar-toggle'),
        onClick: _utilsCreateChainedFunction2['default'](this.handleToggle, this.props.toggleButton.props.onClick)
      });
    }

    children = this.props.toggleButton != null ? this.props.toggleButton : [_react2['default'].createElement(
      'span',
      { className: "sr-only", key: 0 },
      'Toggle navigation'
    ), _react2['default'].createElement('span', { className: "icon-bar", key: 1 }), _react2['default'].createElement('span', { className: "icon-bar", key: 2 }), _react2['default'].createElement('span', { className: "icon-bar", key: 3 })];

    return _react2['default'].createElement(
      'button',
      { className: "navbar-toggle", type: "button", onClick: this.handleToggle },
      children
    );
  }
});

exports['default'] = Navbar;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./utils/CustomPropTypes":72,"./utils/ValidComponentChildren":75,"./utils/createChainedFunction":77,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],45:[function(require,module,exports){
/* eslint react/prop-types: [2, {ignore: ["container", "containerPadding", "target", "placement", "children"] }] */
/* These properties are validated in 'Portal' and 'Position' components */

'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _Position = require('./Position');

var _Position2 = _interopRequireDefault(_Position);

var _RootCloseWrapper = require('./RootCloseWrapper');

var _RootCloseWrapper2 = _interopRequireDefault(_RootCloseWrapper);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var _Fade = require('./Fade');

var _Fade2 = _interopRequireDefault(_Fade);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Overlay = (function (_React$Component) {
  _inherits(Overlay, _React$Component);

  function Overlay(props, context) {
    _classCallCheck(this, Overlay);

    _React$Component.call(this, props, context);

    this.state = { exited: !props.show };
    this.onHiddenListener = this.handleHidden.bind(this);
  }

  Overlay.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.setState({ exited: false });
    } else if (!nextProps.animation) {
      // Otherwise let handleHidden take care of marking exited.
      this.setState({ exited: true });
    }
  };

  Overlay.prototype.render = function render() {
    var _props = this.props;
    var container = _props.container;
    var containerPadding = _props.containerPadding;
    var target = _props.target;
    var placement = _props.placement;
    var rootClose = _props.rootClose;
    var children = _props.children;
    var Transition = _props.animation;

    var props = _objectWithoutProperties(_props, ['container', 'containerPadding', 'target', 'placement', 'rootClose', 'children', 'animation']);

    if (Transition === true) {
      Transition = _Fade2['default'];
    }

    // Don't un-render the overlay while it's transitioning out.
    var mountOverlay = props.show || Transition && !this.state.exited;
    if (!mountOverlay) {
      // Don't bother showing anything if we don't have to.
      return null;
    }

    var child = children;

    // Position is be inner-most because it adds inline styles into the child,
    // which the other wrappers don't forward correctly.
    child = _react2['default'].createElement(
      _Position2['default'],
      { container: container, containerPadding: containerPadding, target: target, placement: placement },
      child
    );

    if (Transition) {
      var onExit = props.onExit;

      // This animates the child node by injecting props, so it must precede
      // anything that adds a wrapping div.
      var onExiting = props.onExiting;
      var onEnter = props.onEnter;
      var onEntering = props.onEntering;
      var onEntered = props.onEntered;
      child = _react2['default'].createElement(
        Transition,
        {
          'in': props.show,
          transitionAppear: true,
          onExit: onExit,
          onExiting: onExiting,
          onExited: this.onHiddenListener,
          onEnter: onEnter,
          onEntering: onEntering,
          onEntered: onEntered
        },
        child
      );
    } else {
      child = _react.cloneElement(child, {
        className: _classnames2['default']('in', child.props.className)
      });
    }

    // This goes after everything else because it adds a wrapping div.
    if (rootClose) {
      child = _react2['default'].createElement(
        _RootCloseWrapper2['default'],
        { onRootClose: props.onHide },
        child
      );
    }

    return _react2['default'].createElement(
      _Portal2['default'],
      { container: container },
      child
    );
  };

  Overlay.prototype.handleHidden = function handleHidden() {
    this.setState({ exited: true });

    if (this.props.onExited) {
      var _props2;

      (_props2 = this.props).onExited.apply(_props2, arguments);
    }
  };

  return Overlay;
})(_react2['default'].Component);

Overlay.propTypes = _extends({}, _Portal2['default'].propTypes, _Position2['default'].propTypes, {
  /**
   * Set the visibility of the Overlay
   */
  show: _react2['default'].PropTypes.bool,
  /**
   * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
   */
  rootClose: _react2['default'].PropTypes.bool,
  /**
   * A Callback fired by the Overlay when it wishes to be hidden.
   */
  onHide: _react2['default'].PropTypes.func,

  /**
   * Use animation
   */
  animation: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _utilsCustomPropTypes2['default'].elementType]),

  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: _react2['default'].PropTypes.func,

  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: _react2['default'].PropTypes.func,

  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: _react2['default'].PropTypes.func,

  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: _react2['default'].PropTypes.func,

  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: _react2['default'].PropTypes.func,

  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: _react2['default'].PropTypes.func
});

Overlay.defaultProps = {
  animation: _Fade2['default']
};

exports['default'] = Overlay;
module.exports = exports['default'];
},{"./Fade":21,"./Portal":55,"./Position":56,"./RootCloseWrapper":58,"./utils/CustomPropTypes":72,"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91,"babel-runtime/helpers/object-without-properties":93,"classnames":110}],46:[function(require,module,exports){
/*eslint-disable react/prop-types */
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _utilsCreateContextWrapper = require('./utils/createContextWrapper');

var _utilsCreateContextWrapper2 = _interopRequireDefault(_utilsCreateContextWrapper);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _reactLibWarning = require('react/lib/warning');

var _reactLibWarning2 = _interopRequireDefault(_reactLibWarning);

var _lodashObjectPick = require('lodash/object/pick');

/**
 * Check if value one is inside or equal to the of value
 *
 * @param {string} one
 * @param {string|array} of
 * @returns {boolean}
 */

var _lodashObjectPick2 = _interopRequireDefault(_lodashObjectPick);

function isOneOf(one, of) {
  if (Array.isArray(of)) {
    return of.indexOf(one) >= 0;
  }
  return one === of;
}

var OverlayTrigger = _react2['default'].createClass({
  displayName: 'OverlayTrigger',

  propTypes: _extends({}, _Overlay2['default'].propTypes, {

    /**
    * Specify which action or actions trigger Overlay visibility
    */
    trigger: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.oneOf(['click', 'hover', 'focus']), _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.oneOf(['click', 'hover', 'focus']))]),

    /**
     * A millisecond delay amount to show and hide the Overlay once triggered
     */
    delay: _react2['default'].PropTypes.number,
    /**
     * A millisecond delay amount before showing the Overlay once triggered.
     */
    delayShow: _react2['default'].PropTypes.number,
    /**
     * A millisecond delay amount before hiding the Overlay once triggered.
     */
    delayHide: _react2['default'].PropTypes.number,

    /**
     * The initial visibility state of the Overlay, for more nuanced visibility controll consider
     * using the Overlay component directly.
     */
    defaultOverlayShown: _react2['default'].PropTypes.bool,

    /**
     * An element or text to overlay next to the target.
     */
    overlay: _react2['default'].PropTypes.node.isRequired,

    /**
     * @private
     */
    onBlur: _react2['default'].PropTypes.func,
    /**
     * @private
     */
    onClick: _react2['default'].PropTypes.func,
    /**
     * @private
     */
    onFocus: _react2['default'].PropTypes.func,
    /**
     * @private
     */
    onMouseEnter: _react2['default'].PropTypes.func,
    /**
     * @private
     */
    onMouseLeave: _react2['default'].PropTypes.func,

    //override specific overlay props
    /**
     * @private
     */
    target: function target() {},
    /**
    * @private
    */
    onHide: function onHide() {},
    /**
     * @private
     */
    show: function show() {}
  }),

  getDefaultProps: function getDefaultProps() {
    return {
      trigger: ['hover', 'focus']
    };
  },

  getInitialState: function getInitialState() {
    return {
      isOverlayShown: this.props.defaultOverlayShown == null ? false : this.props.defaultOverlayShown
    };
  },

  show: function show() {
    this.setState({
      isOverlayShown: true
    });
  },

  hide: function hide() {
    this.setState({
      isOverlayShown: false
    });
  },

  toggle: function toggle() {
    if (this.state.isOverlayShown) {
      this.hide();
    } else {
      this.show();
    }
  },

  componentDidMount: function componentDidMount() {
    this._mountNode = document.createElement('div');
    _react2['default'].render(this._overlay, this._mountNode);
  },

  componentWillUnmount: function componentWillUnmount() {
    _react2['default'].unmountComponentAtNode(this._mountNode);
    this._mountNode = null;
    clearTimeout(this._hoverDelay);
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this._mountNode) {
      _react2['default'].render(this._overlay, this._mountNode);
    }
  },

  getOverlayTarget: function getOverlayTarget() {
    return _react2['default'].findDOMNode(this);
  },

  getOverlay: function getOverlay() {
    var overlayProps = _extends({}, _lodashObjectPick2['default'](this.props, _Object$keys(_Overlay2['default'].propTypes)), {
      show: this.state.isOverlayShown,
      onHide: this.hide,
      target: this.getOverlayTarget,
      onExit: this.props.onExit,
      onExiting: this.props.onExiting,
      onExited: this.props.onExited,
      onEnter: this.props.onEnter,
      onEntering: this.props.onEntering,
      onEntered: this.props.onEntered
    });

    var overlay = _react.cloneElement(this.props.overlay, {
      placement: overlayProps.placement,
      container: overlayProps.container
    });

    return _react2['default'].createElement(
      _Overlay2['default'],
      overlayProps,
      overlay
    );
  },

  render: function render() {
    var trigger = _react2['default'].Children.only(this.props.children);

    var props = {
      'aria-describedby': this.props.overlay.props.id
    };

    // create in render otherwise owner is lost...
    this._overlay = this.getOverlay();

    props.onClick = _utilsCreateChainedFunction2['default'](trigger.props.onClick, this.props.onClick);

    if (isOneOf('click', this.props.trigger)) {
      props.onClick = _utilsCreateChainedFunction2['default'](this.toggle, props.onClick);
    }

    if (isOneOf('hover', this.props.trigger)) {
      _reactLibWarning2['default'](!(this.props.trigger === 'hover'), '[react-bootstrap] Specifying only the `"hover"` trigger limits the visibilty of the overlay to just mouse users. ' + 'Consider also including the `"focus"` trigger so that touch and keyboard only users can see the overlay as well.');

      props.onMouseOver = _utilsCreateChainedFunction2['default'](this.handleDelayedShow, this.props.onMouseOver);
      props.onMouseOut = _utilsCreateChainedFunction2['default'](this.handleDelayedHide, this.props.onMouseOut);
    }

    if (isOneOf('focus', this.props.trigger)) {
      props.onFocus = _utilsCreateChainedFunction2['default'](this.handleDelayedShow, this.props.onFocus);
      props.onBlur = _utilsCreateChainedFunction2['default'](this.handleDelayedHide, this.props.onBlur);
    }

    return _react.cloneElement(trigger, props);
  },

  handleDelayedShow: function handleDelayedShow() {
    var _this = this;

    if (this._hoverDelay != null) {
      clearTimeout(this._hoverDelay);
      this._hoverDelay = null;
      return;
    }

    var delay = this.props.delayShow != null ? this.props.delayShow : this.props.delay;

    if (!delay) {
      this.show();
      return;
    }

    this._hoverDelay = setTimeout(function () {
      _this._hoverDelay = null;
      _this.show();
    }, delay);
  },

  handleDelayedHide: function handleDelayedHide() {
    var _this2 = this;

    if (this._hoverDelay != null) {
      clearTimeout(this._hoverDelay);
      this._hoverDelay = null;
      return;
    }

    var delay = this.props.delayHide != null ? this.props.delayHide : this.props.delay;

    if (!delay) {
      this.hide();
      return;
    }

    this._hoverDelay = setTimeout(function () {
      _this2._hoverDelay = null;
      _this2.hide();
    }, delay);
  }

});

/**
 * Creates a new OverlayTrigger class that forwards the relevant context
 *
 * This static method should only be called at the module level, instead of in
 * e.g. a render() method, because it's expensive to create new classes.
 *
 * For example, you would want to have:
 *
 * > export default OverlayTrigger.withContext({
 * >   myContextKey: React.PropTypes.object
 * > });
 *
 * and import this when needed.
 */
OverlayTrigger.withContext = _utilsCreateContextWrapper2['default'](OverlayTrigger, 'overlay');

exports['default'] = OverlayTrigger;
module.exports = exports['default'];
},{"./Overlay":45,"./utils/createChainedFunction":77,"./utils/createContextWrapper":78,"babel-runtime/core-js/object/keys":86,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"lodash/object/pick":134,"react/lib/warning":179}],47:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var PageHeader = _react2['default'].createClass({
  displayName: 'PageHeader',

  render: function render() {
    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'page-header') }),
      _react2['default'].createElement(
        'h1',
        null,
        this.props.children
      )
    );
  }
});

exports['default'] = PageHeader;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],48:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var PageItem = _react2['default'].createClass({
  displayName: 'PageItem',

  propTypes: {
    href: _react2['default'].PropTypes.string,
    target: _react2['default'].PropTypes.string,
    title: _react2['default'].PropTypes.string,
    disabled: _react2['default'].PropTypes.bool,
    previous: _react2['default'].PropTypes.bool,
    next: _react2['default'].PropTypes.bool,
    onSelect: _react2['default'].PropTypes.func,
    eventKey: _react2['default'].PropTypes.any
  },

  render: function render() {
    var classes = {
      'disabled': this.props.disabled,
      'previous': this.props.previous,
      'next': this.props.next
    };

    return _react2['default'].createElement(
      'li',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes) }),
      _react2['default'].createElement(
        _SafeAnchor2['default'],
        {
          href: this.props.href,
          title: this.props.title,
          target: this.props.target,
          onClick: this.handleSelect },
        this.props.children
      )
    );
  },

  handleSelect: function handleSelect(e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    }
  }
});

exports['default'] = PageItem;
module.exports = exports['default'];
},{"./SafeAnchor":60,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],49:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var Pager = _react2['default'].createClass({
  displayName: 'Pager',

  propTypes: {
    onSelect: _react2['default'].PropTypes.func
  },

  render: function render() {
    return _react2['default'].createElement(
      'ul',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, 'pager') }),
      _utilsValidComponentChildren2['default'].map(this.props.children, this.renderPageItem)
    );
  },

  renderPageItem: function renderPageItem(child, index) {
    return _react.cloneElement(child, {
      onSelect: _utilsCreateChainedFunction2['default'](child.props.onSelect, this.props.onSelect),
      key: child.key ? child.key : index
    });
  }
});

exports['default'] = Pager;
module.exports = exports['default'];
},{"./utils/ValidComponentChildren":75,"./utils/createChainedFunction":77,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],50:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _PaginationButton = require('./PaginationButton');

var _PaginationButton2 = _interopRequireDefault(_PaginationButton);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var Pagination = _react2['default'].createClass({
  displayName: 'Pagination',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    activePage: _react2['default'].PropTypes.number,
    items: _react2['default'].PropTypes.number,
    maxButtons: _react2['default'].PropTypes.number,
    ellipsis: _react2['default'].PropTypes.bool,
    first: _react2['default'].PropTypes.bool,
    last: _react2['default'].PropTypes.bool,
    prev: _react2['default'].PropTypes.bool,
    next: _react2['default'].PropTypes.bool,
    onSelect: _react2['default'].PropTypes.func,
    /**
     * You can use a custom element for the buttons
     */
    buttonComponentClass: _utilsCustomPropTypes2['default'].elementType
  },

  getDefaultProps: function getDefaultProps() {
    return {
      activePage: 1,
      items: 1,
      maxButtons: 0,
      first: false,
      last: false,
      prev: false,
      next: false,
      ellipsis: true,
      buttonComponentClass: _SafeAnchor2['default'],
      bsClass: 'pagination'
    };
  },

  renderPageButtons: function renderPageButtons() {
    var pageButtons = [];
    var startPage = undefined,
        endPage = undefined,
        hasHiddenPagesAfter = undefined;
    var _props = this.props;
    var maxButtons = _props.maxButtons;
    var activePage = _props.activePage;
    var items = _props.items;
    var onSelect = _props.onSelect;
    var ellipsis = _props.ellipsis;
    var buttonComponentClass = _props.buttonComponentClass;

    if (maxButtons) {
      var hiddenPagesBefore = activePage - parseInt(maxButtons / 2);
      startPage = hiddenPagesBefore > 1 ? hiddenPagesBefore : 1;
      hasHiddenPagesAfter = startPage + maxButtons <= items;

      if (!hasHiddenPagesAfter) {
        endPage = items;
        startPage = items - maxButtons + 1;
        if (startPage < 1) {
          startPage = 1;
        }
      } else {
        endPage = startPage + maxButtons - 1;
      }
    } else {
      startPage = 1;
      endPage = items;
    }

    for (var pagenumber = startPage; pagenumber <= endPage; pagenumber++) {
      pageButtons.push(_react2['default'].createElement(
        _PaginationButton2['default'],
        {
          key: pagenumber,
          eventKey: pagenumber,
          active: pagenumber === activePage,
          onSelect: onSelect,
          buttonComponentClass: buttonComponentClass },
        pagenumber
      ));
    }

    if (maxButtons && hasHiddenPagesAfter && ellipsis) {
      pageButtons.push(_react2['default'].createElement(
        _PaginationButton2['default'],
        {
          key: 'ellipsis',
          disabled: true,
          buttonComponentClass: buttonComponentClass },
        _react2['default'].createElement(
          'span',
          { 'aria-label': 'More' },
          '...'
        )
      ));
    }

    return pageButtons;
  },

  renderPrev: function renderPrev() {
    if (!this.props.prev) {
      return null;
    }

    return _react2['default'].createElement(
      _PaginationButton2['default'],
      {
        key: 'prev',
        eventKey: this.props.activePage - 1,
        disabled: this.props.activePage === 1,
        onSelect: this.props.onSelect,
        buttonComponentClass: this.props.buttonComponentClass },
      _react2['default'].createElement(
        'span',
        { 'aria-label': 'Previous' },
        '‹'
      )
    );
  },

  renderNext: function renderNext() {
    if (!this.props.next) {
      return null;
    }

    return _react2['default'].createElement(
      _PaginationButton2['default'],
      {
        key: 'next',
        eventKey: this.props.activePage + 1,
        disabled: this.props.activePage >= this.props.items,
        onSelect: this.props.onSelect,
        buttonComponentClass: this.props.buttonComponentClass },
      _react2['default'].createElement(
        'span',
        { 'aria-label': 'Next' },
        '›'
      )
    );
  },

  renderFirst: function renderFirst() {
    if (!this.props.first) {
      return null;
    }

    return _react2['default'].createElement(
      _PaginationButton2['default'],
      {
        key: 'first',
        eventKey: 1,
        disabled: this.props.activePage === 1,
        onSelect: this.props.onSelect,
        buttonComponentClass: this.props.buttonComponentClass },
      _react2['default'].createElement(
        'span',
        { 'aria-label': 'First' },
        '«'
      )
    );
  },

  renderLast: function renderLast() {
    if (!this.props.last) {
      return null;
    }

    return _react2['default'].createElement(
      _PaginationButton2['default'],
      {
        key: 'last',
        eventKey: this.props.items,
        disabled: this.props.activePage >= this.props.items,
        onSelect: this.props.onSelect,
        buttonComponentClass: this.props.buttonComponentClass },
      _react2['default'].createElement(
        'span',
        { 'aria-label': 'Last' },
        '»'
      )
    );
  },

  render: function render() {
    return _react2['default'].createElement(
      'ul',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, this.getBsClassSet()) }),
      this.renderFirst(),
      this.renderPrev(),
      this.renderPageButtons(),
      this.renderNext(),
      this.renderLast()
    );
  }
});

exports['default'] = Pagination;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./PaginationButton":51,"./SafeAnchor":60,"./utils/CustomPropTypes":72,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],51:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _utilsCreateSelectedEvent = require('./utils/createSelectedEvent');

var _utilsCreateSelectedEvent2 = _interopRequireDefault(_utilsCreateSelectedEvent);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var PaginationButton = _react2['default'].createClass({
  displayName: 'PaginationButton',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    className: _react2['default'].PropTypes.string,
    eventKey: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
    onSelect: _react2['default'].PropTypes.func,
    disabled: _react2['default'].PropTypes.bool,
    active: _react2['default'].PropTypes.bool,
    /**
     * You can use a custom element for this component
     */
    buttonComponentClass: _utilsCustomPropTypes2['default'].elementType
  },

  getDefaultProps: function getDefaultProps() {
    return {
      active: false,
      disabled: false
    };
  },

  handleClick: function handleClick(event) {
    if (this.props.onSelect) {
      var selectedEvent = _utilsCreateSelectedEvent2['default'](this.props.eventKey);
      this.props.onSelect(event, selectedEvent);
    }
  },

  render: function render() {
    var classes = _extends({
      active: this.props.active,
      disabled: this.props.disabled
    }, this.getBsClassSet());

    var _props = this.props;
    var className = _props.className;

    var anchorProps = _objectWithoutProperties(_props, ['className']);

    var ButtonComponentClass = this.props.buttonComponentClass;

    return _react2['default'].createElement(
      'li',
      { className: _classnames2['default'](className, classes) },
      _react2['default'].createElement(ButtonComponentClass, _extends({}, anchorProps, {
        onClick: this.handleClick }))
    );
  }
});

exports['default'] = PaginationButton;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./utils/CustomPropTypes":72,"./utils/createSelectedEvent":79,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"babel-runtime/helpers/object-without-properties":93,"classnames":110}],52:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _Collapse = require('./Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var Panel = _react2['default'].createClass({
  displayName: 'Panel',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    collapsible: _react2['default'].PropTypes.bool,
    onSelect: _react2['default'].PropTypes.func,
    header: _react2['default'].PropTypes.node,
    id: _react2['default'].PropTypes.string,
    footer: _react2['default'].PropTypes.node,
    defaultExpanded: _react2['default'].PropTypes.bool,
    expanded: _react2['default'].PropTypes.bool,
    eventKey: _react2['default'].PropTypes.any
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'panel',
      bsStyle: 'default'
    };
  },

  getInitialState: function getInitialState() {
    var defaultExpanded = this.props.defaultExpanded != null ? this.props.defaultExpanded : this.props.expanded != null ? this.props.expanded : false;

    return {
      expanded: defaultExpanded
    };
  },

  handleSelect: function handleSelect(e) {
    e.selected = true;

    if (this.props.onSelect) {
      this.props.onSelect(e, this.props.eventKey);
    } else {
      e.preventDefault();
    }

    if (e.selected) {
      this.handleToggle();
    }
  },

  handleToggle: function handleToggle() {
    this.setState({ expanded: !this.state.expanded });
  },

  isExpanded: function isExpanded() {
    return this.props.expanded != null ? this.props.expanded : this.state.expanded;
  },

  render: function render() {
    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, this.getBsClassSet()),
        id: this.props.collapsible ? null : this.props.id, onSelect: null }),
      this.renderHeading(),
      this.props.collapsible ? this.renderCollapsibleBody() : this.renderBody(),
      this.renderFooter()
    );
  },

  renderCollapsibleBody: function renderCollapsibleBody() {
    var collapseClass = this.prefixClass('collapse');

    return _react2['default'].createElement(
      _Collapse2['default'],
      { 'in': this.isExpanded() },
      _react2['default'].createElement(
        'div',
        {
          className: collapseClass,
          id: this.props.id,
          ref: 'panel',
          'aria-expanded': this.isExpanded() },
        this.renderBody()
      )
    );
  },

  renderBody: function renderBody() {
    var allChildren = this.props.children;
    var bodyElements = [];
    var panelBodyChildren = [];
    var bodyClass = this.prefixClass('body');

    function getProps() {
      return { key: bodyElements.length };
    }

    function addPanelChild(child) {
      bodyElements.push(_react.cloneElement(child, getProps()));
    }

    function addPanelBody(children) {
      bodyElements.push(_react2['default'].createElement(
        'div',
        _extends({ className: bodyClass }, getProps()),
        children
      ));
    }

    function maybeRenderPanelBody() {
      if (panelBodyChildren.length === 0) {
        return;
      }

      addPanelBody(panelBodyChildren);
      panelBodyChildren = [];
    }

    // Handle edge cases where we should not iterate through children.
    if (!Array.isArray(allChildren) || allChildren.length === 0) {
      if (this.shouldRenderFill(allChildren)) {
        addPanelChild(allChildren);
      } else {
        addPanelBody(allChildren);
      }
    } else {

      allChildren.forEach((function (child) {
        if (this.shouldRenderFill(child)) {
          maybeRenderPanelBody();

          // Separately add the filled element.
          addPanelChild(child);
        } else {
          panelBodyChildren.push(child);
        }
      }).bind(this));

      maybeRenderPanelBody();
    }

    return bodyElements;
  },

  shouldRenderFill: function shouldRenderFill(child) {
    return _react2['default'].isValidElement(child) && child.props.fill != null;
  },

  renderHeading: function renderHeading() {
    var header = this.props.header;

    if (!header) {
      return null;
    }

    if (!_react2['default'].isValidElement(header) || Array.isArray(header)) {
      header = this.props.collapsible ? this.renderCollapsibleTitle(header) : header;
    } else {
      var className = _classnames2['default'](this.prefixClass('title'), header.props.className);

      if (this.props.collapsible) {
        header = _react.cloneElement(header, {
          className: className,
          children: this.renderAnchor(header.props.children)
        });
      } else {
        header = _react.cloneElement(header, { className: className });
      }
    }

    return _react2['default'].createElement(
      'div',
      { className: this.prefixClass('heading') },
      header
    );
  },

  renderAnchor: function renderAnchor(header) {
    return _react2['default'].createElement(
      'a',
      {
        href: '#' + (this.props.id || ''),
        'aria-controls': this.props.collapsible ? this.props.id : null,
        className: this.isExpanded() ? null : 'collapsed',
        'aria-expanded': this.isExpanded(),
        onClick: this.handleSelect },
      header
    );
  },

  renderCollapsibleTitle: function renderCollapsibleTitle(header) {
    return _react2['default'].createElement(
      'h4',
      { className: this.prefixClass('title') },
      this.renderAnchor(header)
    );
  },

  renderFooter: function renderFooter() {
    if (!this.props.footer) {
      return null;
    }

    return _react2['default'].createElement(
      'div',
      { className: this.prefixClass('footer') },
      this.props.footer
    );
  }
});

exports['default'] = Panel;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./Collapse":15,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],53:[function(require,module,exports){
/* eslint react/prop-types: [2, {ignore: "bsStyle"}] */
/* BootstrapMixin contains `bsStyle` type validation */

'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var PanelGroup = _react2['default'].createClass({
  displayName: 'PanelGroup',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    accordion: _react2['default'].PropTypes.bool,
    activeKey: _react2['default'].PropTypes.any,
    className: _react2['default'].PropTypes.string,
    children: _react2['default'].PropTypes.node,
    defaultActiveKey: _react2['default'].PropTypes.any,
    onSelect: _react2['default'].PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'panel-group'
    };
  },

  getInitialState: function getInitialState() {
    var defaultActiveKey = this.props.defaultActiveKey;

    return {
      activeKey: defaultActiveKey
    };
  },

  render: function render() {
    var classes = this.getBsClassSet();
    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes), onSelect: null }),
      _utilsValidComponentChildren2['default'].map(this.props.children, this.renderPanel)
    );
  },

  renderPanel: function renderPanel(child, index) {
    var activeKey = this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

    var props = {
      bsStyle: child.props.bsStyle || this.props.bsStyle,
      key: child.key ? child.key : index,
      ref: child.ref
    };

    if (this.props.accordion) {
      props.collapsible = true;
      props.expanded = child.props.eventKey === activeKey;
      props.onSelect = this.handleSelect;
    }

    return _react.cloneElement(child, props);
  },

  shouldComponentUpdate: function shouldComponentUpdate() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleSelect: function handleSelect(e, key) {
    e.preventDefault();

    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(key);
      this._isChanging = false;
    }

    if (this.state.activeKey === key) {
      key = null;
    }

    this.setState({
      activeKey: key
    });
  }
});

exports['default'] = PanelGroup;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./utils/ValidComponentChildren":75,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],54:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var Popover = _react2['default'].createClass({
  displayName: 'Popover',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    /**
     * An html id attribute, necessary for accessibility
     * @type {string}
     * @required
     */
    id: _utilsCustomPropTypes2['default'].isRequiredForA11y(_react2['default'].PropTypes.string),

    /**
     * Sets the direction the Popover is positioned towards.
     */
    placement: _react2['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * The "left" position value for the Popover.
     */
    positionLeft: _react2['default'].PropTypes.number,
    /**
     * The "top" position value for the Popover.
     */
    positionTop: _react2['default'].PropTypes.number,
    /**
     * The "left" position value for the Popover arrow.
     */
    arrowOffsetLeft: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
    /**
     * The "top" position value for the Popover arrow.
     */
    arrowOffsetTop: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
    /**
     * Title text
     */
    title: _react2['default'].PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      placement: 'right'
    };
  },

  render: function render() {
    var _classes;

    var classes = (_classes = {
      'popover': true
    }, _classes[this.props.placement] = true, _classes);

    var style = {
      'left': this.props.positionLeft,
      'top': this.props.positionTop,
      'display': 'block'
    };

    var arrowStyle = {
      'left': this.props.arrowOffsetLeft,
      'top': this.props.arrowOffsetTop
    };

    return _react2['default'].createElement(
      'div',
      _extends({ role: 'tooltip' }, this.props, { className: _classnames2['default'](this.props.className, classes), style: style, title: null }),
      _react2['default'].createElement('div', { className: "arrow", style: arrowStyle }),
      this.props.title ? this.renderTitle() : null,
      _react2['default'].createElement(
        'div',
        { className: "popover-content" },
        this.props.children
      )
    );
  },

  renderTitle: function renderTitle() {
    return _react2['default'].createElement(
      'h3',
      { className: "popover-title" },
      this.props.title
    );
  }
});

exports['default'] = Popover;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./utils/CustomPropTypes":72,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],55:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var _utilsDomUtils = require('./utils/domUtils');

var _utilsDomUtils2 = _interopRequireDefault(_utilsDomUtils);

var Portal = _react2['default'].createClass({

  displayName: 'Portal',

  propTypes: {
    /**
     * The DOM Node that the Component will render it's children into
     */
    container: _utilsCustomPropTypes2['default'].mountable
  },

  componentDidMount: function componentDidMount() {
    this._renderOverlay();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._renderOverlay();
  },

  componentWillUnmount: function componentWillUnmount() {
    this._unrenderOverlay();
    this._unmountOverlayTarget();
  },

  _mountOverlayTarget: function _mountOverlayTarget() {
    if (!this._overlayTarget) {
      this._overlayTarget = document.createElement('div');
      this.getContainerDOMNode().appendChild(this._overlayTarget);
    }
  },

  _unmountOverlayTarget: function _unmountOverlayTarget() {
    if (this._overlayTarget) {
      this.getContainerDOMNode().removeChild(this._overlayTarget);
      this._overlayTarget = null;
    }
  },

  _renderOverlay: function _renderOverlay() {

    var overlay = !this.props.children ? null : _react2['default'].Children.only(this.props.children);

    // Save reference for future access.
    if (overlay !== null) {
      this._mountOverlayTarget();
      this._overlayInstance = _react2['default'].render(overlay, this._overlayTarget);
    } else {
      // Unrender if the component is null for transitions to null
      this._unrenderOverlay();
      this._unmountOverlayTarget();
    }
  },

  _unrenderOverlay: function _unrenderOverlay() {
    if (this._overlayTarget) {
      _react2['default'].unmountComponentAtNode(this._overlayTarget);
      this._overlayInstance = null;
    }
  },

  render: function render() {
    return null;
  },

  getOverlayDOMNode: function getOverlayDOMNode() {
    if (!this.isMounted()) {
      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
    }

    if (this._overlayInstance) {
      if (this._overlayInstance.getWrappedDOMNode) {
        return this._overlayInstance.getWrappedDOMNode();
      } else {
        return _react2['default'].findDOMNode(this._overlayInstance);
      }
    }

    return null;
  },

  getContainerDOMNode: function getContainerDOMNode() {
    return _react2['default'].findDOMNode(this.props.container) || _utilsDomUtils2['default'].ownerDocument(this).body;
  }
});

exports['default'] = Portal;
module.exports = exports['default'];
},{"./utils/CustomPropTypes":72,"./utils/domUtils":81,"babel-runtime/helpers/interop-require-default":91}],56:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsDomUtils = require('./utils/domUtils');

var _utilsDomUtils2 = _interopRequireDefault(_utilsDomUtils);

var _utilsOverlayPositionUtils = require('./utils/overlayPositionUtils');

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var Position = (function (_React$Component) {
  _inherits(Position, _React$Component);

  function Position(props, context) {
    _classCallCheck(this, Position);

    _React$Component.call(this, props, context);

    this.state = {
      positionLeft: null,
      positionTop: null,
      arrowOffsetLeft: null,
      arrowOffsetTop: null
    };

    this._needsFlush = false;
    this._lastTarget = null;
  }

  Position.prototype.componentDidMount = function componentDidMount() {
    this.updatePosition();
  };

  Position.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
    this._needsFlush = true;
  };

  Position.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this._needsFlush) {
      this._needsFlush = false;
      this.updatePosition();
    }
  };

  Position.prototype.componentWillUnmount = function componentWillUnmount() {
    // Probably not necessary, but just in case holding a reference to the
    // target causes problems somewhere.
    this._lastTarget = null;
  };

  Position.prototype.render = function render() {
    var _props = this.props;
    var children = _props.children;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['children', 'className']);

    var _state = this.state;
    var positionLeft = _state.positionLeft;
    var positionTop = _state.positionTop;

    var arrowPosition = _objectWithoutProperties(_state, ['positionLeft', 'positionTop']);

    var child = _react2['default'].Children.only(children);
    return _react.cloneElement(child, _extends({}, props, arrowPosition, {
      positionTop: positionTop,
      positionLeft: positionLeft,
      className: _classnames2['default'](className, child.props.className),
      style: _extends({}, child.props.style, {
        left: positionLeft,
        top: positionTop
      })
    }));
  };

  Position.prototype.getTargetSafe = function getTargetSafe() {
    if (!this.props.target) {
      return null;
    }

    var target = this.props.target(this.props);
    if (!target) {
      // This is so we can just use === check below on all falsy targets.
      return null;
    }

    return target;
  };

  Position.prototype.updatePosition = function updatePosition() {
    var target = this.getTargetSafe();
    if (target === this._lastTarget) {
      return;
    }
    this._lastTarget = target;

    if (!target) {
      this.setState({
        positionLeft: null,
        positionTop: null,
        arrowOffsetLeft: null,
        arrowOffsetTop: null
      });

      return;
    }

    var overlay = _react2['default'].findDOMNode(this);
    var container = _react2['default'].findDOMNode(this.props.container) || _utilsDomUtils2['default'].ownerDocument(this).body;

    this.setState(_utilsOverlayPositionUtils.calcOverlayPosition(this.props.placement, overlay, target, container, this.props.containerPadding));
  };

  return Position;
})(_react2['default'].Component);

Position.propTypes = {
  /**
   * Function mapping props to DOM node the component is positioned next to
   */
  target: _react2['default'].PropTypes.func,
  /**
   * "offsetParent" of the component
   */
  container: _utilsCustomPropTypes2['default'].mountable,
  /**
   * Minimum spacing in pixels between container border and component border
   */
  containerPadding: _react2['default'].PropTypes.number,
  /**
   * How to position the component relative to the target
   */
  placement: _react2['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
};

Position.defaultProps = {
  containerPadding: 0,
  placement: 'right'
};

exports['default'] = Position;
module.exports = exports['default'];
},{"./utils/CustomPropTypes":72,"./utils/domUtils":81,"./utils/overlayPositionUtils":83,"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91,"babel-runtime/helpers/object-without-properties":93,"classnames":110}],57:[function(require,module,exports){
/* eslint react/prop-types: [2, {ignore: "bsStyle"}] */
/* BootstrapMixin contains `bsStyle` type validation */

'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _Interpolate = require('./Interpolate');

var _Interpolate2 = _interopRequireDefault(_Interpolate);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var ProgressBar = _react2['default'].createClass({
  displayName: 'ProgressBar',

  propTypes: {
    min: _react.PropTypes.number,
    now: _react.PropTypes.number,
    max: _react.PropTypes.number,
    label: _react.PropTypes.node,
    srOnly: _react.PropTypes.bool,
    striped: _react.PropTypes.bool,
    active: _react.PropTypes.bool,
    children: onlyProgressBar,
    className: _react2['default'].PropTypes.string,
    interpolateClass: _react.PropTypes.node,
    isChild: _react.PropTypes.bool
  },

  mixins: [_BootstrapMixin2['default']],

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'progress-bar',
      min: 0,
      max: 100
    };
  },

  getPercentage: function getPercentage(now, min, max) {
    var roundPrecision = 1000;
    return Math.round((now - min) / (max - min) * 100 * roundPrecision) / roundPrecision;
  },

  render: function render() {
    if (this.props.isChild) {
      return this.renderProgressBar();
    }

    var content = undefined;

    if (this.props.children) {
      content = _utilsValidComponentChildren2['default'].map(this.props.children, this.renderChildBar);
    } else {
      content = this.renderProgressBar();
    }

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'progress') }),
      content
    );
  },

  renderChildBar: function renderChildBar(child, index) {
    return _react.cloneElement(child, {
      isChild: true,
      key: child.key ? child.key : index
    });
  },

  renderProgressBar: function renderProgressBar() {
    var percentage = this.getPercentage(this.props.now, this.props.min, this.props.max);

    var label = undefined;

    if (typeof this.props.label === 'string') {
      label = this.renderLabel(percentage);
    } else {
      label = this.props.label;
    }

    if (this.props.srOnly) {
      label = _react2['default'].createElement(
        'span',
        { className: "sr-only" },
        label
      );
    }

    var classes = _classnames2['default'](this.props.className, this.getBsClassSet(), {
      active: this.props.active,
      'progress-bar-striped': this.props.active || this.props.striped
    });

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: classes,
        role: "progressbar",
        style: { width: percentage + '%' },
        'aria-valuenow': this.props.now,
        'aria-valuemin': this.props.min,
        'aria-valuemax': this.props.max }),
      label
    );
  },

  renderLabel: function renderLabel(percentage) {
    var InterpolateClass = this.props.interpolateClass || _Interpolate2['default'];

    return _react2['default'].createElement(
      InterpolateClass,
      {
        now: this.props.now,
        min: this.props.min,
        max: this.props.max,
        percent: percentage,
        bsStyle: this.props.bsStyle },
      this.props.label
    );
  }
});

/**
 * Custom propTypes checker
 */
function onlyProgressBar(props, propName, componentName) {
  if (props[propName]) {
    var _ret = (function () {
      var error = undefined,
          childIdentifier = undefined;

      _react2['default'].Children.forEach(props[propName], function (child) {
        if (child.type !== ProgressBar) {
          childIdentifier = child.type.displayName ? child.type.displayName : child.type;
          error = new Error('Children of ' + componentName + ' can contain only ProgressBar components. Found ' + childIdentifier);
        }
      });

      return {
        v: error
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  }
}

exports['default'] = ProgressBar;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./Interpolate":30,"./utils/ValidComponentChildren":75,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],58:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _utilsDomUtils = require('./utils/domUtils');

var _utilsDomUtils2 = _interopRequireDefault(_utilsDomUtils);

var _utilsEventListener = require('./utils/EventListener');

// TODO: Merge this logic with dropdown logic once #526 is done.

// TODO: Consider using an ES6 symbol here, once we use babel-runtime.

var _utilsEventListener2 = _interopRequireDefault(_utilsEventListener);

var CLICK_WAS_INSIDE = '__click_was_inside';

function suppressRootClose(event) {
  // Tag the native event to prevent the root close logic on document click.
  // This seems safer than using event.nativeEvent.stopImmediatePropagation(),
  // which is only supported in IE >= 9.
  event.nativeEvent[CLICK_WAS_INSIDE] = true;
}

var RootCloseWrapper = (function (_React$Component) {
  _inherits(RootCloseWrapper, _React$Component);

  function RootCloseWrapper(props) {
    _classCallCheck(this, RootCloseWrapper);

    _React$Component.call(this, props);

    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleDocumentKeyUp = this.handleDocumentKeyUp.bind(this);
  }

  RootCloseWrapper.prototype.bindRootCloseHandlers = function bindRootCloseHandlers() {
    var doc = _utilsDomUtils2['default'].ownerDocument(this);

    this._onDocumentClickListener = _utilsEventListener2['default'].listen(doc, 'click', this.handleDocumentClick);
    this._onDocumentKeyupListener = _utilsEventListener2['default'].listen(doc, 'keyup', this.handleDocumentKeyUp);
  };

  RootCloseWrapper.prototype.handleDocumentClick = function handleDocumentClick(e) {
    // This is now the native event.
    if (e[CLICK_WAS_INSIDE]) {
      return;
    }

    this.props.onRootClose();
  };

  RootCloseWrapper.prototype.handleDocumentKeyUp = function handleDocumentKeyUp(e) {
    if (e.keyCode === 27) {
      this.props.onRootClose();
    }
  };

  RootCloseWrapper.prototype.unbindRootCloseHandlers = function unbindRootCloseHandlers() {
    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.remove();
    }

    if (this._onDocumentKeyupListener) {
      this._onDocumentKeyupListener.remove();
    }
  };

  RootCloseWrapper.prototype.componentDidMount = function componentDidMount() {
    this.bindRootCloseHandlers();
  };

  RootCloseWrapper.prototype.render = function render() {
    // Wrap the child in a new element, so the child won't have to handle
    // potentially combining multiple onClick listeners.
    return _react2['default'].createElement(
      'div',
      { onClick: suppressRootClose },
      _react2['default'].Children.only(this.props.children)
    );
  };

  RootCloseWrapper.prototype.getWrappedDOMNode = function getWrappedDOMNode() {
    // We can't use a ref to identify the wrapped child, since we might be
    // stealing the ref from the owner, but we know exactly the DOM structure
    // that will be rendered, so we can just do this to get the child's DOM
    // node for doing size calculations in OverlayMixin.
    return _react2['default'].findDOMNode(this).children[0];
  };

  RootCloseWrapper.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unbindRootCloseHandlers();
  };

  return RootCloseWrapper;
})(_react2['default'].Component);

exports['default'] = RootCloseWrapper;

RootCloseWrapper.propTypes = {
  onRootClose: _react2['default'].PropTypes.func.isRequired
};
module.exports = exports['default'];
},{"./utils/EventListener":73,"./utils/domUtils":81,"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91}],59:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var Row = _react2['default'].createClass({
  displayName: 'Row',

  propTypes: {
    /**
     * You can use a custom element for this component
     */
    componentClass: _utilsCustomPropTypes2['default'].elementType
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render: function render() {
    var ComponentClass = this.props.componentClass;

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'row') }),
      this.props.children
    );
  }
});

exports['default'] = Row;
module.exports = exports['default'];
},{"./utils/CustomPropTypes":72,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],60:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

/**
 * Note: This is intended as a stop-gap for accessibility concerns that the
 * Bootstrap CSS does not address as they have styled anchors and not buttons
 * in many cases.
 */

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var SafeAnchor = (function (_React$Component) {
  _inherits(SafeAnchor, _React$Component);

  function SafeAnchor(props) {
    _classCallCheck(this, SafeAnchor);

    _React$Component.call(this, props);

    this.handleClick = this.handleClick.bind(this);
  }

  SafeAnchor.prototype.handleClick = function handleClick(event) {
    if (this.props.href === undefined) {
      event.preventDefault();
    }
  };

  SafeAnchor.prototype.render = function render() {
    return _react2['default'].createElement('a', _extends({ role: this.props.href ? undefined : 'button'
    }, this.props, {
      onClick: _utilsCreateChainedFunction2['default'](this.props.onClick, this.handleClick),
      href: this.props.href || '' }));
  };

  return SafeAnchor;
})(_react2['default'].Component);

exports['default'] = SafeAnchor;

SafeAnchor.propTypes = {
  href: _react2['default'].PropTypes.string,
  onClick: _react2['default'].PropTypes.func
};
module.exports = exports['default'];
},{"./utils/createChainedFunction":77,"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91}],61:[function(require,module,exports){
/* eslint react/prop-types: [2, {ignore: "bsSize"}] */
/* BootstrapMixin contains `bsSize` type validation */

'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _DropdownStateMixin = require('./DropdownStateMixin');

var _DropdownStateMixin2 = _interopRequireDefault(_DropdownStateMixin);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _ButtonGroup = require('./ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

var _DropdownMenu = require('./DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var SplitButton = _react2['default'].createClass({
  displayName: 'SplitButton',

  mixins: [_BootstrapMixin2['default'], _DropdownStateMixin2['default']],

  propTypes: {
    pullRight: _react2['default'].PropTypes.bool,
    title: _react2['default'].PropTypes.node,
    href: _react2['default'].PropTypes.string,
    id: _react2['default'].PropTypes.string,
    target: _react2['default'].PropTypes.string,
    dropdownTitle: _react2['default'].PropTypes.node,
    dropup: _react2['default'].PropTypes.bool,
    onClick: _react2['default'].PropTypes.func,
    onSelect: _react2['default'].PropTypes.func,
    disabled: _react2['default'].PropTypes.bool,
    className: _react2['default'].PropTypes.string,
    children: _react2['default'].PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      dropdownTitle: 'Toggle dropdown'
    };
  },

  render: function render() {
    var groupClasses = {
      'open': this.state.open,
      'dropup': this.props.dropup
    };

    var button = _react2['default'].createElement(
      _Button2['default'],
      _extends({}, this.props, {
        ref: "button",
        onClick: this.handleButtonClick,
        title: null,
        id: null }),
      this.props.title
    );

    var dropdownButton = _react2['default'].createElement(
      _Button2['default'],
      _extends({}, this.props, {
        ref: "dropdownButton",
        className: _classnames2['default'](this.props.className, 'dropdown-toggle'),
        onClick: this.handleDropdownClick,
        title: null,
        href: null,
        target: null,
        id: null }),
      _react2['default'].createElement(
        'span',
        { className: "sr-only" },
        this.props.dropdownTitle
      ),
      _react2['default'].createElement('span', { className: "caret" }),
      _react2['default'].createElement(
        'span',
        { style: { letterSpacing: '-.3em' } },
        ' '
      )
    );

    return _react2['default'].createElement(
      _ButtonGroup2['default'],
      {
        bsSize: this.props.bsSize,
        className: _classnames2['default'](groupClasses),
        id: this.props.id },
      button,
      dropdownButton,
      _react2['default'].createElement(
        _DropdownMenu2['default'],
        {
          ref: "menu",
          onSelect: this.handleOptionSelect,
          'aria-labelledby': this.props.id,
          pullRight: this.props.pullRight },
        this.props.children
      )
    );
  },

  handleButtonClick: function handleButtonClick(e) {
    if (this.state.open) {
      this.setDropdownState(false);
    }

    if (this.props.onClick) {
      this.props.onClick(e, this.props.href, this.props.target);
    }
  },

  handleDropdownClick: function handleDropdownClick(e) {
    e.preventDefault();

    this.setDropdownState(!this.state.open);
  },

  handleOptionSelect: function handleOptionSelect(key) {
    if (this.props.onSelect) {
      this.props.onSelect(key);
    }

    this.setDropdownState(false);
  }
});

exports['default'] = SplitButton;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./Button":8,"./ButtonGroup":9,"./DropdownMenu":19,"./DropdownStateMixin":20,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],62:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var SubNav = _react2['default'].createClass({
  displayName: 'SubNav',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    onSelect: _react2['default'].PropTypes.func,
    active: _react2['default'].PropTypes.bool,
    activeHref: _react2['default'].PropTypes.string,
    activeKey: _react2['default'].PropTypes.any,
    disabled: _react2['default'].PropTypes.bool,
    eventKey: _react2['default'].PropTypes.any,
    href: _react2['default'].PropTypes.string,
    title: _react2['default'].PropTypes.string,
    text: _react2['default'].PropTypes.node,
    target: _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'nav'
    };
  },

  handleClick: function handleClick(e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    }
  },

  isActive: function isActive() {
    return this.isChildActive(this);
  },

  isChildActive: function isChildActive(child) {
    if (child.props.active) {
      return true;
    }

    if (this.props.activeKey != null && this.props.activeKey === child.props.eventKey) {
      return true;
    }

    if (this.props.activeHref != null && this.props.activeHref === child.props.href) {
      return true;
    }

    if (child.props.children) {
      var isActive = false;

      _utilsValidComponentChildren2['default'].forEach(child.props.children, function (grandchild) {
        if (this.isChildActive(grandchild)) {
          isActive = true;
        }
      }, this);

      return isActive;
    }

    return false;
  },

  getChildActiveProp: function getChildActiveProp(child) {
    if (child.props.active) {
      return true;
    }
    if (this.props.activeKey != null) {
      if (child.props.eventKey === this.props.activeKey) {
        return true;
      }
    }
    if (this.props.activeHref != null) {
      if (child.props.href === this.props.activeHref) {
        return true;
      }
    }

    return child.props.active;
  },

  render: function render() {
    var classes = {
      'active': this.isActive(),
      'disabled': this.props.disabled
    };

    return _react2['default'].createElement(
      'li',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      _react2['default'].createElement(
        _SafeAnchor2['default'],
        {
          href: this.props.href,
          title: this.props.title,
          target: this.props.target,
          onClick: this.handleClick },
        this.props.text
      ),
      _react2['default'].createElement(
        'ul',
        { className: "nav" },
        _utilsValidComponentChildren2['default'].map(this.props.children, this.renderNavItem)
      )
    );
  },

  renderNavItem: function renderNavItem(child, index) {
    return _react.cloneElement(child, {
      active: this.getChildActiveProp(child),
      onSelect: _utilsCreateChainedFunction2['default'](child.props.onSelect, this.props.onSelect),
      key: child.key ? child.key : index
    });
  }
});

exports['default'] = SubNav;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./SafeAnchor":60,"./utils/ValidComponentChildren":75,"./utils/createChainedFunction":77,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],63:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsTransitionEvents = require('./utils/TransitionEvents');

var _utilsTransitionEvents2 = _interopRequireDefault(_utilsTransitionEvents);

var TabPane = _react2['default'].createClass({
  displayName: 'TabPane',

  propTypes: {
    active: _react2['default'].PropTypes.bool,
    animation: _react2['default'].PropTypes.bool,
    onAnimateOutEnd: _react2['default'].PropTypes.func,
    disabled: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      animation: true
    };
  },

  getInitialState: function getInitialState() {
    return {
      animateIn: false,
      animateOut: false
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.animation) {
      if (!this.state.animateIn && nextProps.active && !this.props.active) {
        this.setState({
          animateIn: true
        });
      } else if (!this.state.animateOut && !nextProps.active && this.props.active) {
        this.setState({
          animateOut: true
        });
      }
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.state.animateIn) {
      setTimeout(this.startAnimateIn, 0);
    }
    if (this.state.animateOut) {
      _utilsTransitionEvents2['default'].addEndEventListener(_react2['default'].findDOMNode(this), this.stopAnimateOut);
    }
  },

  startAnimateIn: function startAnimateIn() {
    if (this.isMounted()) {
      this.setState({
        animateIn: false
      });
    }
  },

  stopAnimateOut: function stopAnimateOut() {
    if (this.isMounted()) {
      this.setState({
        animateOut: false
      });

      if (this.props.onAnimateOutEnd) {
        this.props.onAnimateOutEnd();
      }
    }
  },

  render: function render() {
    var classes = {
      'tab-pane': true,
      'fade': true,
      'active': this.props.active || this.state.animateOut,
      'in': this.props.active && !this.state.animateIn
    };

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        role: 'tabpanel',
        'aria-hidden': !this.props.active,
        className: _classnames2['default'](this.props.className, classes)
      }),
      this.props.children
    );
  }
});

exports['default'] = TabPane;
module.exports = exports['default'];
},{"./utils/TransitionEvents":74,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],64:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _NavItem = require('./NavItem');

var _NavItem2 = _interopRequireDefault(_NavItem);

var panelId = function panelId(props, child) {
  return child.props.id ? child.props.id : props.id && props.id + '___panel___' + child.props.eventKey;
};
var tabId = function tabId(props, child) {
  return child.props.id ? child.props.id + '___tab' : props.id && props.id + '___tab___' + child.props.eventKey;
};

function getDefaultActiveKeyFromChildren(children) {
  var defaultActiveKey = undefined;

  _utilsValidComponentChildren2['default'].forEach(children, function (child) {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });

  return defaultActiveKey;
}

var TabbedArea = _react2['default'].createClass({
  displayName: 'TabbedArea',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    activeKey: _react2['default'].PropTypes.any,
    defaultActiveKey: _react2['default'].PropTypes.any,
    bsStyle: _react2['default'].PropTypes.oneOf(['tabs', 'pills']),
    animation: _react2['default'].PropTypes.bool,
    id: _react2['default'].PropTypes.string,
    onSelect: _react2['default'].PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsStyle: 'tabs',
      animation: true
    };
  },

  getInitialState: function getInitialState() {
    var defaultActiveKey = this.props.defaultActiveKey != null ? this.props.defaultActiveKey : getDefaultActiveKeyFromChildren(this.props.children);

    return {
      activeKey: defaultActiveKey,
      previousActiveKey: null
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.activeKey != null && nextProps.activeKey !== this.props.activeKey) {
      this.setState({
        previousActiveKey: this.props.activeKey
      });
    }
  },

  handlePaneAnimateOutEnd: function handlePaneAnimateOutEnd() {
    this.setState({
      previousActiveKey: null
    });
  },

  render: function render() {
    var _props = this.props;
    var id = _props.id;

    var props = _objectWithoutProperties(_props, ['id']);

    var activeKey = this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

    function renderTabIfSet(child) {
      return child.props.tab != null ? this.renderTab(child) : null;
    }

    var nav = _react2['default'].createElement(
      _Nav2['default'],
      _extends({}, props, { activeKey: activeKey, onSelect: this.handleSelect, ref: "tabs" }),
      _utilsValidComponentChildren2['default'].map(this.props.children, renderTabIfSet, this)
    );

    return _react2['default'].createElement(
      'div',
      null,
      nav,
      _react2['default'].createElement(
        'div',
        { id: id, className: "tab-content", ref: "panes" },
        _utilsValidComponentChildren2['default'].map(this.props.children, this.renderPane)
      )
    );
  },

  getActiveKey: function getActiveKey() {
    return this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;
  },

  renderPane: function renderPane(child, index) {
    var activeKey = this.getActiveKey();

    var active = child.props.eventKey === activeKey && (this.state.previousActiveKey == null || !this.props.animation);

    return _react.cloneElement(child, {
      active: active,
      id: panelId(this.props, child),
      'aria-labelledby': tabId(this.props, child),
      key: child.key ? child.key : index,
      animation: this.props.animation,
      onAnimateOutEnd: this.state.previousActiveKey != null && child.props.eventKey === this.state.previousActiveKey ? this.handlePaneAnimateOutEnd : null
    });
  },

  renderTab: function renderTab(child) {
    var _child$props = child.props;
    var eventKey = _child$props.eventKey;
    var className = _child$props.className;
    var tab = _child$props.tab;
    var disabled = _child$props.disabled;

    return _react2['default'].createElement(
      _NavItem2['default'],
      {
        linkId: tabId(this.props, child),
        ref: 'tab' + eventKey,
        'aria-controls': panelId(this.props, child),
        eventKey: eventKey,
        className: className,
        disabled: disabled },
      tab
    );
  },

  shouldComponentUpdate: function shouldComponentUpdate() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleSelect: function handleSelect(key) {
    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(key);
      this._isChanging = false;
    } else if (key !== this.getActiveKey()) {
      this.setState({
        activeKey: key,
        previousActiveKey: this.getActiveKey()
      });
    }
  }
});

exports['default'] = TabbedArea;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./Nav":42,"./NavItem":43,"./utils/ValidComponentChildren":75,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"babel-runtime/helpers/object-without-properties":93}],65:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Table = _react2['default'].createClass({
  displayName: 'Table',

  propTypes: {
    striped: _react2['default'].PropTypes.bool,
    bordered: _react2['default'].PropTypes.bool,
    condensed: _react2['default'].PropTypes.bool,
    hover: _react2['default'].PropTypes.bool,
    responsive: _react2['default'].PropTypes.bool
  },

  render: function render() {
    var classes = {
      'table': true,
      'table-striped': this.props.striped,
      'table-bordered': this.props.bordered,
      'table-condensed': this.props.condensed,
      'table-hover': this.props.hover
    };
    var table = _react2['default'].createElement(
      'table',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );

    return this.props.responsive ? _react2['default'].createElement(
      'div',
      { className: "table-responsive" },
      table
    ) : table;
  }
});

exports['default'] = Table;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],66:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var Thumbnail = _react2['default'].createClass({
  displayName: 'Thumbnail',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    alt: _react2['default'].PropTypes.string,
    href: _react2['default'].PropTypes.string,
    src: _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'thumbnail'
    };
  },

  render: function render() {
    var classes = this.getBsClassSet();

    if (this.props.href) {
      return _react2['default'].createElement(
        _SafeAnchor2['default'],
        _extends({}, this.props, { href: this.props.href, className: _classnames2['default'](this.props.className, classes) }),
        _react2['default'].createElement('img', { src: this.props.src, alt: this.props.alt })
      );
    } else {
      if (this.props.children) {
        return _react2['default'].createElement(
          'div',
          _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
          _react2['default'].createElement('img', { src: this.props.src, alt: this.props.alt }),
          _react2['default'].createElement(
            'div',
            { className: "caption" },
            this.props.children
          )
        );
      } else {
        return _react2['default'].createElement(
          'div',
          _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
          _react2['default'].createElement('img', { src: this.props.src, alt: this.props.alt })
        );
      }
    }
  }
});

exports['default'] = Thumbnail;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"./SafeAnchor":60,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],67:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var Tooltip = _react2['default'].createClass({
  displayName: 'Tooltip',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    /**
     * An html id attribute, necessary for accessibility
     * @type {string}
     * @required
     */
    id: _utilsCustomPropTypes2['default'].isRequiredForA11y(_react2['default'].PropTypes.string),

    /**
     * Sets the direction the Tooltip is positioned towards.
     */
    placement: _react2['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * The "left" position value for the Tooltip.
     */
    positionLeft: _react2['default'].PropTypes.number,
    /**
     * The "top" position value for the Tooltip.
     */
    positionTop: _react2['default'].PropTypes.number,
    /**
     * The "left" position value for the Tooltip arrow.
     */
    arrowOffsetLeft: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
    /**
     * The "top" position value for the Tooltip arrow.
     */
    arrowOffsetTop: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
    /**
     * Title text
     */
    title: _react2['default'].PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      placement: 'right'
    };
  },

  render: function render() {
    var _classes;

    var classes = (_classes = {
      'tooltip': true
    }, _classes[this.props.placement] = true, _classes);

    var style = _extends({
      'left': this.props.positionLeft,
      'top': this.props.positionTop
    }, this.props.style);

    // eslint-disable-line react/prop-types
    var arrowStyle = {
      'left': this.props.arrowOffsetLeft,
      'top': this.props.arrowOffsetTop
    };

    return _react2['default'].createElement(
      'div',
      _extends({ role: 'tooltip' }, this.props, { className: _classnames2['default'](this.props.className, classes), style: style }),
      _react2['default'].createElement('div', { className: "tooltip-arrow", style: arrowStyle }),
      _react2['default'].createElement(
        'div',
        { className: "tooltip-inner" },
        this.props.children
      )
    );
  }
});

exports['default'] = Tooltip;
module.exports = exports['default'];
// we don't want to expose the `style` property
},{"./BootstrapMixin":7,"./utils/CustomPropTypes":72,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],68:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _utilsTransitionEvents = require('./utils/TransitionEvents');

var _utilsTransitionEvents2 = _interopRequireDefault(_utilsTransitionEvents);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var UNMOUNTED = 0;
exports.UNMOUNTED = UNMOUNTED;
var EXITED = 1;
exports.EXITED = EXITED;
var ENTERING = 2;
exports.ENTERING = ENTERING;
var ENTERED = 3;
exports.ENTERED = ENTERED;
var EXITING = 4;

exports.EXITING = EXITING;

var Transition = (function (_React$Component) {
  _inherits(Transition, _React$Component);

  function Transition(props, context) {
    _classCallCheck(this, Transition);

    _React$Component.call(this, props, context);

    var initialStatus = undefined;
    if (props['in']) {
      // Start enter transition in componentDidMount.
      initialStatus = props.transitionAppear ? EXITED : ENTERED;
    } else {
      initialStatus = props.unmountOnExit ? UNMOUNTED : EXITED;
    }
    this.state = { status: initialStatus };

    this.nextCallback = null;
  }

  Transition.prototype.componentDidMount = function componentDidMount() {
    if (this.props.transitionAppear && this.props['in']) {
      this.performEnter(this.props);
    }
  };

  Transition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var status = this.state.status;
    if (nextProps['in']) {
      if (status === EXITING) {
        this.performEnter(nextProps);
      } else if (this.props.unmountOnExit) {
        if (status === UNMOUNTED) {
          // Start enter transition in componentDidUpdate.
          this.setState({ status: EXITED });
        }
      } else if (status === EXITED) {
        this.performEnter(nextProps);
      }

      // Otherwise we're already entering or entered.
    } else {
        if (status === ENTERING || status === ENTERED) {
          this.performExit(nextProps);
        }

        // Otherwise we're already exited or exiting.
      }
  };

  Transition.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.props.unmountOnExit && this.state.status === EXITED) {
      // EXITED is always a transitional state to either ENTERING or UNMOUNTED
      // when using unmountOnExit.
      if (this.props['in']) {
        this.performEnter(this.props);
      } else {
        this.setState({ status: UNMOUNTED });
      }
    }
  };

  Transition.prototype.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  Transition.prototype.performEnter = function performEnter(props) {
    var _this = this;

    this.cancelNextCallback();
    var node = _react2['default'].findDOMNode(this);

    // Not this.props, because we might be about to receive new props.
    props.onEnter(node);

    this.safeSetState({ status: ENTERING }, function () {
      _this.props.onEntering(node);

      _this.onTransitionEnd(node, function () {
        _this.safeSetState({ status: ENTERED }, function () {
          _this.props.onEntered(node);
        });
      });
    });
  };

  Transition.prototype.performExit = function performExit(props) {
    var _this2 = this;

    this.cancelNextCallback();
    var node = _react2['default'].findDOMNode(this);

    // Not this.props, because we might be about to receive new props.
    props.onExit(node);

    this.safeSetState({ status: EXITING }, function () {
      _this2.props.onExiting(node);

      _this2.onTransitionEnd(node, function () {
        _this2.safeSetState({ status: EXITED }, function () {
          _this2.props.onExited(node);
        });
      });
    });
  };

  Transition.prototype.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  Transition.prototype.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    this.setState(nextState, this.setNextCallback(callback));
  };

  Transition.prototype.setNextCallback = function setNextCallback(callback) {
    var _this3 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this3.nextCallback = null;

        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  Transition.prototype.onTransitionEnd = function onTransitionEnd(node, handler) {
    this.setNextCallback(handler);

    if (node) {
      _utilsTransitionEvents2['default'].addEndEventListener(node, this.nextCallback);
      setTimeout(this.nextCallback, this.props.duration);
    } else {
      setTimeout(this.nextCallback, 0);
    }
  };

  Transition.prototype.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }

    var _props = this.props;
    var children = _props.children;
    var className = _props.className;

    var childProps = _objectWithoutProperties(_props, ['children', 'className']);

    _Object$keys(Transition.propTypes).forEach(function (key) {
      return delete childProps[key];
    });

    var transitionClassName = undefined;
    if (status === EXITED) {
      transitionClassName = this.props.exitedClassName;
    } else if (status === ENTERING) {
      transitionClassName = this.props.enteringClassName;
    } else if (status === ENTERED) {
      transitionClassName = this.props.enteredClassName;
    } else if (status === EXITING) {
      transitionClassName = this.props.exitingClassName;
    }

    var child = _react2['default'].Children.only(children);
    return _react2['default'].cloneElement(child, _extends({}, childProps, {
      className: _classnames2['default'](child.props.className, className, transitionClassName)
    }));
  };

  return Transition;
})(_react2['default'].Component);

Transition.propTypes = {
  /**
   * Show the component; triggers the enter or exit animation
   */
  'in': _react2['default'].PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is not shown
   */
  unmountOnExit: _react2['default'].PropTypes.bool,

  /**
   * Run the enter animation when the component mounts, if it is initially
   * shown
   */
  transitionAppear: _react2['default'].PropTypes.bool,

  /**
   * Duration of the animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  duration: _react2['default'].PropTypes.number,

  /**
   * CSS class or classes applied when the component is exited
   */
  exitedClassName: _react2['default'].PropTypes.string,
  /**
   * CSS class or classes applied while the component is exiting
   */
  exitingClassName: _react2['default'].PropTypes.string,
  /**
   * CSS class or classes applied when the component is entered
   */
  enteredClassName: _react2['default'].PropTypes.string,
  /**
   * CSS class or classes applied while the component is entering
   */
  enteringClassName: _react2['default'].PropTypes.string,

  /**
   * Callback fired before the "entering" classes are applied
   */
  onEnter: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the "entering" classes are applied
   */
  onEntering: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the "enter" classes are applied
   */
  onEntered: _react2['default'].PropTypes.func,
  /**
   * Callback fired before the "exiting" classes are applied
   */
  onExit: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the "exiting" classes are applied
   */
  onExiting: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the "exited" classes are applied
   */
  onExited: _react2['default'].PropTypes.func
};

// Name the function so it is clearer in the documentation
function noop() {}

Transition.defaultProps = {
  'in': false,
  duration: 300,
  unmountOnExit: false,
  transitionAppear: false,

  onEnter: noop,
  onEntering: noop,
  onEntered: noop,

  onExit: noop,
  onExiting: noop,
  onExited: noop
};

exports['default'] = Transition;
},{"./utils/TransitionEvents":74,"babel-runtime/core-js/object/keys":86,"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91,"babel-runtime/helpers/object-without-properties":93,"classnames":110}],69:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var Well = _react2['default'].createClass({
  displayName: 'Well',

  mixins: [_BootstrapMixin2['default']],

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'well'
    };
  },

  render: function render() {
    var classes = this.getBsClassSet();

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  }
});

exports['default'] = Well;
module.exports = exports['default'];
},{"./BootstrapMixin":7,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91,"classnames":110}],70:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

exports.__esModule = true;

var _Accordion2 = require('./Accordion');

var _Accordion3 = _interopRequireDefault(_Accordion2);

exports.Accordion = _Accordion3['default'];

var _Affix2 = require('./Affix');

var _Affix3 = _interopRequireDefault(_Affix2);

exports.Affix = _Affix3['default'];

var _AffixMixin2 = require('./AffixMixin');

var _AffixMixin3 = _interopRequireDefault(_AffixMixin2);

exports.AffixMixin = _AffixMixin3['default'];

var _Alert2 = require('./Alert');

var _Alert3 = _interopRequireDefault(_Alert2);

exports.Alert = _Alert3['default'];

var _Badge2 = require('./Badge');

var _Badge3 = _interopRequireDefault(_Badge2);

exports.Badge = _Badge3['default'];

var _BootstrapMixin2 = require('./BootstrapMixin');

var _BootstrapMixin3 = _interopRequireDefault(_BootstrapMixin2);

exports.BootstrapMixin = _BootstrapMixin3['default'];

var _Button2 = require('./Button');

var _Button3 = _interopRequireDefault(_Button2);

exports.Button = _Button3['default'];

var _ButtonGroup2 = require('./ButtonGroup');

var _ButtonGroup3 = _interopRequireDefault(_ButtonGroup2);

exports.ButtonGroup = _ButtonGroup3['default'];

var _ButtonInput2 = require('./ButtonInput');

var _ButtonInput3 = _interopRequireDefault(_ButtonInput2);

exports.ButtonInput = _ButtonInput3['default'];

var _ButtonToolbar2 = require('./ButtonToolbar');

var _ButtonToolbar3 = _interopRequireDefault(_ButtonToolbar2);

exports.ButtonToolbar = _ButtonToolbar3['default'];

var _Carousel2 = require('./Carousel');

var _Carousel3 = _interopRequireDefault(_Carousel2);

exports.Carousel = _Carousel3['default'];

var _CarouselItem2 = require('./CarouselItem');

var _CarouselItem3 = _interopRequireDefault(_CarouselItem2);

exports.CarouselItem = _CarouselItem3['default'];

var _Col2 = require('./Col');

var _Col3 = _interopRequireDefault(_Col2);

exports.Col = _Col3['default'];

var _CollapsibleMixin2 = require('./CollapsibleMixin');

var _CollapsibleMixin3 = _interopRequireDefault(_CollapsibleMixin2);

exports.CollapsibleMixin = _CollapsibleMixin3['default'];

var _CollapsibleNav2 = require('./CollapsibleNav');

var _CollapsibleNav3 = _interopRequireDefault(_CollapsibleNav2);

exports.CollapsibleNav = _CollapsibleNav3['default'];

var _DropdownButton2 = require('./DropdownButton');

var _DropdownButton3 = _interopRequireDefault(_DropdownButton2);

exports.DropdownButton = _DropdownButton3['default'];

var _DropdownMenu2 = require('./DropdownMenu');

var _DropdownMenu3 = _interopRequireDefault(_DropdownMenu2);

exports.DropdownMenu = _DropdownMenu3['default'];

var _DropdownStateMixin2 = require('./DropdownStateMixin');

var _DropdownStateMixin3 = _interopRequireDefault(_DropdownStateMixin2);

exports.DropdownStateMixin = _DropdownStateMixin3['default'];

var _FadeMixin2 = require('./FadeMixin');

var _FadeMixin3 = _interopRequireDefault(_FadeMixin2);

exports.FadeMixin = _FadeMixin3['default'];

var _Glyphicon2 = require('./Glyphicon');

var _Glyphicon3 = _interopRequireDefault(_Glyphicon2);

exports.Glyphicon = _Glyphicon3['default'];

var _Grid2 = require('./Grid');

var _Grid3 = _interopRequireDefault(_Grid2);

exports.Grid = _Grid3['default'];

var _Input2 = require('./Input');

var _Input3 = _interopRequireDefault(_Input2);

exports.Input = _Input3['default'];

var _Interpolate2 = require('./Interpolate');

var _Interpolate3 = _interopRequireDefault(_Interpolate2);

exports.Interpolate = _Interpolate3['default'];

var _Jumbotron2 = require('./Jumbotron');

var _Jumbotron3 = _interopRequireDefault(_Jumbotron2);

exports.Jumbotron = _Jumbotron3['default'];

var _Label2 = require('./Label');

var _Label3 = _interopRequireDefault(_Label2);

exports.Label = _Label3['default'];

var _ListGroup2 = require('./ListGroup');

var _ListGroup3 = _interopRequireDefault(_ListGroup2);

exports.ListGroup = _ListGroup3['default'];

var _ListGroupItem2 = require('./ListGroupItem');

var _ListGroupItem3 = _interopRequireDefault(_ListGroupItem2);

exports.ListGroupItem = _ListGroupItem3['default'];

var _MenuItem2 = require('./MenuItem');

var _MenuItem3 = _interopRequireDefault(_MenuItem2);

exports.MenuItem = _MenuItem3['default'];

var _Modal2 = require('./Modal');

var _Modal3 = _interopRequireDefault(_Modal2);

exports.Modal = _Modal3['default'];

var _ModalHeader2 = require('./ModalHeader');

var _ModalHeader3 = _interopRequireDefault(_ModalHeader2);

exports.ModalHeader = _ModalHeader3['default'];

var _ModalTitle2 = require('./ModalTitle');

var _ModalTitle3 = _interopRequireDefault(_ModalTitle2);

exports.ModalTitle = _ModalTitle3['default'];

var _ModalBody2 = require('./ModalBody');

var _ModalBody3 = _interopRequireDefault(_ModalBody2);

exports.ModalBody = _ModalBody3['default'];

var _ModalFooter2 = require('./ModalFooter');

var _ModalFooter3 = _interopRequireDefault(_ModalFooter2);

exports.ModalFooter = _ModalFooter3['default'];

var _Nav2 = require('./Nav');

var _Nav3 = _interopRequireDefault(_Nav2);

exports.Nav = _Nav3['default'];

var _Navbar2 = require('./Navbar');

var _Navbar3 = _interopRequireDefault(_Navbar2);

exports.Navbar = _Navbar3['default'];

var _NavItem2 = require('./NavItem');

var _NavItem3 = _interopRequireDefault(_NavItem2);

exports.NavItem = _NavItem3['default'];

var _Overlay2 = require('./Overlay');

var _Overlay3 = _interopRequireDefault(_Overlay2);

exports.Overlay = _Overlay3['default'];

var _OverlayTrigger2 = require('./OverlayTrigger');

var _OverlayTrigger3 = _interopRequireDefault(_OverlayTrigger2);

exports.OverlayTrigger = _OverlayTrigger3['default'];

var _PageHeader2 = require('./PageHeader');

var _PageHeader3 = _interopRequireDefault(_PageHeader2);

exports.PageHeader = _PageHeader3['default'];

var _PageItem2 = require('./PageItem');

var _PageItem3 = _interopRequireDefault(_PageItem2);

exports.PageItem = _PageItem3['default'];

var _Pager2 = require('./Pager');

var _Pager3 = _interopRequireDefault(_Pager2);

exports.Pager = _Pager3['default'];

var _Pagination2 = require('./Pagination');

var _Pagination3 = _interopRequireDefault(_Pagination2);

exports.Pagination = _Pagination3['default'];

var _Panel2 = require('./Panel');

var _Panel3 = _interopRequireDefault(_Panel2);

exports.Panel = _Panel3['default'];

var _PanelGroup2 = require('./PanelGroup');

var _PanelGroup3 = _interopRequireDefault(_PanelGroup2);

exports.PanelGroup = _PanelGroup3['default'];

var _Popover2 = require('./Popover');

var _Popover3 = _interopRequireDefault(_Popover2);

exports.Popover = _Popover3['default'];

var _ProgressBar2 = require('./ProgressBar');

var _ProgressBar3 = _interopRequireDefault(_ProgressBar2);

exports.ProgressBar = _ProgressBar3['default'];

var _Row2 = require('./Row');

var _Row3 = _interopRequireDefault(_Row2);

exports.Row = _Row3['default'];

var _SafeAnchor2 = require('./SafeAnchor');

var _SafeAnchor3 = _interopRequireDefault(_SafeAnchor2);

exports.SafeAnchor = _SafeAnchor3['default'];

var _SplitButton2 = require('./SplitButton');

var _SplitButton3 = _interopRequireDefault(_SplitButton2);

exports.SplitButton = _SplitButton3['default'];

var _styleMaps2 = require('./styleMaps');

var _styleMaps3 = _interopRequireDefault(_styleMaps2);

exports.styleMaps = _styleMaps3['default'];

var _SubNav2 = require('./SubNav');

var _SubNav3 = _interopRequireDefault(_SubNav2);

exports.SubNav = _SubNav3['default'];

var _TabbedArea2 = require('./TabbedArea');

var _TabbedArea3 = _interopRequireDefault(_TabbedArea2);

exports.TabbedArea = _TabbedArea3['default'];

var _Table2 = require('./Table');

var _Table3 = _interopRequireDefault(_Table2);

exports.Table = _Table3['default'];

var _TabPane2 = require('./TabPane');

var _TabPane3 = _interopRequireDefault(_TabPane2);

exports.TabPane = _TabPane3['default'];

var _Thumbnail2 = require('./Thumbnail');

var _Thumbnail3 = _interopRequireDefault(_Thumbnail2);

exports.Thumbnail = _Thumbnail3['default'];

var _Tooltip2 = require('./Tooltip');

var _Tooltip3 = _interopRequireDefault(_Tooltip2);

exports.Tooltip = _Tooltip3['default'];

var _Well2 = require('./Well');

var _Well3 = _interopRequireDefault(_Well2);

exports.Well = _Well3['default'];

var _Portal2 = require('./Portal');

var _Portal3 = _interopRequireDefault(_Portal2);

exports.Portal = _Portal3['default'];

var _Position2 = require('./Position');

var _Position3 = _interopRequireDefault(_Position2);

exports.Position = _Position3['default'];

var _Collapse2 = require('./Collapse');

var _Collapse3 = _interopRequireDefault(_Collapse2);

exports.Collapse = _Collapse3['default'];

var _Collapse4 = _interopRequireDefault(_Collapse2);

exports.Fade = _Collapse4['default'];

var _FormControls2 = require('./FormControls');

var _FormControls = _interopRequireWildcard(_FormControls2);

exports.FormControls = _FormControls;

var _utils2 = require('./utils');

var _utils = _interopRequireWildcard(_utils2);

exports.utils = _utils;
},{"./Accordion":2,"./Affix":3,"./AffixMixin":4,"./Alert":5,"./Badge":6,"./BootstrapMixin":7,"./Button":8,"./ButtonGroup":9,"./ButtonInput":10,"./ButtonToolbar":11,"./Carousel":12,"./CarouselItem":13,"./Col":14,"./Collapse":15,"./CollapsibleMixin":16,"./CollapsibleNav":17,"./DropdownButton":18,"./DropdownMenu":19,"./DropdownStateMixin":20,"./FadeMixin":22,"./FormControls":24,"./Glyphicon":26,"./Grid":27,"./Input":28,"./Interpolate":30,"./Jumbotron":31,"./Label":32,"./ListGroup":33,"./ListGroupItem":34,"./MenuItem":35,"./Modal":36,"./ModalBody":37,"./ModalFooter":39,"./ModalHeader":40,"./ModalTitle":41,"./Nav":42,"./NavItem":43,"./Navbar":44,"./Overlay":45,"./OverlayTrigger":46,"./PageHeader":47,"./PageItem":48,"./Pager":49,"./Pagination":50,"./Panel":52,"./PanelGroup":53,"./Popover":54,"./Portal":55,"./Position":56,"./ProgressBar":57,"./Row":59,"./SafeAnchor":60,"./SplitButton":61,"./SubNav":62,"./TabPane":63,"./TabbedArea":64,"./Table":65,"./Thumbnail":66,"./Tooltip":67,"./Well":69,"./styleMaps":71,"./utils":82,"babel-runtime/helpers/interop-require-default":91,"babel-runtime/helpers/interop-require-wildcard":92}],71:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var styleMaps = {
  CLASSES: {
    'alert': 'alert',
    'button': 'btn',
    'button-group': 'btn-group',
    'button-toolbar': 'btn-toolbar',
    'column': 'col',
    'input-group': 'input-group',
    'form': 'form',
    'glyphicon': 'glyphicon',
    'label': 'label',
    'thumbnail': 'thumbnail',
    'list-group-item': 'list-group-item',
    'panel': 'panel',
    'panel-group': 'panel-group',
    'pagination': 'pagination',
    'progress-bar': 'progress-bar',
    'nav': 'nav',
    'navbar': 'navbar',
    'modal': 'modal',
    'row': 'row',
    'well': 'well'
  },
  STYLES: {
    'default': 'default',
    'primary': 'primary',
    'success': 'success',
    'info': 'info',
    'warning': 'warning',
    'danger': 'danger',
    'link': 'link',
    'inline': 'inline',
    'tabs': 'tabs',
    'pills': 'pills'
  },
  addStyle: function addStyle(name) {
    styleMaps.STYLES[name] = name;
  },
  SIZES: {
    'large': 'lg',
    'medium': 'md',
    'small': 'sm',
    'xsmall': 'xs'
  },
  GLYPHS: ['asterisk', 'plus', 'euro', 'eur', 'minus', 'cloud', 'envelope', 'pencil', 'glass', 'music', 'search', 'heart', 'star', 'star-empty', 'user', 'film', 'th-large', 'th', 'th-list', 'ok', 'remove', 'zoom-in', 'zoom-out', 'off', 'signal', 'cog', 'trash', 'home', 'file', 'time', 'road', 'download-alt', 'download', 'upload', 'inbox', 'play-circle', 'repeat', 'refresh', 'list-alt', 'lock', 'flag', 'headphones', 'volume-off', 'volume-down', 'volume-up', 'qrcode', 'barcode', 'tag', 'tags', 'book', 'bookmark', 'print', 'camera', 'font', 'bold', 'italic', 'text-height', 'text-width', 'align-left', 'align-center', 'align-right', 'align-justify', 'list', 'indent-left', 'indent-right', 'facetime-video', 'picture', 'map-marker', 'adjust', 'tint', 'edit', 'share', 'check', 'move', 'step-backward', 'fast-backward', 'backward', 'play', 'pause', 'stop', 'forward', 'fast-forward', 'step-forward', 'eject', 'chevron-left', 'chevron-right', 'plus-sign', 'minus-sign', 'remove-sign', 'ok-sign', 'question-sign', 'info-sign', 'screenshot', 'remove-circle', 'ok-circle', 'ban-circle', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down', 'share-alt', 'resize-full', 'resize-small', 'exclamation-sign', 'gift', 'leaf', 'fire', 'eye-open', 'eye-close', 'warning-sign', 'plane', 'calendar', 'random', 'comment', 'magnet', 'chevron-up', 'chevron-down', 'retweet', 'shopping-cart', 'folder-close', 'folder-open', 'resize-vertical', 'resize-horizontal', 'hdd', 'bullhorn', 'bell', 'certificate', 'thumbs-up', 'thumbs-down', 'hand-right', 'hand-left', 'hand-up', 'hand-down', 'circle-arrow-right', 'circle-arrow-left', 'circle-arrow-up', 'circle-arrow-down', 'globe', 'wrench', 'tasks', 'filter', 'briefcase', 'fullscreen', 'dashboard', 'paperclip', 'heart-empty', 'link', 'phone', 'pushpin', 'usd', 'gbp', 'sort', 'sort-by-alphabet', 'sort-by-alphabet-alt', 'sort-by-order', 'sort-by-order-alt', 'sort-by-attributes', 'sort-by-attributes-alt', 'unchecked', 'expand', 'collapse-down', 'collapse-up', 'log-in', 'flash', 'log-out', 'new-window', 'record', 'save', 'open', 'saved', 'import', 'export', 'send', 'floppy-disk', 'floppy-saved', 'floppy-remove', 'floppy-save', 'floppy-open', 'credit-card', 'transfer', 'cutlery', 'header', 'compressed', 'earphone', 'phone-alt', 'tower', 'stats', 'sd-video', 'hd-video', 'subtitles', 'sound-stereo', 'sound-dolby', 'sound-5-1', 'sound-6-1', 'sound-7-1', 'copyright-mark', 'registration-mark', 'cloud-download', 'cloud-upload', 'tree-conifer', 'tree-deciduous', 'cd', 'save-file', 'open-file', 'level-up', 'copy', 'paste', 'alert', 'equalizer', 'king', 'queen', 'pawn', 'bishop', 'knight', 'baby-formula', 'tent', 'blackboard', 'bed', 'apple', 'erase', 'hourglass', 'lamp', 'duplicate', 'piggy-bank', 'scissors', 'bitcoin', 'yen', 'ruble', 'scale', 'ice-lolly', 'ice-lolly-tasted', 'education', 'option-horizontal', 'option-vertical', 'menu-hamburger', 'modal-window', 'oil', 'grain', 'sunglasses', 'text-size', 'text-color', 'text-background', 'object-align-top', 'object-align-bottom', 'object-align-horizontal', 'object-align-left', 'object-align-vertical', 'object-align-right', 'triangle-right', 'triangle-left', 'triangle-bottom', 'triangle-top', 'console', 'superscript', 'subscript', 'menu-left', 'menu-right', 'menu-down', 'menu-up']
};

exports['default'] = styleMaps;
module.exports = exports['default'];
},{}],72:[function(require,module,exports){
'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var ANONYMOUS = '<<anonymous>>';

var CustomPropTypes = {

  isRequiredForA11y: function isRequiredForA11y(propType) {
    return function (props, propName, componentName) {
      if (props[propName] === null) {
        return new Error('The prop `' + propName + '` is required to make ' + componentName + ' accessible ' + 'for users using assistive technologies such as screen readers `');
      }

      return propType(props, propName, componentName);
    };
  },

  /**
   * Checks whether a prop provides a DOM element
   *
   * The element can be provided in two forms:
   * - Directly passed
   * - Or passed an object that has a `render` method
   *
   * @param props
   * @param propName
   * @param componentName
   * @returns {Error|undefined}
   */
  mountable: createMountableChecker(),

  /**
   * Checks whether a prop provides a type of element.
   *
   * The type of element can be provided in two forms:
   * - tag name (string)
   * - a return value of React.createClass(...)
   *
   * @param props
   * @param propName
   * @param componentName
   * @returns {Error|undefined}
   */
  elementType: createElementTypeChecker(),

  /**
   * Checks whether a prop matches a key of an associated object
   *
   * @param props
   * @param propName
   * @param componentName
   * @returns {Error|undefined}
   */
  keyOf: createKeyOfChecker,
  /**
   * Checks if only one of the listed properties is in use. An error is given
   * if multiple have a value
   *
   * @param props
   * @param propName
   * @param componentName
   * @returns {Error|undefined}
   */
  singlePropFrom: createSinglePropFromChecker,

  all: all
};

function errMsg(props, propName, componentName, msgContinuation) {
  return 'Invalid prop \'' + propName + '\' of value \'' + props[propName] + '\'' + (' supplied to \'' + componentName + '\'' + msgContinuation);
}

/**
 * Create chain-able isRequired validator
 *
 * Largely copied directly from:
 *  https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
 */
function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName) {
    componentName = componentName || ANONYMOUS;
    if (props[propName] == null) {
      if (isRequired) {
        return new Error('Required prop \'' + propName + '\' was not specified in \'' + componentName + '\'.');
      }
    } else {
      return validate(props, propName, componentName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createMountableChecker() {
  function validate(props, propName, componentName) {
    if (typeof props[propName] !== 'object' || typeof props[propName].render !== 'function' && props[propName].nodeType !== 1) {
      return new Error(errMsg(props, propName, componentName, ', expected a DOM element or an object that has a `render` method'));
    }
  }

  return createChainableTypeChecker(validate);
}

function createKeyOfChecker(obj) {
  function validate(props, propName, componentName) {
    var propValue = props[propName];
    if (!obj.hasOwnProperty(propValue)) {
      var valuesString = JSON.stringify(_Object$keys(obj));
      return new Error(errMsg(props, propName, componentName, ', expected one of ' + valuesString + '.'));
    }
  }
  return createChainableTypeChecker(validate);
}

function createSinglePropFromChecker(arrOfProps) {
  function validate(props, propName, componentName) {
    var usedPropCount = arrOfProps.map(function (listedProp) {
      return props[listedProp];
    }).reduce(function (acc, curr) {
      return acc + (curr !== undefined ? 1 : 0);
    }, 0);

    if (usedPropCount > 1) {
      var first = arrOfProps[0];
      var others = arrOfProps.slice(1);

      var message = others.join(', ') + ' and ' + first;
      return new Error('Invalid prop \'' + propName + '\', only one of the following ' + ('may be provided: ' + message));
    }
  }
  return validate;
}

function all(propTypes) {
  if (propTypes === undefined) {
    throw new Error('No validations provided');
  }

  if (!(propTypes instanceof Array)) {
    throw new Error('Invalid argument must be an array');
  }

  if (propTypes.length === 0) {
    throw new Error('No validations provided');
  }

  return function (props, propName, componentName) {
    for (var i = 0; i < propTypes.length; i++) {
      var result = propTypes[i](props, propName, componentName);

      if (result !== undefined && result !== null) {
        return result;
      }
    }
  };
}

function createElementTypeChecker() {
  function validate(props, propName, componentName) {
    var errBeginning = errMsg(props, propName, componentName, '. Expected an Element `type`');

    if (typeof props[propName] !== 'function') {
      if (_react2['default'].isValidElement(props[propName])) {
        return new Error(errBeginning + ', not an actual Element');
      }

      if (typeof props[propName] !== 'string') {
        return new Error(errBeginning + ' such as a tag name or return value of React.createClass(...)');
      }
    }
  }

  return createChainableTypeChecker(validate);
}

exports['default'] = CustomPropTypes;
module.exports = exports['default'];
},{"babel-runtime/core-js/object/keys":86,"babel-runtime/helpers/interop-require-default":91}],73:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * This file contains a modified version of:
 * https://github.com/facebook/react/blob/v0.12.0/src/vendor/stubs/EventListener.js
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * TODO: remove in favour of solution provided by:
 *  https://github.com/facebook/react/issues/285
 */

/**
 * Does not take into account specific nature of platform.
 */
'use strict';

exports.__esModule = true;
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function listen(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  }
};

exports['default'] = EventListener;
module.exports = exports['default'];
},{}],74:[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This file contains a modified version of:
 * https://github.com/facebook/react/blob/v0.12.0/src/addons/transitions/ReactTransitionEvents.js
 *
 * This source code is licensed under the BSD-style license found here:
 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
 * An additional grant of patent rights can be found here:
 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
 */

'use strict';

exports.__esModule = true;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * EVENT_NAME_MAP is used to determine which event fired when a
 * transition/animation ends, based on the style property used to
 * define that event.
 */
var EVENT_NAME_MAP = {
  transitionend: {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'mozTransitionEnd',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd'
  },

  animationend: {
    'animation': 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd',
    'MozAnimation': 'mozAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd'
  }
};

var endEvents = [];

function detectEvents() {
  var testEl = document.createElement('div');
  var style = testEl.style;

  // On some platforms, in particular some releases of Android 4.x,
  // the un-prefixed "animation" and "transition" properties are defined on the
  // style object but the events that fire will still be prefixed, so we need
  // to check if the un-prefixed events are useable, and if not remove them
  // from the map
  if (!('AnimationEvent' in window)) {
    delete EVENT_NAME_MAP.animationend.animation;
  }

  if (!('TransitionEvent' in window)) {
    delete EVENT_NAME_MAP.transitionend.transition;
  }

  for (var baseEventName in EVENT_NAME_MAP) {
    var baseEvents = EVENT_NAME_MAP[baseEventName];
    for (var styleName in baseEvents) {
      if (styleName in style) {
        endEvents.push(baseEvents[styleName]);
        break;
      }
    }
  }
}

if (canUseDOM) {
  detectEvents();
}

// We use the raw {add|remove}EventListener() call because EventListener
// does not know how to remove event listeners and we really should
// clean up. Also, these events are not triggered in older browsers
// so we should be A-OK here.

function addEventListener(node, eventName, eventListener) {
  node.addEventListener(eventName, eventListener, false);
}

function removeEventListener(node, eventName, eventListener) {
  node.removeEventListener(eventName, eventListener, false);
}

var ReactTransitionEvents = {
  addEndEventListener: function addEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      // If CSS transitions are not supported, trigger an "end animation"
      // event immediately.
      window.setTimeout(eventListener, 0);
      return;
    }
    endEvents.forEach(function (endEvent) {
      addEventListener(node, endEvent, eventListener);
    });
  },

  removeEndEventListener: function removeEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      return;
    }
    endEvents.forEach(function (endEvent) {
      removeEventListener(node, endEvent, eventListener);
    });
  }
};

exports['default'] = ReactTransitionEvents;
module.exports = exports['default'];
},{}],75:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

/**
 * Maps children that are typically specified as `props.children`,
 * but only iterates over children that are "valid components".
 *
 * The mapFunction provided index will be normalised to the components mapped,
 * so an invalid component would not increase the index.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} mapFunction.
 * @param {*} mapContext Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */

var _react2 = _interopRequireDefault(_react);

function mapValidComponents(children, func, context) {
  var index = 0;

  return _react2['default'].Children.map(children, function (child) {
    if (_react2['default'].isValidElement(child)) {
      var lastIndex = index;
      index++;
      return func.call(context, child, lastIndex);
    }

    return child;
  });
}

/**
 * Iterates through children that are typically specified as `props.children`,
 * but only iterates over children that are "valid components".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc.
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachValidComponents(children, func, context) {
  var index = 0;

  return _react2['default'].Children.forEach(children, function (child) {
    if (_react2['default'].isValidElement(child)) {
      func.call(context, child, index);
      index++;
    }
  });
}

/**
 * Count the number of "valid components" in the Children container.
 *
 * @param {?*} children Children tree container.
 * @returns {number}
 */
function numberOfValidComponents(children) {
  var count = 0;

  _react2['default'].Children.forEach(children, function (child) {
    if (_react2['default'].isValidElement(child)) {
      count++;
    }
  });

  return count;
}

/**
 * Determine if the Child container has one or more "valid components".
 *
 * @param {?*} children Children tree container.
 * @returns {boolean}
 */
function hasValidComponent(children) {
  var hasValid = false;

  _react2['default'].Children.forEach(children, function (child) {
    if (!hasValid && _react2['default'].isValidElement(child)) {
      hasValid = true;
    }
  });

  return hasValid;
}

exports['default'] = {
  map: mapValidComponents,
  forEach: forEachValidComponents,
  numberOf: numberOfValidComponents,
  hasValidComponent: hasValidComponent
};
module.exports = exports['default'];
},{"babel-runtime/helpers/interop-require-default":91}],76:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = valueValidation;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var _CustomPropTypes = require('./CustomPropTypes');

var propList = ['children', 'value'];
var typeList = [_react2['default'].PropTypes.number, _react2['default'].PropTypes.string];

function valueValidation(props, propName, componentName) {
  var error = _CustomPropTypes.singlePropFrom(propList)(props, propName, componentName);
  if (!error) {
    var oneOfType = _react2['default'].PropTypes.oneOfType(typeList);
    error = oneOfType(props, propName, componentName);
  }
  return error;
}

module.exports = exports['default'];
},{"./CustomPropTypes":72,"babel-runtime/helpers/interop-require-default":91}],77:[function(require,module,exports){
/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
'use strict';

exports.__esModule = true;
function createChainedFunction() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.filter(function (f) {
    return f != null;
  }).reduce(function (acc, f) {
    if (typeof f !== 'function') {
      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
    }

    if (acc === null) {
      return f;
    }

    return function chainedFunction() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      acc.apply(this, args);
      f.apply(this, args);
    };
  }, null);
}

exports['default'] = createChainedFunction;
module.exports = exports['default'];
},{}],78:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = createContextWrapper;

var _react = window.React;

/**
 * Creates new trigger class that injects context into overlay.
 */

var _react2 = _interopRequireDefault(_react);

function createContextWrapper(Trigger, propName) {
  return function (contextTypes) {
    var ContextWrapper = (function (_React$Component) {
      _inherits(ContextWrapper, _React$Component);

      function ContextWrapper() {
        _classCallCheck(this, ContextWrapper);

        _React$Component.apply(this, arguments);
      }

      ContextWrapper.prototype.getChildContext = function getChildContext() {
        return this.props.context;
      };

      ContextWrapper.prototype.render = function render() {
        // Strip injected props from below.
        var _props = this.props;
        var wrapped = _props.wrapped;
        var context = _props.context;

        var props = _objectWithoutProperties(_props, ['wrapped', 'context']);

        return _react2['default'].cloneElement(wrapped, props);
      };

      return ContextWrapper;
    })(_react2['default'].Component);

    ContextWrapper.childContextTypes = contextTypes;

    var TriggerWithContext = (function () {
      function TriggerWithContext() {
        _classCallCheck(this, TriggerWithContext);
      }

      TriggerWithContext.prototype.render = function render() {
        var props = _extends({}, this.props);
        props[propName] = this.getWrappedOverlay();

        return _react2['default'].createElement(
          Trigger,
          props,
          this.props.children
        );
      };

      TriggerWithContext.prototype.getWrappedOverlay = function getWrappedOverlay() {
        return _react2['default'].createElement(ContextWrapper, {
          context: this.context,
          wrapped: this.props[propName]
        });
      };

      return TriggerWithContext;
    })();

    TriggerWithContext.contextTypes = contextTypes;

    return TriggerWithContext;
  };
}

module.exports = exports['default'];
},{"babel-runtime/helpers/class-call-check":88,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/inherits":90,"babel-runtime/helpers/interop-require-default":91,"babel-runtime/helpers/object-without-properties":93}],79:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = createSelectedEvent;

function createSelectedEvent(eventKey) {
  var selectionPrevented = false;

  return {
    eventKey: eventKey,

    preventSelection: function preventSelection() {
      selectionPrevented = true;
    },

    isSelectionPrevented: function isSelectionPrevented() {
      return selectionPrevented;
    }
  };
}

module.exports = exports["default"];
},{}],80:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = deprecationWarning;

var _reactLibWarning = require('react/lib/warning');

var _reactLibWarning2 = _interopRequireDefault(_reactLibWarning);

function deprecationWarning(oldname, newname, link) {
  var message = oldname + ' is deprecated. Use ' + newname + ' instead.';

  if (link) {
    message += '\nYou can read more about it at ' + link;
  }

  _reactLibWarning2['default'](false, message);
}

module.exports = exports['default'];
},{"babel-runtime/helpers/interop-require-default":91,"react/lib/warning":179}],81:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = window.React;

var _react2 = _interopRequireDefault(_react);

var canUseDom = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Get elements owner document
 *
 * @param {ReactComponent|HTMLElement} componentOrElement
 * @returns {HTMLElement}
 */
function ownerDocument(componentOrElement) {
  var elem = _react2['default'].findDOMNode(componentOrElement);
  return elem && elem.ownerDocument || document;
}

function ownerWindow(componentOrElement) {
  var doc = ownerDocument(componentOrElement);
  return doc.defaultView ? doc.defaultView : doc.parentWindow;
}

/**
 * get the active element, safe in IE
 * @return {HTMLElement}
 */
function getActiveElement(componentOrElement) {
  var doc = ownerDocument(componentOrElement);

  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

/**
 * Shortcut to compute element style
 *
 * @param {HTMLElement} elem
 * @returns {CssStyle}
 */
function getComputedStyles(elem) {
  return ownerDocument(elem).defaultView.getComputedStyle(elem, null);
}

/**
 * Get elements offset
 *
 * TODO: REMOVE JQUERY!
 *
 * @param {HTMLElement} DOMNode
 * @returns {{top: number, left: number}}
 */
function getOffset(DOMNode) {
  if (window.jQuery) {
    return window.jQuery(DOMNode).offset();
  }

  var docElem = ownerDocument(DOMNode).documentElement;
  var box = { top: 0, left: 0 };

  // If we don't have gBCR, just use 0,0 rather than error
  // BlackBerry 5, iOS 3 (original iPhone)
  if (typeof DOMNode.getBoundingClientRect !== 'undefined') {
    box = DOMNode.getBoundingClientRect();
  }

  return {
    top: box.top + window.pageYOffset - docElem.clientTop,
    left: box.left + window.pageXOffset - docElem.clientLeft
  };
}

/**
 * Get elements position
 *
 * TODO: REMOVE JQUERY!
 *
 * @param {HTMLElement} elem
 * @param {HTMLElement?} offsetParent
 * @returns {{top: number, left: number}}
 */
function getPosition(elem, offsetParent) {
  var offset = undefined,
      parentOffset = undefined;

  if (window.jQuery) {
    if (!offsetParent) {
      return window.jQuery(elem).position();
    }

    offset = window.jQuery(elem).offset();
    parentOffset = window.jQuery(offsetParent).offset();

    // Get element offset relative to offsetParent
    return {
      top: offset.top - parentOffset.top,
      left: offset.left - parentOffset.left
    };
  }

  parentOffset = { top: 0, left: 0 };

  // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
  if (getComputedStyles(elem).position === 'fixed') {
    // We assume that getBoundingClientRect is available when computed position is fixed
    offset = elem.getBoundingClientRect();
  } else {
    if (!offsetParent) {
      // Get *real* offsetParent
      offsetParent = offsetParentFunc(elem);
    }

    // Get correct offsets
    offset = getOffset(elem);
    if (offsetParent.nodeName !== 'HTML') {
      parentOffset = getOffset(offsetParent);
    }

    // Add offsetParent borders
    parentOffset.top += parseInt(getComputedStyles(offsetParent).borderTopWidth, 10);
    parentOffset.left += parseInt(getComputedStyles(offsetParent).borderLeftWidth, 10);
  }

  // Subtract parent offsets and element margins
  return {
    top: offset.top - parentOffset.top - parseInt(getComputedStyles(elem).marginTop, 10),
    left: offset.left - parentOffset.left - parseInt(getComputedStyles(elem).marginLeft, 10)
  };
}

/**
 * Get parent element
 *
 * @param {HTMLElement?} elem
 * @returns {HTMLElement}
 */
function offsetParentFunc(elem) {
  var docElem = ownerDocument(elem).documentElement;
  var offsetParent = elem.offsetParent || docElem;

  while (offsetParent && (offsetParent.nodeName !== 'HTML' && getComputedStyles(offsetParent).position === 'static')) {
    offsetParent = offsetParent.offsetParent;
  }

  return offsetParent || docElem;
}

/**
 * Cross browser .contains() polyfill
 * @param  {HTMLElement} elem
 * @param  {HTMLElement} inner
 * @return {bool}
 */
function contains(elem, inner) {
  function ie8Contains(root, node) {
    while (node) {
      if (node === root) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  return elem && elem.contains ? elem.contains(inner) : elem && elem.compareDocumentPosition ? elem === inner || !!(elem.compareDocumentPosition(inner) & 16) : ie8Contains(elem, inner);
}

exports['default'] = {
  canUseDom: canUseDom,
  contains: contains,
  ownerWindow: ownerWindow,
  ownerDocument: ownerDocument,
  getComputedStyles: getComputedStyles,
  getOffset: getOffset,
  getPosition: getPosition,
  activeElement: getActiveElement,
  offsetParent: offsetParentFunc
};
module.exports = exports['default'];
},{"babel-runtime/helpers/interop-require-default":91}],82:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _childrenValueInputValidation2 = require('./childrenValueInputValidation');

var _childrenValueInputValidation3 = _interopRequireDefault(_childrenValueInputValidation2);

exports.childrenValueInputValidation = _childrenValueInputValidation3['default'];

var _createChainedFunction2 = require('./createChainedFunction');

var _createChainedFunction3 = _interopRequireDefault(_createChainedFunction2);

exports.createChainedFunction = _createChainedFunction3['default'];

var _CustomPropTypes2 = require('./CustomPropTypes');

var _CustomPropTypes3 = _interopRequireDefault(_CustomPropTypes2);

exports.CustomPropTypes = _CustomPropTypes3['default'];

var _domUtils2 = require('./domUtils');

var _domUtils3 = _interopRequireDefault(_domUtils2);

exports.domUtils = _domUtils3['default'];

var _ValidComponentChildren2 = require('./ValidComponentChildren');

var _ValidComponentChildren3 = _interopRequireDefault(_ValidComponentChildren2);

exports.ValidComponentChildren = _ValidComponentChildren3['default'];
},{"./CustomPropTypes":72,"./ValidComponentChildren":75,"./childrenValueInputValidation":76,"./createChainedFunction":77,"./domUtils":81,"babel-runtime/helpers/interop-require-default":91}],83:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _domUtils = require('./domUtils');

var _domUtils2 = _interopRequireDefault(_domUtils);

var utils = {

  getContainerDimensions: function getContainerDimensions(containerNode) {
    var width = undefined,
        height = undefined,
        scroll = undefined;

    if (containerNode.tagName === 'BODY') {
      width = window.innerWidth;
      height = window.innerHeight;
      scroll = _domUtils2['default'].ownerDocument(containerNode).documentElement.scrollTop || containerNode.scrollTop;
    } else {
      width = containerNode.offsetWidth;
      height = containerNode.offsetHeight;
      scroll = containerNode.scrollTop;
    }

    return { width: width, height: height, scroll: scroll };
  },

  getPosition: function getPosition(target, container) {
    var offset = container.tagName === 'BODY' ? _domUtils2['default'].getOffset(target) : _domUtils2['default'].getPosition(target, container);

    return _extends({}, offset, {

      // In Firefox, the target does not have a offsetHeight or offsetWidth
      // property. For now, default them to 0 to keep code from breaking.
      height: target.offsetHeight || 0,
      width: target.offsetWidth || 0
    });
  },

  calcOverlayPosition: function calcOverlayPosition(placement, overlayNode, target, container, padding) {
    var childOffset = utils.getPosition(target, container);

    var overlayHeight = overlayNode.offsetHeight;
    var overlayWidth = overlayNode.offsetWidth;

    var positionLeft = undefined,
        positionTop = undefined,
        arrowOffsetLeft = undefined,
        arrowOffsetTop = undefined;

    if (placement === 'left' || placement === 'right') {
      positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2;

      if (placement === 'left') {
        positionLeft = childOffset.left - overlayWidth;
      } else {
        positionLeft = childOffset.left + childOffset.width;
      }

      var topDelta = getTopDelta(positionTop, overlayHeight, container, padding);

      positionTop += topDelta;
      arrowOffsetTop = 50 * (1 - 2 * topDelta / overlayHeight) + '%';
      arrowOffsetLeft = null;
    } else if (placement === 'top' || placement === 'bottom') {
      positionLeft = childOffset.left + (childOffset.width - overlayWidth) / 2;

      if (placement === 'top') {
        positionTop = childOffset.top - overlayHeight;
      } else {
        positionTop = childOffset.top + childOffset.height;
      }

      var leftDelta = getLeftDelta(positionLeft, overlayWidth, container, padding);
      positionLeft += leftDelta;
      arrowOffsetLeft = 50 * (1 - 2 * leftDelta / overlayWidth) + '%';
      arrowOffsetTop = null;
    } else {
      throw new Error('calcOverlayPosition(): No such placement of "' + placement + '" found.');
    }

    return { positionLeft: positionLeft, positionTop: positionTop, arrowOffsetLeft: arrowOffsetLeft, arrowOffsetTop: arrowOffsetTop };
  }
};

function getTopDelta(top, overlayHeight, container, padding) {
  var containerDimensions = utils.getContainerDimensions(container);
  var containerScroll = containerDimensions.scroll;
  var containerHeight = containerDimensions.height;

  var topEdgeOffset = top - padding - containerScroll;
  var bottomEdgeOffset = top + padding - containerScroll + overlayHeight;

  if (topEdgeOffset < 0) {
    return -topEdgeOffset;
  } else if (bottomEdgeOffset > containerHeight) {
    return containerHeight - bottomEdgeOffset;
  } else {
    return 0;
  }
}

function getLeftDelta(left, overlayWidth, container, padding) {
  var containerDimensions = utils.getContainerDimensions(container);
  var containerWidth = containerDimensions.width;

  var leftEdgeOffset = left - padding;
  var rightEdgeOffset = left + padding + overlayWidth;

  if (leftEdgeOffset < 0) {
    return -leftEdgeOffset;
  } else if (rightEdgeOffset > containerWidth) {
    return containerWidth - rightEdgeOffset;
  } else {
    return 0;
  }
}
exports['default'] = utils;
module.exports = exports['default'];
},{"./domUtils":81,"babel-runtime/helpers/extends":89,"babel-runtime/helpers/interop-require-default":91}],84:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":94}],85:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":95}],86:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":96}],87:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":97}],88:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],89:[function(require,module,exports){
"use strict";

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

exports["default"] = _Object$assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/assign":84}],90:[function(require,module,exports){
"use strict";

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Object$setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of")["default"];

exports["default"] = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/create":85,"babel-runtime/core-js/object/set-prototype-of":87}],91:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],92:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj["default"] = obj;
    return newObj;
  }
};

exports.__esModule = true;
},{}],93:[function(require,module,exports){
"use strict";

exports["default"] = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

exports.__esModule = true;
},{}],94:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$').core.Object.assign;
},{"../../modules/$":105,"../../modules/es6.object.assign":107}],95:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function create(P, D){
  return $.create(P, D);
};
},{"../../modules/$":105}],96:[function(require,module,exports){
require('../../modules/es6.object.statics-accept-primitives');
module.exports = require('../../modules/$').core.Object.keys;
},{"../../modules/$":105,"../../modules/es6.object.statics-accept-primitives":109}],97:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/$').core.Object.setPrototypeOf;
},{"../../modules/$":105,"../../modules/es6.object.set-prototype-of":108}],98:[function(require,module,exports){
var $ = require('./$');
function assert(condition, msg1, msg2){
  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
}
assert.def = $.assertDefined;
assert.fn = function(it){
  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
  return it;
};
assert.obj = function(it){
  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
assert.inst = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
module.exports = assert;
},{"./$":105}],99:[function(require,module,exports){
var $        = require('./$')
  , enumKeys = require('./$.enum-keys');
// 19.1.2.1 Object.assign(target, source, ...)
/* eslint-disable no-unused-vars */
module.exports = Object.assign || function assign(target, source){
/* eslint-enable no-unused-vars */
  var T = Object($.assertDefined(target))
    , l = arguments.length
    , i = 1;
  while(l > i){
    var S      = $.ES5Object(arguments[i++])
      , keys   = enumKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)T[key = keys[j++]] = S[key];
  }
  return T;
};
},{"./$":105,"./$.enum-keys":102}],100:[function(require,module,exports){
// Optional / simple context binding
var assertFunction = require('./$.assert').fn;
module.exports = function(fn, that, length){
  assertFunction(fn);
  if(~length && that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  } return function(/* ...args */){
      return fn.apply(that, arguments);
    };
};
},{"./$.assert":98}],101:[function(require,module,exports){
var $          = require('./$')
  , global     = $.g
  , core       = $.core
  , isFunction = $.isFunction;
function ctx(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
}
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
function $def(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , isProto  = type & $def.P
    , target   = isGlobal ? global : type & $def.S
        ? global[name] : (global[name] || {}).prototype
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    if(isGlobal && !isFunction(target[key]))exp = source[key];
    // bind timers to global for call from export context
    else if(type & $def.B && own)exp = ctx(out, global);
    // wrap global constructors for prevent change them in library
    else if(type & $def.W && target[key] == out)!function(C){
      exp = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      exp.prototype = C.prototype;
    }(out);
    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
    // export
    exports[key] = exp;
    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
  }
}
module.exports = $def;
},{"./$":105}],102:[function(require,module,exports){
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getDesc    = $.getDesc
    , getSymbols = $.getSymbols;
  if(getSymbols)$.each.call(getSymbols(it), function(key){
    if(getDesc(it, key).enumerable)keys.push(key);
  });
  return keys;
};
},{"./$":105}],103:[function(require,module,exports){
module.exports = function($){
  $.FW   = false;
  $.path = $.core;
  return $;
};
},{}],104:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var $ = require('./$')
  , toString = {}.toString
  , getNames = $.getNames;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

function getWindowNames(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
}

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames($.toObject(it));
};
},{"./$":105}],105:[function(require,module,exports){
'use strict';
var global = typeof self != 'undefined' ? self : Function('return this')()
  , core   = {}
  , defineProperty = Object.defineProperty
  , hasOwnProperty = {}.hasOwnProperty
  , ceil  = Math.ceil
  , floor = Math.floor
  , max   = Math.max
  , min   = Math.min;
// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
var DESC = !!function(){
  try {
    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
  } catch(e){ /* empty */ }
}();
var hide = createDefiner(1);
// 7.1.4 ToInteger
function toInteger(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
}
function desc(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
}
function simpleSet(object, key, value){
  object[key] = value;
  return object;
}
function createDefiner(bitmap){
  return DESC ? function(object, key, value){
    return $.setDesc(object, key, desc(bitmap, value));
  } : simpleSet;
}

function isObject(it){
  return it !== null && (typeof it == 'object' || typeof it == 'function');
}
function isFunction(it){
  return typeof it == 'function';
}
function assertDefined(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
}

var $ = module.exports = require('./$.fw')({
  g: global,
  core: core,
  html: global.document && document.documentElement,
  // http://jsperf.com/core-js-isobject
  isObject:   isObject,
  isFunction: isFunction,
  that: function(){
    return this;
  },
  // 7.1.4 ToInteger
  toInteger: toInteger,
  // 7.1.15 ToLength
  toLength: function(it){
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  },
  toIndex: function(index, length){
    index = toInteger(index);
    return index < 0 ? max(index + length, 0) : min(index, length);
  },
  has: function(it, key){
    return hasOwnProperty.call(it, key);
  },
  create:     Object.create,
  getProto:   Object.getPrototypeOf,
  DESC:       DESC,
  desc:       desc,
  getDesc:    Object.getOwnPropertyDescriptor,
  setDesc:    defineProperty,
  setDescs:   Object.defineProperties,
  getKeys:    Object.keys,
  getNames:   Object.getOwnPropertyNames,
  getSymbols: Object.getOwnPropertySymbols,
  assertDefined: assertDefined,
  // Dummy, fix for not array-like ES3 string in es5 module
  ES5Object: Object,
  toObject: function(it){
    return $.ES5Object(assertDefined(it));
  },
  hide: hide,
  def: createDefiner(0),
  set: global.Symbol ? simpleSet : hide,
  each: [].forEach
});
/* eslint-disable no-undef */
if(typeof __e != 'undefined')__e = core;
if(typeof __g != 'undefined')__g = global;
},{"./$.fw":103}],106:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var $      = require('./$')
  , assert = require('./$.assert');
function check(O, proto){
  assert.obj(O);
  assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
}
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
    ? function(buggy, set){
        try {
          set = require('./$.ctx')(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
          set({}, []);
        } catch(e){ buggy = true; }
        return function setPrototypeOf(O, proto){
          check(O, proto);
          if(buggy)O.__proto__ = proto;
          else set(O, proto);
          return O;
        };
      }()
    : undefined),
  check: check
};
},{"./$":105,"./$.assert":98,"./$.ctx":100}],107:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $def = require('./$.def');
$def($def.S, 'Object', {assign: require('./$.assign')});
},{"./$.assign":99,"./$.def":101}],108:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $def = require('./$.def');
$def($def.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.def":101,"./$.set-proto":106}],109:[function(require,module,exports){
var $        = require('./$')
  , $def     = require('./$.def')
  , isObject = $.isObject
  , toObject = $.toObject;
$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
, function(KEY, ID){
  var fn     = ($.core.Object || {})[KEY] || Object[KEY]
    , forced = 0
    , method = {};
  method[KEY] = ID == 0 ? function freeze(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 1 ? function seal(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 2 ? function preventExtensions(it){
    return isObject(it) ? fn(it) : it;
  } : ID == 3 ? function isFrozen(it){
    return isObject(it) ? fn(it) : true;
  } : ID == 4 ? function isSealed(it){
    return isObject(it) ? fn(it) : true;
  } : ID == 5 ? function isExtensible(it){
    return isObject(it) ? fn(it) : false;
  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
    return fn(toObject(it), key);
  } : ID == 7 ? function getPrototypeOf(it){
    return fn(Object($.assertDefined(it)));
  } : ID == 8 ? function keys(it){
    return fn(toObject(it));
  } : require('./$.get-names').get;
  try {
    fn('z');
  } catch(e){
    forced = 1;
  }
  $def($def.S + $def.F * forced, 'Object', method);
});
},{"./$":105,"./$.def":101,"./$.get-names":104}],110:[function(require,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

(function () {
	'use strict';

	function classNames () {

		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if ('string' === argType || 'number' === argType) {
				classes += ' ' + arg;

			} else if (Array.isArray(arg)) {
				classes += ' ' + classNames.apply(null, arg);

			} else if ('object' === argType) {
				for (var key in arg) {
					if (arg.hasOwnProperty(key) && arg[key]) {
						classes += ' ' + key;
					}
				}
			}
		}

		return classes.substr(1);
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd){
		// AMD. Register as an anonymous module.
		define(function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}

}());

},{}],111:[function(require,module,exports){
/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],112:[function(require,module,exports){
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],113:[function(require,module,exports){
var arrayPush = require('./arrayPush'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.flatten` with added support for restricting
 * flattening and specifying the start index.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {boolean} [isDeep] Specify a deep flatten.
 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, isDeep, isStrict, result) {
  result || (result = []);

  var index = -1,
      length = array.length;

  while (++index < length) {
    var value = array[index];
    if (isObjectLike(value) && isArrayLike(value) &&
        (isStrict || isArray(value) || isArguments(value))) {
      if (isDeep) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, isDeep, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"../lang/isArguments":128,"../lang/isArray":129,"./arrayPush":112,"./isArrayLike":121,"./isObjectLike":124}],114:[function(require,module,exports){
var createBaseFor = require('./createBaseFor');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./createBaseFor":118}],115:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keysIn = require('../object/keysIn');

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

module.exports = baseForIn;

},{"../object/keysIn":133,"./baseFor":114}],116:[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],117:[function(require,module,exports){
var identity = require('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":135}],118:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{"./toObject":127}],119:[function(require,module,exports){
var baseProperty = require('./baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./baseProperty":116}],120:[function(require,module,exports){
var isNative = require('../lang/isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"../lang/isNative":131}],121:[function(require,module,exports){
var getLength = require('./getLength'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

module.exports = isArrayLike;

},{"./getLength":119,"./isLength":123}],122:[function(require,module,exports){
/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],123:[function(require,module,exports){
/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],124:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],125:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * A specialized version of `_.pick` which picks `object` properties specified
 * by `props`.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property names to pick.
 * @returns {Object} Returns the new object.
 */
function pickByArray(object, props) {
  object = toObject(object);

  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index];
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}

module.exports = pickByArray;

},{"./toObject":127}],126:[function(require,module,exports){
var baseForIn = require('./baseForIn');

/**
 * A specialized version of `_.pick` which picks `object` properties `predicate`
 * returns truthy for.
 *
 * @private
 * @param {Object} object The source object.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Object} Returns the new object.
 */
function pickByCallback(object, predicate) {
  var result = {};
  baseForIn(object, function(value, key, object) {
    if (predicate(value, key, object)) {
      result[key] = value;
    }
  });
  return result;
}

module.exports = pickByCallback;

},{"./baseForIn":115}],127:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":132}],128:[function(require,module,exports){
var isArrayLike = require('../internal/isArrayLike'),
    isObjectLike = require('../internal/isObjectLike');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) &&
    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

module.exports = isArguments;

},{"../internal/isArrayLike":121,"../internal/isObjectLike":124}],129:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

module.exports = isArray;

},{"../internal/getNative":120,"../internal/isLength":123,"../internal/isObjectLike":124}],130:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

module.exports = isFunction;

},{"./isObject":132}],131:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isObjectLike = require('../internal/isObjectLike');

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isNative;

},{"../internal/isObjectLike":124,"./isFunction":130}],132:[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],133:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":122,"../internal/isLength":123,"../lang/isArguments":128,"../lang/isArray":129,"../lang/isObject":132}],134:[function(require,module,exports){
var baseFlatten = require('../internal/baseFlatten'),
    bindCallback = require('../internal/bindCallback'),
    pickByArray = require('../internal/pickByArray'),
    pickByCallback = require('../internal/pickByCallback'),
    restParam = require('../function/restParam');

/**
 * Creates an object composed of the picked `object` properties. Property
 * names may be specified as individual arguments or as arrays of property
 * names. If `predicate` is provided it is invoked for each property of `object`
 * picking the properties `predicate` returns truthy for. The predicate is
 * bound to `thisArg` and invoked with three arguments: (value, key, object).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {Function|...(string|string[])} [predicate] The function invoked per
 *  iteration or property names to pick, specified as individual property
 *  names or arrays of property names.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'user': 'fred', 'age': 40 };
 *
 * _.pick(object, 'user');
 * // => { 'user': 'fred' }
 *
 * _.pick(object, _.isString);
 * // => { 'user': 'fred' }
 */
var pick = restParam(function(object, props) {
  if (object == null) {
    return {};
  }
  return typeof props[0] == 'function'
    ? pickByCallback(object, bindCallback(props[0], props[1], 3))
    : pickByArray(object, baseFlatten(props));
});

module.exports = pick;

},{"../function/restParam":111,"../internal/baseFlatten":113,"../internal/bindCallback":117,"../internal/pickByArray":125,"../internal/pickByCallback":126}],135:[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],136:[function(require,module,exports){
/**
 * Represents a cancellation caused by navigating away
 * before the previous transition has fully resolved.
 */
"use strict";

function Cancellation() {}

module.exports = Cancellation;
},{}],137:[function(require,module,exports){
'use strict';

var invariant = require('react/lib/invariant');
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;

var History = {

  /**
   * The current number of entries in the history.
   *
   * Note: This property is read-only.
   */
  length: 1,

  /**
   * Sends the browser back one entry in the history.
   */
  back: function back() {
    invariant(canUseDOM, 'Cannot use History.back without a DOM');

    // Do this first so that History.length will
    // be accurate in location change listeners.
    History.length -= 1;

    window.history.back();
  }

};

module.exports = History;
},{"react/lib/ExecutionEnvironment":175,"react/lib/invariant":178}],138:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

/* jshint -W084 */
var PathUtils = require('./PathUtils');

function deepSearch(route, pathname, query) {
  // Check the subtree first to find the most deeply-nested match.
  var childRoutes = route.childRoutes;
  if (childRoutes) {
    var match, childRoute;
    for (var i = 0, len = childRoutes.length; i < len; ++i) {
      childRoute = childRoutes[i];

      if (childRoute.isDefault || childRoute.isNotFound) continue; // Check these in order later.

      if (match = deepSearch(childRoute, pathname, query)) {
        // A route in the subtree matched! Add this route and we're done.
        match.routes.unshift(route);
        return match;
      }
    }
  }

  // No child routes matched; try the default route.
  var defaultRoute = route.defaultRoute;
  if (defaultRoute && (params = PathUtils.extractParams(defaultRoute.path, pathname))) {
    return new Match(pathname, params, query, [route, defaultRoute]);
  } // Does the "not found" route match?
  var notFoundRoute = route.notFoundRoute;
  if (notFoundRoute && (params = PathUtils.extractParams(notFoundRoute.path, pathname))) {
    return new Match(pathname, params, query, [route, notFoundRoute]);
  } // Last attempt: check this route.
  var params = PathUtils.extractParams(route.path, pathname);
  if (params) {
    return new Match(pathname, params, query, [route]);
  }return null;
}

var Match = (function () {
  function Match(pathname, params, query, routes) {
    _classCallCheck(this, Match);

    this.pathname = pathname;
    this.params = params;
    this.query = query;
    this.routes = routes;
  }

  _createClass(Match, null, [{
    key: 'findMatch',

    /**
     * Attempts to match depth-first a route in the given route's
     * subtree against the given path and returns the match if it
     * succeeds, null if no match can be made.
     */
    value: function findMatch(routes, path) {
      var pathname = PathUtils.withoutQuery(path);
      var query = PathUtils.extractQuery(path);
      var match = null;

      for (var i = 0, len = routes.length; match == null && i < len; ++i) match = deepSearch(routes[i], pathname, query);

      return match;
    }
  }]);

  return Match;
})();

module.exports = Match;
},{"./PathUtils":140}],139:[function(require,module,exports){
'use strict';

var PropTypes = require('./PropTypes');

/**
 * A mixin for components that modify the URL.
 *
 * Example:
 *
 *   var MyLink = React.createClass({
 *     mixins: [ Router.Navigation ],
 *     handleClick(event) {
 *       event.preventDefault();
 *       this.transitionTo('aRoute', { the: 'params' }, { the: 'query' });
 *     },
 *     render() {
 *       return (
 *         <a onClick={this.handleClick}>Click me!</a>
 *       );
 *     }
 *   });
 */
var Navigation = {

  contextTypes: {
    router: PropTypes.router.isRequired
  },

  /**
   * Returns an absolute URL path created from the given route
   * name, URL parameters, and query values.
   */
  makePath: function makePath(to, params, query) {
    return this.context.router.makePath(to, params, query);
  },

  /**
   * Returns a string that may safely be used as the href of a
   * link to the route with the given name.
   */
  makeHref: function makeHref(to, params, query) {
    return this.context.router.makeHref(to, params, query);
  },

  /**
   * Transitions to the URL specified in the arguments by pushing
   * a new URL onto the history stack.
   */
  transitionTo: function transitionTo(to, params, query) {
    this.context.router.transitionTo(to, params, query);
  },

  /**
   * Transitions to the URL specified in the arguments by replacing
   * the current URL in the history stack.
   */
  replaceWith: function replaceWith(to, params, query) {
    this.context.router.replaceWith(to, params, query);
  },

  /**
   * Transitions to the previous URL.
   */
  goBack: function goBack() {
    return this.context.router.goBack();
  }

};

module.exports = Navigation;
},{"./PropTypes":141}],140:[function(require,module,exports){
'use strict';

var invariant = require('react/lib/invariant');
var assign = require('object-assign');
var qs = require('qs');

var paramCompileMatcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|[*.()\[\]\\+|{}^$]/g;
var paramInjectMatcher = /:([a-zA-Z_$][a-zA-Z0-9_$?]*[?]?)|[*]/g;
var paramInjectTrailingSlashMatcher = /\/\/\?|\/\?\/|\/\?/g;
var queryMatcher = /\?(.*)$/;

var _compiledPatterns = {};

function compilePattern(pattern) {
  if (!(pattern in _compiledPatterns)) {
    var paramNames = [];
    var source = pattern.replace(paramCompileMatcher, function (match, paramName) {
      if (paramName) {
        paramNames.push(paramName);
        return '([^/?#]+)';
      } else if (match === '*') {
        paramNames.push('splat');
        return '(.*?)';
      } else {
        return '\\' + match;
      }
    });

    _compiledPatterns[pattern] = {
      matcher: new RegExp('^' + source + '$', 'i'),
      paramNames: paramNames
    };
  }

  return _compiledPatterns[pattern];
}

var PathUtils = {

  /**
   * Returns true if the given path is absolute.
   */
  isAbsolute: function isAbsolute(path) {
    return path.charAt(0) === '/';
  },

  /**
   * Joins two URL paths together.
   */
  join: function join(a, b) {
    return a.replace(/\/*$/, '/') + b;
  },

  /**
   * Returns an array of the names of all parameters in the given pattern.
   */
  extractParamNames: function extractParamNames(pattern) {
    return compilePattern(pattern).paramNames;
  },

  /**
   * Extracts the portions of the given URL path that match the given pattern
   * and returns an object of param name => value pairs. Returns null if the
   * pattern does not match the given path.
   */
  extractParams: function extractParams(pattern, path) {
    var _compilePattern = compilePattern(pattern);

    var matcher = _compilePattern.matcher;
    var paramNames = _compilePattern.paramNames;

    var match = path.match(matcher);

    if (!match) {
      return null;
    }var params = {};

    paramNames.forEach(function (paramName, index) {
      params[paramName] = match[index + 1];
    });

    return params;
  },

  /**
   * Returns a version of the given route path with params interpolated. Throws
   * if there is a dynamic segment of the route path for which there is no param.
   */
  injectParams: function injectParams(pattern, params) {
    params = params || {};

    var splatIndex = 0;

    return pattern.replace(paramInjectMatcher, function (match, paramName) {
      paramName = paramName || 'splat';

      // If param is optional don't check for existence
      if (paramName.slice(-1) === '?') {
        paramName = paramName.slice(0, -1);

        if (params[paramName] == null) return '';
      } else {
        invariant(params[paramName] != null, 'Missing "%s" parameter for path "%s"', paramName, pattern);
      }

      var segment;
      if (paramName === 'splat' && Array.isArray(params[paramName])) {
        segment = params[paramName][splatIndex++];

        invariant(segment != null, 'Missing splat # %s for path "%s"', splatIndex, pattern);
      } else {
        segment = params[paramName];
      }

      return segment;
    }).replace(paramInjectTrailingSlashMatcher, '/');
  },

  /**
   * Returns an object that is the result of parsing any query string contained
   * in the given path, null if the path contains no query string.
   */
  extractQuery: function extractQuery(path) {
    var match = path.match(queryMatcher);
    return match && qs.parse(match[1]);
  },

  /**
   * Returns a version of the given path without the query string.
   */
  withoutQuery: function withoutQuery(path) {
    return path.replace(queryMatcher, '');
  },

  /**
   * Returns a version of the given path with the parameters in the given
   * query merged into the query string.
   */
  withQuery: function withQuery(path, query) {
    var existingQuery = PathUtils.extractQuery(path);

    if (existingQuery) query = query ? assign(existingQuery, query) : existingQuery;

    var queryString = qs.stringify(query, { arrayFormat: 'brackets' });

    if (queryString) {
      return PathUtils.withoutQuery(path) + '?' + queryString;
    }return PathUtils.withoutQuery(path);
  }

};

module.exports = PathUtils;
},{"object-assign":169,"qs":170,"react/lib/invariant":178}],141:[function(require,module,exports){
'use strict';

var assign = require('react/lib/Object.assign');
var ReactPropTypes = window.React.PropTypes;
var Route = require('./Route');

var PropTypes = assign({}, ReactPropTypes, {

  /**
   * Indicates that a prop should be falsy.
   */
  falsy: function falsy(props, propName, componentName) {
    if (props[propName]) {
      return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
    }
  },

  /**
   * Indicates that a prop should be a Route object.
   */
  route: ReactPropTypes.instanceOf(Route),

  /**
   * Indicates that a prop should be a Router object.
   */
  //router: ReactPropTypes.instanceOf(Router) // TODO
  router: ReactPropTypes.func

});

module.exports = PropTypes;
},{"./Route":143,"react/lib/Object.assign":176}],142:[function(require,module,exports){
/**
 * Encapsulates a redirect to the given route.
 */
"use strict";

function Redirect(to, params, query) {
  this.to = to;
  this.params = params;
  this.query = query;
}

module.exports = Redirect;
},{}],143:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var assign = require('react/lib/Object.assign');
var invariant = require('react/lib/invariant');
var warning = require('react/lib/warning');
var PathUtils = require('./PathUtils');

var _currentRoute;

var Route = (function () {
  function Route(name, path, ignoreScrollBehavior, isDefault, isNotFound, onEnter, onLeave, handler) {
    _classCallCheck(this, Route);

    this.name = name;
    this.path = path;
    this.paramNames = PathUtils.extractParamNames(this.path);
    this.ignoreScrollBehavior = !!ignoreScrollBehavior;
    this.isDefault = !!isDefault;
    this.isNotFound = !!isNotFound;
    this.onEnter = onEnter;
    this.onLeave = onLeave;
    this.handler = handler;
  }

  _createClass(Route, [{
    key: 'appendChild',

    /**
     * Appends the given route to this route's child routes.
     */
    value: function appendChild(route) {
      invariant(route instanceof Route, 'route.appendChild must use a valid Route');

      if (!this.childRoutes) this.childRoutes = [];

      this.childRoutes.push(route);
    }
  }, {
    key: 'toString',
    value: function toString() {
      var string = '<Route';

      if (this.name) string += ' name="' + this.name + '"';

      string += ' path="' + this.path + '">';

      return string;
    }
  }], [{
    key: 'createRoute',

    /**
     * Creates and returns a new route. Options may be a URL pathname string
     * with placeholders for named params or an object with any of the following
     * properties:
     *
     * - name                     The name of the route. This is used to lookup a
     *                            route relative to its parent route and should be
     *                            unique among all child routes of the same parent
     * - path                     A URL pathname string with optional placeholders
     *                            that specify the names of params to extract from
     *                            the URL when the path matches. Defaults to `/${name}`
     *                            when there is a name given, or the path of the parent
     *                            route, or /
     * - ignoreScrollBehavior     True to make this route (and all descendants) ignore
     *                            the scroll behavior of the router
     * - isDefault                True to make this route the default route among all
     *                            its siblings
     * - isNotFound               True to make this route the "not found" route among
     *                            all its siblings
     * - onEnter                  A transition hook that will be called when the
     *                            router is going to enter this route
     * - onLeave                  A transition hook that will be called when the
     *                            router is going to leave this route
     * - handler                  A React component that will be rendered when
     *                            this route is active
     * - parentRoute              The parent route to use for this route. This option
     *                            is automatically supplied when creating routes inside
     *                            the callback to another invocation of createRoute. You
     *                            only ever need to use this when declaring routes
     *                            independently of one another to manually piece together
     *                            the route hierarchy
     *
     * The callback may be used to structure your route hierarchy. Any call to
     * createRoute, createDefaultRoute, createNotFoundRoute, or createRedirect
     * inside the callback automatically uses this route as its parent.
     */
    value: function createRoute(options, callback) {
      options = options || {};

      if (typeof options === 'string') options = { path: options };

      var parentRoute = _currentRoute;

      if (parentRoute) {
        warning(options.parentRoute == null || options.parentRoute === parentRoute, 'You should not use parentRoute with createRoute inside another route\'s child callback; it is ignored');
      } else {
        parentRoute = options.parentRoute;
      }

      var name = options.name;
      var path = options.path || name;

      if (path && !(options.isDefault || options.isNotFound)) {
        if (PathUtils.isAbsolute(path)) {
          if (parentRoute) {
            invariant(path === parentRoute.path || parentRoute.paramNames.length === 0, 'You cannot nest path "%s" inside "%s"; the parent requires URL parameters', path, parentRoute.path);
          }
        } else if (parentRoute) {
          // Relative paths extend their parent.
          path = PathUtils.join(parentRoute.path, path);
        } else {
          path = '/' + path;
        }
      } else {
        path = parentRoute ? parentRoute.path : '/';
      }

      if (options.isNotFound && !/\*$/.test(path)) path += '*'; // Auto-append * to the path of not found routes.

      var route = new Route(name, path, options.ignoreScrollBehavior, options.isDefault, options.isNotFound, options.onEnter, options.onLeave, options.handler);

      if (parentRoute) {
        if (route.isDefault) {
          invariant(parentRoute.defaultRoute == null, '%s may not have more than one default route', parentRoute);

          parentRoute.defaultRoute = route;
        } else if (route.isNotFound) {
          invariant(parentRoute.notFoundRoute == null, '%s may not have more than one not found route', parentRoute);

          parentRoute.notFoundRoute = route;
        }

        parentRoute.appendChild(route);
      }

      // Any routes created in the callback
      // use this route as their parent.
      if (typeof callback === 'function') {
        var currentRoute = _currentRoute;
        _currentRoute = route;
        callback.call(route, route);
        _currentRoute = currentRoute;
      }

      return route;
    }
  }, {
    key: 'createDefaultRoute',

    /**
     * Creates and returns a route that is rendered when its parent matches
     * the current URL.
     */
    value: function createDefaultRoute(options) {
      return Route.createRoute(assign({}, options, { isDefault: true }));
    }
  }, {
    key: 'createNotFoundRoute',

    /**
     * Creates and returns a route that is rendered when its parent matches
     * the current URL but none of its siblings do.
     */
    value: function createNotFoundRoute(options) {
      return Route.createRoute(assign({}, options, { isNotFound: true }));
    }
  }, {
    key: 'createRedirect',

    /**
     * Creates and returns a route that automatically redirects the transition
     * to another route. In addition to the normal options to createRoute, this
     * function accepts the following options:
     *
     * - from         An alias for the `path` option. Defaults to *
     * - to           The path/route/route name to redirect to
     * - params       The params to use in the redirect URL. Defaults
     *                to using the current params
     * - query        The query to use in the redirect URL. Defaults
     *                to using the current query
     */
    value: function createRedirect(options) {
      return Route.createRoute(assign({}, options, {
        path: options.path || options.from || '*',
        onEnter: function onEnter(transition, params, query) {
          transition.redirect(options.to, options.params || params, options.query || query);
        }
      }));
    }
  }]);

  return Route;
})();

module.exports = Route;
},{"./PathUtils":140,"react/lib/Object.assign":176,"react/lib/invariant":178,"react/lib/warning":179}],144:[function(require,module,exports){
'use strict';

var invariant = require('react/lib/invariant');
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;
var getWindowScrollPosition = require('./getWindowScrollPosition');

function shouldUpdateScroll(state, prevState) {
  if (!prevState) {
    return true;
  } // Don't update scroll position when only the query has changed.
  if (state.pathname === prevState.pathname) {
    return false;
  }var routes = state.routes;
  var prevRoutes = prevState.routes;

  var sharedAncestorRoutes = routes.filter(function (route) {
    return prevRoutes.indexOf(route) !== -1;
  });

  return !sharedAncestorRoutes.some(function (route) {
    return route.ignoreScrollBehavior;
  });
}

/**
 * Provides the router with the ability to manage window scroll position
 * according to its scroll behavior.
 */
var ScrollHistory = {

  statics: {

    /**
     * Records curent scroll position as the last known position for the given URL path.
     */
    recordScrollPosition: function recordScrollPosition(path) {
      if (!this.scrollHistory) this.scrollHistory = {};

      this.scrollHistory[path] = getWindowScrollPosition();
    },

    /**
     * Returns the last known scroll position for the given URL path.
     */
    getScrollPosition: function getScrollPosition(path) {
      if (!this.scrollHistory) this.scrollHistory = {};

      return this.scrollHistory[path] || null;
    }

  },

  componentWillMount: function componentWillMount() {
    invariant(this.constructor.getScrollBehavior() == null || canUseDOM, 'Cannot use scroll behavior without a DOM');
  },

  componentDidMount: function componentDidMount() {
    this._updateScroll();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    this._updateScroll(prevState);
  },

  _updateScroll: function _updateScroll(prevState) {
    if (!shouldUpdateScroll(this.state, prevState)) {
      return;
    }var scrollBehavior = this.constructor.getScrollBehavior();

    if (scrollBehavior) scrollBehavior.updateScrollPosition(this.constructor.getScrollPosition(this.state.path), this.state.action);
  }

};

module.exports = ScrollHistory;
},{"./getWindowScrollPosition":159,"react/lib/ExecutionEnvironment":175,"react/lib/invariant":178}],145:[function(require,module,exports){
'use strict';

var PropTypes = require('./PropTypes');

/**
 * A mixin for components that need to know the path, routes, URL
 * params and query that are currently active.
 *
 * Example:
 *
 *   var AboutLink = React.createClass({
 *     mixins: [ Router.State ],
 *     render() {
 *       var className = this.props.className;
 *
 *       if (this.isActive('about'))
 *         className += ' is-active';
 *
 *       return React.DOM.a({ className: className }, this.props.children);
 *     }
 *   });
 */
var State = {

  contextTypes: {
    router: PropTypes.router.isRequired
  },

  /**
   * Returns the current URL path.
   */
  getPath: function getPath() {
    return this.context.router.getCurrentPath();
  },

  /**
   * Returns the current URL path without the query string.
   */
  getPathname: function getPathname() {
    return this.context.router.getCurrentPathname();
  },

  /**
   * Returns an object of the URL params that are currently active.
   */
  getParams: function getParams() {
    return this.context.router.getCurrentParams();
  },

  /**
   * Returns an object of the query params that are currently active.
   */
  getQuery: function getQuery() {
    return this.context.router.getCurrentQuery();
  },

  /**
   * Returns an array of the routes that are currently active.
   */
  getRoutes: function getRoutes() {
    return this.context.router.getCurrentRoutes();
  },

  /**
   * A helper method to determine if a given route, params, and query
   * are active.
   */
  isActive: function isActive(to, params, query) {
    return this.context.router.isActive(to, params, query);
  }

};

module.exports = State;
},{"./PropTypes":141}],146:[function(require,module,exports){
/* jshint -W058 */

'use strict';

var Cancellation = require('./Cancellation');
var Redirect = require('./Redirect');

/**
 * Encapsulates a transition to a given path.
 *
 * The willTransitionTo and willTransitionFrom handlers receive
 * an instance of this class as their first argument.
 */
function Transition(path, retry) {
  this.path = path;
  this.abortReason = null;
  // TODO: Change this to router.retryTransition(transition)
  this.retry = retry.bind(this);
}

Transition.prototype.abort = function (reason) {
  if (this.abortReason == null) this.abortReason = reason || 'ABORT';
};

Transition.prototype.redirect = function (to, params, query) {
  this.abort(new Redirect(to, params, query));
};

Transition.prototype.cancel = function () {
  this.abort(new Cancellation());
};

Transition.from = function (transition, routes, components, callback) {
  routes.reduce(function (callback, route, index) {
    return function (error) {
      if (error || transition.abortReason) {
        callback(error);
      } else if (route.onLeave) {
        try {
          route.onLeave(transition, components[index], callback);

          // If there is no callback in the argument list, call it automatically.
          if (route.onLeave.length < 3) callback();
        } catch (e) {
          callback(e);
        }
      } else {
        callback();
      }
    };
  }, callback)();
};

Transition.to = function (transition, routes, params, query, callback) {
  routes.reduceRight(function (callback, route) {
    return function (error) {
      if (error || transition.abortReason) {
        callback(error);
      } else if (route.onEnter) {
        try {
          route.onEnter(transition, params, query, callback);

          // If there is no callback in the argument list, call it automatically.
          if (route.onEnter.length < 4) callback();
        } catch (e) {
          callback(e);
        }
      } else {
        callback();
      }
    };
  }, callback)();
};

module.exports = Transition;
},{"./Cancellation":136,"./Redirect":142}],147:[function(require,module,exports){
/**
 * Actions that modify the URL.
 */
'use strict';

var LocationActions = {

  /**
   * Indicates a new location is being pushed to the history stack.
   */
  PUSH: 'push',

  /**
   * Indicates the current location should be replaced.
   */
  REPLACE: 'replace',

  /**
   * Indicates the most recent entry should be removed from the history stack.
   */
  POP: 'pop'

};

module.exports = LocationActions;
},{}],148:[function(require,module,exports){
'use strict';

var LocationActions = require('../actions/LocationActions');

/**
 * A scroll behavior that attempts to imitate the default behavior
 * of modern browsers.
 */
var ImitateBrowserBehavior = {

  updateScrollPosition: function updateScrollPosition(position, actionType) {
    switch (actionType) {
      case LocationActions.PUSH:
      case LocationActions.REPLACE:
        window.scrollTo(0, 0);
        break;
      case LocationActions.POP:
        if (position) {
          window.scrollTo(position.x, position.y);
        } else {
          window.scrollTo(0, 0);
        }
        break;
    }
  }

};

module.exports = ImitateBrowserBehavior;
},{"../actions/LocationActions":147}],149:[function(require,module,exports){
/**
 * A scroll behavior that always scrolls to the top of the page
 * after a transition.
 */
"use strict";

var ScrollToTopBehavior = {

  updateScrollPosition: function updateScrollPosition() {
    window.scrollTo(0, 0);
  }

};

module.exports = ScrollToTopBehavior;
},{}],150:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

/**
 * This component is necessary to get around a context warning
 * present in React 0.13.0. It sovles this by providing a separation
 * between the "owner" and "parent" contexts.
 */

var React = window.React;

var ContextWrapper = (function (_React$Component) {
  function ContextWrapper() {
    _classCallCheck(this, ContextWrapper);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(ContextWrapper, _React$Component);

  _createClass(ContextWrapper, [{
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return ContextWrapper;
})(React.Component);

module.exports = ContextWrapper;
},{}],151:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var PropTypes = require('../PropTypes');
var RouteHandler = require('./RouteHandler');
var Route = require('./Route');

/**
 * A <DefaultRoute> component is a special kind of <Route> that
 * renders when its parent matches but none of its siblings do.
 * Only one such route may be used at any given level in the
 * route hierarchy.
 */

var DefaultRoute = (function (_Route) {
  function DefaultRoute() {
    _classCallCheck(this, DefaultRoute);

    if (_Route != null) {
      _Route.apply(this, arguments);
    }
  }

  _inherits(DefaultRoute, _Route);

  return DefaultRoute;
})(Route);

// TODO: Include these in the above class definition
// once we can use ES7 property initializers.
// https://github.com/babel/babel/issues/619

DefaultRoute.propTypes = {
  name: PropTypes.string,
  path: PropTypes.falsy,
  children: PropTypes.falsy,
  handler: PropTypes.func.isRequired
};

DefaultRoute.defaultProps = {
  handler: RouteHandler
};

module.exports = DefaultRoute;
},{"../PropTypes":141,"./Route":155,"./RouteHandler":156}],152:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var React = window.React;
var assign = require('react/lib/Object.assign');
var PropTypes = require('../PropTypes');

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

/**
 * <Link> components are used to create an <a> element that links to a route.
 * When that route is active, the link gets an "active" class name (or the
 * value of its `activeClassName` prop).
 *
 * For example, assuming you have the following route:
 *
 *   <Route name="showPost" path="/posts/:postID" handler={Post}/>
 *
 * You could use the following component to link to that route:
 *
 *   <Link to="showPost" params={{ postID: "123" }} />
 *
 * In addition to params, links may pass along query string parameters
 * using the `query` prop.
 *
 *   <Link to="showPost" params={{ postID: "123" }} query={{ show:true }}/>
 */

var Link = (function (_React$Component) {
  function Link() {
    _classCallCheck(this, Link);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Link, _React$Component);

  _createClass(Link, [{
    key: 'handleClick',
    value: function handleClick(event) {
      var allowTransition = true;
      var clickResult;

      if (this.props.onClick) clickResult = this.props.onClick(event);

      if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
        return;
      }if (clickResult === false || event.defaultPrevented === true) allowTransition = false;

      event.preventDefault();

      if (allowTransition) this.context.router.transitionTo(this.props.to, this.props.params, this.props.query);
    }
  }, {
    key: 'getHref',

    /**
     * Returns the value of the "href" attribute to use on the DOM element.
     */
    value: function getHref() {
      return this.context.router.makeHref(this.props.to, this.props.params, this.props.query);
    }
  }, {
    key: 'getClassName',

    /**
     * Returns the value of the "class" attribute to use on the DOM element, which contains
     * the value of the activeClassName property when this <Link> is active.
     */
    value: function getClassName() {
      var className = this.props.className;

      if (this.getActiveState()) className += ' ' + this.props.activeClassName;

      return className;
    }
  }, {
    key: 'getActiveState',
    value: function getActiveState() {
      return this.context.router.isActive(this.props.to, this.props.params, this.props.query);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = assign({}, this.props, {
        href: this.getHref(),
        className: this.getClassName(),
        onClick: this.handleClick.bind(this)
      });

      if (props.activeStyle && this.getActiveState()) props.style = props.activeStyle;

      return React.DOM.a(props, this.props.children);
    }
  }]);

  return Link;
})(React.Component);

// TODO: Include these in the above class definition
// once we can use ES7 property initializers.
// https://github.com/babel/babel/issues/619

Link.contextTypes = {
  router: PropTypes.router.isRequired
};

Link.propTypes = {
  activeClassName: PropTypes.string.isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.route]).isRequired,
  params: PropTypes.object,
  query: PropTypes.object,
  activeStyle: PropTypes.object,
  onClick: PropTypes.func
};

Link.defaultProps = {
  activeClassName: 'active',
  className: ''
};

module.exports = Link;
},{"../PropTypes":141,"react/lib/Object.assign":176}],153:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var PropTypes = require('../PropTypes');
var RouteHandler = require('./RouteHandler');
var Route = require('./Route');

/**
 * A <NotFoundRoute> is a special kind of <Route> that
 * renders when the beginning of its parent's path matches
 * but none of its siblings do, including any <DefaultRoute>.
 * Only one such route may be used at any given level in the
 * route hierarchy.
 */

var NotFoundRoute = (function (_Route) {
  function NotFoundRoute() {
    _classCallCheck(this, NotFoundRoute);

    if (_Route != null) {
      _Route.apply(this, arguments);
    }
  }

  _inherits(NotFoundRoute, _Route);

  return NotFoundRoute;
})(Route);

// TODO: Include these in the above class definition
// once we can use ES7 property initializers.
// https://github.com/babel/babel/issues/619

NotFoundRoute.propTypes = {
  name: PropTypes.string,
  path: PropTypes.falsy,
  children: PropTypes.falsy,
  handler: PropTypes.func.isRequired
};

NotFoundRoute.defaultProps = {
  handler: RouteHandler
};

module.exports = NotFoundRoute;
},{"../PropTypes":141,"./Route":155,"./RouteHandler":156}],154:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var PropTypes = require('../PropTypes');
var Route = require('./Route');

/**
 * A <Redirect> component is a special kind of <Route> that always
 * redirects to another route when it matches.
 */

var Redirect = (function (_Route) {
  function Redirect() {
    _classCallCheck(this, Redirect);

    if (_Route != null) {
      _Route.apply(this, arguments);
    }
  }

  _inherits(Redirect, _Route);

  return Redirect;
})(Route);

// TODO: Include these in the above class definition
// once we can use ES7 property initializers.
// https://github.com/babel/babel/issues/619

Redirect.propTypes = {
  path: PropTypes.string,
  from: PropTypes.string, // Alias for path.
  to: PropTypes.string,
  handler: PropTypes.falsy
};

// Redirects should not have a default handler
Redirect.defaultProps = {};

module.exports = Redirect;
},{"../PropTypes":141,"./Route":155}],155:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var React = window.React;
var invariant = require('react/lib/invariant');
var PropTypes = require('../PropTypes');
var RouteHandler = require('./RouteHandler');

/**
 * <Route> components specify components that are rendered to the page when the
 * URL matches a given pattern.
 *
 * Routes are arranged in a nested tree structure. When a new URL is requested,
 * the tree is searched depth-first to find a route whose path matches the URL.
 * When one is found, all routes in the tree that lead to it are considered
 * "active" and their components are rendered into the DOM, nested in the same
 * order as they are in the tree.
 *
 * The preferred way to configure a router is using JSX. The XML-like syntax is
 * a great way to visualize how routes are laid out in an application.
 *
 *   var routes = [
 *     <Route handler={App}>
 *       <Route name="login" handler={Login}/>
 *       <Route name="logout" handler={Logout}/>
 *       <Route name="about" handler={About}/>
 *     </Route>
 *   ];
 *   
 *   Router.run(routes, function (Handler) {
 *     React.render(<Handler/>, document.body);
 *   });
 *
 * Handlers for Route components that contain children can render their active
 * child route using a <RouteHandler> element.
 *
 *   var App = React.createClass({
 *     render: function () {
 *       return (
 *         <div class="application">
 *           <RouteHandler/>
 *         </div>
 *       );
 *     }
 *   });
 *
 * If no handler is provided for the route, it will render a matched child route.
 */

var Route = (function (_React$Component) {
  function Route() {
    _classCallCheck(this, Route);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Route, _React$Component);

  _createClass(Route, [{
    key: 'render',
    value: function render() {
      invariant(false, '%s elements are for router configuration only and should not be rendered', this.constructor.name);
    }
  }]);

  return Route;
})(React.Component);

// TODO: Include these in the above class definition
// once we can use ES7 property initializers.
// https://github.com/babel/babel/issues/619

Route.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string,
  handler: PropTypes.func,
  ignoreScrollBehavior: PropTypes.bool
};

Route.defaultProps = {
  handler: RouteHandler
};

module.exports = Route;
},{"../PropTypes":141,"./RouteHandler":156,"react/lib/invariant":178}],156:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var React = window.React;
var ContextWrapper = require('./ContextWrapper');
var assign = require('react/lib/Object.assign');
var PropTypes = require('../PropTypes');

var REF_NAME = '__routeHandler__';

/**
 * A <RouteHandler> component renders the active child route handler
 * when routes are nested.
 */

var RouteHandler = (function (_React$Component) {
  function RouteHandler() {
    _classCallCheck(this, RouteHandler);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(RouteHandler, _React$Component);

  _createClass(RouteHandler, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        routeDepth: this.context.routeDepth + 1
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._updateRouteComponent(this.refs[REF_NAME]);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this._updateRouteComponent(this.refs[REF_NAME]);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._updateRouteComponent(null);
    }
  }, {
    key: '_updateRouteComponent',
    value: function _updateRouteComponent(component) {
      this.context.router.setRouteComponentAtDepth(this.getRouteDepth(), component);
    }
  }, {
    key: 'getRouteDepth',
    value: function getRouteDepth() {
      return this.context.routeDepth;
    }
  }, {
    key: 'createChildRouteHandler',
    value: function createChildRouteHandler(props) {
      var route = this.context.router.getRouteAtDepth(this.getRouteDepth());

      if (route == null) {
        return null;
      }var childProps = assign({}, props || this.props, {
        ref: REF_NAME,
        params: this.context.router.getCurrentParams(),
        query: this.context.router.getCurrentQuery()
      });

      return React.createElement(route.handler, childProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var handler = this.createChildRouteHandler();
      // <script/> for things like <CSSTransitionGroup/> that don't like null
      return handler ? React.createElement(
        ContextWrapper,
        null,
        handler
      ) : React.createElement('script', null);
    }
  }]);

  return RouteHandler;
})(React.Component);

// TODO: Include these in the above class definition
// once we can use ES7 property initializers.
// https://github.com/babel/babel/issues/619

RouteHandler.contextTypes = {
  routeDepth: PropTypes.number.isRequired,
  router: PropTypes.router.isRequired
};

RouteHandler.childContextTypes = {
  routeDepth: PropTypes.number.isRequired
};

module.exports = RouteHandler;
},{"../PropTypes":141,"./ContextWrapper":150,"react/lib/Object.assign":176}],157:[function(require,module,exports){
(function (process){
/* jshint -W058 */
'use strict';

var React = window.React;
var warning = require('react/lib/warning');
var invariant = require('react/lib/invariant');
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;
var LocationActions = require('./actions/LocationActions');
var ImitateBrowserBehavior = require('./behaviors/ImitateBrowserBehavior');
var HashLocation = require('./locations/HashLocation');
var HistoryLocation = require('./locations/HistoryLocation');
var RefreshLocation = require('./locations/RefreshLocation');
var StaticLocation = require('./locations/StaticLocation');
var ScrollHistory = require('./ScrollHistory');
var createRoutesFromReactChildren = require('./createRoutesFromReactChildren');
var isReactChildren = require('./isReactChildren');
var Transition = require('./Transition');
var PropTypes = require('./PropTypes');
var Redirect = require('./Redirect');
var History = require('./History');
var Cancellation = require('./Cancellation');
var Match = require('./Match');
var Route = require('./Route');
var supportsHistory = require('./supportsHistory');
var PathUtils = require('./PathUtils');

/**
 * The default location for new routers.
 */
var DEFAULT_LOCATION = canUseDOM ? HashLocation : '/';

/**
 * The default scroll behavior for new routers.
 */
var DEFAULT_SCROLL_BEHAVIOR = canUseDOM ? ImitateBrowserBehavior : null;

function hasProperties(object, properties) {
  for (var propertyName in properties) if (properties.hasOwnProperty(propertyName) && object[propertyName] !== properties[propertyName]) {
    return false;
  }return true;
}

function hasMatch(routes, route, prevParams, nextParams, prevQuery, nextQuery) {
  return routes.some(function (r) {
    if (r !== route) return false;

    var paramNames = route.paramNames;
    var paramName;

    // Ensure that all params the route cares about did not change.
    for (var i = 0, len = paramNames.length; i < len; ++i) {
      paramName = paramNames[i];

      if (nextParams[paramName] !== prevParams[paramName]) return false;
    }

    // Ensure the query hasn't changed.
    return hasProperties(prevQuery, nextQuery) && hasProperties(nextQuery, prevQuery);
  });
}

function addRoutesToNamedRoutes(routes, namedRoutes) {
  var route;
  for (var i = 0, len = routes.length; i < len; ++i) {
    route = routes[i];

    if (route.name) {
      invariant(namedRoutes[route.name] == null, 'You may not have more than one route named "%s"', route.name);

      namedRoutes[route.name] = route;
    }

    if (route.childRoutes) addRoutesToNamedRoutes(route.childRoutes, namedRoutes);
  }
}

function routeIsActive(activeRoutes, routeName) {
  return activeRoutes.some(function (route) {
    return route.name === routeName;
  });
}

function paramsAreActive(activeParams, params) {
  for (var property in params) if (String(activeParams[property]) !== String(params[property])) {
    return false;
  }return true;
}

function queryIsActive(activeQuery, query) {
  for (var property in query) if (String(activeQuery[property]) !== String(query[property])) {
    return false;
  }return true;
}

/**
 * Creates and returns a new router using the given options. A router
 * is a ReactComponent class that knows how to react to changes in the
 * URL and keep the contents of the page in sync.
 *
 * Options may be any of the following:
 *
 * - routes           (required) The route config
 * - location         The location to use. Defaults to HashLocation when
 *                    the DOM is available, "/" otherwise
 * - scrollBehavior   The scroll behavior to use. Defaults to ImitateBrowserBehavior
 *                    when the DOM is available, null otherwise
 * - onError          A function that is used to handle errors
 * - onAbort          A function that is used to handle aborted transitions
 *
 * When rendering in a server-side environment, the location should simply
 * be the URL path that was used in the request, including the query string.
 */
function createRouter(options) {
  options = options || {};

  if (isReactChildren(options)) options = { routes: options };

  var mountedComponents = [];
  var location = options.location || DEFAULT_LOCATION;
  var scrollBehavior = options.scrollBehavior || DEFAULT_SCROLL_BEHAVIOR;
  var state = {};
  var nextState = {};
  var pendingTransition = null;
  var dispatchHandler = null;

  if (typeof location === 'string') location = new StaticLocation(location);

  if (location instanceof StaticLocation) {
    warning(!canUseDOM || process.env.NODE_ENV === 'test', 'You should not use a static location in a DOM environment because ' + 'the router will not be kept in sync with the current URL');
  } else {
    invariant(canUseDOM || location.needsDOM === false, 'You cannot use %s without a DOM', location);
  }

  // Automatically fall back to full page refreshes in
  // browsers that don't support the HTML history API.
  if (location === HistoryLocation && !supportsHistory()) location = RefreshLocation;

  var Router = React.createClass({

    displayName: 'Router',

    statics: {

      isRunning: false,

      cancelPendingTransition: function cancelPendingTransition() {
        if (pendingTransition) {
          pendingTransition.cancel();
          pendingTransition = null;
        }
      },

      clearAllRoutes: function clearAllRoutes() {
        Router.cancelPendingTransition();
        Router.namedRoutes = {};
        Router.routes = [];
      },

      /**
       * Adds routes to this router from the given children object (see ReactChildren).
       */
      addRoutes: function addRoutes(routes) {
        if (isReactChildren(routes)) routes = createRoutesFromReactChildren(routes);

        addRoutesToNamedRoutes(routes, Router.namedRoutes);

        Router.routes.push.apply(Router.routes, routes);
      },

      /**
       * Replaces routes of this router from the given children object (see ReactChildren).
       */
      replaceRoutes: function replaceRoutes(routes) {
        Router.clearAllRoutes();
        Router.addRoutes(routes);
        Router.refresh();
      },

      /**
       * Performs a match of the given path against this router and returns an object
       * with the { routes, params, pathname, query } that match. Returns null if no
       * match can be made.
       */
      match: function match(path) {
        return Match.findMatch(Router.routes, path);
      },

      /**
       * Returns an absolute URL path created from the given route
       * name, URL parameters, and query.
       */
      makePath: function makePath(to, params, query) {
        var path;
        if (PathUtils.isAbsolute(to)) {
          path = to;
        } else {
          var route = to instanceof Route ? to : Router.namedRoutes[to];

          invariant(route instanceof Route, 'Cannot find a route named "%s"', to);

          path = route.path;
        }

        return PathUtils.withQuery(PathUtils.injectParams(path, params), query);
      },

      /**
       * Returns a string that may safely be used as the href of a link
       * to the route with the given name, URL parameters, and query.
       */
      makeHref: function makeHref(to, params, query) {
        var path = Router.makePath(to, params, query);
        return location === HashLocation ? '#' + path : path;
      },

      /**
       * Transitions to the URL specified in the arguments by pushing
       * a new URL onto the history stack.
       */
      transitionTo: function transitionTo(to, params, query) {
        var path = Router.makePath(to, params, query);

        if (pendingTransition) {
          // Replace so pending location does not stay in history.
          location.replace(path);
        } else {
          location.push(path);
        }
      },

      /**
       * Transitions to the URL specified in the arguments by replacing
       * the current URL in the history stack.
       */
      replaceWith: function replaceWith(to, params, query) {
        location.replace(Router.makePath(to, params, query));
      },

      /**
       * Transitions to the previous URL if one is available. Returns true if the
       * router was able to go back, false otherwise.
       *
       * Note: The router only tracks history entries in your application, not the
       * current browser session, so you can safely call this function without guarding
       * against sending the user back to some other site. However, when using
       * RefreshLocation (which is the fallback for HistoryLocation in browsers that
       * don't support HTML5 history) this method will *always* send the client back
       * because we cannot reliably track history length.
       */
      goBack: function goBack() {
        if (History.length > 1 || location === RefreshLocation) {
          location.pop();
          return true;
        }

        warning(false, 'goBack() was ignored because there is no router history');

        return false;
      },

      handleAbort: options.onAbort || function (abortReason) {
        if (location instanceof StaticLocation) throw new Error('Unhandled aborted transition! Reason: ' + abortReason);

        if (abortReason instanceof Cancellation) {
          return;
        } else if (abortReason instanceof Redirect) {
          location.replace(Router.makePath(abortReason.to, abortReason.params, abortReason.query));
        } else {
          location.pop();
        }
      },

      handleError: options.onError || function (error) {
        // Throw so we don't silently swallow async errors.
        throw error; // This error probably originated in a transition hook.
      },

      handleLocationChange: function handleLocationChange(change) {
        Router.dispatch(change.path, change.type);
      },

      /**
       * Performs a transition to the given path and calls callback(error, abortReason)
       * when the transition is finished. If both arguments are null the router's state
       * was updated. Otherwise the transition did not complete.
       *
       * In a transition, a router first determines which routes are involved by beginning
       * with the current route, up the route tree to the first parent route that is shared
       * with the destination route, and back down the tree to the destination route. The
       * willTransitionFrom hook is invoked on all route handlers we're transitioning away
       * from, in reverse nesting order. Likewise, the willTransitionTo hook is invoked on
       * all route handlers we're transitioning to.
       *
       * Both willTransitionFrom and willTransitionTo hooks may either abort or redirect the
       * transition. To resolve asynchronously, they may use the callback argument. If no
       * hooks wait, the transition is fully synchronous.
       */
      dispatch: function dispatch(path, action) {
        Router.cancelPendingTransition();

        var prevPath = state.path;
        var isRefreshing = action == null;

        if (prevPath === path && !isRefreshing) {
          return;
        } // Nothing to do!

        // Record the scroll position as early as possible to
        // get it before browsers try update it automatically.
        if (prevPath && action === LocationActions.PUSH) Router.recordScrollPosition(prevPath);

        var match = Router.match(path);

        warning(match != null, 'No route matches path "%s". Make sure you have <Route path="%s"> somewhere in your routes', path, path);

        if (match == null) match = {};

        var prevRoutes = state.routes || [];
        var prevParams = state.params || {};
        var prevQuery = state.query || {};

        var nextRoutes = match.routes || [];
        var nextParams = match.params || {};
        var nextQuery = match.query || {};

        var fromRoutes, toRoutes;
        if (prevRoutes.length) {
          fromRoutes = prevRoutes.filter(function (route) {
            return !hasMatch(nextRoutes, route, prevParams, nextParams, prevQuery, nextQuery);
          });

          toRoutes = nextRoutes.filter(function (route) {
            return !hasMatch(prevRoutes, route, prevParams, nextParams, prevQuery, nextQuery);
          });
        } else {
          fromRoutes = [];
          toRoutes = nextRoutes;
        }

        var transition = new Transition(path, Router.replaceWith.bind(Router, path));
        pendingTransition = transition;

        var fromComponents = mountedComponents.slice(prevRoutes.length - fromRoutes.length);

        Transition.from(transition, fromRoutes, fromComponents, function (error) {
          if (error || transition.abortReason) return dispatchHandler.call(Router, error, transition); // No need to continue.

          Transition.to(transition, toRoutes, nextParams, nextQuery, function (error) {
            dispatchHandler.call(Router, error, transition, {
              path: path,
              action: action,
              pathname: match.pathname,
              routes: nextRoutes,
              params: nextParams,
              query: nextQuery
            });
          });
        });
      },

      /**
       * Starts this router and calls callback(router, state) when the route changes.
       *
       * If the router's location is static (i.e. a URL path in a server environment)
       * the callback is called only once. Otherwise, the location should be one of the
       * Router.*Location objects (e.g. Router.HashLocation or Router.HistoryLocation).
       */
      run: function run(callback) {
        invariant(!Router.isRunning, 'Router is already running');

        dispatchHandler = function (error, transition, newState) {
          if (error) Router.handleError(error);

          if (pendingTransition !== transition) return;

          pendingTransition = null;

          if (transition.abortReason) {
            Router.handleAbort(transition.abortReason);
          } else {
            callback.call(Router, Router, nextState = newState);
          }
        };

        if (!(location instanceof StaticLocation)) {
          if (location.addChangeListener) location.addChangeListener(Router.handleLocationChange);

          Router.isRunning = true;
        }

        // Bootstrap using the current path.
        Router.refresh();
      },

      refresh: function refresh() {
        Router.dispatch(location.getCurrentPath(), null);
      },

      stop: function stop() {
        Router.cancelPendingTransition();

        if (location.removeChangeListener) location.removeChangeListener(Router.handleLocationChange);

        Router.isRunning = false;
      },

      getLocation: function getLocation() {
        return location;
      },

      getScrollBehavior: function getScrollBehavior() {
        return scrollBehavior;
      },

      getRouteAtDepth: function getRouteAtDepth(routeDepth) {
        var routes = state.routes;
        return routes && routes[routeDepth];
      },

      setRouteComponentAtDepth: function setRouteComponentAtDepth(routeDepth, component) {
        mountedComponents[routeDepth] = component;
      },

      /**
       * Returns the current URL path + query string.
       */
      getCurrentPath: function getCurrentPath() {
        return state.path;
      },

      /**
       * Returns the current URL path without the query string.
       */
      getCurrentPathname: function getCurrentPathname() {
        return state.pathname;
      },

      /**
       * Returns an object of the currently active URL parameters.
       */
      getCurrentParams: function getCurrentParams() {
        return state.params;
      },

      /**
       * Returns an object of the currently active query parameters.
       */
      getCurrentQuery: function getCurrentQuery() {
        return state.query;
      },

      /**
       * Returns an array of the currently active routes.
       */
      getCurrentRoutes: function getCurrentRoutes() {
        return state.routes;
      },

      /**
       * Returns true if the given route, params, and query are active.
       */
      isActive: function isActive(to, params, query) {
        if (PathUtils.isAbsolute(to)) {
          return to === state.path;
        }return routeIsActive(state.routes, to) && paramsAreActive(state.params, params) && (query == null || queryIsActive(state.query, query));
      }

    },

    mixins: [ScrollHistory],

    propTypes: {
      children: PropTypes.falsy
    },

    childContextTypes: {
      routeDepth: PropTypes.number.isRequired,
      router: PropTypes.router.isRequired
    },

    getChildContext: function getChildContext() {
      return {
        routeDepth: 1,
        router: Router
      };
    },

    getInitialState: function getInitialState() {
      return state = nextState;
    },

    componentWillReceiveProps: function componentWillReceiveProps() {
      this.setState(state = nextState);
    },

    componentWillUnmount: function componentWillUnmount() {
      Router.stop();
    },

    render: function render() {
      var route = Router.getRouteAtDepth(0);
      return route ? React.createElement(route.handler, this.props) : null;
    }

  });

  Router.clearAllRoutes();

  if (options.routes) Router.addRoutes(options.routes);

  return Router;
}

module.exports = createRouter;
}).call(this,require('_process'))
},{"./Cancellation":136,"./History":137,"./Match":138,"./PathUtils":140,"./PropTypes":141,"./Redirect":142,"./Route":143,"./ScrollHistory":144,"./Transition":146,"./actions/LocationActions":147,"./behaviors/ImitateBrowserBehavior":148,"./createRoutesFromReactChildren":158,"./isReactChildren":161,"./locations/HashLocation":162,"./locations/HistoryLocation":163,"./locations/RefreshLocation":164,"./locations/StaticLocation":165,"./supportsHistory":168,"_process":1,"react/lib/ExecutionEnvironment":175,"react/lib/invariant":178,"react/lib/warning":179}],158:[function(require,module,exports){
/* jshint -W084 */
'use strict';

var React = window.React;
var assign = require('react/lib/Object.assign');
var warning = require('react/lib/warning');
var DefaultRoute = require('./components/DefaultRoute');
var NotFoundRoute = require('./components/NotFoundRoute');
var Redirect = require('./components/Redirect');
var Route = require('./Route');

function checkPropTypes(componentName, propTypes, props) {
  componentName = componentName || 'UnknownComponent';

  for (var propName in propTypes) {
    if (propTypes.hasOwnProperty(propName)) {
      var error = propTypes[propName](props, propName, componentName);

      if (error instanceof Error) warning(false, error.message);
    }
  }
}

function createRouteOptions(props) {
  var options = assign({}, props);
  var handler = options.handler;

  if (handler) {
    options.onEnter = handler.willTransitionTo;
    options.onLeave = handler.willTransitionFrom;
  }

  return options;
}

function createRouteFromReactElement(element) {
  if (!React.isValidElement(element)) {
    return;
  }var type = element.type;
  var props = assign({}, type.defaultProps, element.props);

  if (type.propTypes) checkPropTypes(type.displayName, type.propTypes, props);

  if (type === DefaultRoute) {
    return Route.createDefaultRoute(createRouteOptions(props));
  }if (type === NotFoundRoute) {
    return Route.createNotFoundRoute(createRouteOptions(props));
  }if (type === Redirect) {
    return Route.createRedirect(createRouteOptions(props));
  }return Route.createRoute(createRouteOptions(props), function () {
    if (props.children) createRoutesFromReactChildren(props.children);
  });
}

/**
 * Creates and returns an array of routes created from the given
 * ReactChildren, all of which should be one of <Route>, <DefaultRoute>,
 * <NotFoundRoute>, or <Redirect>, e.g.:
 *
 *   var { createRoutesFromReactChildren, Route, Redirect } = require('react-router');
 *
 *   var routes = createRoutesFromReactChildren(
 *     <Route path="/" handler={App}>
 *       <Route name="user" path="/user/:userId" handler={User}>
 *         <Route name="task" path="tasks/:taskId" handler={Task}/>
 *         <Redirect from="todos/:taskId" to="task"/>
 *       </Route>
 *     </Route>
 *   );
 */
function createRoutesFromReactChildren(children) {
  var routes = [];

  React.Children.forEach(children, function (child) {
    if (child = createRouteFromReactElement(child)) routes.push(child);
  });

  return routes;
}

module.exports = createRoutesFromReactChildren;
},{"./Route":143,"./components/DefaultRoute":151,"./components/NotFoundRoute":153,"./components/Redirect":154,"react/lib/Object.assign":176,"react/lib/warning":179}],159:[function(require,module,exports){
'use strict';

var invariant = require('react/lib/invariant');
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;

/**
 * Returns the current scroll position of the window as { x, y }.
 */
function getWindowScrollPosition() {
  invariant(canUseDOM, 'Cannot get current scroll position without a DOM');

  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  };
}

module.exports = getWindowScrollPosition;
},{"react/lib/ExecutionEnvironment":175,"react/lib/invariant":178}],160:[function(require,module,exports){
'use strict';

exports.DefaultRoute = require('./components/DefaultRoute');
exports.Link = require('./components/Link');
exports.NotFoundRoute = require('./components/NotFoundRoute');
exports.Redirect = require('./components/Redirect');
exports.Route = require('./components/Route');
exports.ActiveHandler = require('./components/RouteHandler');
exports.RouteHandler = exports.ActiveHandler;

exports.HashLocation = require('./locations/HashLocation');
exports.HistoryLocation = require('./locations/HistoryLocation');
exports.RefreshLocation = require('./locations/RefreshLocation');
exports.StaticLocation = require('./locations/StaticLocation');
exports.TestLocation = require('./locations/TestLocation');

exports.ImitateBrowserBehavior = require('./behaviors/ImitateBrowserBehavior');
exports.ScrollToTopBehavior = require('./behaviors/ScrollToTopBehavior');

exports.History = require('./History');
exports.Navigation = require('./Navigation');
exports.State = require('./State');

exports.createRoute = require('./Route').createRoute;
exports.createDefaultRoute = require('./Route').createDefaultRoute;
exports.createNotFoundRoute = require('./Route').createNotFoundRoute;
exports.createRedirect = require('./Route').createRedirect;
exports.createRoutesFromReactChildren = require('./createRoutesFromReactChildren');

exports.create = require('./createRouter');
exports.run = require('./runRouter');
},{"./History":137,"./Navigation":139,"./Route":143,"./State":145,"./behaviors/ImitateBrowserBehavior":148,"./behaviors/ScrollToTopBehavior":149,"./components/DefaultRoute":151,"./components/Link":152,"./components/NotFoundRoute":153,"./components/Redirect":154,"./components/Route":155,"./components/RouteHandler":156,"./createRouter":157,"./createRoutesFromReactChildren":158,"./locations/HashLocation":162,"./locations/HistoryLocation":163,"./locations/RefreshLocation":164,"./locations/StaticLocation":165,"./locations/TestLocation":166,"./runRouter":167}],161:[function(require,module,exports){
'use strict';

var React = window.React;

function isValidChild(object) {
  return object == null || React.isValidElement(object);
}

function isReactChildren(object) {
  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
}

module.exports = isReactChildren;
},{}],162:[function(require,module,exports){
'use strict';

var LocationActions = require('../actions/LocationActions');
var History = require('../History');

var _listeners = [];
var _isListening = false;
var _actionType;

function notifyChange(type) {
  if (type === LocationActions.PUSH) History.length += 1;

  var change = {
    path: HashLocation.getCurrentPath(),
    type: type
  };

  _listeners.forEach(function (listener) {
    listener.call(HashLocation, change);
  });
}

function ensureSlash() {
  var path = HashLocation.getCurrentPath();

  if (path.charAt(0) === '/') {
    return true;
  }HashLocation.replace('/' + path);

  return false;
}

function onHashChange() {
  if (ensureSlash()) {
    // If we don't have an _actionType then all we know is the hash
    // changed. It was probably caused by the user clicking the Back
    // button, but may have also been the Forward button or manual
    // manipulation. So just guess 'pop'.
    var curActionType = _actionType;
    _actionType = null;
    notifyChange(curActionType || LocationActions.POP);
  }
}

/**
 * A Location that uses `window.location.hash`.
 */
var HashLocation = {

  addChangeListener: function addChangeListener(listener) {
    _listeners.push(listener);

    // Do this BEFORE listening for hashchange.
    ensureSlash();

    if (!_isListening) {
      if (window.addEventListener) {
        window.addEventListener('hashchange', onHashChange, false);
      } else {
        window.attachEvent('onhashchange', onHashChange);
      }

      _isListening = true;
    }
  },

  removeChangeListener: function removeChangeListener(listener) {
    _listeners = _listeners.filter(function (l) {
      return l !== listener;
    });

    if (_listeners.length === 0) {
      if (window.removeEventListener) {
        window.removeEventListener('hashchange', onHashChange, false);
      } else {
        window.removeEvent('onhashchange', onHashChange);
      }

      _isListening = false;
    }
  },

  push: function push(path) {
    _actionType = LocationActions.PUSH;
    window.location.hash = path;
  },

  replace: function replace(path) {
    _actionType = LocationActions.REPLACE;
    window.location.replace(window.location.pathname + window.location.search + '#' + path);
  },

  pop: function pop() {
    _actionType = LocationActions.POP;
    History.back();
  },

  getCurrentPath: function getCurrentPath() {
    return decodeURI(
    // We can't use window.location.hash here because it's not
    // consistent across browsers - Firefox will pre-decode it!
    window.location.href.split('#')[1] || '');
  },

  toString: function toString() {
    return '<HashLocation>';
  }

};

module.exports = HashLocation;
},{"../History":137,"../actions/LocationActions":147}],163:[function(require,module,exports){
'use strict';

var LocationActions = require('../actions/LocationActions');
var History = require('../History');

var _listeners = [];
var _isListening = false;

function notifyChange(type) {
  var change = {
    path: HistoryLocation.getCurrentPath(),
    type: type
  };

  _listeners.forEach(function (listener) {
    listener.call(HistoryLocation, change);
  });
}

function onPopState(event) {
  if (event.state === undefined) {
    return;
  } // Ignore extraneous popstate events in WebKit.

  notifyChange(LocationActions.POP);
}

/**
 * A Location that uses HTML5 history.
 */
var HistoryLocation = {

  addChangeListener: function addChangeListener(listener) {
    _listeners.push(listener);

    if (!_isListening) {
      if (window.addEventListener) {
        window.addEventListener('popstate', onPopState, false);
      } else {
        window.attachEvent('onpopstate', onPopState);
      }

      _isListening = true;
    }
  },

  removeChangeListener: function removeChangeListener(listener) {
    _listeners = _listeners.filter(function (l) {
      return l !== listener;
    });

    if (_listeners.length === 0) {
      if (window.addEventListener) {
        window.removeEventListener('popstate', onPopState, false);
      } else {
        window.removeEvent('onpopstate', onPopState);
      }

      _isListening = false;
    }
  },

  push: function push(path) {
    window.history.pushState({ path: path }, '', path);
    History.length += 1;
    notifyChange(LocationActions.PUSH);
  },

  replace: function replace(path) {
    window.history.replaceState({ path: path }, '', path);
    notifyChange(LocationActions.REPLACE);
  },

  pop: History.back,

  getCurrentPath: function getCurrentPath() {
    return decodeURI(window.location.pathname + window.location.search);
  },

  toString: function toString() {
    return '<HistoryLocation>';
  }

};

module.exports = HistoryLocation;
},{"../History":137,"../actions/LocationActions":147}],164:[function(require,module,exports){
'use strict';

var HistoryLocation = require('./HistoryLocation');
var History = require('../History');

/**
 * A Location that uses full page refreshes. This is used as
 * the fallback for HistoryLocation in browsers that do not
 * support the HTML5 history API.
 */
var RefreshLocation = {

  push: function push(path) {
    window.location = path;
  },

  replace: function replace(path) {
    window.location.replace(path);
  },

  pop: History.back,

  getCurrentPath: HistoryLocation.getCurrentPath,

  toString: function toString() {
    return '<RefreshLocation>';
  }

};

module.exports = RefreshLocation;
},{"../History":137,"./HistoryLocation":163}],165:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var invariant = require('react/lib/invariant');

function throwCannotModify() {
  invariant(false, 'You cannot modify a static location');
}

/**
 * A location that only ever contains a single path. Useful in
 * stateless environments like servers where there is no path history,
 * only the path that was used in the request.
 */

var StaticLocation = (function () {
  function StaticLocation(path) {
    _classCallCheck(this, StaticLocation);

    this.path = path;
  }

  _createClass(StaticLocation, [{
    key: 'getCurrentPath',
    value: function getCurrentPath() {
      return this.path;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '<StaticLocation path="' + this.path + '">';
    }
  }]);

  return StaticLocation;
})();

// TODO: Include these in the above class definition
// once we can use ES7 property initializers.
// https://github.com/babel/babel/issues/619

StaticLocation.prototype.push = throwCannotModify;
StaticLocation.prototype.replace = throwCannotModify;
StaticLocation.prototype.pop = throwCannotModify;

module.exports = StaticLocation;
},{"react/lib/invariant":178}],166:[function(require,module,exports){
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var invariant = require('react/lib/invariant');
var LocationActions = require('../actions/LocationActions');
var History = require('../History');

/**
 * A location that is convenient for testing and does not require a DOM.
 */

var TestLocation = (function () {
  function TestLocation(history) {
    _classCallCheck(this, TestLocation);

    this.history = history || [];
    this.listeners = [];
    this._updateHistoryLength();
  }

  _createClass(TestLocation, [{
    key: 'needsDOM',
    get: function () {
      return false;
    }
  }, {
    key: '_updateHistoryLength',
    value: function _updateHistoryLength() {
      History.length = this.history.length;
    }
  }, {
    key: '_notifyChange',
    value: function _notifyChange(type) {
      var change = {
        path: this.getCurrentPath(),
        type: type
      };

      for (var i = 0, len = this.listeners.length; i < len; ++i) this.listeners[i].call(this, change);
    }
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(listener) {
      this.listeners.push(listener);
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(listener) {
      this.listeners = this.listeners.filter(function (l) {
        return l !== listener;
      });
    }
  }, {
    key: 'push',
    value: function push(path) {
      this.history.push(path);
      this._updateHistoryLength();
      this._notifyChange(LocationActions.PUSH);
    }
  }, {
    key: 'replace',
    value: function replace(path) {
      invariant(this.history.length, 'You cannot replace the current path with no history');

      this.history[this.history.length - 1] = path;

      this._notifyChange(LocationActions.REPLACE);
    }
  }, {
    key: 'pop',
    value: function pop() {
      this.history.pop();
      this._updateHistoryLength();
      this._notifyChange(LocationActions.POP);
    }
  }, {
    key: 'getCurrentPath',
    value: function getCurrentPath() {
      return this.history[this.history.length - 1];
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '<TestLocation>';
    }
  }]);

  return TestLocation;
})();

module.exports = TestLocation;
},{"../History":137,"../actions/LocationActions":147,"react/lib/invariant":178}],167:[function(require,module,exports){
'use strict';

var createRouter = require('./createRouter');

/**
 * A high-level convenience method that creates, configures, and
 * runs a router in one shot. The method signature is:
 *
 *   Router.run(routes[, location ], callback);
 *
 * Using `window.location.hash` to manage the URL, you could do:
 *
 *   Router.run(routes, function (Handler) {
 *     React.render(<Handler/>, document.body);
 *   });
 * 
 * Using HTML5 history and a custom "cursor" prop:
 * 
 *   Router.run(routes, Router.HistoryLocation, function (Handler) {
 *     React.render(<Handler cursor={cursor}/>, document.body);
 *   });
 *
 * Returns the newly created router.
 *
 * Note: If you need to specify further options for your router such
 * as error/abort handling or custom scroll behavior, use Router.create
 * instead.
 *
 *   var router = Router.create(options);
 *   router.run(function (Handler) {
 *     // ...
 *   });
 */
function runRouter(routes, location, callback) {
  if (typeof location === 'function') {
    callback = location;
    location = null;
  }

  var router = createRouter({
    routes: routes,
    location: location
  });

  router.run(callback);

  return router;
}

module.exports = runRouter;
},{"./createRouter":157}],168:[function(require,module,exports){
'use strict';

function supportsHistory() {
  /*! taken from modernizr
   * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
   * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
   * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
   */
  var ua = navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }
  return window.history && 'pushState' in window.history;
}

module.exports = supportsHistory;
},{}],169:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],170:[function(require,module,exports){
module.exports = require('./lib/');

},{"./lib/":171}],171:[function(require,module,exports){
// Load modules

var Stringify = require('./stringify');
var Parse = require('./parse');


// Declare internals

var internals = {};


module.exports = {
    stringify: Stringify,
    parse: Parse
};

},{"./parse":172,"./stringify":173}],172:[function(require,module,exports){
// Load modules

var Utils = require('./utils');


// Declare internals

var internals = {
    delimiter: '&',
    depth: 5,
    arrayLimit: 20,
    parameterLimit: 1000
};


internals.parseValues = function (str, options) {

    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0, il = parts.length; i < il; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        if (pos === -1) {
            obj[Utils.decode(part)] = '';
        }
        else {
            var key = Utils.decode(part.slice(0, pos));
            var val = Utils.decode(part.slice(pos + 1));

            if (Object.prototype.hasOwnProperty(key)) {
                continue;
            }

            if (!obj.hasOwnProperty(key)) {
                obj[key] = val;
            }
            else {
                obj[key] = [].concat(obj[key]).concat(val);
            }
        }
    }

    return obj;
};


internals.parseObject = function (chain, val, options) {

    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj = {};
    if (root === '[]') {
        obj = [];
        obj = obj.concat(internals.parseObject(chain, val, options));
    }
    else {
        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
        var index = parseInt(cleanRoot, 10);
        var indexString = '' + index;
        if (!isNaN(index) &&
            root !== cleanRoot &&
            indexString === cleanRoot &&
            index >= 0 &&
            index <= options.arrayLimit) {

            obj = [];
            obj[index] = internals.parseObject(chain, val, options);
        }
        else {
            obj[cleanRoot] = internals.parseObject(chain, val, options);
        }
    }

    return obj;
};


internals.parseKeys = function (key, val, options) {

    if (!key) {
        return;
    }

    // The regex chunks

    var parent = /^([^\[\]]*)/;
    var child = /(\[[^\[\]]*\])/g;

    // Get the parent

    var segment = parent.exec(key);

    // Don't allow them to overwrite object prototype properties

    if (Object.prototype.hasOwnProperty(segment[1])) {
        return;
    }

    // Stash the parent if it exists

    var keys = [];
    if (segment[1]) {
        keys.push(segment[1]);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {

        ++i;
        if (!Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
            keys.push(segment[1]);
        }
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return internals.parseObject(keys, val, options);
};


module.exports = function (str, options) {

    if (str === '' ||
        str === null ||
        typeof str === 'undefined') {

        return {};
    }

    options = options || {};
    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;

    var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;
    var obj = {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i];
        var newObj = internals.parseKeys(key, tempObj[key], options);
        obj = Utils.merge(obj, newObj);
    }

    return Utils.compact(obj);
};

},{"./utils":174}],173:[function(require,module,exports){
// Load modules

var Utils = require('./utils');


// Declare internals

var internals = {
    delimiter: '&',
    arrayPrefixGenerators: {
        brackets: function (prefix, key) {
            return prefix + '[]';
        },
        indices: function (prefix, key) {
            return prefix + '[' + key + ']';
        },
        repeat: function (prefix, key) {
            return prefix;
        }
    }
};


internals.stringify = function (obj, prefix, generateArrayPrefix) {

    if (Utils.isBuffer(obj)) {
        obj = obj.toString();
    }
    else if (obj instanceof Date) {
        obj = obj.toISOString();
    }
    else if (obj === null) {
        obj = '';
    }

    if (typeof obj === 'string' ||
        typeof obj === 'number' ||
        typeof obj === 'boolean') {

        return [encodeURIComponent(prefix) + '=' + encodeURIComponent(obj)];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys = Object.keys(obj);
    for (var i = 0, il = objKeys.length; i < il; ++i) {
        var key = objKeys[i];
        if (Array.isArray(obj)) {
            values = values.concat(internals.stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix));
        }
        else {
            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']', generateArrayPrefix));
        }
    }

    return values;
};


module.exports = function (obj, options) {

    options = options || {};
    var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;

    var keys = [];

    if (typeof obj !== 'object' ||
        obj === null) {

        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in internals.arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    }
    else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    }
    else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = internals.arrayPrefixGenerators[arrayFormat];

    var objKeys = Object.keys(obj);
    for (var i = 0, il = objKeys.length; i < il; ++i) {
        var key = objKeys[i];
        keys = keys.concat(internals.stringify(obj[key], key, generateArrayPrefix));
    }

    return keys.join(delimiter);
};

},{"./utils":174}],174:[function(require,module,exports){
// Load modules


// Declare internals

var internals = {};


exports.arrayToObject = function (source) {

    var obj = {};
    for (var i = 0, il = source.length; i < il; ++i) {
        if (typeof source[i] !== 'undefined') {

            obj[i] = source[i];
        }
    }

    return obj;
};


exports.merge = function (target, source) {

    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        }
        else {
            target[source] = true;
        }

        return target;
    }

    if (typeof target !== 'object') {
        target = [target].concat(source);
        return target;
    }

    if (Array.isArray(target) &&
        !Array.isArray(source)) {

        target = exports.arrayToObject(target);
    }

    var keys = Object.keys(source);
    for (var k = 0, kl = keys.length; k < kl; ++k) {
        var key = keys[k];
        var value = source[key];

        if (!target[key]) {
            target[key] = value;
        }
        else {
            target[key] = exports.merge(target[key], value);
        }
    }

    return target;
};


exports.decode = function (str) {

    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};


exports.compact = function (obj, refs) {

    if (typeof obj !== 'object' ||
        obj === null) {

        return obj;
    }

    refs = refs || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0, il = obj.length; i < il; ++i) {
            if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    for (i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i];
        obj[key] = exports.compact(obj[key], refs);
    }

    return obj;
};


exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};


exports.isBuffer = function (obj) {

    if (obj === null ||
        typeof obj === 'undefined') {

        return false;
    }

    return !!(obj.constructor &&
        obj.constructor.isBuffer &&
        obj.constructor.isBuffer(obj));
};

},{}],175:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ExecutionEnvironment
 */

/*jslint evil: true */

"use strict";

var canUseDOM = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners:
    canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

},{}],176:[function(require,module,exports){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Object.assign
 */

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

'use strict';

function assign(target, sources) {
  if (target == null) {
    throw new TypeError('Object.assign target cannot be null or undefined');
  }

  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var from = Object(nextSource);

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects. We don't support symbols so they won't
    // be transferred.

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
}

module.exports = assign;

},{}],177:[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule emptyFunction
 */

function makeEmptyFunction(arg) {
  return function() {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
function emptyFunction() {}

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function() { return this; };
emptyFunction.thatReturnsArgument = function(arg) { return arg; };

module.exports = emptyFunction;

},{}],178:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if ("production" !== process.env.NODE_ENV) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))
},{"_process":1}],179:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule warning
 */

"use strict";

var emptyFunction = require("./emptyFunction");

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if ("production" !== process.env.NODE_ENV) {
  warning = function(condition, format ) {for (var args=[],$__0=2,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || /^[s\W]*$/.test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];});
      console.warn(message);
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

}).call(this,require('_process'))
},{"./emptyFunction":177,"_process":1}],180:[function(require,module,exports){
'use strict';

var React = window.React;
var ReactRouter = require('react-router');

var SocialElement = React.createClass({displayName: "SocialElement",

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            React.createElement("ul", {className: "social"}, 
                React.createElement("li", null, React.createElement("a", {href: "#", title: "Síguenos en facebooks", target: "_blank"}, React.createElement("span", null, "Facebook")))
            )
        );
    }
});

module.exports = SocialElement;

},{"react-router":160}],181:[function(require,module,exports){
'use strict';

var React = window.React;
var ReactRouter = require('react-router');

var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Link = ReactRouter.Link;

var SocialElement = require('./element-social');

var FooterSection = React.createClass({displayName: "FooterSection",

  render: function() {
    return (
        React.createElement("div", null, 
            React.createElement("div", {className: "container"}, 
                React.createElement(Row, null, 
                    React.createElement(Col, {xs: 12, sm: 7}, 
                        React.createElement("nav", {id: "footerNavigation"}, 
                            React.createElement("ul", null, 
                                React.createElement("li", null, 
                                    React.createElement("h5", null, React.createElement(Link, {to: "coverage", title: "Coberturas"}, "Coberturas")), 
                                    React.createElement("ul", null, 
                                        React.createElement("li", null, React.createElement("a", {href: "coberturas/basica", title: "Básica"}, "Básica")), 
                                        React.createElement("li", null, React.createElement("a", {href: "coberturas/limitada", title: "Limitada"}, "Limitada")), 
                                        React.createElement("li", null, React.createElement("a", {href: "coberturas/amplia", title: "Amplia"}, "Amplia")), 
                                        React.createElement("li", null, React.createElement("a", {href: "coberturas/prestigio", title: "Prestigio"}, "Prestigio")), 
                                        React.createElement("li", null, React.createElement("a", {href: "coberturas/autos-fronterizos", title: "Autos Fronterizos"}, "Autos Fronterizos")), 
                                        React.createElement("li", null, React.createElement("a", {href: "coberturas/rc-obligatoria", title: "RC Obligatoria"}, "RC Obligatoria"))
                                    )
                                ), React.createElement("li", null, 
                                    React.createElement("h5", null, React.createElement(Link, {to: "aboutus", title: "Nosotros"}, "Nosotros")), 
                                    React.createElement("ul", null, 
                                        React.createElement("li", null, React.createElement(Link, {to: "whyUs", title: "Por qué Nosotros"}, "Por qué Nosotros")), 
                                        React.createElement("li", null, React.createElement(Link, {to: "whoAreWe", title: "Quiénes somos"}, "Quiénes somos"))
                                    )
                                ), React.createElement("li", null, 
                                    React.createElement("h5", null, React.createElement(Link, {to: "contact", title: "Contacto"}, "Contacto")), 
                                    React.createElement("ul", null, 
                                        React.createElement("li", null, React.createElement(Link, {to: "disaster", title: "En caso de Siniestro"}, "En caso de Siniestro")), 
                                        React.createElement("li", null, React.createElement(Link, {to: "contactForm", title: "Contáctanos"}, "Contáctanos"))
                                            

                                    )
                                ), React.createElement("li", null, 
                                    React.createElement("h5", null, React.createElement("a", {href: "cotiza", title: "Cotiza", target: "_blank"}, "Cotiza"))
                                )
                            )
                        )
                    ), 
                    React.createElement(Col, {xs: 12, sm: 5}, 
                        React.createElement("span", {id: "brand-footer"}, "Quetal - Mi seguro de auto"), 
                        React.createElement("p", null, "Con el respaldo de:"), 
                        React.createElement("span", {className: "general-logo"}, "General de seguros"), 
                        React.createElement(SocialElement, null)
                    )
                )
            ), 
            React.createElement("div", {id: "footerExtras"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement(Row, null, 
                        React.createElement(Col, {xs: 12, sm: 5}, 
                            React.createElement("p", null, "Todos los derechos reservados Quetal Seguro de auto   2015 ")
                        ), 
                        React.createElement(Col, {xs: 12, sm: 4}, 
                            React.createElement("p", {id: "credit"}, React.createElement("span", null, "Un proyecto de: ", React.createElement("a", {href: "http://somospool.com/", title: "Visita Branding POOL", target: "_blank"}, "POOL")), "Código por: ", React.createElement("a", {href: "http://mintitmedia.com/", title: "Mint IT Media - Diseño y desarrollo web", target: "_blank"}, "MINT"))
                        ), 
                        React.createElement(Col, {xs: 12, sm: 3}, 
                            React.createElement("a", {href: "", title: "Ver términos y condiciones"}, "Términos y Condiciones.")
                        )
                    )
                )
            )
        )
    );
  }
});

module.exports = FooterSection;
},{"./element-social":180,"react-bootstrap":70,"react-router":160}],182:[function(require,module,exports){
'use strict';

var React = window.React;
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Nav = rb.Nav;
var Navbar = rb.Navbar;
var NavItem = rb.NavItem;
var Button = rb.Button;
var DropdownButton = rb.DropdownButton;
var CollapsibleNav = rb.CollapsibleNav;


var SocialElement = require('./element-social');

var Button = rb.Button;
var Link = ReactRouter.Link;

var HeaderSection = React.createClass({displayName: "HeaderSection",

    mixins : [ReactRouter.Navigation],

    handleClick: function(){
        console.log('handleClick');
        this.transitionTo('inicio');
        this.transitionTo('coberturas');
        this.transitionTo('nosotros');
        this.transitionTo('contacto');
    },

    render: function() {
        return (
            React.createElement(Navbar, {brand: "Volver a inicio de Quetal", toggleNavKey: 0, className: "navbar-static-top"}, 
                React.createElement(CollapsibleNav, {eventKey: 0}, " ", /* This is the eventKey referenced */
                  React.createElement(Nav, {navbar: true}, 
                    React.createElement(NavItem, {eventKey: 1, href: "inicio"}, "Inicio"), 
                    React.createElement(NavItem, {eventKey: 2, href: "coberturas"}, "Coberturas"), 
                    React.createElement(NavItem, {eventKey: 3, href: "nosotros"}, "Nosotros"), 
                    React.createElement(NavItem, {eventKey: 4, href: "contacto"}, "Contacto"), 
                    React.createElement(NavItem, {eventKey: 5, href: "cotiza", target: "_blank", className: "external"}, "Cotiza")
                  )
                ), 
                React.createElement(SocialElement, null)
            )
        );
    }
});

module.exports = HeaderSection;

},{"./element-social":180,"react-bootstrap":70,"react-router":160}],183:[function(require,module,exports){
'use strict';

var React = window.React;
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var HeaderSection = require('./layout-header');
var FooterSection = require('./layout-footer');


var Layout = React.createClass({displayName: "Layout",

  getInitialState: function(){
    return {
      fixed: {
        elementID: 'header',
        className: 'fixed',
        triggerYPoint: 186
      }
    };
  },

  componentDidMount: function(){
    window.addEventListener('scroll', this.onScroll, false);
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.onScroll, false);
  },

  render: function() {
    return (
        React.createElement("div", null, 
            React.createElement("header", {id: "header"}, 
                React.createElement(HeaderSection, null)
            ), 
            React.createElement(RouteHandler, null), 
            React.createElement("footer", {id: "footer"}, 
                React.createElement(FooterSection, null)
            )
        )
    );
  },

  onScroll: function(){
    var offset = window.pageYOffset;
    if(offset > this.state.fixed.triggerYPoint){
      document.getElementById(this.state.fixed.elementID).classList.add(this.state.fixed.className);
    }
    else{
      document.getElementById(this.state.fixed.elementID).classList.remove(this.state.fixed.className);
    }
  }
});

module.exports = Layout;

},{"./layout-footer":181,"./layout-header":182,"react-router":160}],184:[function(require,module,exports){
'use strict';

var React = window.React;
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var Link = ReactRouter.Link;

var HomeCallToActionPanel = React.createClass({displayName: "HomeCallToActionPanel",

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return ( 
            React.createElement("section", {id: "callToAction"}, 
                React.createElement("div", {className: "smallContainer"}, 
                    React.createElement(Row, null, 
                        React.createElement(Col, {xs: 12, sm: 6}, 
                            React.createElement("p", null, React.createElement("span", null, "¿Qué hacer en"), " caso de Siniestro?")
                        ), 
                        React.createElement(Col, {xs: 12, sm: 6}, 
                            React.createElement(Link, {to: "disaster", title: "Contáctanos", className: "greenButton"}, "Contáctanos")
                        )
                    )
                )
            )
        );
    }
});

module.exports = HomeCallToActionPanel;

},{"react-bootstrap":70,"react-router":160}],185:[function(require,module,exports){
'use strict';

var React = window.React;
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var Carousel = rb.Carousel;
var CarouselItem = rb.CarouselItem;
var Link = ReactRouter.Link;

var HomeCarouselPanel = React.createClass({displayName: "HomeCarouselPanel",

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            React.createElement("section", {id: "homeIntro"}, 
                React.createElement(Carousel, {id: "homeCarousel", interval: "3000"}, 
                    React.createElement(CarouselItem, null, 
                        React.createElement("div", {className: "container"}, 
                            React.createElement(Row, null, 
                                React.createElement(Col, {xs: 12, sm: 6}, 
                                    React.createElement("p", {className: "bigPhrase"}, 
                                        React.createElement("span", null, "Hola, Quetal"), " un Seguro de auto a tu alcance"
                                    ), 
                                    React.createElement(Link, {to: "coverage", title: "Ver Coberturas", className: "yellowButton"}, "Ver Coberturas"), 
                                    React.createElement("span", {className: "general-logo"}, "General de seguros")
                                ), 
                                React.createElement(Col, {xs: 12, sm: 6}, 
                                    React.createElement("blockquote", null, React.createElement("span", null, "Justo lo que necesito, "), React.createElement("span", null, " y al precio "), React.createElement("span", null, "más barato "))
                                )
                            ), 
                            React.createElement("span", {id: "manImage"})
                        )
                    ), 
                    React.createElement(CarouselItem, null, 
                        React.createElement("div", {className: "container"}, 
                            React.createElement(Row, null, 
                                React.createElement(Col, {xs: 12, sm: 7}, 
                                    React.createElement("p", {className: "bigPhrase narrow"}, 
                                        React.createElement("span", null, "Ahorra"), " desde un 20% en tu Seguro de Auto"
                                    ), 
                                    React.createElement("p", {className: "restrictions"}, "*En comparación con otros portales de venta" + ' ' +
"de seguros por internet."), 
                                    React.createElement(Link, {to: "coverage", title: "Ver Coberturas", className: "yellowButton"}, "Ver Coberturas"), 
                                    React.createElement("span", {className: "general-logo"}, "General de seguros")
                                ), 
                                React.createElement(Col, {xs: 12, sm: 5}
                                )
                            ), 
                            React.createElement("span", {id: "womanImage"})
                        )
                    ), 
                    React.createElement(CarouselItem, null, 
                        React.createElement("div", {className: "container"}, 
                            React.createElement(Row, null, 
                                React.createElement(Col, {xs: 12, sm: 6}, 
                                    React.createElement("p", {className: "bigPhrase"}, 
                                        React.createElement("span", {className: "inline"}, "¿Quetal"), " si choco?"
                                    ), 
                                    React.createElement("p", null, "Conoce nuestras Coberturas contra Daños a Terceros y Daños a tu Automóvil."), 
                                    React.createElement(Link, {to: "coverage", title: "Ver Coberturas", className: "yellowButton"}, "Ver Coberturas"), 
                                    React.createElement("span", {className: "general-logo"}, "General de seguros")
                                ), 
                                React.createElement(Col, {xs: 12, sm: 6}, 
                                    React.createElement("blockquote", null, React.createElement("span", null, "Mejor lo aseguro "), React.createElement("span", null, "rápido y fácil con "), React.createElement("span", null, "una compañía "), React.createElement("span", null, "de confianza "))
                                )
                            ), 
                            React.createElement("span", {id: "carImage"})
                        )
                    )
                )
            )
        );
    }
});

module.exports = HomeCarouselPanel;

},{"react-bootstrap":70,"react-router":160}],186:[function(require,module,exports){
'use strict';

var React = window.React;
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var HomeOtherServicesPanel = React.createClass({displayName: "HomeOtherServicesPanel",

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return ( 
            React.createElement("section", {id: "otherServices"}, 
                React.createElement("div", {className: "container"}, 
                    React.createElement(Row, null, 
                        React.createElement(Col, {xs: 12, sm: 6}, 
                            React.createElement("div", {className: "otherServices-block"}, 
                                React.createElement("div", null, 
                                    React.createElement("h3", null, "Autos Fronterizos o Legalizados"), 
                                    React.createElement("p", null, 
                                        React.createElement("a", {href: "cotiza", target: "_blank", title: "Cotiza", className: "blueButton"}, "Cotiza"), 
                                        React.createElement("span", {id: "borderCarIcon"})
                                    ), 
                                    React.createElement("button", {onClick: this.open, className: "arrowLink"}, 
                                      "Ver detalles"
                                    )
                                )
                            )
                        ), 
                        React.createElement(Col, {xs: 12, sm: 6}, 
                            React.createElement("div", {className: "otherServices-block"}, 
                                React.createElement("div", null, 
                                    React.createElement("h3", null, "RC Obligatoria Federal / Estatal"), 
                                    React.createElement("p", null, 
                                        React.createElement("a", {href: "cotiza", target: "_blank", title: "Cotiza", className: "blueButton"}, "Cotiza"), 
                                        React.createElement("span", {id: "civilResponsibilityIcon"})
                                    ), 
                                    React.createElement("button", {onClick: this.open, className: "arrowLink"}, 
                                      "Ver detalles"
                                    )
                                )
                            )
                        )
                    )
                ), 
                React.createElement("div", {className: "smallContainer"}, 
                    React.createElement(Row, null, 
                        React.createElement(Col, {xs: 12, sm: 5}, 
                            React.createElement("p", {id: "substituteCar"}, React.createElement("span", null, "Automóvil Sustituto"))
                        ), 
                        React.createElement(Col, {xs: 12, sm: 7}, 
                            React.createElement("p", null, "General de Seguros te ofrece un auto sustituto mientras reparamos tu auto por colisión o te pagamos tu automóvil por perdida total o robo total. "), 
                            React.createElement("p", null, "Al contratar tu Seguro:"), 
                            React.createElement(Row, {id: "substituteCar-ParticipantInsurance"}, 
                                React.createElement(Col, {xs: 12, sm: 4}, 
                                    React.createElement("p", null, React.createElement("span", null, "GS Autos "), " Amplia")
                                ), 
                                React.createElement(Col, {xs: 12, sm: 2}, 
                                    React.createElement("p", null, "o")
                                ), 
                                React.createElement(Col, {xs: 12, sm: 4}, 
                                    React.createElement("p", null, React.createElement("span", null, "GS Autos "), " Prestigio")
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});

module.exports = HomeOtherServicesPanel;

},{"react-bootstrap":70,"react-router":160}],187:[function(require,module,exports){
'use strict';

var React = window.React;
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');

var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var HomeServicesPanel = React.createClass({displayName: "HomeServicesPanel",

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            React.createElement("section", {id: "homeServices"}, 
                React.createElement("div", {className: "smallContainer"}, 
                    React.createElement("h1", null, "Contrata el paquete que necesitas"), 
                    React.createElement(Row, null, 
                        React.createElement(Col, {xs: 12, sm: 7}, 
                            React.createElement("p", {className: "medium"}, "En todas nuestras Coberturas cuentas con Seguro de Gastos Médicos para ocupantes del vehículo en caso de accidente." + ' ' +
"Además, dispones de los servicios de Asistencia Legal y Asistencia en el Camino.")
                        ), 
                        React.createElement(Col, {xs: 12, sm: 5}
                        )
                    )
                ), 
                React.createElement("div", {className: "container"}, 
                    React.createElement(Row, {id: "servicesList"}, 
                        React.createElement(Col, {xs: 12, sm: 3}, 
                            React.createElement("div", {className: "servicesList-wrap"}, 
                                React.createElement("h3", null, React.createElement("span", {className: "wrap"}, "¿Qué tal si tienes un auto del año*? "), React.createElement("span", {id: "prestigeIcon"})), 
                                React.createElement("div", {className: "servicesList-details"}, 
                                    React.createElement("h2", null, "Cobertura Prestigio"), 
                                    React.createElement("ul", {className: "checklist"}, 
                                        React.createElement("li", null, "Protección extendida"), 
                                        React.createElement("li", null, "Daños a tu vehículo"), 
                                        React.createElement("li", null, "Robo"), 
                                        React.createElement("li", null, "Daños a terceros")
                                    ), 
                                    React.createElement("p", {className: "notes"}, "*Vehículos último modelo" + ' ' + 
"y modelos recientes.")
                                ), 
                                React.createElement("a", {href: "#", target: "_blank", title: "Cotiza", className: "blueButton"}, "Cotiza")
                            ), 
                            React.createElement("button", {className: "arrowLink"}, 
                              "Ver detalles"
                            )
                        ), 
                        React.createElement(Col, {xs: 12, sm: 3, className: "featured"}, 
                            React.createElement("div", {className: "servicesList-wrap"}, 
                                React.createElement("h3", null, React.createElement("span", {className: "wrap"}, "¿Qué tal si te cuidamos bien? "), React.createElement("span", {id: "comfortIcon"})), 
                                React.createElement("div", {className: "servicesList-details"}, 
                                    React.createElement("h2", null, "Cobertura Confort Amplia"), 
                                    React.createElement("ul", {className: "checklist"}, 
                                        React.createElement("li", null, "Daños a tu vehículo"), 
                                        React.createElement("li", null, "Robo"), 
                                        React.createElement("li", null, "Daños a terceros")
                                    )
                                ), 
                                React.createElement("a", {href: "#", target: "_blank", title: "Cotiza", className: "blueButton"}, "Cotiza")
                            ), 
                            React.createElement("button", {onClick: this.open, className: "arrowLink"}, 
                              "Ver detalles"
                            )
                        ), 
                        React.createElement(Col, {xs: 12, sm: 3}, 
                            React.createElement("div", {className: "servicesList-wrap"}, 
                                React.createElement("h3", null, React.createElement("span", {className: "wrap"}, "¿Qué tal si tú pones los límites? "), React.createElement("span", {id: "limitedComfortIcon"})), 
                                React.createElement("div", {className: "servicesList-details"}, 
                                    React.createElement("h2", null, "Cobertura Confort Limitada"), 
                                    React.createElement("ul", {className: "checklist"}, 
                                        React.createElement("li", null, "Robo"), 
                                        React.createElement("li", null, "Daños a terceros")
                                    )
                                ), 
                                React.createElement("a", {href: "#", target: "_blank", title: "Cotiza", className: "blueButton"}, "Cotiza")
                            ), 
                            React.createElement("button", {onClick: this.open, className: "arrowLink"}, 
                              "Ver detalles"
                            )
                        ), 
                        React.createElement(Col, {xs: 12, sm: 3}, 
                            React.createElement("div", {className: "servicesList-wrap"}, 
                                React.createElement("h3", null, React.createElement("span", {className: "wrap"}, "¿Qué tal si quieres un Seguro como tú lo necesitas?"), React.createElement("span", {id: "basicComfortIcon"})), 
                                React.createElement("div", {className: "servicesList-details"}, 
                                    React.createElement("h2", null, "Cobertura Confort Básica"), 
                                    React.createElement("ul", {className: "checklist"}, 
                                        React.createElement("li", null, "Daños a terceros")
                                    )
                                ), 
                                React.createElement("a", {href: "#", target: "_blank", title: "Cotiza", className: "blueButton"}, "Cotiza")
                            ), 
                            React.createElement("button", {onClick: this.open, className: "arrowLink"}, 
                              "Ver detalles"
                            )
                        )
                    )
                )
            )
        );
    }
});

module.exports = HomeServicesPanel;

},{"react-bootstrap":70,"react-router":160}],188:[function(require,module,exports){
'use strict';

var React = window.React;
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var Carousel = rb.Carousel;
var CarouselItem = rb.CarouselItem;

var AboutusPanel = React.createClass({displayName: "AboutusPanel",

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {

        return (
            React.createElement("section", {id: "nosotros"}, 
                "nosotros"
            )
        );
    }
});

module.exports = AboutusPanel;

},{"react-bootstrap":70,"react-router":160}],189:[function(require,module,exports){
'use strict';

var React = window.React;
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;
var Carousel = rb.Carousel;
var CarouselItem = rb.CarouselItem;

var ContactPanel = React.createClass({displayName: "ContactPanel",

    mixins : [ReactRouter.Navigation],

    getInitialState: function(){
        return {
            formData: {}
        }
    },
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('home');
    },

    render: function() {
        var mapStyle = {
            border: 0
        };
        return (
            React.createElement("section", {id: "contacto"}, 
                
                React.createElement("div", {className: "twoColumns"}, 
                    React.createElement(Row, null, 
                        React.createElement(Col, {xs: 12, sm: 6, className: "pinkBackground"}, 
                            "Contacto"
                        ), 
                        React.createElement(Col, {xs: 12, sm: 6}, 
                            React.createElement("div", {className: "twoColumns-wraper"}, 
                                React.createElement("h2", null, "Contacto / Citas"), 
                                React.createElement("span", {className: "sidenote"}, "*Información requerida"), 
                                React.createElement("form", {id: "contactForm"}, 
                                    React.createElement("div", {className: "formGroup"}, 
                                        React.createElement("label", null, "Nombre*"), React.createElement("input", {type: "text", id: "name", name: "name", placeholder: "nombre", onChange: this.onChangeHandler.bind(this, 'input', 'name', 'Nombre')})
                                    ), 
                                    React.createElement("div", {className: "formGroup"}, 
                                        React.createElement("label", null, "Correo*"), 
                                        React.createElement("input", {type: "email", id: "email", name: "email", placeholder: "correo", onChange: this.onChangeHandler.bind(this, 'input', 'email', 'Correo')})
                                    ), 
                                    React.createElement("div", {className: "formGroup"}, 
                                        React.createElement("label", null, "Teléfono*"), 
                                        React.createElement("input", {type: "tel", id: "tel", name: "tel", placeholder: "teléfono", onChange: this.onChangeHandler.bind(this, 'input', 'tel', 'Teléfono')})
                                    ), 
                                    React.createElement("div", {className: "formGroup"}, 
                                        React.createElement("label", null, "Servicio*"), 
                                        React.createElement("div", {className: "selectWraper"}, 
                                            React.createElement("select", {onChange: this.onChangeHandler.bind(this, 'input', 'service', 'Servicio')}, 
                                                React.createElement("option", null, "Elegir servicio"), 
                                                React.createElement("option", null, "Corte"), 
                                                React.createElement("option", null, "Color"), 
                                                React.createElement("option", null, "Peinados"), 
                                                React.createElement("option", null, "Maquillaje"), 
                                                React.createElement("option", null, "Novias"), 
                                                React.createElement("option", null, "Spa")
                                            )
                                        )
                                    ), 
                                    React.createElement("div", {className: "row"}, 
                                        React.createElement(Col, {xs: 12, sm: 6}, 
                                            React.createElement("label", null, "Fecha*"), 
                                            React.createElement("input", {type: "text", id: "date", name: "date", placeholder: "dd/mm/yyyy", onChange: this.onChangeHandler.bind(this, 'input', 'date', 'Fecha')})
                                        ), 
                                        React.createElement(Col, {xs: 12, sm: 6}, 
                                            React.createElement("label", null, "Hora*"), 
                                            React.createElement("input", {type: "text", id: "time", name: "time", placeholder: "hh:mm", onChange: this.onChangeHandler.bind(this, 'input', 'time', 'Hora')})
                                        )
                                    ), 

                                    React.createElement("label", {className: "static"}, "Mensaje"), 
                                    React.createElement("textarea", {id: "mainMessage", name: "mainMessage", onChange: this.onChangeHandler.bind(this, 'input', 'mainMessage', 'Mensaje')}), 
                                    /* TODO: Agregar mensaje de error, por default es color rojo */
                                    React.createElement("span", {id: "msg"}), 

                                    React.createElement("button", {id: "submitButton", onClick: this.submitFormHandler}, React.createElement("span", null, "Enviar"))
                                )
                            )
                        )
                    )
                )
            )
        );
    },

    submitFormHandler: function(event){
        console.log('submitForm', this.state.formData);
        event.preventDefault();
    },

    onChangeHandler: function(type, property, label, event){
        var formData = this.state.formData;
        formData[property] = {
            title: 'label',
            value: event.target.value
        };
        this.setState({
            formData: formData
        });
    }
});

module.exports = ContactPanel;

},{"react-bootstrap":70,"react-router":160}],190:[function(require,module,exports){
'use strict';

var React = window.React;
var ReactRouter = require('react-router');
var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var CoveragePanel = React.createClass({displayName: "CoveragePanel",

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('schedule');
    },

    handleChange: function(e){
        console.log('handleChange');
        // console.log(e.target.value);
    },

    render: function() {

        return (
            React.createElement("div", {id: "mainContent"}, 
                "Cobertura"
            )
        );
    }
});

module.exports = CoveragePanel;

},{"react-bootstrap":70,"react-router":160}],191:[function(require,module,exports){
'use strict';

var React = window.React;
var ReactRouter = require('react-router');
var CarouselPanel = require('./panel-home-carousel');
var ServicesPanel = require('./panel-home-services');
var OtherServicesPanel = require('./panel-home-otherservices');
var CallToActionPanel = require('./panel-home-calltoaction');

var rb = require('react-bootstrap');
var Row = rb.Row;
var Col = rb.Col;
var Button = rb.Button;

var HomeSection = React.createClass({displayName: "HomeSection",

    mixins : [ReactRouter.Navigation],
    
    handleClick: function(){
        console.log('handleClick');
        // this.transitionTo('schedule');
    },

    handleChange: function(e){
        console.log('handleChange');
        // console.log(e.target.value);
    },

    render: function() {

        return (
            React.createElement("div", {id: "mainContent"}, 
                React.createElement(CarouselPanel, null), 
                React.createElement(ServicesPanel, null), 
                React.createElement(OtherServicesPanel, null), 
                React.createElement(CallToActionPanel, null)
            )
        );
    }
});

module.exports = HomeSection;

},{"./panel-home-calltoaction":184,"./panel-home-carousel":185,"./panel-home-otherservices":186,"./panel-home-services":187,"react-bootstrap":70,"react-router":160}],192:[function(require,module,exports){
var React = window.React;
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var Layout = require('./components/layout');
var HomeSection = require('./components/section-home');
var CoverageSection = require('./components/section-coverage');
var AboutusSection = require('./components/section-aboutus');
var ContactUsSection = require('./components/section-contactus');

var routes = (
	React.createElement(Route, {path: "/", handler: Layout}, 
		React.createElement(DefaultRoute, {name: "home", handler: HomeSection}), 
		React.createElement(Route, {name: "homepage", path: "/inicio", handler: HomeSection}), 

		React.createElement(Route, {name: "coverage", path: "/coberturas", handler: CoverageSection}), 
		
		React.createElement(Route, {name: "aboutus", path: "/nosotros", handler: AboutusSection}), 
		React.createElement(Route, {name: "whyUs", path: "/nosotros/por-que-nosotros", handler: AboutusSection}), 
		React.createElement(Route, {name: "whoAreWe", path: "/nosotros/quienes-somos", handler: AboutusSection}), 

		React.createElement(Route, {name: "contact", path: "/contacto", handler: ContactUsSection}), 
		React.createElement(Route, {name: "disaster", path: "/contacto/siniestro", handler: ContactUsSection}), 
		React.createElement(Route, {name: "contactForm", path: "/contacto/forma", handler: ContactUsSection})


	)
);

module.exports = routes;
},{"./components/layout":183,"./components/section-aboutus":188,"./components/section-contactus":189,"./components/section-coverage":190,"./components/section-home":191,"react-router":160}],"myApp":[function(require,module,exports){
'use strict';

var React = window.React;
var ReactRouter = require('react-router');
var routes = require('./routes')

ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Root) {
	React.render(React.createElement(Root, null), document.getElementById('app'));
});

},{"./routes":192,"react-router":160}]},{},[]);
