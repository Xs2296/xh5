(function(e) {
	function a(a) {
		for (var n, i, c = a[0], l = a[1], s = a[2], u = 0, d = []; u < c.length; u++) i = c[u], Object.prototype
			.hasOwnProperty.call(r, i) && r[i] && d.push(r[i][0]), r[i] = 0;
		for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (e[n] = l[n]);
		f && f(a);
		while (d.length) d.shift()();
		return o.push.apply(o, s || []), t()
	}

	function t() {
		for (var e, a = 0; a < o.length; a++) {
			for (var t = o[a], n = !0, i = 1; i < t.length; i++) {
				var c = t[i];
				0 !== r[c] && (n = !1)
			}
			n && (o.splice(a--, 1), e = l(l.s = t[0]))
		}
		return e
	}
	var n = {},
		i = {
			app: 0
		},
		r = {
			app: 0
		},
		o = [];

	function c(e) {
		return l.p + "js/" + ({} [e] || e) + "." + {
			"chunk-0703413a": "ddce272d",
			"chunk-0bb7ef62": "f5bd4274",
			"chunk-0bf0aaf0": "619b3b31",
			"chunk-10bb9de9": "0dcf5b8e",
			"chunk-11f0f276": "75cdb994",
			"chunk-16bed791": "09b41eea",
			"chunk-183ae2f7": "911ffc03",
			"chunk-188ea8ac": "c9431c29",
			"chunk-19f62753": "6e73f7ca",
			"chunk-1d3d9dce": "b90b7eb4",
			"chunk-253ddd26": "ed481b58",
			"chunk-294dce4f": "207d13d9",
			"chunk-2d0aa908": "64b41abc",
			"chunk-2d0ab8f2": "3335fa68",
			"chunk-2d0af4ab": "b77f756a",
			"chunk-2d0b3a5c": "fc67cc11",
			"chunk-2d0b95b3": "f43bc570",
			"chunk-2d0bae8b": "8b56491e",
			"chunk-2d0e87e0": "4a28f785",
			"chunk-2d0e9b40": "4db315ff",
			"chunk-2d20fa51": "aa9b53cf",
			"chunk-2d238686": "f5794a4d",
			"chunk-2fccb5da": "5503388b",
			"chunk-30b48eac": "c62bd783",
			"chunk-30cdd9ab": "381a7d2f",
			"chunk-3392db4b": "1de6108c",
			"chunk-4a501fc0": "571129ad",
			"chunk-5131396f": "f0fb00d3",
			"chunk-51bc1e5a": "766cd398",
			"chunk-53fbe214": "db7a5525",
			"chunk-57788a76": "a93f20c0",
			"chunk-5dea1b5d": "08a2192d",
			"chunk-66bb05a0": "c1ee2af3",
			"chunk-84850d08": "45d0898f",
			"chunk-8c35ef84": "b5ebe2e2",
			"chunk-1a189544": "20fb481a",
			"chunk-421cf1ce": "1185c818",
			"chunk-9bf736ee": "5ddc95ab",
			"chunk-a5e71e64": "89d11ec2",
			"chunk-c7acc768": "7cfff0ab",
			"chunk-d3b5f668": "088e07ff",
			"chunk-ec89946c": "8dff131c",
			"chunk-efaf3496": "89840d01",
			"chunk-f306dcda": "0fc9786d"
		} [e] + ".js"
	}

	function l(a) {
		if (n[a]) return n[a].exports;
		var t = n[a] = {
			i: a,
			l: !1,
			exports: {}
		};
		return e[a].call(t.exports, t, t.exports, l), t.l = !0, t.exports
	}
	l.e = function(e) {
		var a = [],
			t = {
				"chunk-0bb7ef62": 1,
				"chunk-0bf0aaf0": 1,
				"chunk-10bb9de9": 1,
				"chunk-11f0f276": 1,
				"chunk-16bed791": 1,
				"chunk-188ea8ac": 1,
				"chunk-1d3d9dce": 1,
				"chunk-253ddd26": 1,
				"chunk-294dce4f": 1,
				"chunk-30b48eac": 1,
				"chunk-30cdd9ab": 1,
				"chunk-3392db4b": 1,
				"chunk-51bc1e5a": 1,
				"chunk-53fbe214": 1,
				"chunk-57788a76": 1,
				"chunk-5dea1b5d": 1,
				"chunk-66bb05a0": 1,
				"chunk-84850d08": 1,
				"chunk-8c35ef84": 1,
				"chunk-1a189544": 1,
				"chunk-421cf1ce": 1,
				"chunk-9bf736ee": 1,
				"chunk-a5e71e64": 1,
				"chunk-c7acc768": 1,
				"chunk-d3b5f668": 1,
				"chunk-efaf3496": 1,
				"chunk-f306dcda": 1
			};
		i[e] ? a.push(i[e]) : 0 !== i[e] && t[e] && a.push(i[e] = new Promise((function(a, t) {
			for (var n = "css/" + ({} [e] || e) + "." + {
						"chunk-0703413a": "31d6cfe0",
						"chunk-0bb7ef62": "57d8e7af",
						"chunk-0bf0aaf0": "e318a0e6",
						"chunk-10bb9de9": "95561e0a",
						"chunk-11f0f276": "68e80cf8",
						"chunk-16bed791": "f6b54cb0",
						"chunk-183ae2f7": "31d6cfe0",
						"chunk-188ea8ac": "a2d6ddeb",
						"chunk-19f62753": "31d6cfe0",
						"chunk-1d3d9dce": "f2b34387",
						"chunk-253ddd26": "99ddc4b2",
						"chunk-294dce4f": "7dfb1748",
						"chunk-2d0aa908": "31d6cfe0",
						"chunk-2d0ab8f2": "31d6cfe0",
						"chunk-2d0af4ab": "31d6cfe0",
						"chunk-2d0b3a5c": "31d6cfe0",
						"chunk-2d0b95b3": "31d6cfe0",
						"chunk-2d0bae8b": "31d6cfe0",
						"chunk-2d0e87e0": "31d6cfe0",
						"chunk-2d0e9b40": "31d6cfe0",
						"chunk-2d20fa51": "31d6cfe0",
						"chunk-2d238686": "31d6cfe0",
						"chunk-2fccb5da": "31d6cfe0",
						"chunk-30b48eac": "e0aaccf1",
						"chunk-30cdd9ab": "be59a13f",
						"chunk-3392db4b": "3cf2fa8e",
						"chunk-4a501fc0": "31d6cfe0",
						"chunk-5131396f": "31d6cfe0",
						"chunk-51bc1e5a": "30f6c5c6",
						"chunk-53fbe214": "3929cb99",
						"chunk-57788a76": "a3d70b6c",
						"chunk-5dea1b5d": "46406e0a",
						"chunk-66bb05a0": "643a16b0",
						"chunk-84850d08": "a3d70b6c",
						"chunk-8c35ef84": "0f3aaa02",
						"chunk-1a189544": "c18e457c",
						"chunk-421cf1ce": "2d448398",
						"chunk-9bf736ee": "3267f92b",
						"chunk-a5e71e64": "ed17203e",
						"chunk-c7acc768": "3b753a51",
						"chunk-d3b5f668": "27249b7d",
						"chunk-ec89946c": "31d6cfe0",
						"chunk-efaf3496": "0709bd28",
						"chunk-f306dcda": "2e4ed02e"
					} [e] + ".css", r = l.p + n, o = document.getElementsByTagName("link"), c =
					0; c < o.length; c++) {
				var s = o[c],
					u = s.getAttribute("data-href") || s.getAttribute("href");
				if ("stylesheet" === s.rel && (u === n || u === r)) return a()
			}
			var d = document.getElementsByTagName("style");
			for (c = 0; c < d.length; c++) {
				s = d[c], u = s.getAttribute("data-href");
				if (u === n || u === r) return a()
			}
			var f = document.createElement("link");
			f.rel = "stylesheet", f.type = "text/css", f.onload = a, f.onerror = function(a) {
				var n = a && a.target && a.target.src || r,
					o = new Error("Loading CSS chunk " + e + " failed.\n(" + n + ")");
				o.code = "CSS_CHUNK_LOAD_FAILED", o.request = n, delete i[e], f.parentNode
					.removeChild(f), t(o)
			}, f.href = r;
			var b = document.getElementsByTagName("head")[0];
			b.appendChild(f)
		})).then((function() {
			i[e] = 0
		})));
		var n = r[e];
		if (0 !== n)
			if (n) a.push(n[2]);
			else {
				var o = new Promise((function(a, t) {
					n = r[e] = [a, t]
				}));
				a.push(n[2] = o);
				var s, u = document.createElement("script");
				u.charset = "utf-8", u.timeout = 120, l.nc && u.setAttribute("nonce", l.nc), u.src = c(e);
				var d = new Error;
				s = function(a) {
					u.onerror = u.onload = null, clearTimeout(f);
					var t = r[e];
					if (0 !== t) {
						if (t) {
							var n = a && ("load" === a.type ? "missing" : a.type),
								i = a && a.target && a.target.src;
							d.message = "Loading chunk " + e + " failed.\n(" + n + ": " + i + ")", d.name =
								"ChunkLoadError", d.type = n, d.request = i, t[1](d)
						}
						r[e] = void 0
					}
				};
				var f = setTimeout((function() {
					s({
						type: "timeout",
						target: u
					})
				}), 12e4);
				u.onerror = u.onload = s, document.head.appendChild(u)
			} return Promise.all(a)
	}, l.m = e, l.c = n, l.d = function(e, a, t) {
		l.o(e, a) || Object.defineProperty(e, a, {
			enumerable: !0,
			get: t
		})
	}, l.r = function(e) {
		"undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(e, "__esModule", {
			value: !0
		})
	}, l.t = function(e, a) {
		if (1 & a && (e = l(e)), 8 & a) return e;
		if (4 & a && "object" === typeof e && e && e.__esModule) return e;
		var t = Object.create(null);
		if (l.r(t), Object.defineProperty(t, "default", {
				enumerable: !0,
				value: e
			}), 2 & a && "string" != typeof e)
			for (var n in e) l.d(t, n, function(a) {
				return e[a]
			}.bind(null, n));
		return t
	}, l.n = function(e) {
		var a = e && e.__esModule ? function() {
			return e["default"]
		} : function() {
			return e
		};
		return l.d(a, "a", a), a
	}, l.o = function(e, a) {
		return Object.prototype.hasOwnProperty.call(e, a)
	}, l.p = "", l.oe = function(e) {
		throw console.error(e), e
	};
	var s = window["webpackJsonp"] = window["webpackJsonp"] || [],
		u = s.push.bind(s);
	s.push = a, s = s.slice();
	for (var d = 0; d < s.length; d++) a(s[d]);
	var f = u;
	o.push([0, "chunk-vendors"]), t()
})({
	0: function(e, a, t) {
		e.exports = t("56d7")
	},
	"06b2": function(e, a, t) {
		"use strict";
		t.r(a);
		var n = function() {
				var e = this,
					a = e.$createElement,
					t = e._self._c || a;
				return t("div", {
					staticClass: "d-flex align-center"
				}, [e._t("left"), t("input", e._b({
					staticClass: "flex-fill",
					on: {
						input: e.input,
						blur: function(a) {
							return e.$emit("blur", a)
						}
					}
				}, "input", Object.assign({}, e.$props), !1)), e._t("right")], 2)
			},
			i = [],
			r = {
				name: "vInput",
				props: {
					value: {
						defalult: "",
						require: !1
					},
					type: {
						default: "text",
						type: String,
						require: !1
					},
					placeholder: {
						default: "",
						type: String,
						require: !1
					},
					maxLength: {
						default: void 0,
						type: String,
						require: !1
					},
					minLength: {
						default: void 0,
						type: String,
						require: !1
					},
					disabled: {
						default: !1,
						type: Boolean,
						require: !1
					}
				},
				methods: {
					input: function(e) {
						this.$emit("input", e.target.value)
					}
				}
			},
			o = r,
			c = (t("cf28"), t("2877")),
			l = Object(c["a"])(o, n, i, !1, null, null, null);
		a["default"] = l.exports
	},
	1112: function(e, a, t) {
		"use strict";
		var n = {};
		n = {
			baseUrl: "https://server.7coin.nl",
			imgUrl: "https://server.7coin.nl/upload",
			socketUrl: "wss://server.7coin.nl:2346/",
			socketUrl1: "wss://server.7coin.nl:2348/",
			pcUrl: "https://www.7coin.nl",
			appName: "7COIN",
			version: "0.0.0",
			mobile: "https://h5.7coin.nl"
		}, document.getElementById("appTitle").innerText = n.appName, a["a"] = n
	},
	2408: function(e, a, t) {
		"use strict";
		t.r(a);
		var n = function() {
				var e = this,
					a = e.$createElement,
					t = e._self._c || a;
				return t(e.tag, {
					tag: "component",
					staticClass: "d-inline-block",
					attrs: {
						type: e.type,
						loading: e.inSend,
						size: e.size,
						plain: e.plain
					},
					on: {
						click: e.send
					}
				}, [e._v(e._s(e.load ? e.num + "S" : e.text))])
			},
			i = [],
			r = t("365c"),
			o = {
				name: "vCode",
				props: {
					url: {
						default: "",
						type: String,
						required: !0
					},
					data: {
						default: void 0,
						required: !1
					},
					tag: {
						default: "v-button",
						type: String,
						require: !1
					},
					plain: {
						default: !0,
						type: Boolean,
						require: !1
					},
					size: {
						default: "mini",
						type: String,
						require: !1
					},
					type: {
						default: "theme",
						type: String,
						require: !1
					}
				},
				data: function() {
					return {
						load: !1,
						inSend: !1,
						text: "获取验证码",
						num: 60,
						Interval: null
					}
				},
				methods: {
					send: function() {
						var e = this;
						this.load || (this.inSend = !0, Object(r["b"])(this.url, this.data).then((
					function() {
							e.inSend = !1, e.load = !0, e.countDown(), e.$toast("发送成功")
						})).catch((function() {
							e.inSend = !1
						})))
					},
					countDown: function() {
						var e = this;
						clearInterval(this.Interval), this.Interval = setInterval((function() {
							if (e.num <= 0) return e.num = 60, e.load = !1, void clearInterval(e
								.Interval);
							e.num--
						}), 1e3)
					}
				}
			},
			c = o,
			l = t("2877"),
			s = Object(l["a"])(c, n, i, !1, null, null, null);
		a["default"] = s.exports
	},
	"279a": function(e, a, t) {
		"use strict";
		t.r(a);
		var n = function() {
				var e = this,
					a = e.$createElement,
					t = e._self._c || a;
				return t("img", {
					attrs: {
						src: "http://iph.href.lu/" + e.width + "x" + e.height
					}
				})
			},
			i = [],
			r = {
				name: "PlaceImg",
				props: ["width", "height"]
			},
			o = r,
			c = t("2877"),
			l = Object(c["a"])(o, n, i, !1, null, null, null);
		a["default"] = l.exports
	},
	"2a17": function(e, a, t) {
		"use strict";
		t.r(a);
		var n = function() {
				var e = this,
					a = e.$createElement,
					t = e._self._c || a;
				return t("div", {
					attrs: {
						id: "tradingview_10798345"
					}
				})
			},
			i = [],
			r = (t("99af"), t("4160"), t("a15b"), t("d81d"), t("b0c0"), t("a9e3"), t("ac1f"), t("5319"), t(
				"1276"), t("4c53"), t("159b"), t("5530")),
			o = (t("d3b7"), t("d4ec")),
			c = t("bee2"),
			l = function() {
				function e(a) {
					Object(o["a"])(this, e), this.self = a
				}
				return Object(c["a"])(e, [{
					key: "onReady",
					value: function(e) {
						var a = this;
						return new Promise((function(e) {
							var t = a.defaultConfiguration();
							a.self.getConfig && (t = Object.assign(a
									.defaultConfiguration(), a.self.getConfig()
									)), e(t)
						})).then((function(t) {
							return a.self.onReady && a.self.onReady(), e(t)
						}))
					}
				}, {
					key: "resolveSymbol",
					value: function(e, a, t) {
						var n = this;
						return new Promise((function(e) {
							var a = n.defaultSymbol();
							n.self.getSymbol && (a = Object.assign(n
							.defaultSymbol(), n.self.getSymbol())), e(a)
						})).then((function(e) {
							return a(e)
						})).catch((function(e) {
							return t(e)
						}))
					}
				}, {
					key: "getBars",
					value: function(e, a, t, n, i, r) {
						var o = function(e) {
							e && e.length ? i(e, {
								noData: !1
							}) : i([], {
								noData: !0
							})
						};
						this.self.getBars(e, a, t, n, o, r)
					}
				}, {
					key: "subscribeBars",
					value: function(e, a, t, n, i) {
						this.self.onRealtimeCallback = t, this.self.subscribeBars && this.self
							.subscribeBars(e, a, t, n, i)
					}
				}, {
					key: "unsubscribeBars",
					value: function(e) {
						this.self.unsubscribeBars && this.self.unsubscribeBars(e)
					}
				}, {
					key: "defaultConfiguration",
					value: function() {
						return {
							supports_search: !1,
							supports_group_request: !1,
							supported_resolutions: this.self.resolutions,
							supports_marks: !0,
							supports_timescale_marks: !0,
							supports_time: !0
						}
					}
				}, {
					key: "defaultSymbol",
					value: function() {
						return {
							name: this.self.symbol.toLocaleUpperCase(),
							timezone: "Asia/Shanghai",
							minmov: 1,
							minmov2: 0,
							fractional: !1,
							session: "24x7",
							has_intraday: !0,
							has_no_volume: !1,
							has_daily: !0,
							has_weekly_and_monthly: !0,
							description: this.self.symbol.toLocaleUpperCase(),
							pricescale: 1e4,
							ticker: this.self.symbol.toLocaleUpperCase(),
							supported_resolutions: this.self.resolutions
						}
					}
				}]), e
			}(),
			s = l,
			u = {
				"paneProperties.background": "#ffffff",
				"paneProperties.vertGridProperties.color": "#dcdee0",
				"paneProperties.horzGridProperties.color": "#dcdee0",
				"scalesProperties.backgroundColor": "#ffffff",
				"scalesProperties.lineColor": "#dcdee0",
				"scalesProperties.textColor": "#333",
				"scalesProperties.fontSize": 9,
				"mainSeriesProperties.style": 1
			},
			d = {
				"paneProperties.background": "#1f1f1f",
				"paneProperties.vertGridProperties.color": "#10212f",
				"paneProperties.horzGridProperties.color": "#10212f",
				"scalesProperties.backgroundColor": "#1f1f1f",
				"scalesProperties.textColor": "#fff",
				"scalesProperties.lineColor": "#10212f",
				"scalesProperties.fontSize": 9,
				"mainSeriesProperties.style": 1
			},
			f = {
				light: u,
				dark: d
			},
			b = t("482b"),
			h = t("35ad"),
			m = t("2f62"),
			p = {
				getKline: b["a"].getKline,
				getSymbol: function(e) {
					return e.split("/").join("").toLowerCase()
				},
				msg: "Kline_"
			},
			g = {
				getKline: h["a"].getKline,
				getSymbol: function(e) {
					return e.split("/")[0]
				},
				msg: "swapKline_"
			},
			k = {
				props: {
					symbolName: {
						required: !0,
						type: String
					},
					interval: {
						required: !0,
						type: [String, Number]
					},
					resolutions: {
						default: function() {
							return ["5", "15", "30", "60", "1D", "1W", "1M"]
						},
						required: !1,
						type: Array
					},
					index: {
						default: "",
						type: String,
						required: !1
					},
					contract: {
						default: !1,
						type: Boolean,
						required: !1
					}
				},
				data: function() {
					return {
						datafeed: void 0,
						page: 1,
						onRealtimeCallback: void 0,
						TView: void 0,
						MAs: []
					}
				},
				computed: Object(r["a"])(Object(r["a"])({}, Object(m["c"])({
					webSocket: "ws",
					webSocket1: "ws1",
					theme: "theme",
					lang: "lang"
				})), {}, {
					symbol: function() {
						return this.symbolName
					},
					msg: function() {
						return "".concat(this.ajaxTv.msg).concat(this.ajaxTv.getSymbol(this.symbol),
							"_").concat(this.resolution(this.interval))
					},
					chartLang: function() {
						switch (this.lang) {
							case "cn":
								return "zh";
							case "tw":
								return "zh_TW";
							case "tr":
								return "tr";
							case "en":
								return "en";
							default:
								return "en"
						}
					},
					ajaxTv: function() {
						return this.contract ? g : p
					},
					ws: function() {
						return this.contract ? this.webSocket1 : this.webSocket
					}
				}),
				watch: {
					symbol: function(e) {
						this.TView.setSymbol(e, this.interval)
					},
					msg: function(e, a) {
						this.page = 1, a && this.unSub(a)
					},
					interval: function(e) {
						this.TView.activeChart().setResolution(e)
					},
					index: function(e) {
						"MA" == e ? this.createMA() : this.clearMA()
					}
				},
				methods: {
					getMap: function(e) {
						return {
							time: 1e3 * e.id,
							close: e.close,
							open: e.open,
							high: e.high,
							low: e.low,
							volume: e.vol
						}
					},
					resolution: function(e) {
						var a = "";
						return a = isNaN(1 * e) ? e.replace("D", "day").replace("W", "week").replace("M",
							"mon") : e > 60 ? Math.floor(e / 60) + "hours" : e + "min", a
					},
					getBars: function(e, a, t, n, i) {
						var r = this,
							o = this.page > 3 ? 3 : this.page,
							c = {
								symbol: this.ajaxTv.getSymbol(e.name),
								period: this.resolution(a),
								form: t,
								to: n,
								size: 200 * o
							};
						this.page++, this.$emit("changeInterval", a), this.symbol ? this.ajaxTv.getKline(c)
							.then((function(e) {
								var a = e.data.data.map((function(e) {
									return r.getMap(e)
								}));
								r.sub(), i(a), setTimeout((function() {
									i([])
								}), 60)
							})) : i([])
					},
					socketGetData: function() {
						var e = this;
						this.ws.on("message", (function(a) {
							var t = a.data,
								n = a.sub;
							n == e.msg && e.onRealtimeCallback && e.onRealtimeCallback(e.getMap(
								t))
						}))
					},
					sub: function() {
						try {
							this.ws.send({
								cmd: "sub",
								msg: this.msg
							})
						} catch (e) {
							console.log(e)
						}
					},
					unSub: function(e) {
						try {
							this.ws.send({
								cmd: "unsub",
								msg: e
							})
						} catch (a) {
							console.log(a)
						}
					},
					subscribeBars: function(e, a, t, n, i) {
						this.onRealtimeCallback = t, this.symbol || setTimeout((function() {
							i()
						}), 100)
					},
					initDataFeed: function() {
						this.datafeed = new s(this)
					},
					initTradingView: function() {
						var e = this,
							a = window.TradingView;
						this.TView = new a.widget({
							fullscreen: !1,
							autosize: !0,
							interval: this.interval,
							timezone: "Asia/Shanghai",
							theme: "Dark",
							library_path: "./chart_main/",
							datafeed: this.datafeed,
							locale: this.chartLang,
							toolbar_bg: "light" == this.theme ? "#fff" : "#1f1f1f",
							enable_publishing: !1,
							withdateranges: !1,
							hide_side_toolbar: !1,
							allow_symbol_change: !0,
							show_popup_button: !0,
							hideideas: !0,
							studies_overrides: {},
							container_id: "tradingview_10798345",
							disabled_features: ["header_symbol_search", "header_compare",
								"control_bar", "main_series_scale_menu", "volume_force_overlay",
								"header_resolutions", "legend_context_menu",
								"symbol_search_hot_key", "symbol_info", "pane_context_menu"
							],
							overrides: f[this.theme],
							custom_css_url: "light" == this.theme ? "light-chart.css" : "chart.css"
						}), this.TView.onChartReady((function() {
							e.TView.chart().createStudy("MACD", !1, !1)
						}))
					},
					createMA: function() {
						var e = this,
							a = function(a, t) {
								return e.TView.chart().createStudy("Moving Average", !1, !1, [a], null, {
									"Plot.color": t
								})
							};
						this.MAs.push(a(5, "#f8b936")), this.MAs.push(a(10, "#1989fa")), this.MAs.push(a(30,
							"#e91e63"))
					},
					clearMA: function() {
						var e = this,
							a = function(a) {
								e.TView.chart().removeEntity(a)
							};
						this.MAs.forEach((function(e) {
							a(e)
						})), this.MAs = []
					}
				},
				mounted: function() {
					this.initDataFeed(), this.initTradingView(), this.socketGetData()
				},
				destroyed: function() {
					this.unSub(this.msg)
				}
			},
			y = k,
			v = t("2877"),
			S = Object(v["a"])(y, n, i, !1, null, null, null);
		a["default"] = S.exports
	},
	"35ad": function(e, a, t) {
		"use strict";
		var n = t("d4ec"),
			i = t("bee2"),
			r = t("365c"),
			o = function() {
				function e() {
					Object(n["a"])(this, e)
				}
				return Object(i["a"])(e, null, [{
					key: "getMarketInfo",
					value: function(e) {
						return Object(r["a"])("/contract/getMarketInfo", e)
					}
				}, {
					key: "getMarketList",
					value: function(e) {
						return Object(r["a"])("/contract/getMarketList", e)
					}
				}, {
					key: "contractAccount",
					value: function(e) {
						return Object(r["a"])("/contract/contractAccount", e)
					}
				}, {
					key: "getSymbolDetail",
					value: function(e) {
						return Object(r["a"])("/contract/getSymbolDetail", e)
					}
				}, {
					key: "openNum",
					value: function(e) {
						return Object(r["a"])("/contract/openNum", e)
					}
				}, {
					key: "openPosition",
					value: function(e, a) {
						return Object(r["b"])("/contract/openPosition", e, a)
					}
				}, {
					key: "holdPosition",
					value: function(e, a) {
						return Object(r["a"])("/contract/holdPosition", e, a)
					}
				}, {
					key: "closePosition",
					value: function(e, a) {
						return Object(r["b"])("/contract/closePosition", e, a)
					}
				}, {
					key: "closeAllPosition",
					value: function(e, a) {
						return Object(r["b"])("/contract/closeAllPosition", e, a)
					}
				}, {
					key: "getCurrentEntrust",
					value: function(e, a) {
						return Object(r["a"])("/contract/getCurrentEntrust", e, a)
					}
				}, {
					key: "cancelEntrust",
					value: function(e, a) {
						return Object(r["b"])("/contract/cancelEntrust", e, a)
					}
				}, {
					key: "getHistoryEntrust",
					value: function(e, a) {
						return Object(r["a"])("/contract/getHistoryEntrust", e, a)
					}
				}, {
					key: "getKline",
					value: function(e, a) {
						return Object(r["a"])("/contract/getKline", e, a)
					}
				}, {
					key: "getEntrustDealList",
					value: function(e, a) {
						return Object(r["a"])("/contract/getEntrustDealList", e, a)
					}
				}, {
					key: "openStatus",
					value: function() {
						return Object(r["a"])("/contract/openStatus")
					}
				}, {
					key: "opening",
					value: function() {
						return Object(r["b"])("/contract/opening")
					}
				}, {
					key: "setStrategy",
					value: function(e, a) {
						return Object(r["b"])("/contract/setStrategy", e, a)
					}
				}, {
					key: "entrustShare",
					value: function(e) {
						return Object(r["a"])("/contract/entrustShare", e, {
							loading: !0
						})
					}
				}, {
					key: "positionShare",
					value: function(e) {
						return Object(r["a"])("/contract/positionShare", e, {
							loading: !0
						})
					}
				}, {
					key: "onekeyAllFlat",
					value: function(e) {
						return Object(r["b"])("/contract/onekeyAllFlat", e, {
							loading: !0
						})
					}
				}, {
					key: "onekeyReverse",
					value: function(e) {
						return console.log(e), Object(r["b"])("/contract/onekeyReverse", e, {
							loading: !0
						})
					}
				}]), e
			}();
		a["a"] = o
	},
	"365c": function(e, a, t) {
		"use strict";
		t.d(a, "a", (function() {
			return g
		})), t.d(a, "b", (function() {
			return k
		})), t.d(a, "c", (function() {
			return y
		}));
		t("d3b7");
		var n = t("5530"),
			i = t("2b0e"),
			r = t("bc3a"),
			o = t.n(r),
			c = t("1112"),
			l = t("4328"),
			s = t.n(l),
			u = t("a18c"),
			d = function(e) {
				var a = e.data,
					t = e.config;
				return new Promise((function(e, n) {
					switch (a || n(void 0), "boolean" == typeof t.toast ? t.toast && i["a"]
						.prototype.$toast(a.message) : 200 != a.code && 1003 != a.code && i["a"]
						.prototype.$toast(a.message), a.code) {
						case 200:
							e(a);
							break;
						case "200":
							e(a);
							break;
						case 1003:
							n(a), localStorage.removeItem("token"), t.notLogin || "/login" == u["a"]
								.currentRoute.path || u["a"].push({
									path: "/login",
									query: {
										notLogin: 1,
										from: u["a"].currentRoute.fullPath
									}
								});
							break;
						case 1021:
							e(a);
							break;
						default:
							n(a);
							break
					}
				}))
			},
			f = d,
			b = t("d399"),
			h = {
				baseURL: c["a"].baseUrl + "/api/app",
				timeout: 1e4,
				withCredentials: !0,
				crossDomain: !0,
				responseType: "json",
				headers: {
					"content-type": "application/x-www-form-urlencoded"
				}
			},
			m = o.a.create(h),
			p = [];
		m.interceptors.request.use((function(e) {
			return e.btn && (e.btn.dLoading = !0, e.btn.dDisabled = !0), e.loading && p.push(b["a"]
					.loading({
						duration: 0
					})), "post" === e.method && (e.file || (e.data = s.a.stringify(e.data))), e
				.headers = Object.assign(e.headers, {
					"X-Requested-With": "XMLHttpRequest",
					authorization: "bearer ".concat(localStorage.getItem("token")),
					lang: localStorage.lang
				}), e
		}), (function(e) {
			return Promise.reject(e)
		})), m.interceptors.response.use((function(e) {
			return e.config.btn && (e.config.btn.dLoading = !1, e.config.btn.dDisabled = !1), e
				.config.loading && p[0] && p[0].clear(), e
		}), (function(e) {
			return e.config.btn && (e.config.btn.dLoading = !1, e.config.btn.dDisabled = !1), e
				.config.loading && p[0] && p[0].clear(), !1 !== e.config.toast && i["a"].prototype
				.$toast("服务器繁忙，请稍后再试。"), console.log(e), Promise.reject(e)
		}));
		var g = function(e, a, t) {
				return m.get(e, Object(n["a"])({
					params: a
				}, t)).then(f)
			},
			k = function(e, a, t) {
				return m.post(e, a, t).then(f)
			},
			y = function(e, a, t) {
				var n = new FormData;
				for (var i in a) n.append(i, a[i]);
				var r = {
					file: !0
				};
				return m.post(e, n, Object.assign(r, t)).then(f)
			}
	},
	3897: function(e, a, t) {},
	3957: function(e, a, t) {
		"use strict";
		t.r(a);
		var n = function() {
				var e = this,
					a = e.$createElement,
					t = e._self._c || a;
				return t(e.tag, {
					tag: "component",
					on: {
						click: e.selectLang
					}
				}, [e._v(e._s(e.label))])
			},
			i = [],
			r = (t("7db0"), t("5530")),
			o = t("2f62"),
			c = {
				name: "v-lang",
				props: {
					tag: {
						default: "span",
						type: String,
						required: !1
					}
				},
				computed: Object(r["a"])(Object(r["a"])({}, Object(o["c"])({
					langList: "langList",
					lang: "lang"
				})), {}, {
					label: function() {
						var e = this;
						return this.langList.find((function(a) {
							return a.value == e.lang
						})).label
					}
				}),
				methods: Object(r["a"])(Object(r["a"])({}, Object(o["b"])({
					setLang: "setLang"
				})), {}, {
					selectLang: function() {
						var e = this;
						this.$picker(this.langList, {
							value: this.lang
						}).then((function(a) {
							e.setLang(a), e.$emit("change")
						}))
					}
				})
			},
			l = c,
			s = t("2877"),
			u = Object(s["a"])(l, n, i, !1, null, null, null);
		a["default"] = u.exports
	},
	"3d14": function(e, a, t) {
		"use strict";
		t.r(a);
		var n = function() {
				var e = this,
					a = e.$createElement,
					t = e._self._c || a;
				return t("van-pull-refresh", {
					on: {
						refresh: e.onRefresh
					},
					model: {
						value: e.refreshing,
						callback: function(a) {
							e.refreshing = a
						},
						expression: "refreshing"
					}
				}, [t("van-list", {
					attrs: {
						finished: e.finished,
						"finished-text": e.$t("common.notMore"),
						offset: e.offset
					},
					on: {
						load: e.onLoad
					},
					model: {
						value: e.loading,
						callback: function(a) {
							e.loading = a
						},
						expression: "loading"
					}
				}, [e._t("default")], 2)], 1)
			},
			i = [],
			r = {
				name: "vScroll",
				props: {
					offset: {
						default: 300,
						required: !1
					}
				},
				data: function() {
					return {
						loading: !1,
						refreshing: !1,
						finished: !1
					}
				},
				methods: {
					resetData: function() {
						var e = this;
						this.loading = !0, this.$emit("ref", (function(a) {
							e.loading = !1, a && (e.isBoolean(a.finished) ? e.finished = a
								.finished : e.finished = !0)
						}))
					},
					onRefresh: function() {
						var e = this;
						this.$emit("ref", (function(a) {
							e.refreshing = !1, a && e.isBoolean(a.finished) && (e.finished = a
								.finished)
						}))
					},
					isBoolean: function(e) {
						return "boolean" == typeof e
					},
					onLoad: function() {
						var e = this;
						this.$emit("load", (function(a) {
							e.loading = !1, a && (e.isBoolean(a.finished) && (e.finished = a
								.finished), e.isBoolean(a.error) && (e.finished = a
								.error))
						}))
					}
				}
			},
			o = r,
			c = t("2877"),
			l = Object(c["a"])(o, n, i, !1, null, null, null);
		a["default"] = l.exports
	},
	"482b": function(e, a, t) {
		"use strict";
		var n = t("d4ec"),
			i = t("bee2"),
			r = t("365c"),
			o = function() {
				function e() {
					Object(n["a"])(this, e)
				}
				return Object(i["a"])(e, null, [{
					key: "getOptionSymbol",
					value: function() {
						return Object(r["a"])("/option/getOptionSymbol")
					}
				}, {
					key: "getSceneResultList",
					value: function(e) {
						return Object(r["a"])("/option/getSceneResultList", e)
					}
				}, {
					key: "getKline",
					value: function(e) {
						var a = "/option/getKline";
						return Object(r["a"])(a, e)
					}
				}, {
					key: "getBetCoinList",
					value: function() {
						return Object(r["a"])("/option/getBetCoinList")
					}
				}, {
					key: "getUserCoinBalance",
					value: function(e) {
						return Object(r["a"])("/option/getUserCoinBalance", e)
					}
				}, {
					key: "sceneDetail",
					value: function(e) {
						return Object(r["a"])("/option/sceneDetail", e)
					}
				}, {
					key: "sceneListByPairs",
					value: function() {
						return Object(r["a"])("/option/sceneListByPairs")
					}
				}, {
					key: "getOddsList",
					value: function(e) {
						return Object(r["a"])("/option/getOddsList", e)
					}
				}, {
					key: "getOptionHistoryOrders",
					value: function(e) {
						return Object(r["a"])("/option/getOptionHistoryOrders", e)
					}
				}, {
					key: "betScene",
					value: function(e) {
						return Object(r["b"])("/option/betScene", e)
					}
				}, {
					key: "getNewPriceBook",
					value: function(e) {
						return Object(r["a"])("/option/getNewPriceBook", e)
					}
				}, {
					key: "sceneListByTimes",
					value: function() {
						return Object(r["a"])("/option/sceneListByTimes")
					}
				}, {
					key: "getOptionOrderDetail",
					value: function(e) {
						return Object(r["a"])("/option/getOptionOrderDetail", e)
					}
				}]), e
			}();
		a["a"] = o
	},
	"53a0": function(e, a, t) {
		"use strict";
		t.r(a);
		var n = function() {
				var e = this,
					a = e.$createElement,
					t = e._self._c || a;
				return t("div", {
					ref: "chart"
				})
			},
			i = [],
			r = t("e591"),
			o = t.n(r),
			c = {
				name: "vCurve",
				props: ["list"],
				data: function() {
					return {}
				},
				watch: {
					list: function() {}
				},
				methods: {
					intiChart: function() {
						return o.a.stockChart(this.$refs.chart, {
							chart: {
								panning: !1,
								spacingRight: 0,
								spacingLeft: 0,
								backgroundColor: "transparent"
							},
							credits: {
								enabled: !1
							},
							rangeSelector: {
								enabled: !1
							},
							navigator: {
								enabled: !1
							},
							scrollbar: {
								enabled: !1
							},
							legend: {
								enabled: !1
							},
							tooltip: {
								enabled: !1
							},
							xAxis: {
								visible: !1
							},
							yAxis: {
								visible: !1
							},
							plotOptions: {
								spline: {
									enableMouseTracking: !1
								}
							},
							series: [{
								color: "#f05319",
								data: this.list,
								lineWidth: 1,
								type: "spline"
							}]
						})
					}
				},
				mounted: function() {
					this.intiChart()
				}
			},
			l = c,
			s = t("2877"),
			u = Object(s["a"])(l, n, i, !1, null, null, null);
		a["default"] = u.exports
	},
	"56d7": function(e, a, t) {
		"use strict";
		t.r(a);
		t("caad"), t("e260"), t("e6cf"), t("cca6"), t("a79d");
		var n = t("2b0e"),
			i = function() {
				var e = this,
					a = e.$createElement,
					t = e._self._c || a;
				return t("div", {
					staticClass: "fn-md",
					attrs: {
						id: "app"
					}
				}, [t("transition", {
					attrs: {
						name: e.fade
					}
				}, [t("keep-alive", {
					attrs: {
						include: e.cashViews
					}
				}, [t("router-view")], 1)], 1), t("upgrade-page")], 1)
			},
			r = [],
			o = (t("b0c0"), t("5530")),
			c = t("2f62"),
			l = t("8194"),
			s = function() {
				var e = this,
					a = e.$createElement,
					t = e._self._c || a;
				return t("van-popup", {
					staticClass: "upgrade",
					attrs: {
						"close-on-click-overlay": 1 == !e.detail.is_must
					},
					model: {
						value: e.show,
						callback: function(a) {
							e.show = a
						},
						expression: "show"
					}
				}, [t("div", {
					staticClass: "upgrade-box d-flex flex-col overflow-hidden"
				}, [t("div", {
					staticClass: "overflow-scroll p-md flex-fill"
				}, [t("div", [e._v("version：" + e._s(e.detail.version))]), t("div", {
					domProps: {
						innerHTML: e._s(e.detail.update_log)
					}
				})]), e.load ? t("div", {
					staticClass: "d-flex justify-center"
				}, [t("van-circle", {
					attrs: {
						color: "#ea3131",
						rate: 100,
						size: "60px",
						text: e.progress + "%"
					},
					model: {
						value: e.progress,
						callback: function(a) {
							e.progress = a
						},
						expression: "progress"
					}
				})], 1) : e.detail.url ? t("div", {
					staticClass: "fn-center p-md bg-theme-1 color-plain",
					on: {
						click: e.toUp
					}
				}, [e._v(" 升级 ")]) : e._e()])])
			},
			u = [],
			d = (t("96cf"), t("1da1")),
			f = (t("d3b7"), t("ac1f"), t("5319"), {
				isUpdate: function(e) {
					var a = this;
					return Object(d["a"])(regeneratorRuntime.mark((function t() {
						var n, i, r;
						return regeneratorRuntime.wrap((function(t) {
							while (1) switch (t.prev = t.next) {
								case 0:
									return t.next = 2, a
								.getAppVersion();
								case 2:
									return n = t.sent, t.next = 5, a
										.getNewestVersion();
								case 5:
									i = t.sent, r = i.data, "Android" ==
										plus.os.name ? a.getNum(r
											.android.version) > a
										.getNum(n) && e && e(r) :
										"iOS" == plus.os.name && a
										.getNum(r.ios.version) > a
										.getNum(n) && e && e(r);
								case 8:
								case "end":
									return t.stop()
							}
						}), t)
					})))()
				},
				getAppVersion: function() {
					return new Promise((function(e, a) {
						plus.runtime.getProperty(plus.runtime.appid, (function(a) {
							e(a.version)
						}))
					}))
				},
				osName: function() {
					return plus.os.name
				},
				getNewestVersion: function() {
					return l["a"].getNewestVersion()
				},
				getNum: function(e) {
					return e += "", 1 * e.replace(/[^0-9]/gi, "")
				},
				toUpgrade: function() {
					console.log("去升级")
				},
				downloadFile: function(e) {
					var a = e.url,
						t = e.update,
						n = e.before,
						i = e.after;
					return new Promise((function(e, r) {
						n && n();
						var o = plus.downloader.createDownload(a, {}, (function(a, t) {
								200 == t && e(a.filename), i && i()
							})),
							c = function(e) {
								t && t(parseInt(e.downloadedSize / e.totalSize * 100) || 0)
							};
						o.addEventListener("statechanged", c, !1), o.start()
					}))
				},
				install: function(e) {
					"Android" == plus.os.name ? plus.runtime.install(e, {
						force: !1
					}, (function() {
						plus.runtime.restart(), n["a"].prototype.$toast("下载成功，正在安装。。。")
					}), (function(e) {
						n["a"].prototype.$toast("安装失败，请尝试重新下载")
					})) : "iOS" == plus.os.name && plus.runtime.openURL(e)
				},
				ready: function(e) {
					window.plus ? e() : document.addEventListener("plusready", e, !1)
				}
			}),
			b = f,
			h = {
				data: function() {
					return {
						detail: {
							is_must: 1
						},
						progress: 0,
						load: !1,
						show: !1
					}
				},
				created: function() {
					var e = this;
					b.ready((function() {
						b.isUpdate((function(a) {
							e.show = !0, "Android" == b.osName() ? e.detail = a
								.android : "iOS" == b.osName() && (e.detail = a.ios)
						}))
					}))
				},
				methods: {
					toUp: function() {
						var e = this;
						return Object(d["a"])(regeneratorRuntime.mark((function a() {
							var t;
							return regeneratorRuntime.wrap((function(a) {
								while (1) switch (a.prev = a.next) {
									case 0:
										if ("Android" != b.osName()) {
											a.next = 7;
											break
										}
										return a.next = 3, b.downloadFile({
											url: e.detail.url,
											before: function() {
												e.load = !0, e
													.progress =
													0
											},
											update: function(a) {
												e.progress = a
											},
											after: function() {
												this.load = !1
											}
										});
									case 3:
										t = a.sent, b.install(t), a.next =
										8;
										break;
									case 7:
										"iOS" == b.osName() && b.install(e
											.detail.url);
									case 8:
									case "end":
										return a.stop()
								}
							}), a)
						})))()
					}
				}
			},
			m = h,
			p = (t("bcf4"), t("2877")),
			g = Object(p["a"])(m, s, u, !1, null, "26e40130", null),
			k = g.exports,
			y = {
				name: "app",
				data: function() {
					return {
						cashViews: []
					}
				},
				computed: Object(o["a"])({}, Object(c["c"])({
					fade: "fade"
				})),
				components: {
					upgradePage: k
				},
				methods: Object(o["a"])(Object(o["a"])({}, Object(c["b"])({
					fadeOut: "fadeOut",
					setLogoMap: "logoMap"
				})), {}, {
					mobileLogo: function() {
						var e = this;
						l["a"].mobileLogo().then((function(a) {
							var t = a.data;
							e.setLogoMap({
									home_logo: t.home_logo,
									login_logo: t.login_logo,
									title_logo: t.title_logo,
									share_logo: t.share_logo,
									name: t.name
								}), document.getElementById("appIcon").href = t
								.title_logo + "?v=1"
						}))
					}
				}),
				created: function() {
					this.mobileLogo()
				},
				mounted: function() {
					this.fadeOut()
				}
			},
			v = y,
			S = (t("5c0b"), Object(p["a"])(v, i, r, !1, null, null, null)),
			w = S.exports,
			O = (t("4160"), t("9911"), t("90e7")),
			P = (t("c740"), t("a434"), t("b85c")),
			j = t("d4ec"),
			A = t("bee2"),
			C = function() {
				function e(a) {
					Object(j["a"])(this, e), a.constructor === WebSocket ? this.socket = a : this.socket =
						new WebSocket(a), this.doOpen(), this.readyState = this.socket.readyState, this
						._events = {}, this.heartBeatTimer = null
				}
				return Object(A["a"])(e, [{
					key: "doOpen",
					value: function() {
						var e = this;
						this.afterOpenEmit = [], this.socket.addEventListener("open", (function(
							a) {
							return e.onOpen(a)
						})), this.socket.addEventListener("message", (function(a) {
							return e.onMessage(a)
						})), this.socket.addEventListener("close", (function(a) {
							return e.onClose(a)
						})), this.socket.addEventListener("error", (function(a) {
							return e.onError(a)
						}))
					}
				}, {
					key: "Notify",
					value: function(e) {
						var a = this._events[e.Event];
						if (a && a.length) {
							var t, n = Object(P["a"])(a);
							try {
								for (n.s(); !(t = n.n()).done;) {
									var i = t.value;
									i instanceof Function && i(e.Data)
								}
							} catch (r) {
								n.e(r)
							} finally {
								n.f()
							}
						}
					}
				}, {
					key: "onOpen",
					value: function(e) {
						this.Notify({
							Event: "open",
							Data: e
						})
					}
				}, {
					key: "send",
					value: function(e) {
						e.constructor != Array && (e = [e]);
						var a, t = Object(P["a"])(e);
						try {
							for (t.s(); !(a = t.n()).done;) {
								var n = a.value;
								this.socket.send(JSON.stringify(n))
							}
						} catch (i) {
							t.e(i)
						} finally {
							t.f()
						}
					}
				}, {
					key: "onMessage",
					value: function(e) {
						try {
							var a = JSON.parse(e.data);
							this.Notify({
								Event: "message",
								Data: a
							})
						} catch (t) {
							console.error(" >> Data parsing error:", t), this.Notify({
								Event: "error",
								Data: t
							})
						}
					}
				}, {
					key: "on",
					value: function(e, a) {
						this.subscribe(e, a)
					}
				}, {
					key: "off",
					value: function(e, a) {
						this.unsubscribe(e, a)
					}
				}, {
					key: "subscribe",
					value: function(e, a) {
						this._events[e] ? this._events[e].push(a) : this._events[e] = [a]
					}
				}, {
					key: "unsubscribe",
					value: function(e, a) {
						var t = this._events[e].findIndex((function(e) {
							return e === a
						}));
						this._events[e].splice(t, 1)
					}
				}, {
					key: "checkOpen",
					value: function() {
						return this.readyState >= 2
					}
				}, {
					key: "onClose",
					value: function(e) {
						this.Notify({
							Event: "close",
							Data: e
						})
					}
				}, {
					key: "onError",
					value: function(e) {
						this.Notify({
							Event: "error",
							Data: e
						})
					}
				}, {
					key: "emit",
					value: function(e) {
						var a = this;
						return new Promise((function(t) {
							a.send(JSON.stringify(e)), a.on("message", (function(
							e) {
								t(e)
							}))
						}))
					}
				}, {
					key: "doClose",
					value: function() {
						this.socket.close()
					}
				}, {
					key: "destroy",
					value: function() {
						this.heartBeatTimer && (clearInterval(this.heartBeatTimer), this
								.heartBeatTimer = null), this.doClose(), this._events = {}, this
							.readyState = 0, this.socket = null
					}
				}]), e
			}(),
			T = C,
			L = t("1112"),
			M = t("3c69"),
			D = (t("1276"), t("159b"), t("ddb0"), t("a925"));
		n["a"].use(D["a"]);
		var _ = t("5f3d"),
			E = new Object;
		_.keys().forEach((function(e) {
			var a = e.split("/").pop().replace(/\.\w+$/, "");
			E[a] = _(e)
		}));
		var x = new D["a"]({
				locale: localStorage.lang || "cn",
				messages: E
			}),
			z = x,
			B = t("91f4"),
			N = t.n(B),
			K = t("b459"),
			R = t.n(K),
			F = t("c6e7"),
			I = t.n(F),
			$ = t("b71f"),
			U = t.n($);
		n["a"].use(c["a"]);
		var G = new c["a"].Store({
				state: {
					fade: "",
					countryList: [],
					token: localStorage.token,
					user: function() {
						return localStorage.user ? JSON.parse(localStorage.user) : {}
					}(),
					ws: new T(L["a"].socketUrl),
					ws1: new T(L["a"].socketUrl1),
					wsState: !1,
					hideMoney: "true" == localStorage.getItem("hideMoney"),
					logoMap: {},
					lang: localStorage.lang || "cn",
					langList: [{
						value: "cn",
						label: "简体中文"
					}, {
						value: "en",
						label: "English"
					}, {
						value: "tw",
						label: "繁體中文"
					}, {
						value: "tr",
						label: "Türk"
					}],
					theme: localStorage.theme || "light",
					marketList: [],
					infoActive: "",
					indexList: []
				},
				mutations: {
					FADE: function(e, a) {
						e.fade = a
					},
					COUNTRYLIST: function(e, a) {
						e.countryList = a
					},
					TOKEN: function(e, a) {
						localStorage.setItem("token", a), e.token = a
					},
					USER: function(e, a) {
						localStorage.setItem("user", JSON.stringify(a)), e.user = a
					},
					HIDEMONEY: function(e, a) {
						localStorage.setItem("hideMoney", a), e.hideMoney = a
					},
					LOGOMAP: function(e, a) {
						e.logoMap = a
					},
					LANG: function(e, a) {
						localStorage.setItem("lang", a), z.locale = a, e.lang = a
					},
					VANTLANG: function(e, a) {
						var t = "zh-CN",
							n = R.a;
						switch (a) {
							case "cn":
								t = "zh-CN", n = R.a;
								break;
							case "en":
								t = "en-US", n = N.a;
								break;
							case "tw":
								t = "zh-TW", n = I.a;
								break;
							case "tr":
								t = "tr-TR", n = U.a;
								break
						}
						M["a"].use(t, n)
					},
					THEME: function(e, a) {
						e.theme = a, localStorage.setItem("theme", a)
					},
					MARKETLIST: function(e, a) {
						e.marketList = a
					},
					INFOACTIVE: function(e, a) {
						e.infoActive = a
					},
					INDEXLIST: function(e, a) {
						e.indexList = a
					}
				},
				actions: {
					fadeOut: function(e) {
						var a = e.commit;
						a("FADE", "fade-out"), setTimeout((function() {
							a("FADE", "fade-in")
						}), 300)
					},
					countryList: function(e, a) {
						var t = e.commit;
						t("COUNTRYLIST", a)
					},
					token: function(e, a) {
						var t = e.commit;
						t("TOKEN", a)
					},
					user: function(e, a) {
						var t = e.commit;
						t("USER", a)
					},
					hideMoney: function(e, a) {
						var t = e.commit;
						t("HIDEMONEY", a)
					},
					setUserInfo: function(e) {
						var a = e.commit;
						O["a"].getUserInfo().then((function(e) {
							a("USER", e.data)
						})).catch((function() {}))
					},
					logoMap: function(e, a) {
						var t = e.commit;
						t("LOGOMAP", a)
					},
					setLang: function(e, a) {
						var t = e.commit;
						t("LANG", a), t("VANTLANG", a)
					},
					setTheme: function(e, a) {
						var t = e.commit;
						t("THEME", a), document.documentElement.className = a
					},
					setMarketList: function(e, a) {
						var t = e.commit;
						t("MARKETLIST", a)
					},
					setInfoActive: function(e, a) {
						var t = e.commit;
						t("INFOACTIVE", a)
					},
					setIndexList: function(e, a) {
						var t = e.commit;
						t("INDEXLIST", a)
					}
				},
				modules: {}
			}),
			q = [];

		function V(e, a) {
			G.state[e].on("close", (function() {
				G.state[e].socket = new WebSocket(a)
			})), G.state[e].on("message", (function(a) {
				"ping" != a.type && "ping" != a.cmd || G.state[e].send({
					cmd: "pong"
				})
			})), q.push({
				ws: G.state[e],
				name: e,
				link: a
			})
		}

		function H() {
			setTimeout((function() {
				G.state.wsState = 1 == G.state.ws.socket.readyState, H()
			}), 1e3)
		}
		H(), window.addEventListener("visibilitychange", (function() {
			document.hidden || q.forEach((function(e) {
				try {
					1 != e.ws.socket.readyState && (e.ws.socket = new WebSocket(e.link),
						e.ws.doOpen())
				} catch (a) {
					console.log("重连失败"), console.error(a)
				}
			}))
		})), V("ws", L["a"].socketUrl), V("ws1", L["a"].socketUrl1);
		var Y = G,
			W = t("b970");
		t("833e");
		n["a"].use(W["a"]), localStorage.lang && Y.commit("VANTLANG", localStorage.lang);
		var Q = t("a18c"),
			J = t("365c"),
			Z = (t("d81d"), function() {
				var e = this,
					a = e.$createElement,
					t = e._self._c || a;
				return t("van-popup", {
					attrs: {
						value: e.show,
						position: "bottom"
					},
					on: {
						input: e.input
					}
				}, [t("van-picker", {
					attrs: {
						title: e.title,
						"show-toolbar": "",
						columns: e.columns
					},
					on: {
						confirm: e.onConfirm,
						cancel: e.onCancel,
						change: e.onChange
					}
				})], 1)
			}),
			X = [],
			ee = {
				data: function() {
					return {}
				},
				methods: {}
			},
			ae = ee,
			te = (t("cb44"), Object(p["a"])(ae, Z, X, !1, null, "297abf1d", null)),
			ne = te.exports,
			ie = n["a"].extend(ne),
			re = function(e, a) {
				var t = Object.assign({
					title: this.$t("common.select")
				}, a);
				return new Promise((function(a, n) {
					var i = new ie({
						el: document.createElement("div"),
						data: function() {
							return {
								show: !1,
								columns: [{
									values: e.map((function(e) {
										return e.label
									})),
									defaultIndex: e.findIndex((function(e) {
										return e.value == t.value
									})) || 0
								}],
								title: t.title
							}
						},
						methods: {
							close: function() {
								this.show = !1;
								var e = i.$el;
								setTimeout((function() {
									i.$destroy(), e.parentNode && e
										.parentNode.removeChild(e)
								}), 600)
							},
							input: function(e) {
								e ? this.show = e : this.close()
							},
							onConfirm: function(t, n) {
								this.close(), a(e[n].value, t)
							},
							onCancel: function() {
								this.close(), n()
							},
							onChange: function() {}
						},
						mounted: function() {
							var e = this;
							this.$nextTick((function() {
								e.show = !0
							}))
						}
					});
					document.body.appendChild(i.$el)
				}))
			},
			oe = t("b311"),
			ce = t.n(oe),
			le = t("d399"),
			se = function(e) {
				return console.log(e), new Promise((function(e) {
					var a = document.createElement("input");
					a.setAttribute("type", "file"), a.setAttribute("accept", "image/*"), a
						.onchange = function() {
							e({
								ele: a,
								file: a.files[0]
							})
						}, a.click()
				}))
			};

		function ue(e) {
			return new Promise((function(a, t) {
				var n = document.createElement("button");
				n.setAttribute("data-clipboard-text", e), n.setAttribute("id", e);
				var i = new ce.a(n);
				i.on("success", (function(e) {
					a(e), le["a"].success("复制成功")
				})), i.on("error", (function(e) {
					t(e), le["a"].fail("复制失败")
				})), n.click(), n = null
			}))
		}

		function de(e) {
			return e.replace(/<[^<>]+>/g, "").replace(/&nbsp;/gi, "")
		}
		n["a"].prototype.$back = function() {
				var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
				Y.dispatch("fadeOut"), Q["a"].go(e)
			}, n["a"].prototype.$post = J["b"], n["a"].prototype.$get = J["a"], n["a"].prototype.$postFile = J[
				"c"], n["a"].prototype.$imgUrl = L["a"].imgUrl, n["a"].prototype.$baseUrl = L["a"].baseUrl, n[
				"a"].prototype.$picker = re, n["a"].prototype.$getFile = se, n["a"].prototype.$copy = ue, n["a"]
			.prototype.$filterCode = de;
		t("f5c8"), t("7e7d"), t("499a");
		var fe = t("2ef0"),
			be = t.n(fe),
			he = be.a,
			me = t("6809");
		me.keys().forEach((function(e) {
			var a = me(e),
				t = he.upperFirst(he.camelCase(e.split("/").pop().replace(/\.\w+$/, "")));
			n["a"].component(t, a.default || a)
		})), n["a"].config.productionTip = !1;
		var pe = new n["a"]({
			store: Y,
			i18n: z,
			router: Q["a"],
			render: function(e) {
				return e(w)
			}
		}).$mount("#app");

		function ge() {
			plus.key.addEventListener("backbutton", (function() {
				var e = ["/exchange-operation", "/home", "/contract", "/mine", "/"];
				e.includes(pe.$route.path) ? plus.runtime.quit() : pe.$back()
			}), !1)
		}
		window.plus ? ge() : document.addEventListener("plusready", ge, !1)
	},
	5848: function(e) {
		e.exports = JSON.parse(
			'{"common":{"D":"Day","M":"Month","Y":"Year","add":"Add","address":"Address","all":"All","amout":"Amount","cancel":"Cancel","check":"Check","code":"Verification Code","confirm":"Confirm","date":"Date","detail":"Detail","email":"Mailbox","enter":"Please enter","error":"Failed","getCode":"Get Verification Code","h":"Hour","loadMore":"Load More","m":"Minute","money":"Amount","more":"More","notData":"No data temporarily","notMore":"No More","phone":"Mobile","requestError":"The network is busy, please try again later","s":"second","save":"Save","select":"Please select","sendSuccess":"Send successfully","sms":"SMS","submit":"Submit","success":"Success","tips":"Warm Tips","total":"Total","type":"Type","copy":"Copy","light":"light","dark":"dark"},"base":{"a0":"Title","a1":"Return","a2":"More","a3":"Quotes","a4":"Options","a5":"Tap a new zone","a6":"Member","a7":"College","a8":"Trading Pair","a9":"Latest Price","b0":"Rise and fall","b1":"Click to log in","b2":"Welcome to","b3":"Please log in","b4":"Upgrade","b5":"Recharge","b6":"Withdrawal","b7":"Promotion","b8":"Deduct the handling fee","b9":"Available","c0":"Buy","c1":"My Commission","c2":"Identity Authentication","c3":"Security Center","c4":"Message Notification","c5":"Withdrawal Address","c6":"Settings","c7":"Optional","c8":"Added successfully","c9":"Cancelled successfully","d0":"Home","d1":"Transaction","d2":"Assets","d3":"Please enter search keywords","d4":"All","d5":"Motherboard","d6":"Total assets converted","d7":"Funds Account","d8":"Transfer","d9":"Search currency","e0":"Hide","e1":"Balance Assets","e2":"Freeze","e3":"Folding","e4":"Contract Account","e5":"Contract conversion","e6":"Miner Level","e7":"Miner"},"accountSettings":{"a0":"Account Settings","a1":"Portrait","a2":"Nickname","a3":"Master Account","a4":"Mobile Number","a5":"Untie","a6":"Binding","a7":"Mailbox binding","a8":"Switch account","a9":"Logout","b0":"Modify Nickname","b1":"Please enter a nickname","b2":"Language"},"assets":{"a0":"Withdrawal address management","a1":"The address book can be used to manage your frequently used addresses. There is no need to perform multiple verifications when initiating withdrawals from addresses in the address book","a2":"Automatic withdrawal is supported. When using {name} to withdraw, only addresses in the web address book are allowed to initiate withdrawals","a3":"Delete Address","a4":"Add Address","a5":"Please select the address to delete","a6":"Whether to delete the currently selected address","a7":"Flowing Water","a8":"Total","a9":"Available","b0":"Freeze","b1":"Funding Account","b2":"Contract Account","b3":"Margin Account","b4":"Wealth Management Account","b5":"Please enter search keywords","b6":"Withdrawal","b7":"Please select the chain type","b8":"Withdrawal Address","b9":"Please enter the address","c0":"Quantity","c1":"Balance","c2":"Please enter the quantity","c3":"All","c4":"Handling Fee","c5":"Please double check and enter the correct wallet address for withdrawal","c6":"Sending non-corresponding digital currency to the wallet address will cause permanent loss","c7":"Withdrawal fees will be deducted from the amount of withdrawals","c8":"Withdrawal Record","c9":"Time","d0":"Status","d1":"Under review","d2":"Success","d3":"Failed","d4":"See more","d5":"Submitted successfully, under review","d6":"Edit","d7":"Add","d8":"Address","d9":"Please enter or paste the address","e0":"Remarks","e1":"Please enter a note","e2":"Please fill in the address","e3":"Please fill in the remarks","e4":"Operation successful","e5":"Recharge Coin","e6":"Scan the QR code above to get the deposit address","e7":"coin deposit address","e8":"Amount of Deposit","e9":"Please enter the deposit amount","f0":"This address is your latest recharge address. When the system receives recharge, it will be automatically credited to the account","f1":"The transfer needs to be confirmed by the entire blockchain network. When it reaches {num} network confirmations, your {name} will be automatically deposited into the account","f2":"When a network is confirmed, yours","f3":"Please only send {name} to this address, sending other digital currencies to this address will cause permanent loss","f4":"Token Deposit Record"},"auth":{"a0":"Identity Authentication","a1":"Real-name authentication","a2":"Uncertified","a3":"Authenticated","a4":"Advanced Certification","a5":"Under review","a6":"Authentication failed","a7":"Nationality","a8":"Please select nationality","a9":"Real name","b0":"Please enter your real name","b1":"Certificate Number","b2":"Please enter the ID number","b3":"Confirm","b4":"Authentication successful","b5":"Please upload the front photo of the ID","b6":"Please upload the back of the certificate","b7":"Please upload a hand-held ID photo","b8":"Make sure the photo is clear without watermark, and the upper body is intact","b9":"The file size is too large and must not exceed","c0":"File type error","c1":"Uploaded successfully","c2":"Please upload a photo of the back of your ID","c3":"Please upload the front photo of your ID","c4":"Uploaded successfully, please wait for review"},"exchange":{"a0":"Coins","a1":"Subscription","a2":"Contract","a3":"Transaction","a4":"Current Order","a5":"Historical Commission","a6":"Added successfully","a7":"Cancelled successfully","a8":"Total Issued","a9":"Total Circulation","b0":"Issue Price","b1":"Release time","b2":"White Paper Address","b3":"Official website address","b4":"Introduction","b5":"Buy","b6":"Sell","b7":"Order Price","b8":"Type","b9":"Limit Price Trading","c0":"Market Trading","c1":"Closed","c2":"Total","c3":"Buy","c4":"Sell","c5":"Quantity","c6":"Sold at the best market price","c7":"Total Price","c8":"Available Quantity","c9":"Total Value","d0":"Login","d1":"Time Sharing Chart","d2":"Price","d3":"Latest Transaction","d4":"Time","d5":"Direction","d6":"Limit Price","d7":"Market Price","d8":"Please enter the price","d9":"Please enter the quantity","e0":"Please enter the total price","e1":"Order successfully placed","e2":"Average Price","e3":"Highest","e4":"Lowest","e5":"amount","e6":"Order","e7":"Currency Information","e8":"Minutes","e9":"Hour","f0":"Day","f1":"Week","f2":"Month","f3":"Buying Price","f4":"Sell Price","f5":"Currency Trading","f6":"Please enter search keywords","f7":"Trading Pair","f8":"Latest Price","f9":"Rise and fall","g0":"Optional","g1":"My delegation","g2":"Cancel delegation","g3":"Operation","g4":"Cancel","g5":"Whether to cancel the current order","g6":"Undo successfully"},"option":{"a0":"Options","a1":"Distance delivery","a2":"See more","a3":"look empty","a4":"Yield","a5":"Buy","a6":"Multi","a7":"Empty","a8":"Current","a9":"Next Issue","b0":"Seeing Ping","b1":"Increase selection","b2":"Yield","b3":"Purchase Quantity","b4":"Please enter the quantity","b5":"Balance","b6":"Estimated Income","b7":"Buy Now","b8":"Increase","b9":"Flush","c0":"Fall","c1":"Successful purchase","c2":"Details","c3":"Order Number","c4":"Opening Price","c5":"Closing Price","c6":"Buy Time","c7":"Buy Quantity","c8":"Purchase Type","c9":"Status","d0":"Delivery Result","d1":"Settlement Quantity","d2":"Delivery Time","d3":"View more","d4":"Buy Option","d5":"Waiting for delivery","d6":"My Delivery","d7":"Delivery Record","d8":"Minutes","d9":"Hour","e0":"Day","e1":"Week","e2":"Month","e3":"Direction","e4":"Rise and fall"},"purchase":{"a0":"Issue Price","a1":"Subscription Currency","a2":"Estimated time to go online","a3":"Start time for purchase","a4":"End of Subscription Time","a5":"Subscription","a6":"Please select the purchase currency","a7":"Purchase Quantity","a8":"Please enter the purchase quantity","a9":"All","b0":"Subscribe now","b1":"Subscription Period","b2":"Project warm-up","b3":"Start purchase","b4":"End of Subscription","b5":"Announce Results","b6":"Project Details","b7":"Whether to use","b8":"Buy","b9":"Subscription is successful"},"reg":{"a0":"Mobile registration","a1":"Mailbox Registration","a2":"Mobile","a3":"Please enter your phone number","a4":"Mailbox","a5":"Please enter the mailbox number","a6":"Verification Code","a7":"Please enter the verification code","a8":"Password","a9":"Please enter a password","b0":"Confirm Password","b1":"Please confirm your password","b2":"Recommended person","b3":"Please enter the recommender","b4":"Optional","b5":"You have agreed","b6":"User Agreement","b7":"and understand ours","b8":"Privacy Agreement","b9":"Register","c0":"Already have an account","c1":"Log in now","c2":"Please read and agree to the agreement","c3":"Please fill in the phone number","c4":"Please fill in the mailbox number","c5":"Registered successfully"},"safe":{"a0":"Untie","a1":"Binding","a2":"Mailbox","a3":"Mailbox Number","a4":"Please enter the mailbox number","a5":"Email Verification Code","a6":"Please enter the verification code","a7":"Verification Code","a8":"Unbind successfully","a9":"Binding successful","b0":"Forgot login password","b1":"Account","b2":"Please enter your phone","b3":"New Password","b4":"Please enter a new password","b5":"Confirm Password","b6":"Please confirm your password","b7":"Confirm Modification","b8":"Please enter the correct phone or email number","b9":"Google Authenticator","c0":"How to: Download and open Google Authenticator, scan the QR code below or manually enter the secret key to add a verification token","c1":"Copy key","c2":"I have stored the key properly, and it will not be retrieved if it is lost","c3":"Next","c4":"SMS verification code","c5":"Google Verification Code","c6":"Confirm binding","c7":"Security Center","c8":"Modify login password","c9":"Modify","d0":"Settings","d1":"Transaction Password","d2":"Mobile","d3":"Modified successfully","d4":"Mobile Number","d5":"Please enter your phone number","d6":"Please enter the SMS verification code","d7":"Close","d8":"Open","d9":"Verify","e0":"SMS","e1":"Closed successfully","e2":"Open successfully","e3":"Confirm","e4":"Set up successfully"},"transfer":{"a0":"Transfer Record","a1":"Success","a2":"Quantity","a3":"Direction","a4":"Funding Account","a5":"Contract Account","a6":"Margin Account","a7":"Wealth Management Account","a8":"Transfer","a9":"From","b0":"To","b1":"Transfer Currency","b2":"Balance","b3":"All","b4":"Transfer successfully"},"notice":{"a0":"Details","a1":"Message Notification","a2":"Announcement","a3":"Message"},"invite":{"a0":"Invite Friends","a1":"Partner","a2":"Exclusive trading rebate","a3":"Ordinary user","a4":"My Identity","a5":"Exclusive Identity","a6":"My invitation code","a7":"Copy the invitation QR code","a8":"Copy invitation link","a9":"My Promotion","b0":"Total number of people to promote","b1":"People","b2":"Total income equivalent","b3":"Promotion Record","b4":"Direct invitation","b5":"Rebate Record","b6":"Level","b7":"Level Setting","b8":"Promotion Conditions","b9":"Dividend Rights","c0":"nickname","c1":"Number of Promotions","c2":"Earnings equivalent","c3":"Invitation Record","c4":"Rebate Record","c5":"Class rights description","c6":"Level","c7":"Equity","c8":"Description","c9":"My rights"},"help":{"a0":"Details","a1":"College","a2":"Classification"},"login":{"a0":"Mobile phone or mailbox number","a1":"Please enter your phone or email number","a2":"Password","a3":"Please enter a password","a4":"Login","a5":"Forgot Password","a6":"No account","a7":"Register Now","a8":"Mobile","a9":"mailbox","b0":"Done"},"contract":{"a0":"Open Position","a1":"Position","a2":"Delegation","a3":"History","a4":"Contract Transaction","a5":"Opened successfully","a6":"Transaction Type","a7":"Closed","a8":"Order Total","a9":"Average Transaction Price","b0":"Order Price","b1":"Margin","b2":"Handling Fee","b3":"Status","b4":"Operation","b5":"Cancel order","b6":"Cancelled","b7":"Unsold","b8":"Partial deal","b9":"Full deal","c0":"Buy open long","c1":"Buy short short","c2":"Sell to open short","c3":"Sell flat and long","c4":"Warm Reminder","c5":"Whether to cancel the current order","c6":"Undo successfully","c7":"Profit and Loss","c8":"Share","c9":"Delegation Details","d0":"No data yet","d1":"Price","d2":"Quantity","d3":"Deal time","d4":"User Rights","d5":"Unrealized profit and loss","d6":"Risk Rate","d7":"Market Price","d8":"Leaf","d9":"Occupy Margin","e0":"bullish","e1":"Can open more","e2":"Bearish","e3":"Can open empty","e4":"Available","e5":"Transfer","e6":"Fund Rate","e7":"Distance settlement","e8":"Multi","e9":"Empty","f0":"Funds Transfer","f1":"Calculator","f2":"About the contract","f3":"Risk Protection Fund","f4":"Fund Expense History","f5":"Ordinary Commission","f6":"Market Order","f7":"Whether to use","f8":"The price","f9":"Open position with double leverage","g0":"Open Multi","g1":"Open empty","g2":"Delegation successful","g3":"Only display the current contract","g4":"Amountable to level","g5":"Delegated Freeze","g6":"Average opening price","g7":"Settlement Base Price","g8":"Estimated Strong Parity","g9":"Settled income","h0":"Yield","h1":"Stop Profit","h2":"Stop Loss","h3":"Close","h4":"The market price is flat","h5":"Stop order","h6":"flat","h7":"Please enter the closing price","h8":"Limit Price","h9":"Please enter the closing quantity","i0":"Can flat","i1":"Average opening price","i2":"Latest Transaction Price","i3":"Please enter the price","i4":"Take Profit Trigger Price","i5":"Market price to","i6":"Take profit order will be triggered at the time, and profit and loss is expected after the transaction","i7":"Stop Loss Trigger Price","i8":"A stop loss order will be triggered at the time, and profit and loss is expected after the transaction","i9":"OK","j0":"Successfully closed position","j1":"Whether the market price is flat","j2":"Quan Ping","j3":"Success","j4":"Setup successful","j5":"Magic calculation, unmatched","j6":"Do","j7":"Close price","j8":"Digital asset trading platform","j9":"The fusion of making money and ideals is really the most wonderful thing","k0":"Opening price","k1":"Latest Price","k2":"Scan the code to learn more","k3":"Settlement profit and loss","k4":"The screenshot is successful and has been saved locally","k5":"Screenshot failed","k6":"Long press to take screenshot","k7":"One-key full leveling","k8":"One-key reverse","k9":"Whether one-key full leveling","l0":"Completely successful","l1":"Whether to reverse with one key","l2":"Reverse success"}}'
			)
	},
	"5c0b": function(e, a, t) {
		"use strict";
		var n = t("70c1"),
			i = t.n(n);
		i.a
	},
	"5f3d": function(e, a, t) {
		var n = {
			"./cn.json": "d62c",
			"./en.json": "5848",
			"./tr.json": "7ff6",
			"./tw.json": "f8a4"
		};

		function i(e) {
			var a = r(e);
			return t(a)
		}

		function r(e) {
			if (!t.o(n, e)) {
				var a = new Error("Cannot find module '" + e + "'");
				throw a.code = "MODULE_NOT_FOUND", a
			}
			return n[e]
		}
		i.keys = function() {
			return Object.keys(n)
		}, i.resolve = r, e.exports = i, i.id = "5f3d"
	},
	"67a7": function(e, a, t) {
		"use strict";
		t.r(a);
		var n = function() {
				var e = this,
					a = e.$createElement,
					t = e._self._c || a;
				return t("van-button", e._b({
					class: e.type,
					attrs: {
						disabled: e.dDisabled,
						loading: e.dLoading
					},
					on: {
						click: function(a) {
							return e.$emit("click", a)
						}
					}
				}, "van-button", Object.assign({}, e.$props), !1), [e._t("default")], 2)
			},
			i = [],
			r = {
				props: ["type", "size", "text", "color", "icon", "iconPrefix", "tag", "nativeType", "block",
					"plain", "square", "round", "disabled", "hairline", "loading", "loadingText",
					"loadingType", "loadingSize", "url", "to", "replace"
				],
				data: function() {
					return {
						dLoading: this.loading,
						dDisabled: this.disabled
					}
				},
				watch: {
					loading: function(e) {
						this.dLoading = e
					},
					disabled: function(e) {
						this.dDisabled = e
					}
				}
			},
			o = r,
			c = (t("7fa6"), t("2877")),
			l = Object(c["a"])(o, n, i, !1, null, "844bdc82", null);
		a["default"] = l.exports
	},
	6809: function(e, a, t) {
		var n = {
			"./layout/tvChart.vue": "2a17",
			"./layout/vButton.vue": "67a7",
			"./layout/vCode.vue": "2408",
			"./layout/vCountry.vue": "e9de",
			"./layout/vCurve.vue": "53a0",
			"./layout/vHeader.vue": "ffc6",
			"./layout/vInput.vue": "06b2",
			"./layout/vLang.vue": "3957",
			"./layout/vPaging.vue": "9bdb",
			"./layout/vPlaceImg.vue": "279a",
			"./layout/vQr.vue": "d3c5",
			"./layout/vScroll.vue": "3d14"
		};

		function i(e) {
			var a = r(e);
			return t(a)
		}

		function r(e) {
			if (!t.o(n, e)) {
				var a = new Error("Cannot find module '" + e + "'");
				throw a.code = "MODULE_NOT_FOUND", a
			}
			return n[e]
		}
		i.keys = function() {
			return Object.keys(n)
		}, i.resolve = r, e.exports = i, i.id = "6809"
	},
	"70c1": function(e, a, t) {},
	"7e7d": function(e, a, t) {},
	"7fa6": function(e, a, t) {
		"use strict";
		var n = t("f6a7"),
			i = t.n(n);
		i.a
	},
	"7ff6": function(e) {
		e.exports = JSON.parse(
			'{"common":{"D":"Gün","M":"Ay","Y":"Yıl","add":"Ekle","address":"Adres","all":"Hepsi","amout":"Tutar","cancel":"İptal","check":"Kontrol et","code":"Doğrulama Kodu","confirm":"Onayla","date":"Tarih","detail":"Ayrıntı","email":"Posta Kutusu","enter":"Lütfen girin","error":"Başarısız","getCode":"Doğrulama Kodunu Alın","h":"Saat","loadMore":"Daha Fazla Yükle","m":"dakika","money":"Tutar","more":"fazla","notData":"Geçici olarak veri yok","notMore":"Artık Yok","phone":" telefonu","requestError":"Ağ meşgul, lütfen daha sonra tekrar deneyin","s":"ikinci","save":"Kaydet","select":"Lütfen seçin","sendSuccess":"Başarıyla gönder","sms":"SMS","submit":" Gönder","success":"Başarı","tips":"Önemli İpuçları","total":"Toplam","type":"Tür","copy":"Kopyala","light":"Beyaz","dark":"siyah"},"base":{"a0":"Başlık","a1":"Geri Dön","a2":"Daha Fazla","a3":"Alıntılar","a4":"Seçenekler","a5":"Yeni yap","a6":"Üye","a7":"Kolej","a8":"İşlem Çifti","a9":"En Son Fiyat","b0":"Yüksel ve al","b1":"Giriş yapmak için tıklayın","b2":"Hoş Geldiniz","b3":"Lütfen giriş yapın","b4":"Yükselt","b5":"Şarj etmek","b6":"Anma","b7":"Promosyon","b8":"İşlem ücretini düşürün","b9":"Kullanılabilir","c0":"Satın Al","c1":"Komisyonum","c2":"Kimlik Doğrulama","c3":"Güvenlik Merkezi","c4":"Mesaj Bildirimi","c5":"Para Çekme Adresi","c6":"Ayarlar","c7":"İsteğe bağlı","c8":"Başarıyla eklendi","c9":"Başarıyla iptal edildi","d0":"Ana Sayfa","d1":"İşlem","d2":"Varlıklar","d3":"Lütfen arama anahtar kelimelerini girin","d4":"Tümü","d5":"Anakart","d6":"Dönüştürülen toplam varlıklar","d7":"para kaynağı Hesabı","d8":"Aktarım","d9":"Para birimi ara","e0":"Gizle","e1":"Bakiye Varlıkları","e2":"Dondur","e3":"Katlama","e4":"Kontrat Hesabı","e5":"Sözleşme dönüştürme","e6":"Madenci Seviyesi","e7":"Madenci"},"accountSettings":{"a0":"Hesap Ayarları","a1":"Dikey","a2":"Takma ad","a3":"Ana Hesap","a4":"Cep Numarası","a5":"Çöz","a6":"Bağlama","a7":"Posta kutusu bağlama","a8":"Hesabı değiştir","a9":"Oturumu Kapat","b0":"Takma Adı Değiştir","b1":"Lütfen bir takma ad girin","b2":"Dil"},"assets":{"a0":"Para çekme adresi yönetimi","a1":"Adres defteri, sık kullandığınız adresleri yönetmek için kullanılabilir. Adres defterinde bulunan adreslerden para çekme işlemi başlatırken birden fazla doğrulama yapmaya gerek yoktur","a2":"Otomatik para çekme destekleniyor. Para çekmek için {name} kullanılırken, yalnızca web adres defterindeki adreslerin para çekme işlemini başlatmasına izin verilir","a3":"Adresi Sil","a4":"Adres Ekle","a5":"Lütfen silinecek adresi seçin","a6":"Seçili olan adresin silinip silinmeyeceği","a7":"Akan Su","a8":"Toplam","a9":"Kullanılabilir","b0":"Dondur","b1":"Finansman Hesabı","b2":"Kontrat Hesabı","b3":"Teminat Hesabı","b4":"Varlık Yönetimi Hesabı","b5":"Lütfen arama anahtar kelimelerini girin","b6":"Geri Çekilme","b7":"Lütfen zincir türünü seçin","b8":"Para Çekme Adresi","b9":"Lütfen adresi girin","c0":"Miktar","c1":"Bakiye","c2":"Lütfen miktarı girin","c3":"Tümü","c4":"İşlem Ücreti","c5":"Lütfen tekrar kontrol edin ve para çekmek için doğru cüzdan adresini girin","c6":"M-cüzdan adresine karşılık gelmeyen dijital para biriminin gönderilmesi kalıcı kayba neden olur","c7":"Para çekme ücretleri, para çekme tutarından düşülecektir","c8":"Para Çekme Kaydı","c9":"Zaman","d0":"Durum","d1":"İnceleniyor","d2":"Başarılı","d3":"Başarısız","d4":"Daha fazlasını görün","d5":"Başarıyla gönderildi, inceleniyor","d6":"Düzenle","d7":"Ekle","d8":"Adres","d9":"Lütfen adresi girin veya yapıştırın","e0":"Açıklamalar","e1":"Lütfen bir not girin","e2":"Lütfen adresi yazınız","e3":"Lütfen açıklamaları doldurun","e4":"İşlem başarılı","e5":"Yeniden Şarj Et","e6":"Para yatırma adresini almak için yukarıdaki QR kodunu tarayın","e7":"bozuk para yatırma adresi","e8":"Yatırılan Tutar","e9":"Lütfen depozito tutarını girin","f0":"Bu adres, en son yeniden yükleme adresinizdir. Sistem yeniden yükleme aldığında, otomatik olarak hesaba aktarılacaktır","f1":"Transferin tüm blok zinciri ağı tarafından onaylanması gerekiyor. {num} ağ onayına ulaştığında, {name} adınız otomatik olarak hesaba yatırılacaktır","f2":"Bir ağ onaylandığında, sizinki","f3":"Lütfen bu adrese yalnızca {name} gönderin, bu adrese başka dijital para birimleri göndermek kalıcı kayba neden olur","f4":"Token Para Yatırma Kaydı"},"auth":{"a0":"Kimlik Doğrulama","a1":"Gerçek ad kimlik doğrulaması","a2":"Onaylanmamış","a3":"Kimliği Doğrulanmış","a4":"Gelişmiş Sertifikasyon","a5":"İnceleniyor","a6":"Kimlik doğrulama başarısız oldu","a7":"Milliyet","a8":"Lütfen uyruğu seçin","a9":"Gerçek ad","b0":"Lütfen gerçek adınızı girin","b1":"Sertifika Numarası","b2":"Lütfen kimlik numarasını girin","b3":"Onayla","b4":"Kimlik doğrulama başarılı","b5":"Lütfen kimliğin ön fotoğrafını yükleyin","b6":"Lütfen sertifikanın arkasını yükleyin","b7":"Lütfen elde tutulan bir kimlik fotoğrafı yükleyin","b8":"Fotoğrafın filigran olmadan net ve gövdenin üst kısmının sağlam olduğundan emin olun","b9":"Dosya boyutu çok büyük ve aşılmamalıdır","c0":"Dosya türü hatası","c1":"Başarıyla yüklendi","c2":"Lütfen kimliğinizin arka yüzünün bir fotoğrafını yükleyin","c3":"Lütfen kimliğinizin ön fotoğrafını yükleyin","c4":"Başarıyla yüklendi, lütfen inceleme için bekleyin"},"exchange":{"a0":"Madeni Paralar","a1":"Abonelik","a2":"Sözleşme","a3":"İşlem","a4":"Mevcut Sipariş","a5":"Tarihi Komisyon","a6":"Başarıyla eklendi","a7":"Başarıyla iptal edildi","a8":"Toplam Verilen","a9":"Toplam Dolaşım","b0":"Düzenleme Fiyatı","b1":"Yayın zamanı","b2":"Beyaz Kağıt Adresi","b3":"Resmi web sitesi adresi","b4":"Giriş","b5":"Satın Al","b6":"Sat","b7":"Sipariş Fiyatı","b8":"Tür","b9":"Limit Fiyat Ticareti","c0":"Piyasa Ticareti","c1":"Tamamlandı","c2":"Toplam","c3":"Satın Al","c4":"Sat","c5":"Miktar","c6":"En iyi piyasa fiyatından sat","c7":"Toplam Fiyat","c8":"Kullanılabilir Miktar","c9":"Toplam Değer","d0":"Giriş","d1":"Zaman Paylaşımı Grafiği","d2":"Fiyat","d3":"En Son İşlem","d4":"Zaman","d5":"Yön","d6":"Limit Fiyatı","d7":"Piyasa Fiyatı","d8":"Lütfen fiyatı girin","d9":"Lütfen miktarı girin","e0":"Lütfen toplam fiyatı girin","e1":"Sipariş başarıyla verildi","e2":"Ortalama Fiyat","e3":"En Yüksek","e4":"En Düşük","e5":"Tutar","e6":"Sırala","e7":"Para Birimi Bilgileri","e8":"Dakika","e9":"Saat","f0":"gün","f1":"hafta","f2":"Ay","f3":"Alış Fiyatı","f4":"Satış Fiyatı","f5":"Döviz Ticareti","f6":"Lütfen arama anahtar kelimelerini girin","f7":"İşlem Çifti","f8":"En Son Fiyat","f9":"Yüksel ve al","g0":"İsteğe bağlı","g1":"Yetkim","g2":"Yetkilendirmeyi iptal et","g3":"İşlem","g4":"İptal","g5":"Mevcut siparişin iptal edilip edilmeyeceği","g6":"Başarıyla geri al"},"option":{"a0":"Seçenekler","a1":"Mesafeli teslimat","a2":"Daha fazlasını görün","a3":"boş görün","a4":"Verim","a5":"Satın Al","a6":"Çoklu","a7":"Boş","a8":"Güncel","a9":"Sonraki Sayı","b0":"Ping Görme","b1":"Seçimi artır","b2":"Verim","b3":"Satın Alma Miktarı","b4":"Lütfen miktarı girin","b5":"Bakiye","b6":"Tahmini Gelir","b7":"Şimdi Satın Alın","b8":"Arttır","b9":"Qiping","c0":"Güz","c1":"Başarılı satın alma","c2":"Ayrıntılar","c3":"Sipariş Numarası","c4":"Açılış Fiyatı","c5":"Kapanış Fiyatı","c6":"Satın Alma Süresi","c7":"Satın Alma Miktarı","c8":"Satın Alma Türü","c9":"Durum","d0":"Teslimat Sonucu","d1":"Yerleşim Miktarı","d2":"Teslim Süresi","d3":"Daha fazlasını görüntüle","d4":"Satın Alma Seçeneği","d5":"Teslimat bekleniyor","d6":"Teslimatım","d7":"Teslimat Kaydı","d8":"Dakika","d9":"Saat","e0":"gün","e1":"hafta","e2":"Ay","e3":"Yön","e4":"Yüksel ve al"},"purchase":{"a0":"Düzenleme Fiyatı","a1":"Abonelik Para Birimi","a2":"Çevrimiçi olma için tahmini süre","a3":"Satın alma için başlangıç ​​zamanı","a4":"Abonelik Süresinin Sonu","a5":"Abonelik","a6":"Lütfen satın alma para birimini seçin","a7":"Satın Alma Miktarı","a8":"Lütfen satın alma miktarını girin","a9":"Tümü","b0":"Şimdi abone olun","b1":"Abonelik Süresi","b2":"Proje ısınması","b3":"Satın almaya başlayın","b4":"Aboneliğin Sonu","b5":"Sonuçları Açıklayın","b6":"Proje Ayrıntıları","b7":"Kullanılıp kullanılmayacağı","b8":"Satın Al","b9":"Abonelik başarılı"},"reg":{"a0":"Mobil kayıt","a1":"Posta Kutusu Kaydı","a2":"Mobil","a3":"Lütfen telefon numaranızı girin","a4":"Posta Kutusu","a5":"Lütfen posta kutusu numarasını girin","a6":"Doğrulama Kodu","a7":"Lütfen doğrulama kodunu girin","a8":"Şifre","a9":"Lütfen bir şifre girin","b0":"Parolayı Onayla","b1":"Lütfen şifrenizi onaylayın","b2":"Önerilen kişi","b3":"Lütfen tavsiye edeni girin","b4":"İsteğe bağlı","b5":"Kabul ettiniz","b6":"Kullanıcı Sözleşmesi","b7":"ve bizimkini anlayın","b8":"Gizlilik Sözleşmesi","b9":"Kaydol","c0":"Zaten bir hesabınız var","c1":"Şimdi giriş yapın","c2":"Lütfen sözleşmeyi okuyup kabul edin","c3":"Lütfen telefon numarasını girin","c4":"Lütfen posta kutusu numarasını girin","c5":"Başarıyla kaydettirildi"},"safe":{"a0":"Çöz","a1":"Bağlama","a2":"Posta Kutusu","a3":"Posta Kutusu Numarası","a4":"Lütfen posta kutusu numarasını girin","a5":"E-posta Doğrulama Kodu","a6":"Lütfen doğrulama kodunu girin","a7":"Doğrulama Kodu","a8":"Bağlantıyı başarıyla kaldır","a9":"Bağlama başarılı","b0":"Giriş şifrenizi unuttum","b1":"Hesap","b2":"Lütfen telefonunuzu girin","b3":"Yeni Parola","b4":"Lütfen yeni bir şifre girin","b5":"Parolayı Onayla","b6":"Lütfen şifrenizi onaylayın","b7":"Değişikliği Onayla","b8":"Lütfen doğru telefon veya e-posta numarasını girin","b9":"Google Authenticator","c0":"Nasıl yapılır: Google Authenticator\'ı indirip açın, aşağıdaki QR kodunu tarayın veya bir doğrulama jetonu eklemek için gizli anahtarı manuel olarak girin","c1":"Anahtarı kopyala","c2":"Anahtarı düzgün bir şekilde depoladım ve kaybolursa geri alınmayacaktır","c3":"Sonraki","c4":"SMS doğrulama kodu","c5":"Google Doğrulama Kodu","c6":"Bağlamayı onayla","c7":"Güvenlik Merkezi","c8":"Giriş şifresini değiştir","c9":"Değiştir","d0":"Ayarlar","d1":"İşlem Şifresi","d2":"Mobil","d3":"Başarıyla değiştirildi","d4":"Cep Numarası","d5":"Lütfen telefon numaranızı girin","d6":"Lütfen SMS doğrulama kodunu girin","d7":"Kapat","d8":"Aç","d9":"Doğrula","e0":"SMS","e1":"Başarıyla kapatıldı","e2":"Başarıyla aç","e3":"Onayla","e4":"Başarıyla kurun"},"transfer":{"a0":"Kaydı Aktar","a1":"Başarılı","a2":"Miktar","a3":"Yön","a4":"Finansman Hesabı","a5":"Sözleşmeli Hesap","a6":"Teminat Hesabı","a7":"Varlık Yönetimi Hesabı","a8":"Aktarım","a9":"Kimden","b0":"Kime","b1":"Transfer Para Birimi","b2":"Bakiye","b3":"Tümü","b4":"Aktarım başarıyla yapıldı"},"notice":{"a0":"Ayrıntılar","a1":"Mesaj Bildirimi","a2":"Duyuru","a3":"Mesaj"},"invite":{"a0":"Arkadaşlarını Davet Et","a1":"Ortak","a2":"Özel ticaret indirimi","a3":"Sıradan kullanıcı","a4":"Kimliğim","a5":"Özel Kimlik","a6":"Davet kodum","a7":"Davet QR kodunu kopyalayın","a8":"Davet bağlantısını kopyala","a9":"Promosyonum","b0":"Terfi edecek toplam kişi sayısı","b1":"Kişiler","b2":"Toplam gelir eşdeğeri","b3":"Promosyon Kaydı","b4":"Doğrudan davet","b5":"İndirim Kaydı","b6":"Seviye","b7":"Seviye Ayarı","b8":"Promosyon Koşulları","b9":"Temettü Hakları","c0":"takma","c1":"Promosyon Sayısı","c2":"Kazanç eşdeğeri","c3":"Davet Kaydı","c4":"İndirim Kaydı","c5":"Sınıf hakları açıklaması","c6":"Seviye","c7":"Eşitlik","c8":"Açıklama","c9":"Benim haklarım"},"help":{"a0":"Ayrıntılar","a1":"Kolej","a2":"Sınıflandırma"},"login":{"a0":"Cep telefonu veya posta kutusu numarası","a1":"Lütfen telefon veya e-posta numaranızı girin","a2":"Şifre","a3":"Lütfen bir şifre girin","a4":"Giriş","a5":"Şifremi Unuttum","a6":"Hesap yok","a7":"Şimdi Kaydolun","a8":"Mobil","a9":"posta kutusu","b0":"Bitti"},"contract":{"a0":"Açık Pozisyon","a1":"Konum","a2":"Yetki","a3":"Geçmiş","a4":"Sözleşmeli İşlem","a5":"Başarıyla açıldı","a6":"İşlem Türü","a7":"Kapalı","a8":"Sipariş Toplamı","a9":"Ortalama İşlem Fiyatı","b0":"Sipariş Fiyatı","b1":"Marj","b2":"İşlem Ücreti","b3":"Durum","b4":"İşlem","b5":"Siparişi iptal et","b6":"İptal edildi","b7":"Satılmadı","b8":"Kısmi İşlem","b9":"Tam anlaşma","c0":"Uzun süre satın al","c1":"Kısa satın al","c2":"Açığa sat","c3":"Düz ve uzun sat","c4":"Sıcak Hatırlatma","c5":"Mevcut siparişin iptal edilip edilmeyeceği","c6":"Başarıyla geri al","c7":"Kar ve Zarar","c8":"Paylaş","c9":"Yetki Ayrıntıları","d0":"Henüz veri yok","d1":"Fiyat","d2":"Miktar","d3":"Anlaşma zamanı","d4":"Kullanıcı Hakları","d5":"Gerçekleşmemiş kar ve zarar","d6":"Risk Oranı","d7":"Piyasa Fiyatı","d8":"Zhang","d9":"Occupy Margin","e0":"yükseliş","e1":"Daha fazla açabilir","e2":"Ayı","e3":"Boş açılabilir","e4":"Kullanılabilir","e5":"Transfer","e6":"Para Oranı","e7":"Mesafe yerleşimi","e8":"Çoklu","e9":"Boş","f0":"Para Transferi","f1":"Hesap Makinesi","f2":"Sözleşme hakkında","f3":"Risk Koruma Fonu","f4":"Fon Gider Geçmişi","f5":"Olağan Komisyon","f6":"Piyasa Emri","f7":"Kullanılıp kullanılmayacağı","f8":"Fiyat","f9":"Çift kaldıraçla açık pozisyon","g0":"Çoklu Aç","g1":"Boş aç","g2":"Yetki başarılı","g3":"Yalnızca mevcut sözleşmeyi göster","g4":"Düzleştirilebilir","g5":"Yetkilendirilmiş Dondurma","g6":"Ortalama açılış fiyatı","g7":"Uzlaşma Taban Fiyatı","g8":"Tahmini Güçlü Parite","g9":"Yerleşik gelir","h0":"Verim","h1":"Kârı Durdur","h2":"Kaybı Durdur","h3":"Konumu Kapat","h4":"Piyasa fiyatı sabit","h5":"Kârı Durdur Zararı Durdur","h6":"Seviye","h7":"Lütfen kapanış fiyatını girin","h8":"Limit Fiyatı","h9":"Lütfen kapanış miktarını girin","i0":"Keping","i1":"Ortalama açılış fiyatı","i2":"En Son İşlem Fiyatı","i3":"Lütfen fiyatı girin","i4":"Kâr Tetikleyici Fiyatını Al","i5":"Piyasa fiyatı","i6":"Kâr al emri o anda tetiklenecek ve işlemden sonra kar ve zarar bekleniyor","i7":"Kaybı Durdur Tetikleme Fiyatı","i8":"Bir zarar durdurma emri o anda tetiklenecek ve işlemden sonra kar ve zarar bekleniyor","i9":"Tamam","j0":"Başarıyla kapatılan pozisyon","j1":"Piyasa fiyatının sabit olup olmadığı","j2":"Quan Ping","j3":"Başarılı","j4":"Kurulum başarılı","j5":"Sihirli hesaplama, eşsiz","j6":"Yap","j7":"Fiyatı kapat","j8":"Dijital varlık ticaret platformu","j9":"Para ve ideallerin birleşimi gerçekten en harika şey","k0":"Açılış fiyatı","k1":"En Son Fiyat","k2":"Daha fazla bilgi edinmek için kodu tarayın","k3":"Yerleşim kar ve zararı","k4":"Ekran görüntüsü başarılı ve yerel olarak kaydedildi","k5":"Ekran görüntüsü başarısız oldu","k6":"Ekran görüntüsü almak için uzun basın","k7":"Tek tuşla tam tesviye","k8":"Tek tuşla ters","k9":"Tek tuşla tam seviyelendirme olsun","l0":"Tamamen başarılı","l1":"Tek tuşla tersine çevirmek","l2":"Ters başarı"}}'
			)
	},
	8194: function(e, a, t) {
		"use strict";
		var n = t("d4ec"),
			i = t("bee2"),
			r = t("365c"),
			o = function() {
				function e() {
					Object(n["a"])(this, e)
				}
				return Object(i["a"])(e, null, [{
					key: "sliderVerify",
					value: function(e) {
						return Object(r["b"])("/sliderVerify", e)
					}
				}, {
					key: "sendSmsCode",
					value: function(e) {
						return Object(r["b"])("/register/sendSmsCode", e)
					}
				}, {
					key: "sendEmailCode",
					value: function(e) {
						return Object(r["b"])("/register/sendEmailCode", e)
					}
				}, {
					key: "getCountryCode",
					value: function() {
						return Object(r["a"])("/getCountryList")
					}
				}, {
					key: "register",
					value: function(e) {
						return Object(r["b"])("user/register", e)
					}
				}, {
					key: "sendSmsCodeBeforeLogin",
					value: function(e) {
						return Object(r["b"])("/login/sendSmsCodeBeforeLogin", e)
					}
				}, {
					key: "sendEmailCodeBeforeLogin",
					value: function(e) {
						return Object(r["b"])("/login/sendEmailCodeBeforeLogin", e)
					}
				}, {
					key: "login",
					value: function(e) {
						return Object(r["b"])("/user/login", e)
					}
				}, {
					key: "loginConfirm",
					value: function(e, a) {
						var t = a.loading;
						return Object(r["b"])("/user/loginConfirm", e, {
							loading: t
						})
					}
				}, {
					key: "logout",
					value: function() {
						return Object(r["b"])("/user/logout")
					}
				}, {
					key: "uploadImage",
					value: function(e) {
						return Object(r["c"])("/uploadImage", e)
					}
				}, {
					key: "floor",
					value: function() {
						return Object(r["a"])("/floor")
					}
				}, {
					key: "mobileLogo",
					value: function() {
						return Object(r["a"])("/index/logo")
					}
				}, {
					key: "myNotifiables",
					value: function(e) {
						return Object(r["a"])("/user/myNotifiables", e)
					}
				}, {
					key: "readNotifiable",
					value: function(e) {
						return Object(r["a"])("/user/readNotifiable", e)
					}
				}, {
					key: "article",
					value: function(e) {
						return Object(r["a"])("/article/list", e)
					}
				}, {
					key: "articleDetail",
					value: function(e) {
						return Object(r["a"])("/article/detail", e)
					}
				}, {
					key: "clause",
					value: function() {
						return Object(r["a"])("/login/clause")
					}
				}, {
					key: "getNewestVersion",
					value: function() {
						return Object(r["a"])("/getNewestVersion")
					}
				}]), e
			}();
		a["a"] = o
	},
	"90e7": function(e, a, t) {
		"use strict";
		var n = t("d4ec"),
			i = t("bee2"),
			r = t("365c"),
			o = function() {
				function e() {
					Object(n["a"])(this, e)
				}
				return Object(i["a"])(e, null, [{
					key: "getUserInfo",
					value: function() {
						return Object(r["a"])("/user/getUserInfo")
					}
				}, {
					key: "updateUserInfo",
					value: function(e) {
						return Object(r["b"])("/user/updateUserInfo", e)
					}
				}, {
					key: "disableSmsEmailGoogle",
					value: function(e, a) {
						var t = a.btn;
						return Object(r["b"])("/user/disableSmsEmailGoogle", e, {
							btn: t
						})
					}
				}, {
					key: "enableSmsEmailGoogle",
					value: function(e, a) {
						var t = a.btn;
						return Object(r["b"])("/user/enableSmsEmailGoogle", e, {
							btn: t
						})
					}
				}, {
					key: "sendBindEmailCode",
					value: function(e) {
						return Object(r["b"])("/user/sendBindEmailCode", e)
					}
				}, {
					key: "switchSecondVerify",
					value: function() {
						return Object(r["a"])("/user/switchSecondVerify")
					}
				}, {
					key: "accountSecurity",
					value: function() {
						return Object(r["a"])("/user/security/home")
					}
				}, {
					key: "setOrResetPaypwd",
					value: function(e) {
						return Object(r["b"])("/user/setOrResetPaypwd", e)
					}
				}, {
					key: "updatePassword",
					value: function(e, a) {
						var t = a.btn;
						return Object(r["b"])("/user/updatePassword", e, {
							btn: t
						})
					}
				}, {
					key: "bindEmail",
					value: function(e, a) {
						var t = a.btn;
						return Object(r["b"])("/user/bindEmail", e, {
							btn: t
						})
					}
				}, {
					key: "bindPhone",
					value: function(e, a) {
						var t = a.btn;
						return Object(r["b"])("/user/bindPhone", e, {
							btn: t
						})
					}
				}, {
					key: "unbindEmail",
					value: function(e) {
						return Object(r["b"])("/user/unbindEmail", e)
					}
				}, {
					key: "unbindPhone",
					value: function(e) {
						return Object(r["b"])("/user/unbindPhone", e)
					}
				}, {
					key: "forgetPasswordAttempt",
					value: function(e) {
						return Object(r["b"])("/user/forgetPasswordAttempt", e, {
							toast: !1
						})
					}
				}, {
					key: "forgetPassword",
					value: function(e, a) {
						var t = a.btn;
						return Object(r["b"])("/user/forgetPassword", e, {
							btn: t
						})
					}
				}, {
					key: "getGoogleToken",
					value: function(e) {
						return Object(r["a"])("/user/getGoogleToken", e)
					}
				}, {
					key: "bindGoogleToken",
					value: function(e, a) {
						var t = a.btn;
						return Object(r["b"])("/user/bindGoogleToken", e, {
							btn: t
						})
					}
				}, {
					key: "unbindGoogleToken",
					value: function(e) {
						return Object(r["b"])("/user/unbindGoogleToken", e)
					}
				}, {
					key: "sendBindSmsCode",
					value: function(e) {
						return Object(r["b"])("/user/sendBindSmsCode", e)
					}
				}, {
					key: "getCode",
					value: function(e) {
						return Object(r["b"])("/user/getCode", e)
					}
				}]), e
			}();
		a["a"] = o
	},
	"93b5": function(e, a, t) {
		"use strict";
		var n = t("d107"),
			i = t.n(n);
		i.a
	},
	"99f9": function(e, a, t) {},
	"9bdb": function(e, a, t) {
		"use strict";
		t.r(a);
		var n = function() {
				var e = this,
					a = e.$createElement,
					t = e._self._c || a;
				return t("v-scroll", {
					ref: "scroll",
					on: {
						load: e.load,
						ref: e.ref
					}
				}, [e._t("box", [e._l(e.list, (function(a) {
					return e._t("default", null, null, a)
				}))], null, e.list)], 2)
			},
			i = [],
			r = (t("99af"), t("2909")),
			o = {
				props: {
					data: {
						default: function() {
							return {}
						},
						type: Object,
						require: !1
					},
					ajax: {
						require: !0,
						type: Function
					}
				},
				data: function() {
					return {
						list: [],
						page: 0
					}
				},
				methods: {
					resetData: function() {
						this.$refs.scroll.resetData()
					},
					load: function(e) {
						this.page++, this.getList(e)
					},
					ref: function(e) {
						this.page = 1, this.getList(e)
					},
					getList: function(e) {
						var a = this,
							t = Object.assign({
								page: this.page
							}, this.data);
						this.ajax(t).then((function(t) {
							var n = t.data;
							1 == n.current_page && (a.list = []), a.list = [].concat(Object(r[
								"a"])(a.list), Object(r["a"])(n.data)), e && e({
								finished: n.data.length < n.per_page
							})
						}))
					}
				},
				created: function() {}
			},
			c = o,
			l = t("2877"),
			s = Object(l["a"])(c, n, i, !1, null, null, null);
		a["default"] = s.exports
	},
	a18c: function(e, a, t) {
		"use strict";
		t("d3b7");
		var n = t("2b0e"),
			i = t("8c4f"),
			r = function() {
				var e = this,
					a = e.$createElement,
					t = e._self._c || a;
				return t("div", {
					staticClass: "layout-page"
				}, [t("keep-alive", {
					attrs: {
						include: e.cashViews
					}
				}, [t("router-view", {
					staticClass: "layout-main"
				})], 1), t("div", {
					staticClass: "footer d-flex p-y-xs bg-panel-4 fn-center border-t"
				}, [t("router-link", {
					staticClass: "item line-height-1 flex-fill",
					attrs: {
						tag: "div",
						to: "/home"
					}
				}, [t("div", {
					staticClass: "icon fn-22 "
				}, [t("van-icon", {
					attrs: {
						name: "wap-home-o"
					}
				})], 1), t("div", [e._v(e._s(e.$t("base.d0")))])]), t("router-link", {
					staticClass: "item line-height-1 flex-fill",
					attrs: {
						tag: "div",
						to: "/exchange-operation"
					}
				}, [t("div", {
					staticClass: "icon fn-22 "
				}, [t("van-icon", {
					attrs: {
						name: "ascending"
					}
				})], 1), t("div", [e._v(e._s(e.$t("exchange.a0")))])]), t("router-link", {
					staticClass: "item line-height-1 flex-fill",
					attrs: {
						tag: "div",
						to: "/option-list"
					}
				}, [t("div", {
					staticClass: "icon fn-22 "
				}, [t("van-icon", {
					attrs: {
						name: "todo-list-o"
					}
				})], 1), t("div", [e._v(e._s(e.$t("base.a4")))])]), t("router-link", {
					staticClass: "item line-height-1 flex-fill",
					attrs: {
						tag: "div",
						to: "/contract"
					}
				}, [t("div", {
					staticClass: "icon fn-22 "
				}, [t("van-icon", {
					attrs: {
						name: "records"
					}
				})], 1), t("div", [e._v(e._s(e.$t("exchange.a2")))])]), t("router-link", {
					staticClass: "item line-height-1 flex-fill",
					attrs: {
						tag: "div",
						to: "/mine"
					}
				}, [t("div", {
					staticClass: "icon fn-22 "
				}, [t("van-icon", {
					attrs: {
						name: "diamond-o"
					}
				})], 1), t("div", [e._v(e._s(e.$t("base.d2")))])])], 1)], 1)
			},
			o = [],
			c = {
				name: "Home",
				components: {},
				data: function() {
					return {
						cashViews: []
					}
				},
				methods: {}
			},
			l = c,
			s = (t("93b5"), t("2877")),
			u = Object(s["a"])(l, r, o, !1, null, "329b6bf7", null),
			d = u.exports;
		n["a"].use(i["a"]);
		var f = [{
				path: "/",
				name: "Base",
				component: d,
				redirect: "/home",
				children: [{
					path: "/home",
					name: "home",
					component: function() {
						return t.e("chunk-294dce4f").then(t.bind(null, "2de6"))
					}
				}, {
					path: "/list",
					name: "list",
					component: function() {
						return t.e("chunk-253ddd26").then(t.bind(null, "ac54"))
					}
				}, {
					path: "/mine",
					name: "mine",
					component: function() {
						return t.e("chunk-51bc1e5a").then(t.bind(null, "0865"))
					}
				}, {
					path: "/option-list",
					name: "option-list",
					component: function() {
						return t.e("chunk-efaf3496").then(t.bind(null, "5a39"))
					}
				}, {
					path: "/exchange-operation",
					name: "exchange-operation",
					component: function() {
						return Promise.all([t.e("chunk-8c35ef84"), t.e("chunk-1a189544")]).then(
							t.bind(null, "f876"))
					}
				}, {
					path: "/contract",
					name: "contract",
					component: function() {
						return Promise.all([t.e("chunk-8c35ef84"), t.e("chunk-421cf1ce")]).then(
							t.bind(null, "9594"))
					}
				}]
			}, {
				path: "/accountSettings",
				name: "accountSettings",
				component: function() {
					return t.e("chunk-30cdd9ab").then(t.bind(null, "eb3d"))
				}
			}, {
				path: "/changeNickname",
				name: "changeNickname",
				component: function() {
					return t.e("chunk-c7acc768").then(t.bind(null, "60d9"))
				}
			}, {
				path: "/option",
				name: "option",
				component: function() {
					return t.e("chunk-d3b5f668").then(t.bind(null, "ed76"))
				}
			}, {
				path: "/option/delivery-detail",
				name: "delivery-detail",
				component: function() {
					return t.e("chunk-2d0e9b40").then(t.bind(null, "8f51"))
				}
			}, {
				path: "/recharge",
				name: "recharge",
				component: function() {
					return t.e("chunk-3392db4b").then(t.bind(null, "6ef7"))
				}
			}, {
				path: "/draw",
				name: "draw",
				component: function() {
					return t.e("chunk-57788a76").then(t.bind(null, "13d3"))
				}
			}, {
				path: "/assets/address-list",
				name: "address-list",
				component: function() {
					return t.e("chunk-5131396f").then(t.bind(null, "5479"))
				}
			}, {
				path: "/assets/edit-address",
				name: "edit-address",
				component: function() {
					return t.e("chunk-84850d08").then(t.bind(null, "fbfc"))
				}
			}, {
				path: "/invite",
				name: "invite",
				component: function() {
					return t.e("chunk-0bb7ef62").then(t.bind(null, "0221"))
				}
			}, {
				path: "/invite/level",
				name: "invite-level",
				component: function() {
					return t.e("chunk-53fbe214").then(t.bind(null, "1474"))
				}
			}, {
				path: "/invite/current",
				name: "invite-current",
				component: function() {
					return t.e("chunk-16bed791").then(t.bind(null, "6b7a"))
				}
			}, {
				path: "/commission",
				name: "commission",
				component: function() {
					return t.e("chunk-30b48eac").then(t.bind(null, "9fe1"))
				}
			}, {
				path: "/commission/revoke",
				name: "revoke",
				component: function() {
					return t.e("chunk-ec89946c").then(t.bind(null, "4efc"))
				}
			}, {
				path: "/auth",
				name: "Auth",
				component: function() {
					return t.e("chunk-2fccb5da").then(t.bind(null, "b73b"))
				}
			}, {
				path: "/auth/primary",
				name: "primary",
				component: function() {
					return t.e("chunk-183ae2f7").then(t.bind(null, "bade"))
				}
			}, {
				path: "/auth/senior",
				name: "senior",
				component: function() {
					return t.e("chunk-188ea8ac").then(t.bind(null, "e52c"))
				}
			}, {
				path: "/safe",
				name: "safe",
				component: function() {
					return t.e("chunk-2d0ab8f2").then(t.bind(null, "1690"))
				}
			}, {
				path: "/safe/google",
				name: "google",
				component: function() {
					return t.e("chunk-11f0f276").then(t.bind(null, "b128"))
				}
			}, {
				path: "/safe/login-password",
				name: "login-password",
				component: function() {
					return t.e("chunk-2d238686").then(t.bind(null, "fef7"))
				}
			}, {
				path: "/safe/transaction-password",
				name: "transaction-password",
				component: function() {
					return t.e("chunk-2d0af4ab").then(t.bind(null, "0e66"))
				}
			}, {
				path: "/safe/email",
				name: "email",
				component: function() {
					return t.e("chunk-2d0b3a5c").then(t.bind(null, "28ee"))
				}
			}, {
				path: "/safe/phone",
				name: "phone",
				component: function() {
					return t.e("chunk-2d0e87e0").then(t.bind(null, "8a01"))
				}
			}, {
				path: "/safe/forget-password",
				name: "forget-password",
				component: function() {
					return t.e("chunk-2d0b95b3").then(t.bind(null, "3330"))
				}
			}, {
				path: "/notice",
				name: "notice",
				component: function() {
					return t.e("chunk-2d0bae8b").then(t.bind(null, "38e5"))
				}
			}, {
				path: "/notice/detail",
				name: "detail",
				component: function() {
					return t.e("chunk-2d20fa51").then(t.bind(null, "b508"))
				}
			}, {
				path: "/notice/msg-detail",
				name: "msg-detail",
				component: function() {
					return t.e("chunk-2d0aa908").then(t.bind(null, "120a"))
				}
			}, {
				path: "/transfer",
				name: "transfer",
				component: function() {
					return t.e("chunk-66bb05a0").then(t.bind(null, "33c7"))
				}
			}, {
				path: "/transfer/bill",
				name: "transfer-bill",
				component: function() {
					return t.e("chunk-19f62753").then(t.bind(null, "f171"))
				}
			}, {
				path: "/assets/bill",
				name: "assets-bill",
				component: function() {
					return t.e("chunk-1d3d9dce").then(t.bind(null, "77f5"))
				}
			}, {
				path: "/assets/account-bill",
				name: "accrount-bill",
				component: function() {
					return t.e("chunk-0bf0aaf0").then(t.bind(null, "83b0"))
				}
			}, {
				path: "/login",
				name: "login",
				component: function() {
					return t.e("chunk-10bb9de9").then(t.bind(null, "d9c9"))
				}
			}, {
				path: "/reg",
				name: "reg",
				component: function() {
					return t.e("chunk-a5e71e64").then(t.bind(null, "204d"))
				}
			}, {
				path: "/exchange",
				name: "exchange",
				component: function() {
					return t.e("chunk-5dea1b5d").then(t.bind(null, "be00"))
				}
			}, {
				path: "/help",
				name: "help",
				component: function() {
					return t.e("chunk-4a501fc0").then(t.bind(null, "e6e8"))
				}
			}, {
				path: "/help/sort",
				name: "help-sort",
				component: function() {
					return t.e("chunk-f306dcda").then(t.bind(null, "d093"))
				}
			}, {
				path: "/help/detail",
				name: "help-detail",
				component: function() {
					return t.e("chunk-0703413a").then(t.bind(null, "1726"))
				}
			}, {
				path: "/income",
				name: "income",
				component: function() {
					return t.e("chunk-9bf736ee").then(t.bind(null, "385b"))
				}
			}],
			b = new i["a"]({
				routes: f
			});
		a["a"] = b
	},
	bcf4: function(e, a, t) {
		"use strict";
		var n = t("3897"),
			i = t.n(n);
		i.a
	},
	cb44: function(e, a, t) {
		"use strict";
		var n = t("99f9"),
			i = t.n(n);
		i.a
	},
	cf28: function(e, a, t) {
		"use strict";
		var n = t("e703"),
			i = t.n(n);
		i.a
	},
	d107: function(e, a, t) {},
	d3c5: function(e, a, t) {
		"use strict";
		t.r(a);
		var n = function() {
				var e = this,
					a = e.$createElement,
					t = e._self._c || a;
				return t("div", [t("vue-qr", {
					attrs: {
						text: e.text,
						margin: 0,
						width: e.width,
						height: e.height
					}
				})], 1)
			},
			i = [],
			r = (t("ac1f"), t("5319"), t("658f")),
			o = t.n(r),
			c = {
				props: {
					text: {
						default: "",
						type: String,
						required: !1
					}
				},
				components: {
					vueQr: o.a
				},
				data: function() {
					return {
						width: 100,
						height: 100
					}
				},
				watch: {
					text: function() {
						this.getRec()
					}
				},
				methods: {
					getRec: function() {
						var e = {},
							a = window.getComputedStyle(this.$el);
						e.width || (e.width = a.width && a.width.replace(/[^0-9.]/gi, "") || 100), e
							.height || (e.height = a.height && a.height.replace(/[^0-9.]/gi, ""));
						var t = 0,
							n = 0;
						"border-box" === a["box-sizing"] && (t = 1 * a["padding-left"].replace(/[^0-9.]/gi,
									"") + 1 * a["padding-right"].replace(/[^0-9.]/gi, "") + 1 * a[
									"border-left-width"].replace(/[^0-9.]/gi, "") + 1 * a[
									"border-right-width"].replace(/[^0-9.]/gi, ""), n = 1 * a["padding-top"]
								.replace(/[^0-9.]/gi, "") + 1 * a["padding-bottom"].replace(/[^0-9.]/gi,
								"") + 1 * a["border-top-width"].replace(/[^0-9.]/gi, "") + 1 * a[
									"border-bottom-width"].replace(/[^0-9.]/gi, "")), this.width = e.width -
							t, this.height = e.height - n
					}
				},
				mounted: function() {
					var e = this;
					this.$nextTick((function() {
						e.getRec()
					}))
				}
			},
			l = c,
			s = t("2877"),
			u = Object(s["a"])(l, n, i, !1, null, null, null);
		a["default"] = u.exports
	},
	d62c: function(e) {
		e.exports = JSON.parse(
			'{"common":{"D":"日","M":"月","Y":"年","add":"添加","address":"地址","all":"所有","amout":"数量","cancel":"取消","check":"审核","code":"验证码","confirm":"确定","date":"日期","detail":"详情","email":"邮箱","enter":"请输入","error":"失败","getCode":"获取验证码","h":"时","loadMore":"加载更多","m":"分","money":"金额","more":"更多","notData":"暂无数据","notMore":"没有更多了","phone":"手机","requestError":"网络繁忙，请稍后再试","s":"秒","save":"保存","select":"请选择","sendSuccess":"发送成功","sms":"短信","submit":"提交","success":"成功","tips":"温馨提示","total":"总额","type":"类型","copy":"复制","light":"白","dark":"黑"},"base":{"a0":"标题","a1":"返回","a2":"更多","a3":"行情","a4":"期权","a5":"打新专区","a6":"会员","a7":"学院","a8":"交易对","a9":"最新价","b0":"涨跌幅","b1":"点击登录","b2":"欢迎来到","b3":"请登录","b4":"升级","b5":"充币","b6":"提币","b7":"推广","b8":"抵扣手续费","b9":"可用","c0":"购买","c1":"我的委托","c2":"身份认证","c3":"安全中心","c4":"消息通知","c5":"提币地址","c6":"设置","c7":"自选","c8":"添加成功","c9":"取消成功","d0":"首页","d1":"交易","d2":"资产","d3":"请输入搜索关键词","d4":"全部","d5":"主板","d6":"总资产折合","d7":"资金账户","d8":"划转","d9":"搜索币种","e0":"隐藏","e1":"余额资产","e2":"冻结","e3":"折合","e4":"合约账户","e5":"合约折合","e6":"矿工等级","e7":"矿工"},"accountSettings":{"a0":"账号设置","a1":"头像","a2":"昵称","a3":"主账号","a4":"手机号","a5":"解绑","a6":"绑定","a7":"邮箱绑定","a8":"切换账户","a9":"退出登录","b0":"修改昵称","b1":"请输入昵称","b2":"语言"},"assets":{"a0":"提币地址管理","a1":"地址簿可以用来管理您的常用地址，往地址簿中存在的地址发起提币时，无需进行多重校验","a2":"已支持自动提币，使用{name}提币时，只允许网地址簿中存在的地址发起提币","a3":"删除地址","a4":"添加地址","a5":"请选择要删除的地址","a6":"是否删除当前选中地址","a7":"流水","a8":"总额","a9":"可用","b0":"冻结","b1":"资金账户","b2":"合约账户","b3":"杠杆账户","b4":"理财账户","b5":"请输入搜索关键词","b6":"提币","b7":"请选择链类型","b8":"提币地址","b9":"请输入地址","c0":"数量","c1":"余额","c2":"请输入数量","c3":"全部","c4":"手续费","c5":"请仔细检查并输入正确的提币钱包地址","c6":"发送不对应的数字货币到钱包地址会造成永久性的损失","c7":"提币手续费将从提币数量中扣除","c8":"提币记录","c9":"时间","d0":"状态","d1":"审核中","d2":"成功","d3":"失败","d4":"查看更多","d5":"提交成功，正在审核","d6":"编辑","d7":"添加","d8":"地址","d9":"请输入或粘贴地址","e0":"备注","e1":"请输入备注","e2":"请填写地址","e3":"请填写备注","e4":"操作成功","e5":"充币","e6":"扫描上方二维码获取充币地址","e7":"充币地址","e8":"充币数量","e9":"请输入充币数量","f0":"此地址是您最新的充值地址，当系统收到充值时，将进行自动入账","f1":"转账需要由整个区块链网络进行确认，到达{num}个网络确认时，您的{name}将被自动存入账户中","f2":"个网络确认时，您的","f3":"请只发送{name}到此地址，发送其他数字货币到此地址会造成永久性的损失","f4":"充币记录"},"auth":{"a0":"身份认证","a1":"实名认证","a2":"未认证","a3":"已认证","a4":"高级认证","a5":"审核中","a6":"认证失败","a7":"国籍","a8":"请选择国籍","a9":"真实姓名","b0":"请输入真实姓名","b1":"证件号码","b2":"请输入证件号码","b3":"确认","b4":"认证成功","b5":"请上传证件正面照片","b6":"请上传证件背面","b7":"请上传手持证件照","b8":"确保照片清晰无水印，且上半身完整","b9":"文件尺寸过大，不得超过","c0":"文件类型错误","c1":"上传成功","c2":"请上传证件背面照","c3":"请上传证件正面照","c4":"上传成功，请等待审核"},"exchange":{"a0":"币币","a1":"申购","a2":"合约","a3":"交易","a4":"当前委托","a5":"历史委托","a6":"添加成功","a7":"取消成功","a8":"发行总量","a9":"流通总量","b0":"发行价格","b1":"发行时间","b2":"白皮书地址","b3":"官网地址","b4":"简介","b5":"买","b6":"卖","b7":"委托价","b8":"类型","b9":"限价交易","c0":"市价交易","c1":"已成交","c2":"总计","c3":"买入","c4":"卖出","c5":"数量","c6":"在最佳市场价格成交","c7":"总价","c8":"可用数量","c9":"总值","d0":"登录","d1":"分时图","d2":"价格","d3":"最新成交","d4":"时间","d5":"方向","d6":"限价","d7":"市价","d8":"请输入价格","d9":"请输入数量","e0":"请输入总价","e1":"下单成功","e2":"平均价格","e3":"最高","e4":"最低","e5":"量","e6":"买卖盘","e7":"币种信息","e8":"分钟","e9":"小时","f0":"天","f1":"周","f2":"月","f3":"买价","f4":"卖价","f5":"币币交易","f6":"请输入搜索关键词","f7":"交易对","f8":"最新价","f9":"涨跌幅","g0":"自选","g1":"我的委托","g2":"撤销委托","g3":"操作","g4":"撤销","g5":"是否撤销当前委托","g6":"撤销成功"},"option":{"a0":"期权","a1":"距离交割","a2":"看多","a3":"看空","a4":"收益率","a5":"购买","a6":"多","a7":"空","a8":"当前","a9":"下期","b0":"看平","b1":"涨幅选择","b2":"收益率","b3":"购买数量","b4":"请输入数量","b5":"余额","b6":"预计收益","b7":"立即购买","b8":"涨","b9":"平","c0":"跌","c1":"购买成功","c2":"详情","c3":"订单号","c4":"开盘价","c5":"收盘价","c6":"买入时间","c7":"买入数量","c8":"购买类型","c9":"状态","d0":"交割结果","d1":"结算数量","d2":"交割时间","d3":"查看更多","d4":"购买期权","d5":"等待交割","d6":"我的交割","d7":"交割记录","d8":"分钟","d9":"小时","e0":"天","e1":"周","e2":"月","e3":"方向","e4":"涨跌幅"},"purchase":{"a0":"发行价","a1":"申购币种","a2":"预计上线时间","a3":"开始申购时间","a4":"结束申购时间","a5":"申购","a6":"请选择申购币种","a7":"购买数量","a8":"请输入申购数量","a9":"全部","b0":"立即申购","b1":"申购周期","b2":"项目预热","b3":"开始申购","b4":"结束申购","b5":"公布结果","b6":"项目详情","b7":"是否使用","b8":"购买","b9":"申购成功"},"reg":{"a0":"手机注册","a1":"邮箱注册","a2":"手机","a3":"请输入手机号","a4":"邮箱","a5":"请输入邮箱号","a6":"验证码","a7":"请输入验证码","a8":"密码","a9":"请输入密码","b0":"确认密码","b1":"请确认密码","b2":"推荐人","b3":"请输入推荐人","b4":"选填","b5":"您已同意","b6":"用户协议","b7":"并了解我们的","b8":"隐私协议","b9":"注册","c0":"已有账号","c1":"立即登录","c2":"请阅读并同意协议","c3":"请填写手机号","c4":"请填写邮箱号","c5":"注册成功"},"safe":{"a0":"解绑","a1":"绑定","a2":"邮箱","a3":"邮箱号","a4":"请输入邮箱号","a5":"邮箱验证码","a6":"请输入验证码","a7":"验证码","a8":"解绑成功","a9":"绑定成功","b0":"忘记登录密码","b1":"账号","b2":"请输入手机","b3":"新密码","b4":"请输入新密码","b5":"确认密码","b6":"请确认密码","b7":"确认修改","b8":"请输入正确的手机或邮箱号","b9":"谷歌验证器","c0":"操作方法：下载并打开谷歌验证器，扫描下方二维码或手动输入秘钥添加验证令牌","c1":"复制密钥","c2":"我已经妥善保存密钥，丢失后将不可找回","c3":"下一步","c4":"短信验证码","c5":"谷歌验证码","c6":"确认绑定","c7":"安全中心","c8":"修改登录密码","c9":"修改","d0":"设置","d1":"交易密码","d2":"手机","d3":"修改成功","d4":"手机号","d5":"请输入手机号","d6":"请输入短信验证码","d7":"关闭","d8":"开启","d9":"验证","e0":"短信","e1":"关闭成功","e2":"开启成功","e3":"确认","e4":"设置成功"},"transfer":{"a0":"划转记录","a1":"成功","a2":"数量","a3":"方向","a4":"账户资产","a5":"合约账户","a6":"杠杆账户","a7":"理财账户","a8":"划转","a9":"从","b0":"至","b1":"划转币种","b2":"余额","b3":"全部","b4":"划转成功"},"notice":{"a0":"详情","a1":"消息通知","a2":"公告","a3":"消息"},"invite":{"a0":"邀请好友","a1":"合伙人","a2":"尊享交易返佣","a3":"普通用户","a4":"我的身份","a5":"尊享身份","a6":"我的邀请码","a7":"复制邀请二维码","a8":"复制邀请链接","a9":"我的推广","b0":"推广总人数","b1":"人","b2":"总收益折合","b3":"推广记录","b4":"直接邀请","b5":"返佣记录","b6":"等级","b7":"级别设定","b8":"晋升条件","b9":"分红权益","c0":"昵称","c1":"推广人数","c2":"收益折合","c3":"邀请记录","c4":"返佣记录","c5":"等级权益说明","c6":"等级","c7":"权益","c8":"说明","c9":"我的权益"},"help":{"a0":"详情","a1":"学院","a2":"分类"},"login":{"a0":"手机或邮箱号","a1":"请输入手机或邮箱号","a2":"密码","a3":"请输入密码","a4":"登录","a5":"忘记密码","a6":"没有账号","a7":"立即注册","a8":"手机","a9":"邮箱","b0":"完成"},"contract":{"a0":"开仓","a1":"持仓","a2":"委托","a3":"历史","a4":"合约交易","a5":"开通成功","a6":"交易类型","a7":"已成交","a8":"委托总量","a9":"成交均价","b0":"委托价格","b1":"保证金","b2":"手续费","b3":"状态","b4":"操作","b5":"撤单","b6":"已撤销","b7":"未成交","b8":"部分成交","b9":"全部成交","c0":"买入开多","c1":"买入平空","c2":"卖出开空","c3":"卖出平多","c4":"温馨提示","c5":"是否撤销当前订单","c6":"撤销成功","c7":"盈亏","c8":"分享","c9":"委托详情","d0":"暂无数据","d1":"价格","d2":"数量","d3":"成交时间","d4":"用户权益","d5":"未实现盈亏","d6":"风险率","d7":"市价","d8":"张","d9":"占用保证金","e0":"看涨","e1":"可开多","e2":"看跌","e3":"可开空","e4":"可用","e5":"划转","e6":"资金费率","e7":"距离结算","e8":"多","e9":"空","f0":"资金划转","f1":"计算器","f2":"关于合约","f3":"风险保障基金","f4":"资金费用历史","f5":"普通委托","f6":"市价委托","f7":"是否以","f8":"的价格","f9":"倍杠杆开仓","g0":"开多","g1":"开空","g2":"委托成功","g3":"仅显示当前合约","g4":"可平量","g5":"委托冻结","g6":"开仓平均价","g7":"结算基准价","g8":"预估强平价","g9":"已结算收益","h0":"收益率","h1":"止盈","h2":"止损","h3":"平仓","h4":"市价全平","h5":"止盈止损","h6":"平","h7":"请输入平仓价格","h8":"限价","h9":"请输入平仓数量","i0":"可平","i1":"开仓均价","i2":"最新成交价","i3":"请输入价格","i4":"止盈触发价","i5":"市价至","i6":"时将触发止盈委托，成交后预计盈亏","i7":"止损触发价","i8":"时将触发止损委托，成交后预计盈亏","i9":"确定","j0":"平仓成功","j1":"是否市价全平","j2":"全平","j3":"成功","j4":"设置成功","j5":"神机妙算，无可匹敌","j6":"做","j7":"平仓价格","j8":"数字资产交易平台","j9":"赚钱和理想的融合，真是最美妙的事情","k0":"开仓价格","k1":"最新价格","k2":"扫码了解更多","k3":"结算盈亏","k4":"截图成功，已保存到本地","k5":"截图失败","k6":"长按截图","k7":"一键全平","k8":"一键反向","k9":"是否一键全平","l0":"全平成功","l1":"是否一键反向","l2":"反向成功"}}'
			)
	},
	e703: function(e, a, t) {},
	e9de: function(e, a, t) {
		"use strict";
		t.r(a);
		var n = function() {
				var e = this,
					a = e.$createElement,
					t = e._self._c || a;
				return t(e.tag, {
					tag: "component",
					on: {
						click: e.selectCountry
					}
				}, [e._v("+" + e._s(e.active.country_code))])
			},
			i = [],
			r = (t("99af"), t("7db0"), t("d81d"), t("b0c0"), t("a9e3"), t("5530")),
			o = t("2f62"),
			c = {
				props: {
					tag: {
						default: "span",
						type: String,
						required: !1
					},
					value: {
						default: 1,
						type: [Number, String],
						required: !1
					}
				},
				computed: Object(r["a"])(Object(r["a"])({}, Object(o["c"])({
					countryList: "countryList"
				})), {}, {
					active: function() {
						var e = this;
						return this.countryList.find((function(a) {
							return a.id == e.value
						})) || {}
					},
					country_code: function() {
						return this.active.country_code
					}
				}),
				methods: Object(r["a"])(Object(r["a"])({}, Object(o["b"])({
					setCountryList: "countryList"
				})), {}, {
					getCountry: function() {
						var e = this;
						this.$get("/getCountryList").then((function(a) {
							e.setCountryList(a.data), e.setDefault()
						}))
					},
					selectCountry: function() {
						var e = this,
							a = this.countryList.map((function(e) {
								return {
									label: "+".concat(e.country_code, " ").concat(e.name),
									value: e.id
								}
							}));
						this.$picker(a, {
							value: this.value
						}).then((function(a) {
							e.$emit("input", a)
						})).catch()
					},
					setDefault: function() {
						this.value || this.$emit("input", this.countryList[0].id)
					}
				}),
				created: function() {
					this.countryList.length ? this.setDefault() : this.getCountry()
				}
			},
			l = c,
			s = t("2877"),
			u = Object(s["a"])(l, n, i, !1, null, null, null);
		a["default"] = u.exports
	},
	f5c8: function(e, a) {
		window.onresize = function() {
			var e = document,
				a = e.activeElement;
			"INPUT" !== a.tagName && "TEXTAREA" !== a.tagName || setTimeout((function() {
				a.scrollIntoView({
					behavior: "smooth",
					block: "end"
				})
			}), 1e3 / 60)
		}
	},
	f6a7: function(e, a, t) {},
	f8a4: function(e) {
		e.exports = JSON.parse(
			'{"common":{"D":"日","M":"月","Y":"年","add":"添加","address":"地址","all":"所有","amout":"數量","cancel":"取消","check":"審核","code":"驗證碼","confirm":"確定","date":"日期","detail":"詳情","email":"郵箱","enter":"請輸入","error":"失敗","getCode":"獲取驗證碼","h":"時","loadMore":"加載更多","m":"分","money":"金額","more":"更多","notData":"暫無數據","notMore":"沒有更多了","phone":"手機","requestError":"網絡繁忙，請稍後再試","s":"秒","save":"保存","select":"請選擇","sendSuccess":"發送成功","sms":"短信","submit":"提交","success":"成功","tips":"溫馨提示","total":"總額","type":"類型","copy":"複製","light":"白","dark":"黑"},"base":{"a0":"標題","a1":"返回","a2":"更多","a3":"行情","a4":"期權","a5":"打新專區","a6":"會員","a7":"學院","a8":"交易對","a9":"最新價","b0":"漲跌幅","b1":"點擊登錄","b2":"歡迎來到","b3":"請登錄","b4":"升級","b5":"充幣","b6":"提幣","b7":"推廣","b8":"抵扣手續費","b9":"可用","c0":"購買","c1":"我的委託","c2":"身份認證","c3":"安全中心","c4":"消息通知","c5":"提幣地址","c6":"設置","c7":"自選","c8":"添加成功","c9":"取消成功","d0":"首頁","d1":"交易","d2":"資產","d3":"請輸入搜索關鍵詞","d4":"全部","d5":"主板","d6":"總資產折合","d7":"資金賬戶","d8":"劃轉","d9":"搜索幣種","e0":"隱藏","e1":"餘額資產","e2":"凍結","e3":"折合","e4":"合約賬戶","e5":"合約折合","e6":"礦工等級","e7":"礦工"},"accountSettings":{"a0":"賬號設置","a1":"頭像","a2":"暱稱","a3":"主賬號","a4":"手機號","a5":"解綁","a6":"綁定","a7":"郵箱綁定","a8":"切換賬戶","a9":"退出登錄","b0":"修改暱稱","b1":"請輸入暱稱","b2":"語言"},"assets":{"a0":"提幣地址管理","a1":"地址簿可以用來管理您的常用地址，往地址簿中存在的地址發起提幣時，無需進行多重校驗","a2":"已支持自動提幣，使用{name}提幣時，只允許網地址簿中存在的地址發起提幣","a3":"刪除地址","a4":"添加地址","a5":"請選擇要刪除的地址","a6":"是否刪除當前選中地址","a7":"流水","a8":"總額","a9":"可用","b0":"凍結","b1":"資金賬戶","b2":"合約賬戶","b3":"槓桿賬戶","b4":"理財賬戶","b5":"請輸入搜索關鍵詞","b6":"提幣","b7":"請選擇鏈類型","b8":"提幣地址","b9":"請輸入地址","c0":"數量","c1":"餘額","c2":"請輸入數量","c3":"全部","c4":"手續費","c5":"請仔細檢查並輸入正確的提幣錢包地址","c6":"發送不對應的數字貨幣到錢包地址會造成永久性的損失","c7":"提幣手續費將從提幣數量中扣除","c8":"提幣記錄","c9":"時間","d0":"狀態","d1":"審核中","d2":"成功","d3":"失敗","d4":"查看更多","d5":"提交成功，正在審核","d6":"編輯","d7":"添加","d8":"地址","d9":"請輸入或粘貼地址","e0":"備註","e1":"請輸入備註","e2":"請填寫地址","e3":"請填寫備註","e4":"操作成功","e5":"充幣","e6":"掃描上方二維碼獲取充幣地址","e7":"充幣地址","e8":"充幣數量","e9":"請輸入充幣數量","f0":"此地址是您最新的充值地址，當系統收到充值時，將進行自動入賬","f1":"轉賬需要由整個區塊鍊網絡進行確認，到達{num}個網絡確認時，您的{name}將被自動存入賬戶中","f2":"個網絡確認時，您的","f3":"請只發送{name}到此地址，發送其他數字貨幣到此地址會造成永久性的損失","f4":"充幣記錄"},"auth":{"a0":"身份認證","a1":"實名認證","a2":"未認證","a3":"已認證","a4":"高級認證","a5":"審核中","a6":"認證失敗","a7":"國籍","a8":"請選擇國籍","a9":"真實姓名","b0":"請輸入真實姓名","b1":"證件號碼","b2":"請輸入證件號碼","b3":"確認","b4":"認證成功","b5":"請上傳證件正面照片","b6":"請上傳證件背面","b7":"請上傳手持證件照","b8":"確保照片清晰無水印，且上半身完整","b9":"文件尺寸過大，不得超過","c0":"文件類型錯誤","c1":"上傳成功","c2":"請上傳證件背面照","c3":"請上傳證件正面照","c4":"上傳成功，請等待審核"},"exchange":{"a0":"幣幣","a1":"申購","a2":"合約","a3":"交易","a4":"當前委託","a5":"歷史委託","a6":"添加成功","a7":"取消成功","a8":"發行總量","a9":"流通總量","b0":"發行價格","b1":"發行時間","b2":"白皮書地址","b3":"官網地址","b4":"簡介","b5":"買","b6":"賣","b7":"委託價","b8":"類型","b9":"限價交易","c0":"市價交易","c1":"已成交","c2":"總計","c3":"買入","c4":"賣出","c5":"數量","c6":"在最佳市場價格成交","c7":"總價","c8":"可用數量","c9":"總值","d0":"登錄","d1":"分時圖","d2":"價格","d3":"最新成交","d4":"時間","d5":"方向","d6":"限價","d7":"市價","d8":"請輸入價格","d9":"請輸入數量","e0":"請輸入總價","e1":"下單成功","e2":"平均價格","e3":"最高","e4":"最低","e5":"量","e6":"買賣盤","e7":"幣種信息","e8":"分鐘","e9":"小時","f0":"天","f1":"週","f2":"月","f3":"買價","f4":"賣價","f5":"幣幣交易","f6":"請輸入搜索關鍵詞","f7":"交易對","f8":"最新價","f9":"漲跌幅","g0":"自選","g1":"我的委託","g2":"撤銷委託","g3":"操作","g4":"撤銷","g5":"是否撤銷當前委託","g6":"撤銷成功"},"option":{"a0":"期權","a1":"距離交割","a2":"看多","a3":"看空","a4":"收益率","a5":"購買","a6":"多","a7":"空","a8":"當前","a9":"下期","b0":"看平","b1":"漲幅選擇","b2":"收益率","b3":"購買數量","b4":"請輸入數量","b5":"餘額","b6":"預計收益","b7":"立即購買","b8":"漲","b9":"平","c0":"跌","c1":"購買成功","c2":"詳情","c3":"訂單號","c4":"開盤價","c5":"收盤價","c6":"買入時間","c7":"買入數量","c8":"購買類型","c9":"狀態","d0":"交割結果","d1":"結算數量","d2":"交割時間","d3":"查看更多","d4":"購買期權","d5":"等待交割","d6":"我的交割","d7":"交割記錄","d8":"分鐘","d9":"小時","e0":"天","e1":"週","e2":"月","e3":"方向","e4":"漲跌幅"},"purchase":{"a0":"發行價","a1":"申購幣種","a2":"預計上線時間","a3":"開始申購時間","a4":"結束申購時間","a5":"申購","a6":"請選擇申購幣種","a7":"購買數量","a8":"請輸入申購數量","a9":"全部","b0":"立即申購","b1":"申購週期","b2":"項目預熱","b3":"開始申購","b4":"結束申購","b5":"公佈結果","b6":"項目詳情","b7":"是否使用","b8":"購買","b9":"申購成功"},"reg":{"a0":"手機註冊","a1":"郵箱註冊","a2":"手機","a3":"請輸入手機號","a4":"郵箱","a5":"請輸入郵箱號","a6":"驗證碼","a7":"請輸入驗證碼","a8":"密碼","a9":"請輸入密碼","b0":"確認密碼","b1":"請確認密碼","b2":"推薦人","b3":"請輸入推薦人","b4":"選填","b5":"您已同意","b6":"用戶協議","b7":"並了解我們的","b8":"隱私協議","b9":"註冊","c0":"已有賬號","c1":"立即登錄","c2":"請閱讀並同意協議","c3":"請填寫手機號","c4":"請填寫郵箱號","c5":"註冊成功"},"safe":{"a0":"解綁","a1":"綁定","a2":"郵箱","a3":"郵箱號","a4":"請輸入郵箱號","a5":"郵箱驗證碼","a6":"請輸入驗證碼","a7":"驗證碼","a8":"解綁成功","a9":"綁定成功","b0":"忘記登錄密碼","b1":"賬號","b2":"請輸入手機","b3":"新密碼","b4":"請輸入新密碼","b5":"確認密碼","b6":"請確認密碼","b7":"確認修改","b8":"請輸入正確的手機或郵箱號","b9":"谷歌驗證器","c0":"操作方法：下載並打開谷歌驗證器，掃描下方二維碼或手動輸入秘鑰添加驗證令牌","c1":"複製密鑰","c2":"我已經妥善保存密鑰，丟失後將不可找回","c3":"下一步","c4":"短信驗證碼","c5":"谷歌驗證碼","c6":"確認綁定","c7":"安全中心","c8":"修改登錄密碼","c9":"修改","d0":"設置","d1":"交易密碼","d2":"手機","d3":"修改成功","d4":"手機號","d5":"請輸入手機號","d6":"請輸入短信驗證碼","d7":"關閉","d8":"開啟","d9":"驗證","e0":"短信","e1":"關閉成功","e2":"開啟成功","e3":"確認","e4":"設置成功"},"transfer":{"a0":"劃轉記錄","a1":"成功","a2":"數量","a3":"方向","a4":"資金賬戶","a5":"合約賬戶","a6":"槓桿賬戶","a7":"理財賬戶","a8":"劃轉","a9":"從","b0":"至","b1":"劃轉幣種","b2":"餘額","b3":"全部","b4":"劃轉成功"},"notice":{"a0":"詳情","a1":"消息通知","a2":"公告","a3":"消息"},"invite":{"a0":"邀請好友","a1":"合夥人","a2":"尊享交易返佣","a3":"普通用戶","a4":"我的身份","a5":"尊享身份","a6":"我的邀請碼","a7":"複製邀請二維碼","a8":"複製邀請鏈接","a9":"我的推廣","b0":"推廣總人數","b1":"人","b2":"總收益折合","b3":"推廣記錄","b4":"直接邀請","b5":"返佣記錄","b6":"等級","b7":"級別設定","b8":"晉升條件","b9":"分紅權益","c0":"暱稱","c1":"推廣人數","c2":"收益折合","c3":"邀請記錄","c4":"返佣記錄","c5":"等級權益說明","c6":"等級","c7":"權益","c8":"說明","c9":"我的權益"},"help":{"a0":"詳情","a1":"學院","a2":"分類"},"login":{"a0":"手機或郵箱號","a1":"請輸入手機或郵箱號","a2":"密碼","a3":"請輸入密碼","a4":"登錄","a5":"忘記密碼","a6":"沒有賬號","a7":"立即註冊","a8":"手機","a9":"郵箱","b0":"完成"},"contract":{"a0":"開倉","a1":"持倉","a2":"委託","a3":"歷史","a4":"合約交易","a5":"開通成功","a6":"交易類型","a7":"已成交","a8":"委託總量","a9":"成交均價","b0":"委託價格","b1":"保證金","b2":"手續費","b3":"狀態","b4":"操作","b5":"撤單","b6":"已撤銷","b7":"未成交","b8":"部分成交","b9":"全部成交","c0":"買入開多","c1":"買入平空","c2":"賣出開空","c3":"賣出平多","c4":"溫馨提示","c5":"是否撤銷當前訂單","c6":"撤銷成功","c7":"盈虧","c8":"分享","c9":"委託詳情","d0":"暫無數據","d1":"價格","d2":"數量","d3":"成交時間","d4":"用戶權益","d5":"未實現盈虧","d6":"風險率","d7":"市價","d8":"張","d9":"佔用保證金","e0":"看漲","e1":"可開多","e2":"看跌","e3":"可開空","e4":"可用","e5":"劃轉","e6":"資金費率","e7":"距離結算","e8":"多","e9":"空","f0":"資金劃轉","f1":"計算器","f2":"關於合約","f3":"風險保障基金","f4":"資金費用歷史","f5":"普通委託","f6":"市價委託","f7":"是否以","f8":"的價格","f9":"倍槓桿開倉","g0":"開多","g1":"開空","g2":"委託成功","g3":"僅顯示當前合約","g4":"可平量","g5":"委託凍結","g6":"開倉平均價","g7":"結算基準價","g8":"預估強平價","g9":"已結算收益","h0":"收益率","h1":"止盈","h2":"止損","h3":"平倉","h4":"市價全平","h5":"止盈止損","h6":"平","h7":"請輸入平倉價格","h8":"限價","h9":"請輸入平倉數量","i0":"可平","i1":"開倉均價","i2":"最新成交價","i3":"請輸入價格","i4":"止盈觸發價","i5":"市價至","i6":"時將觸發止盈委託，成交後預計盈虧","i7":"止損觸發價","i8":"時將觸發止損委託，成交後預計盈虧","i9":"確定","j0":"平倉成功","j1":"是否市價全平","j2":"全平","j3":"成功","j4":"設置成功","j5":"神機妙算，無可匹敵","j6":"做","j7":"平倉價格","j8":"數字資產交易平台","j9":"賺錢和理想的融合，真是最美妙的事情","k0":"開倉價格","k1":"最新價格","k2":"掃碼了解更多","k3":"結算盈虧","k4":"截圖成功，已保存到本地","k5":"截圖失敗","k6":"長按截圖","k7":"一鍵全平","k8":"一鍵反向","k9":"是否一鍵全平","l0":"全平成功","l1":"是否一鍵反向","l2":"反向成功"}}'
			)
	},
	ffc6: function(e, a, t) {
		"use strict";
		t.r(a);
		var n = function() {
				var e = this,
					a = e.$createElement,
					t = e._self._c || a;
				return t("van-nav-bar", {
					attrs: {
						title: e.title,
						"left-arrow": e.leftArrow
					},
					on: {
						"click-left": e.onClickLeft
					},
					scopedSlots: e._u([{
						key: "left",
						fn: function() {
							return [e._t("left")]
						},
						proxy: !0
					}, {
						key: "title",
						fn: function() {
							return [e._t("title")]
						},
						proxy: !0
					}, {
						key: "right",
						fn: function() {
							return [e._t("right")]
						},
						proxy: !0
					}], null, !0)
				})
			},
			i = [],
			r = {
				name: "vHeader",
				props: {
					title: {
						default: "",
						type: String,
						required: !1
					},
					leftArrow: {
						default: !0,
						type: Boolean,
						required: !1
					},
					leftClick: {
						default: void 0,
						type: Function,
						required: !1
					}
				},
				methods: {
					onClickLeft: function() {
						this.leftClick ? this.leftClick() : this.$back()
					}
				}
			},
			o = r,
			c = t("2877"),
			l = Object(c["a"])(o, n, i, !1, null, null, null);
		a["default"] = l.exports
	}
});
