/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/compile/index.js":
/*!***********************************!*\
  !*** ./src/core/compile/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return compiler; });\n\r\n\r\nclass compiler {\r\n  constructor(el, vm) {\r\n    vm.$el = document.querySelector(el);\r\n    this.replace(vm.$el, vm)\r\n  }\r\n\r\n  replace(frag, vm) {\r\n    Array.from(frag.childNodes).forEach(node => {\r\n      let txt = node.textContent;\r\n      let reg = /\\{\\{(.*?)\\}\\}/g; // 正则匹配{{}}\r\n\r\n      if (node.nodeType === 3 && reg.test(txt)) {  // 即是文本节点又有大括号的情况{{}}\r\n        let arr = RegExp.$1.split('.');\r\n        let val = vm;\r\n        arr.forEach(key => {\r\n          val = val[key];\r\n        });\r\n        // 用trim方法去除一下首尾空格\r\n        node.textContent = txt.replace(reg, val).trim();\r\n        vm.$watch(RegExp.$1, function (newVal) {    //监听变化\r\n          node.textContent = txt.replace(reg, newVal).trim();\r\n        })\r\n      }\r\n\r\n\r\n      if (node.nodeType === 1) {  //元素节点\r\n        let nodeAttr = node.attributes; // 获取dom上的所有属性,是个类数组\r\n        Array.from(nodeAttr).forEach(attr => {\r\n          let name = attr.name;\r\n          let exp = attr.value;\r\n          let attrName;\r\n          if (name.includes('v-')) {\r\n            attrName = name.split(\"-\")[1];\r\n            node.value = vm[exp];\r\n            node.removeAttribute(name)\r\n            node.setAttribute(attrName, node.value)\r\n          }\r\n          // 监听变化\r\n          vm.$watch(exp, function (newVal) {\r\n            node.value = newVal;\r\n            node.setAttribute(attrName, node.value)\r\n          });\r\n        });\r\n      }\r\n\r\n      // 如果还有子节点，继续递归replace\r\n      if (node.childNodes && node.childNodes.length) {\r\n        this.replace(node, vm);\r\n      }\r\n    });\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/core/compile/index.js?");

/***/ }),

/***/ "./src/core/index.js":
/*!***************************!*\
  !*** ./src/core/index.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Mve; });\n/* harmony import */ var _observer_watcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observer/watcher */ \"./src/core/observer/watcher.js\");\n/* harmony import */ var _instance_init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instance/init */ \"./src/core/instance/init.js\");\n/* harmony import */ var _instance_proxy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instance/proxy */ \"./src/core/instance/proxy.js\");\n/* harmony import */ var _instance_lifecycle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./instance/lifecycle */ \"./src/core/instance/lifecycle.js\");\n/* harmony import */ var _compile_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./compile/index */ \"./src/core/compile/index.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass Mve {\r\n  constructor(options) {\r\n    let vm = this;\r\n    vm.$options = options;\r\n    \r\n    vm.$watch = function (key, cb) {\r\n      new _observer_watcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"](vm, key, cb)\r\n    }\r\n\r\n    Object(_instance_init__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(vm)   //设置options， 同时observer(设置data的 setter/getter)\r\n\r\n    for (const key in vm._data) {\r\n      if (vm._data.hasOwnProperty(key)) {\r\n        Object(_instance_proxy__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(vm, '_data', key)\r\n      }\r\n    }\r\n\r\n    Object(_instance_lifecycle__WEBPACK_IMPORTED_MODULE_3__[\"callHook\"])(vm, 'created')\r\n\r\n    new _compile_index__WEBPACK_IMPORTED_MODULE_4__[\"default\"](vm.$options.el, vm)\r\n\r\n    Object(_instance_lifecycle__WEBPACK_IMPORTED_MODULE_3__[\"callHook\"])(vm, 'mounted')\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/core/index.js?");

/***/ }),

/***/ "./src/core/instance/init.js":
/*!***********************************!*\
  !*** ./src/core/instance/init.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initOptions; });\n/* harmony import */ var _observer_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observer/index */ \"./src/core/observer/index.js\");\n\r\n\r\n\r\nconst LIFECYCLE_HOOK = [\r\n  \"creater\", \"mounted\"\r\n]\r\nfunction initOptions(vm) {\r\n  vm._data = vm.$options.data;\r\n  Object(_observer_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(vm._data)\r\n  LIFECYCLE_HOOK.forEach(hook => {\r\n    vm.$options[hook] = vm.$options[hook] || function () { }\r\n  })\r\n}\n\n//# sourceURL=webpack:///./src/core/instance/init.js?");

/***/ }),

/***/ "./src/core/instance/lifecycle.js":
/*!****************************************!*\
  !*** ./src/core/instance/lifecycle.js ***!
  \****************************************/
/*! exports provided: callHook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"callHook\", function() { return callHook; });\n\r\n\r\nfunction callHook(vm, hook) {\r\n  const handlers = vm.$options[hook]\r\n  if (handlers) {\r\n    handlers.call(vm)\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/core/instance/lifecycle.js?");

/***/ }),

