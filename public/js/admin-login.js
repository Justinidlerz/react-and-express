webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("G:\\react-and-express\\node_modules\\react-hot-loader\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("G:\\react-and-express\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(1);

	__webpack_require__(512);

	var _bootstrapInput = __webpack_require__(475);

	var _bootstrapInput2 = _interopRequireDefault(_bootstrapInput);

	var _bootstrapButton = __webpack_require__(465);

	var _bootstrapButton2 = _interopRequireDefault(_bootstrapButton);

	var _bootstrapAlert = __webpack_require__(417);

	var _bootstrapAlert2 = _interopRequireDefault(_bootstrapAlert);

	var _classnames = __webpack_require__(418);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _superagent = __webpack_require__(411);

	var _superagent2 = _interopRequireDefault(_superagent);

	var _react = __webpack_require__(194);

	var _react2 = _interopRequireDefault(_react);

	var phoneFilter = /^1\d{10}$/;

	var LoginForm = (function (_Component) {
	    _inherits(LoginForm, _Component);

	    function LoginForm(props, context) {
	        var _this = this;

	        _classCallCheck(this, LoginForm);

	        _get(Object.getPrototypeOf(LoginForm.prototype), 'constructor', this).call(this, props, context);
	        this.state = {
	            email: "",
	            password: "",
	            remember: false,
	            disabled: true,
	            emailPass: null,
	            passwordPass: null,
	            alertVisible: false,
	            msg: "",
	            returnTo: "back"
	        };
	        var reg = new RegExp("(^|\\?|&)jump=([^&]*)(\\s|&|$)", "i");
	        if (reg.test(window.location.href)) this.state.returnTo = RegExp.$2.replace(/\+/g, " ");
	        window.localStorage && window.localStorage.getItem("_gift_cat_secretkey_") && this.LoginBySecretKey(window.localStorage.getItem("_gift_cat_secretkey_"));
	        window.thirdCallback = function (data) {
	            window.console && console.log(data);
	            window.localStorage && window.localStorage.setItem("_gift_cat_secretkey_", data.data.secretkey);
	            if (data.status == 1) {
	                if (_this.state.returnTo != "back" || data.data.type != 1) {
	                    window.location.href = "/index";
	                } else {
	                    window.location.href = "/Admin/Base/Index";
	                }
	            } else {
	                setTimeout(function () {
	                    alert(data.msg);
	                }, 0);
	            }
	        };
	    }

	    _createClass(LoginForm, [{
	        key: 'LoginBySecretKey',
	        value: function LoginBySecretKey(secretkey) {
	            _superagent2['default'].get("/Admin/User/doLoginBySecretKey").query({ secretkey: secretkey }).end((function (err, res) {
	                if (err || res.body.status != 1) {
	                    //error
	                    var msg = err ? "网络错误" : res.body.msg;
	                    window.localStorage && window.localStorage.setItem("_gift_cat_secretkey_", "");
	                } else {
	                    window.localStorage && window.localStorage.setItem("_gift_cat_secretkey_", res.body.data.secretkey);
	                    if (this.state.returnTo != "back" || res.body.data.type != 1) {
	                        window.location.href = "/index";
	                    } else {
	                        window.location.href = "/Admin/Base/Index";
	                    }
	                }
	            }).bind(this));
	        }
	    }, {
	        key: 'handleChange',
	        value: function handleChange(e) {
	            var _setState;

	            var types = e.target.getAttribute("name");
	            var value = e.target.value;
	            var state = "error";
	            var disabled = true;
	            if (types == "email" && phoneFilter.test(value)) {
	                state = "success";
	                this.state.passwordPass == "success" && (disabled = false);
	            } else if (types == "password" && value !== "") {
	                state = "success";
	                this.state.emailPass == "success" && (disabled = false);
	            }
	            this.setState((_setState = {}, _defineProperty(_setState, types + 'Pass', state), _defineProperty(_setState, types, value), _defineProperty(_setState, 'disabled', disabled), _setState));
	        }
	    }, {
	        key: 'handleCheck',
	        value: function handleCheck() {
	            var remember = this.state.remember ? false : true;
	            this.setState({ remember: remember });
	        }
	    }, {
	        key: 'handleAlertDismiss',
	        value: function handleAlertDismiss() {
	            this.setState({ alertVisible: false });
	        }
	    }, {
	        key: 'handleLogin',
	        value: function handleLogin() {
	            var phone = this.state.email;
	            var remember = this.state.remember ? 1 : 0;
	            var password = this.state.password;
	            this.setState({ disabled: true });
	            _superagent2['default'].post("/Api/User/doLoginByPhone").type("form").send({ phone: phone, password: password, remember: remember }).end((function (err, res) {
	                if (err || res.body.status != 1) {
	                    //error
	                    var msg = err ? "网络错误" : res.body.msg;
	                    this.setState({
	                        alertVisible: true,
	                        disabled: false,
	                        msg: msg
	                    });
	                } else {
	                    window.localStorage && window.localStorage.setItem("_gift_cat_secretkey_", res.body.data.secretkey);
	                    if (this.state.returnTo != "back" || res.body.data.type != 1) {
	                        window.location.href = "/index";
	                    } else {
	                        window.location.href = "/Admin/Base/Index";
	                    }
	                }
	            }).bind(this));
	        }
	    }, {
	        key: 'handleKeyPress',
	        value: function handleKeyPress(e) {
	            if (e.charCode == 13) {
	                this.handleLogin();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var msgModal = '';
	            if (this.state.alertVisible) {
	                msgModal = _react2['default'].createElement(
	                    _bootstrapAlert2['default'],
	                    { bsStyle: 'danger', onDismiss: this.handleAlertDismiss.bind(this) },
	                    _react2['default'].createElement(
	                        'p',
	                        null,
	                        this.state.msg
	                    )
	                );
	            }
	            return _react2['default'].createElement(
	                'div',
	                { className: 'login-box' },
	                msgModal,
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'well' },
	                    _react2['default'].createElement(
	                        'h2',
	                        null,
	                        '后台登录'
	                    ),
	                    _react2['default'].createElement(_bootstrapInput2['default'], { type: 'text', placeholder: '手机号码', name: 'email', onChange: this.handleChange.bind(this), bsStyle: this.state.emailPass, hasFeedback: true }),
	                    _react2['default'].createElement(_bootstrapInput2['default'], { type: 'password', placeholder: '密码', name: 'password', onChange: this.handleChange.bind(this), bsStyle: this.state.passwordPass, onKeyPress: this.handleKeyPress.bind(this), hasFeedback: true }),
	                    _react2['default'].createElement(_bootstrapInput2['default'], { type: 'checkbox', label: '7天内自动登录', value: '1', checked: this.state.remember, onChange: this.handleCheck.bind(this) }),
	                    _react2['default'].createElement(
	                        _bootstrapButton2['default'],
	                        { bsStyle: 'primary', bsSize: 'large', block: true, onClick: this.handleLogin.bind(this), disabled: this.state.disabled },
	                        '登录'
	                    )
	                )
	            );
	        }
	    }]);

	    return LoginForm;
	})(_react.Component);

	_react2['default'].render(_react2['default'].createElement(LoginForm, null), document.getElementById('root'));

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("G:\\react-and-express\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "login.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 512:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(513);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(193)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/raw-loader/index.js!./login.css", function() {
				var newContent = require("!!./../../../../node_modules/raw-loader/index.js!./login.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 513:
/***/ function(module, exports) {

	module.exports = "html,\r\nbody{\r\n    width: 100%;\r\n    height: 100%;\r\n    overflow: hidden;\r\n}\r\n#root{\r\n    background: #e3e3e3;\r\n    position: relative;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n.login-box{\r\n    width: 400px;\r\n    margin: 0 auto;\r\n    padding-top: 100px;\r\n}\r\n\r\n.third-login{\r\n    margin-top: 15px;\r\n    padding-top: 10px;\r\n    border-top: 1px solid #cccccc;\r\n}\r\n.third-login .btn{\r\n    margin-right: 15px;\r\n}"

/***/ }

});