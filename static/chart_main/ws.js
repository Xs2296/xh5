"use strict";


function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ws = /*#__PURE__*/function () {
  function Ws(ws, data) {
    var _this = this;

    _classCallCheck(this, Ws);

    // [{url, data, method...},,,,]
    this._ws = ws;
    this._data = data; // 待发送的消息列

    this._msgs = [];
    this.socket = this.doLink();
    this.doOpen(); // 订阅/发布模型

    this._events = {}; // 是否保持连接

    this._isLink = true; // 循环检查

    setInterval(function () {
      if (_this._isLink) {
        if (_this.socket.readyState == 2 || _this.socket.readyState == 3) {
          _this.resetLink();
        }
      }
    }, 3000);
  } // 重连


  _createClass(Ws, [{
    key: "resetLink",
    value: function resetLink() {
      this.socket = this.doLink();
      this.doOpen();
    } // 连接

  }, {
    key: "doLink",
    value: function doLink() {
      var ws = new WebSocket( this._ws);
      return ws;
    }
  }, {
    key: "doOpen",
    value: function doOpen() {
      var _this2 = this;

      this.socket.addEventListener('open',function (ev) {
        _this2.onOpen(ev);
      });
      this.socket.addEventListener('message',function (ev) {
        _this2.onMessage(ev);
      });
      this.socket.addEventListener('close',function (ev) {
        _this2.onClose(ev);
      });
      this.socket.addEventListener('error',function (ev) {
        _this2.onError(ev);
      });
    } // 打开

  }, {
    key: "onOpen",
    value: function onOpen() {
      var _this3 = this;

      // 打开时重发未发出的消息
      var list = Object.assign([], this._msgs);
      list.forEach(function (item) {
        if (_this3.send(item)) {
          var idx = _this3._msgs.indexOf(item);

          if (idx != -1) {
            _this3._msgs.splice(idx, 1);
          }
        }
      });
    } // 手动关闭

  }, {
    key: "doClose",
    value: function doClose() {
      this._isLink = false;
      this._events = {};
      this._msgs = [];
      this.socket.close({
        success: function success() {
          console.log('socket close success');
        }
      });
    } // 添加监听

  }, {
    key: "on",
    value: function on(name, handler) {
      this.subscribe(name, handler);
    } // 取消监听

  }, {
    key: "off",
    value: function off(name, handler) {
      this.unsubscribe(name, handler);
    } // 关闭事件

  }, {
    key: "onClose",
    value: function onClose() {
      var _this4 = this;

      // 是否重新连接
      if (this._isLink) {
        setTimeout(function () {
          _this4.resetLink();
        }, 3000);
      }
    } // 错误

  }, {
    key: "onError",
    value: function onError(evt) {
      this.Notify({
        Event: 'error',
        Data: evt
      });
    } // 接受数据

  }, {
    key: "onMessage",
    value: function onMessage(evt) {
      try {
        // 解析推送的数据
        var data = JSON.parse(evt.data); // 通知订阅者

        this.Notify({
          Event: 'message',
          Data: data
        });
      } catch (err) {
        console.error(' >> Data parsing error:', err); // 通知订阅者

        this.Notify({
          Event: 'error',
          Data: err
        });
      }
    } // 订阅事件的方法

  }, {
    key: "subscribe",
    value: function subscribe(name, handler) {
      if (this._events.hasOwnProperty(name)) {
        this._events[name].push(handler); // 追加事件

      } else {
        this._events[name] = [handler]; // 添加事件
      }
    } // 取消订阅事件

  }, {
    key: "unsubscribe",
    value: function unsubscribe(name, handler) {
      var start = this._events[name].findIndex(function (item) {
        return item === handler;
      }); // 删除该事件


      this._events[name].splice(start, 1);
    } // 发布后通知订阅者

  }, {
    key: "Notify",
    value: function Notify(entry) {
      // 检查是否有订阅者 返回队列
      var cbQueue = this._events[entry.Event];

      if (cbQueue && cbQueue.length) {
        var _iterator = _createForOfIteratorHelper(cbQueue),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var callback = _step.value;
            if (_instanceof(callback, Function)) callback(entry.Data);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    } // 发送消息

  }, {
    key: "send",
    value: function send(data) {
      if (this.socket.readyState == 1) {
        this.socket.send(JSON.stringify(data));
        return true;
      } else {
        // 保存到待发送信息
        if (!this._msgs.includes(data)) {
          this._msgs.push(data);
        }

        ;
        return false;
      }
    }
  }]);

  return Ws;
}();

window.Ws = Ws;