localStorage.removeItem("tradingview.chartproperties");
$(function () {
    let light = {
        "paneProperties.background": "#ffffff",
        "paneProperties.vertGridProperties.color": "#dcdee0",
        "paneProperties.horzGridProperties.color": "#dcdee0",
        "scalesProperties.backgroundColor": "#ffffff",
        "scalesProperties.lineColor": "#dcdee0",
        "scalesProperties.textColor": "#333",
        "scalesProperties.fontSize": 9,
        "mainSeriesProperties.style": 1,
        "paneProperties.legendProperties.showSeriesOHLC": false
    }

    let dark = {
        "paneProperties.background": "#2b2b37",
        "paneProperties.vertGridProperties.color": "#49495F",
        "paneProperties.horzGridProperties.color": "#49495F",
        "scalesProperties.backgroundColor": "#2b2b37",
        "scalesProperties.textColor": "#fff",
        "scalesProperties.lineColor": "#49495F",
        "scalesProperties.fontSize": 9,
        "mainSeriesProperties.style": 1,
        "paneProperties.legendProperties.showSeriesOHLC": false
    }
    let tvStyle = {
        light,
        dark
    }
    class Datafeed {
        constructor(vm) {
            this.self = vm;
        }
        onReady(callback) {
            setTimeout(()=>{
                callback({
                    supports_search: false,
                    supports_group_request: false,
                    supported_resolutions: this.self.resolutions,
                    supports_marks: true,
                    supports_timescale_marks: true,
                    supports_time: true
                })
            },30)
        }
        resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
            setTimeout(()=>{
                let data = this.defaultSymbol()
                if (this.self.resolveSymbol) {
                    this.self.resolveSymbol((res) => {
                        onSymbolResolvedCallback(Object.assign(data, res))
                    })
                } else {
                    onSymbolResolvedCallback(data)
                }
            },60)
        }
        getBars() {
            this.self.getBars(...arguments)
        }

        subscribeBars() {
            this.self.subscribeBars(...arguments)
        }
        unsubscribeBars() {

        }
        defaultSymbol() {
            return {
                'timezone': 'America/New_York',
                'minmov': 1,
                'minmov2': 0,
                'fractional': false,
                //设置周期
                'session': '24x7',
                'has_intraday': true,
                'has_no_volume': true,  //隐藏 volume
                //设置是否支持周月线
                "has_daily": true,
                //设置是否支持周月线
                "has_weekly_and_monthly": true,
                //设置精度  100表示保留两位小数   1000三位   10000四位
                'pricescale': 10000

            };
        }
    }


    class Page {
        constructor() {
            this.datafeed = undefined;
            this.page = 1;
            this.onRealtimeCallback = undefined;
            this.TView = undefined;
            this.interval = this.getQuery('interval');
            this.symbolName = this.getQuery('symbol');
            this.theme = this.getQuery('theme') || 'dark';
            this.lang = this.getQuery('lang') || 'en';
            this.resolutions = this.getQuery('resolutions') || ["5", "15", "30", "60", "1D", "1W", "1M"];
            this.isLoad = false;
            this.url = this.getQuery('getLinkUrl');
            this.TVID = "tradingview_10798345";
            this.Ws = undefined;
            this.msg = '';
            this.contract = this.getQuery('contract');
            this.init();
            this.studies = []; //配置项
        }
        // 获取路劲上的参数
        getQuery(name) {
            let str = window.location.search.replace('?','')
            let data = Qs.parse(str)||{}
            return data[name]
        }
        // 初始化
        init() {
            this.linkSocket()
            // 数据模型
            this.datafeed = new Datafeed(this)
            // 初始化图表
            this.TView = new TradingView.widget({
                fullscreen: false,
                autosize: true,
                interval: this.interval,
                timezone: "America/New_York",
                theme: "Dark", // 自定义主题
                // style: "1",
                library_path: "./chart_main/",
                datafeed: this.datafeed,
                // datafeed: {},
                locale: this.chartLang(),
                toolbar_bg: this.theme == "light" ? "#fff" : "#2b2b37",
                enable_publishing: true,
                withdateranges: true,
                hide_side_toolbar: true,
                allow_symbol_change: true,
                show_popup_button: true,
                hideideas: true,
                edit_buttons: false,
                studies_overrides: {},
                container_id: "tradingview_10798345",
                disabled_features: [
                    "header_symbol_search",
                    "header_compare",
                    "control_bar",
                    "main_series_scale_menu",
					'adaptive_logo',
                    // "volume_force_overlay",  //隐藏 volume
                    "header_resolutions",
                    "legend_context_menu",
                    "symbol_search_hot_key",
                    "symbol_info",
                    "pane_context_menu",
                ],
                overrides: tvStyle[this.theme],
                custom_css_url: this.theme == "light" ? "light-chart.css" : "chart.css",
            });
            this.TView.onChartReady(() => {
                // this.TView.chart().createStudy("MACD", false, false); //隐藏 MACD
                this.createStudy()
            });
        }
        createStudy() {
            let thats = this.TView;
            let id = thats.chart().createStudy('Moving Average', false, false, [5], null, {
              'Plot.color': 'rgb(150, 95, 196)'
            });
            this.studies.push(id);
            id = thats.chart().createStudy('Moving Average', false, false, [10], null, {
              'Plot.color': 'rgb(116,149,187)'
            });
            this.studies.push(id);
            id = thats.chart().createStudy('Moving Average', false, false, [20], null, {
              "plot.color": "rgb(118,32,99)"
            });
            this.studies.push(id);
          }
        // 连接socket
        linkSocket() {
            // 连接socket
            this.Ws = new Ws(this.getQuery('ws'))
            this.Ws.on('message', (evt) => {
                if (evt.cmd == 'ping') {
                    this.Ws.send({ cmd: 'pong' })
                }
                if (evt.type == 'ping') {
                    this.Ws.send({ cmd: 'pong' })
                }
                //  追加数据
                // console.log(evt,evt.sub ,this.msg)
                if (evt.sub == this.msg) {
                    this.onRealtimeCallback(this.getMap(evt.data))
                }
            })
        }
        // 图表语言映射
        chartLang() {
            switch (this.lang) {
                case "cn":
                    return 'zh';
                case "tw":
                    return 'zh_TW';
                case "tr":
                    return 'tr';
                case "jp":
                    return 'ja';
                case "kor":
                    return 'ko';
                case "de":
                    return 'de_DE';
                case "fra":
                    return 'fr';
                case "it":
                    return 'it';
                case "pt":
                    return 'pt';
                case "spa":
                    return 'es';
                default:
                    return 'en';
            }
        }
        getMap(data) {
            return {
                time: data.id * 1000,
                close: data.close * 1,
                open: data.open * 1,
                high: data.high * 1,
                low: data.low * 1,
                // volume: data.vol * 1, //隐藏 volume
            };
        }
        resolveSymbol(call) {
            // 名称
            call({
                'name': this.symbolName.toLocaleUpperCase(),
                'description': this.symbolName.toLocaleUpperCase(),
                'ticker': this.symbolName.toLocaleUpperCase(),
                'supported_resolutions': this.resolutions
            })
        }
        // 获取数据
        getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback) {
            let page = this.page > 3 ? 3 : this.page;
            let data = {
                symbol: symbolInfo.name,
                period: this.resolution(resolution),
                form: rangeStartDate,
                to: rangeEndDate,
                size: page * 200,
                zip: 1
            }
			console.log('getBars',rangeStartDate,rangeEndDate)
            this.page++
            this.isLoad = true
            this.unSub();
            $.get(this.url, data).then(res => {
                let arr = this.unzip(res.data.data).map((item) => {
                    return this.getMap(item);
                });
                onDataCallback(arr);
                this.msg = this.createMsg()
                this.sub()

            }).catch(err => {
                onDataCallback([]);
            })
        }
        // 解压
        unzip(b64Data) {
            let u8 = atob(b64Data)
            let jiya = pako.inflate(u8)
            let str = this.Uint8ArrayToString(jiya)
            return JSON.parse(str);
        }
        Uint8ArrayToString(fileData){
            var dataString = "";
            for (var i = 0; i < fileData.length; i++) {
              dataString += String.fromCharCode(fileData[i]);
            }
           
            return dataString
          
          }
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
        }
        // 获取推送回调
        subscribeBars(symbolInfo,
            resolution,
            onRealtimeCallback,
            subscriberUID,
            onResetCacheNeededCallback) {
            this.onRealtimeCallback = onRealtimeCallback;
            if (!this.symbolName) {
                setTimeout(() => {
                    onResetCacheNeededCallback();
                }, 100);
            }
        }
        getSymbol(name) {
            return name.split("/").join("").toLowerCase();
        }
        // 生成订阅数据
        createMsg() {
            if (this.contract) {
                return `swapKline_${this.symbolName}_${this.resolution(this.interval)}`
            } else {

                return `Kline_${this.getSymbol(this.symbolName)}_${this.resolution(this.interval)}`
            }
        }
        // 订阅消息
        sub() {
            this.Ws.send({
                cmd: "sub",
                msg: this.msg
            })
        }
        // 取消订阅
        unSub() {
            if (!this.msg) return;
            this.Ws.send({
                cmd: "unsub",
                msg: this.msg
            })
        }
    }
    new Page()
})
