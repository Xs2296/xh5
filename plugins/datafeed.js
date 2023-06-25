class Datafeed {
    constructor(vm) {
        this.self = vm;
    }
    onReady(callback) {
        console.log('onReady')
        var _this = this;
        return new Promise(function (resolve) {
            var configuration = _this.defaultConfiguration();
            if (_this.self.getConfig) {
                configuration = Object.assign(
                    _this.defaultConfiguration(),
                    _this.self.getConfig()
                );
            }
            resolve(configuration);
        }).then(function (data) {
            if (_this.self.onReady) {
                _this.self.onReady()
            }
            return callback(data);
        });
    }
    resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
        var _this2 = this
        return new Promise(function (resolve) {
            var symbolInfo = _this2.defaultSymbol();
            if (_this2.self.getSymbol) {
                symbolInfo = Object.assign(_this2.defaultSymbol(), _this2.self.getSymbol());
            }

            resolve(symbolInfo);
        }).then(function (data) {
            return onSymbolResolvedCallback(data);
        }).catch(function (err) {
            return onResolveErrorCallback(err);
        });

    }
    getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback) {

        var onLoadedCallback = function onLoadedCallback(data) {
            if (data && data.length) {
                onDataCallback(data, { noData: false });
            } else {
                onDataCallback([], { noData: true });
            }
        };

        this.self.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback, onErrorCallback);
    }
    subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
        this.self.onRealtimeCallback = onRealtimeCallback
        if (this.self.subscribeBars) {
            this.self.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback)
        }
    }
    unsubscribeBars(subscriberUID) {
        if (this.self.unsubscribeBars) {
            this.self.unsubscribeBars(subscriberUID)
        }
    }
    defaultConfiguration() {
        return {
            supports_search: false,
            supports_group_request: false,
            supported_resolutions: this.self.resolutions,
            supports_marks: true,
            supports_timescale_marks: true,
            supports_time: true
        };
    }
    defaultSymbol() {
        return {
            'name': this.self.symbol.toLocaleUpperCase(),
            'timezone': 'Asia/Shanghai',
            'minmov': 1,
            'minmov2': 0,
            'fractional': false,
            //设置周期
            'session': '24x7',
            'has_intraday': true,
            'has_no_volume': false,
            //设置是否支持周月线
            "has_daily": true,
            //设置是否支持周月线
            "has_weekly_and_monthly": true,
            'description': this.self.symbol.toLocaleUpperCase(),
            //设置精度  100表示保留两位小数   1000三位   10000四位
            'pricescale': 10000,
            'ticker': this.self.symbol.toLocaleUpperCase(),

            // intraday_multipliers: ["1","5",
            //     "15",
            //     "30",
            //     "60",
            //     "240",],
            'supported_resolutions': this.self.resolutions
        };
    }
}
export default Datafeed;