/***/ "./src/core/instance/proxy.js":
/*!************************************!*\
  !*** ./src/core/instance/proxy.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return proxy; });\n\r\n\r\n\r\nfunction proxy(target, sourceKey, key) {\r\n  Object.defineProperty(target, key, {\r\n    configurable: true,\r\n    get: function proxyGetter() {\r\n      return target[sourceKey][key]\r\n    },\r\n    set: function proxySetter(newVal) {\r\n      target[sourceKey][key] = newVal\r\n    }\r\n  })\r\n}\n\n//# sourceURL=webpack:///./src/core/instance/proxy.js?");

/***/ }),

/***/ "./src/core/observer/dep.js":
/*!**********************************!*\
  !*** ./src/core/observer/dep.js ***!
  \**********************************/
/*! exports provided: default, pushTarget, popTarget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Dep; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pushTarget\", function() { return pushTarget; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"popTarget\", function() { return popTarget; });\n\r\n\r\n// Dep是订阅者Watcher对应的数据依赖  \r\n// Watcher实例\r\n\r\nclass Dep {\r\n  constructor() {\r\n    this.subs = []; //subs用于存放依赖( Watcher实例 )\r\n  }\r\n  notify() {\r\n    for (let sub of this.subs) {\r\n      sub.update()\r\n    }\r\n  }\r\n  addSub(sub) {\r\n    this.subs.push(sub);\r\n  }\r\n  addDepend() {\r\n    if (Dep.target) {\r\n      Dep.target.addDep(this);\r\n      // this.subs.push(Dep.target);\r\n    }\r\n  }\r\n}\r\n\r\nDep.target = null   //Watcher实例\r\nconst targetStack = []\r\nfunction pushTarget(_target) {\r\n  if (Dep.target) targetStack.push(Dep.target)\r\n  Dep.target = _target\r\n}\r\n\r\nfunction popTarget() {\r\n  Dep.target = targetStack.pop()\r\n}\n\n//# sourceURL=webpack:///./src/core/observer/dep.js?");

/***/ }),

/***/ "./src/core/observer/index.js":
/*!************************************!*\
  !*** ./src/core/observer/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return observer; });\n/* harmony import */ var _dep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dep */ \"./src/core/observer/dep.js\");\n\r\n\r\n\r\nclass Observer {\r\n  constructor(value) {\r\n    this.walk(value)\r\n  }\r\n\r\n  walk(obj) {\r\n    Object.keys(obj).forEach(key => {\r\n      if (typeof obj[key] === 'object') {\r\n        this.walk(obj[key])\r\n      }\r\n      defineReactive(obj, key, obj[key])\r\n    })\r\n  }\r\n}\r\n\r\nlet defineReactive = (obj, key, value) => {\r\n  let dep = new _dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();  //依赖收集\r\n  Object.defineProperty(obj, key, {\r\n    set(newVal) {\r\n      if (newVal === value) {\r\n        return\r\n      }\r\n      value = newVal\r\n      dep.notify() //如果数据被重新赋值了, 调用 Dep 的 notify 方法, 通知所有的 Watcher\r\n    },\r\n    get() {\r\n      //Dep.target全局变量 指向的就是当前正在解析指令的Complie生成的 Watcher\r\n      //会执行到 dep.addSub(Dep.target), 将 Watcher 添加到 Dep 对象的 Watcher 列表中\r\n      if (_dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"].target) {\r\n        dep.addDepend()\r\n      }\r\n      return value;\r\n    }\r\n  })\r\n}\r\n\r\n\r\nfunction observer(value) {\r\n  return new Observer(value)\r\n}\n\n//# sourceURL=webpack:///./src/core/observer/index.js?");

/***/ }),

/***/ "./src/core/observer/watcher.js":
/*!**************************************!*\
  !*** ./src/core/observer/watcher.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Watcher; });\n/* harmony import */ var _dep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dep */ \"./src/core/observer/dep.js\");\n\r\n\r\n\r\nclass Watcher {\r\n  constructor(vm, expression, cb) {\r\n    this.vm = vm\r\n    this.cb = cb\r\n    this.expression = expression\r\n    this.value = this.getVal()  //评估getter，并重新收集依赖项。\r\n  }\r\n\r\n  getVal() {\r\n    Object(_dep__WEBPACK_IMPORTED_MODULE_0__[\"pushTarget\"])(this)\r\n    let val = this.vm\r\n    this.expression.split('.').forEach((key) => {\r\n      val = val[key]   //触发getter\r\n    })\r\n    Object(_dep__WEBPACK_IMPORTED_MODULE_0__[\"popTarget\"])()\r\n    return val\r\n  }\r\n\r\n  addDep(dep) {\r\n    dep.addSub(this)\r\n  }\r\n  \r\n  update() {\r\n    let val = this.vm\r\n    this.expression.split('.').forEach((key) => {\r\n      val = val[key]\r\n    })\r\n    this.cb.call(this.vm, val, this.value)\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/core/observer/watcher.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/index */ \"./src/core/index.js\");\n\r\n\r\n\r\n\r\n\r\nwindow.Mue = _core_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });