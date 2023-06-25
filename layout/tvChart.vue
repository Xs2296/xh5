<template>
  <view
    :prop="config"
    :change:prop="tvchart.changeConfig"
    id="tradingview_10798345"
  ></view>
</template>
<script>
import { mapState } from "vuex";
import Option from "@/api/option";

export default {
  props: {
    //   商品
    serveSymbolName: {
      required: true,
      type: String,
    },
    // 精度
    serveInterval: {
      required: true,
      type: [String, Number],
    },
    // 精度组
    serveResolutions: {
      default: () => ["5", "15", "30", "60", "1D", "1W", "1M"],
      required: false,
      type: Array,
    },
    contract: {
      default: false,
      type: Boolean,
      required: false,
    },
  },
  watch: {
    serveInterval(n) {
      this.config = {
        type: "changeInterval",
        interval: n,
        _v: Math.random(),
      };
    },
    serveSymbolName(n) {
      this.config = {
        type: "changeSymbol",
        symbolName: n,
        _v: Math.random(),
      };
    },
  },
  data() {
    return {
      config: {},
      socketMsg: "",
    };
  },
  computed: {
    ...mapState({
      tlang: "lang",
      tTheme: "theme",
      webSocket: "ws",
      webSocket1: "ws1",
    }),
    ws() {
      return this.contract ? this.webSocket1 : this.webSocket;
    },
  },
  methods: {
    initConfig() {
      return {
        type: "initChart",
        symbolName: this.serveSymbolName,
        interval: this.serveInterval,
        resolutions: this.serveResolutions,
        theme: this.tTheme,
        lang: this.tlang,
        contract: this.contract,
      };
    },
    // 接受图表的通知
    onchartEmit(obj) {
      switch (obj.type) {
        case "changeSymbol":
          this.getData(obj.data, obj.funName);
          break;
        case "changeInterval":
          this.$emit("changeInterval", obj.resolution);
          break;
        case "sub":
          this.toSub(obj.data);
          break;
        case "unsub":
          this.toUnSub(obj.data);
          break;
        default:
          break;
      }
    },
    // 订阅
    toSub(data) {
      this.socketMsg = data.msg;
      this.ws.send(data);
    },
    // 取消订阅
    toUnSub(data) {
      this.ws.send(data);
    },
    getData(data, name) {
      Option.getKline(data).then((res) => {
        this.config = {};
        setTimeout(() => {
          this.config = {
            type: "changeList",
            funName: name,
            data: res,
            _v: Math.random(),
          };
        }, 60);
      });
    },
    socketGetData() {
      this.ws.on("message", (res) => {
        this.config = {
          type: "addPoint",
          data: res,
        };
      });
    },
  },
  created() {
	this.config = this.initConfig();
	this.socketGetData();
	
  },
  destroyed() {
    this.toUnSub(this.socketMsg);
  },
};
</script>
<script module="tvchart" lang="renderjs">
	import Datafeed from "@/plugins/datafeed.js";
	import tvStyle from "@/plugins/tvStyle.js";
	import { $get } from "@/api/serve/webaxios.js";

	let exchangeAjax = {
		getKline:'/option/getKline',
		getSymbol(name) {
			return name.split("/").join("").toLowerCase();
		},
		msg:'Kline_'
	};
	let contractAjax = {
		getKline:'/contract/getKline',
		getSymbol(name) {
			return name.split("/")[0];
		},
		msg:'swapKline_'
	};

	export default {
		data() {
			return {
				datafeed: undefined,
				page: 1,
				onRealtimeCallback: undefined,
				TView: undefined,
				interval: 5,
				symbolName: '',
				theme: 'light',
				lang: 'en',
				resolutions: ["5", "15", "30", "60", "1D", "1W", "1M"],
				isLoad:false,
				funMap:{},
				webContract:false
			};
		},
		computed: {
			symbol() {
				return this.symbolName;
			},
			msg() {
				return `${this.ajaxTv.msg}${this.ajaxTv.getSymbol(this.symbol)}_${this.resolution(this.interval)}`;
			},
			// 图表语言映射
			chartLang() {
				switch (this.lang) {
					case "cn":
						return 'zh';
					case "tw":
						return 'zh_TW';
					case "tr":
						return 'tr';
					case "en":
						return 'en';
					default:
						return 'en';
				}
			},
			ajaxTv() {
				return this.webContract ? contractAjax : exchangeAjax;
			},
		},
		watch: {
			symbol(n) {
				if (this.TView) this.TView.setSymbol(n, this.interval);
			},
			msg(n, o) {
				this.page = 1;
				if (o) {
					this.unSub(o);
				}
			},
			interval(n) {
				if (this.TView) this.TView.activeChart().setResolution(n);
			},
		},
		methods: {
			getMap(data) {
				return {
					time: data.id * 1000,
					close: data.close*1,
					open: data.open*1,
					high: data.high*1,
					low: data.low*1,
					volume: data.vol*1,
				};
			},
			// 获取传给后台的精度
			resolution(resolution) {
				let T = "";
				if (isNaN(resolution * 1)) {
					T = resolution
						.replace("D", "day")
						.replace("W", "week")
						.replace("M", "mon");
				} else {
					if (resolution > 60) {
						T = Math.floor(resolution / 60) + "hours";
					} else {
						T = resolution + "min";
					}
				}
				return T;
			},
			// 获取数据
			getBars(
				symbolInfo,
				resolution,
				rangeStartDate,
				rangeEndDate,
				onLoadedCallback
			) {
				
				let page = this.page > 3 ? 3 : this.page;
				let data = {
					symbol: this.ajaxTv.getSymbol(symbolInfo.name),
					period: this.resolution(resolution),
					form: rangeStartDate,
					to: rangeEndDate,
					size: page * 200,
				};
				this.page++;
				// this.$emit("changeInterval", resolution);
				
				// 不存在商品
				if (!this.symbol) {
					onLoadedCallback([]);
					return;
				}
			
				this.isLoad = true
				// 获取商品
				$get(this.ajaxTv.getKline,data).then(res=>{
					this.isLoad = false
					this.$ownerInstance.callMethod('onchartEmit', {
						type: 'changeInterval',
						resolution
					})
					let arr = res.data.data.map((item) => {
						return this.getMap(item);
					});
					onLoadedCallback(arr);
					this.sub();
					setTimeout(() => {
						onLoadedCallback([]);
					}, 60);
				})
			},
			// 订阅消息
			sub() {
				this.$ownerInstance.callMethod('onchartEmit', {
					type: 'sub',
					data:{
						cmd: "sub",
						msg: this.msg
					}
				})
			},
			// 取消订阅
			unSub(name) {
				this.$ownerInstance.callMethod('onchartEmit', {
					type: 'unsub',
					data:{
						cmd: "unsub",
						msg: name,
					}
				})
			},
			// tradingview触发单条数据订阅
			subscribeBars(
				symbolInfo,
				resolution,
				onRealtimeCallback,
				subscriberUID,
				onResetCacheNeededCallback
			) {
				this.onRealtimeCallback = onRealtimeCallback;
				if (!this.symbol) {
					setTimeout(() => {
						onResetCacheNeededCallback();
					}, 100);
				}
			},
			initDataFeed() {
				this.datafeed = new Datafeed(this);
			
			},

			initTradingView() {
				let TradingView = window.TradingView;
				this.TView = new TradingView.widget({
					fullscreen: false,
					autosize: true,
					interval: this.interval,
					timezone: "Asia/Shanghai",
					theme: "Dark", // 自定义主题
					// style: "1",
					library_path: "./static/chart_main/",
					datafeed: this.datafeed,
					// datafeed: {},
					locale: this.chartLang,
					toolbar_bg: this.theme == "light" ? "#fff" : "#2b2b37",
					enable_publishing: false,
					withdateranges: false,
					hide_side_toolbar: false,
					allow_symbol_change: true,
					show_popup_button: true,
					hideideas: true,
					studies_overrides: {},
					container_id: "tradingview_10798345",
					disabled_features: [
						"header_symbol_search",
						"header_compare",
						"control_bar",
						"main_series_scale_menu",
						"volume_force_overlay",
						"header_resolutions",
						"legend_context_menu",
						"symbol_search_hot_key",
						"symbol_info",
						// "edit_buttons_in_legend",
						"pane_context_menu",
					],
					overrides: tvStyle[this.theme],
					custom_css_url: this.theme == "light" ? "light-chart.css" : "chart.css",
				});
				this.TView.onChartReady(() => {
					this.TView.chart().createStudy("MACD", false, false);
				});
			},
			// 初始化
			initPage() {
				this.initDataFeed();
				this.initTradingView();
				// this.socketGetData();
			},
			changeConfig(n, o) {
				this.onserveEmit(n)
			},
			//  接受应用通知
			onserveEmit(obj) {
				switch (obj.type) {
						// 变更商品
					case 'changeSymbol':
						this.symbolName = obj.symbolName
						break;
						// 变更精度
					case 'changeInterval':
						if(this.isLoad) return;
						this.interval = obj.interval;
						break;
						// 变更精度组
					case 'resetResolutions':
						this.resolutions = obj.resolutions
						break;
						// 初始化图表
					case 'initChart':
						this.symbolName = obj.symbolName
						this.interval = obj.interval
						this.resolutions = obj.resolutions
						this.theme = obj.theme
						this.lang = obj.lang
						this.webContract = obj.contract;
						if(localStorage.tvTheme!=this.theme){
							localStorage.removeItem('tradingview.chartproperties')
						}
						localStorage.setItem('tvTheme',this.theme)
						break;
						// 追加节点
					case 'addPoint':
						let { data, sub } = obj.data;
						if (sub == this.msg&&this.onRealtimeCallback) {
							this.onRealtimeCallback(this.getMap(data));
						}
						break;
						// 销毁
					case 'destroyed':
						// this.unSub(this.msg);
						break;
					default:
						break;
				}
			}
		},
		mounted() {
			this.onserveEmit(this.config)
			if (typeof echarts === 'function') {
				this.initPage()
			} else {
				const script = document.createElement('script')
				script.src = './static/chart_main/charting_library.min.js'
				script.onload = this.initPage.bind(this)
				document.head.appendChild(script)
			}

		},
		destroyed() {
			console.log('unSub')
			this.unSub(this.msg);
		},
	};
</script>
