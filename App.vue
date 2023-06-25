<script>
	import Member from "@/api/member";
	import {
		mapActions
	} from "vuex";
	import app from "app.js"
	export default {
		onLaunch: function() {
			setInterval(() => {
				this.$navFontColor();
			}, 1000);
			this.mobileLogo();
		},
		methods: {
			...mapActions({
				setLogoMap: "logoMap",
			}),
			mobileLogo() {
				Member.mobileLogo().then((res) => {
					let data = res.data;
					uni.setNavigationBarTitle({
						title: res.data.name
					})
					this.setLogoMap({
						home_logo: data.home_logo,
						login_logo: data.login_logo,
						title_logo: data.title_logo,
						share_logo: data.share_logo,
						name: data.name,
						copyright: data.copyright,
		 			service_link: data.service_link,
					});
					uni.setNavigationBarTitle({
						title: data.name
					})
				});
			},
		},
		created() {
			if (uni.getStorageSync('tradingview.chartproperties.mainSeriesProperties')) {
				console.log(2)

			} else {
				// let status = 
				uni.setStorageSync('tradingview.chartproperties.mainSeriesProperties', JSON.stringify({
					"style": 3,
					"esdShowDividends": true,
					"esdShowSplits": true,
					"esdShowEarnings": true,
					"esdShowBreaks": false,
					"esdBreaksStyle": {
						"color": "rgba( 226, 116, 91, 1)",
						"style": 2,
						"width": 1
					},
					"esdFlagSize": 2,
					"showCountdown": false,
					"showInDataWindow": true,
					"silentIntervalChange": false,
					"showPriceLine": true,
					"priceLineWidth": 1,
					"priceLineColor": "",
					"showPrevClosePriceLine": false,
					"prevClosePriceLineWidth": 1,
					"prevClosePriceLineColor": "rgba( 85, 85, 85, 1)",
					"extendedHours": false,
					"sessVis": false,
					"statusViewStyle": {
						"fontSize": 17,
						"showExchange": true,
						"showInterval": true,
						"showSymbolAsDescription": false
					},
					"candleStyle": {
						"upColor": "#53b987",
						"downColor": "#eb4d5c",
						"drawWick": true,
						"drawBorder": true,
						"borderColor": "#378658",
						"borderUpColor": "#53b987",
						"borderDownColor": "#eb4d5c",
						"wickColor": "#737375",
						"wickUpColor": "#a9cdd3",
						"wickDownColor": "#f5a6ae",
						"barColorsOnPrevClose": false
					},
					"hollowCandleStyle": {
						"upColor": "rgba( 83, 185, 135, 1)",
						"downColor": "rgba( 255, 77, 92, 1)",
						"drawWick": true,
						"drawBorder": true,
						"borderColor": "rgba( 55, 134, 88, 1)",
						"borderUpColor": "rgba( 83, 185, 135, 1)",
						"borderDownColor": "rgba( 255, 77, 92, 1)",
						"wickColor": "rgba( 115, 115, 117, 1)",
						"wickUpColor": "rgba( 169, 220, 195, 1)",
						"wickDownColor": "rgba( 245, 166, 174, 1)"
					},
					"haStyle": {
						"upColor": "rgba( 83, 185, 135, 1)",
						"downColor": "rgba( 255, 77, 92, 1)",
						"drawWick": true,
						"drawBorder": true,
						"borderColor": "rgba( 55, 134, 88, 1)",
						"borderUpColor": "rgba( 83, 185, 135, 1)",
						"borderDownColor": "rgba( 255, 77, 92, 1)",
						"wickColor": "rgba( 115, 115, 117, 1)",
						"wickUpColor": "rgba( 83, 185, 135, 1)",
						"wickDownColor": "rgba( 255, 77, 92, 1)",
						"showRealLastPrice": false,
						"barColorsOnPrevClose": false,
						"inputs": {},
						"inputInfo": {}
					},
					"barStyle": {
						"upColor": "rgba( 83, 185, 135, 1)",
						"downColor": "rgba( 255, 77, 92, 1)",
						"barColorsOnPrevClose": false,
						"dontDrawOpen": false
					},
					"lineStyle": {
						"color": "rgba( 60, 120, 216, 1)",
						"linestyle": 0,
						"linewidth": 1,
						"priceSource": "close",
						"styleType": 2
					},
					"areaStyle": {
						"color1": "rgba( 96, 96, 144, 0.5)",
						"color2": "rgba( 1, 246, 245, 0.5)",
						"linecolor": "rgba( 0, 148, 255, 1)",
						"linestyle": 0,
						"linewidth": 1,
						"priceSource": "close",
						"transparency": 50
					},
					"priceAxisProperties": {
						"autoScale": true,
						"autoScaleDisabled": false,
						"percentageDisabled": false,
						"logDisabled": false,
						"alignLabels": true
					},
					"renkoStyle": {
						"upColor": "rgba( 83, 185, 135, 1)",
						"downColor": "rgba( 255, 77, 92, 1)",
						"borderUpColor": "rgba( 83, 185, 135, 1)",
						"borderDownColor": "rgba( 255, 77, 92, 1)",
						"upColorProjection": "rgba( 169, 220, 195, 1)",
						"downColorProjection": "rgba( 245, 166, 174, 1)",
						"borderUpColorProjection": "rgba( 169, 220, 195, 1)",
						"borderDownColorProjection": "rgba( 245, 166, 174, 1)",
						"wickUpColor": "rgba( 83, 185, 135, 1)",
						"wickDownColor": "rgba( 255, 77, 92, 1)",
						"inputs": {
							"source": "close",
							"boxSize": 3,
							"style": "ATR",
							"atrLength": 14,
							"wicks": true
						},
						"inputInfo": {
							"source": {
								"name": "Source"
							},
							"boxSize": {
								"name": "Box size"
							},
							"style": {
								"name": "Style"
							},
							"atrLength": {
								"name": "ATR Length"
							},
							"wicks": {
								"name": "Wicks"
							}
						}
					},
					"pbStyle": {
						"upColor": "rgba( 83, 185, 135, 1)",
						"downColor": "rgba( 255, 77, 92, 1)",
						"borderUpColor": "rgba( 83, 185, 135, 1)",
						"borderDownColor": "rgba( 255, 77, 92, 1)",
						"upColorProjection": "rgba( 169, 220, 195, 1)",
						"downColorProjection": "rgba( 245, 166, 174, 1)",
						"borderUpColorProjection": "rgba( 169, 220, 195, 1)",
						"borderDownColorProjection": "rgba( 245, 166, 174, 1)",
						"inputs": {
							"source": "close",
							"lb": 3
						},
						"inputInfo": {
							"source": {
								"name": "Source"
							},
							"lb": {
								"name": "Number of line"
							}
						}
					},
					"kagiStyle": {
						"upColor": "rgba( 83, 185, 135, 1)",
						"downColor": "rgba( 255, 77, 92, 1)",
						"upColorProjection": "rgba( 169, 220, 195, 1)",
						"downColorProjection": "rgba( 245, 166, 174, 1)",
						"inputs": {
							"source": "close",
							"style": "ATR",
							"atrLength": 14,
							"reversalAmount": 1
						},
						"inputInfo": {
							"source": {
								"name": "Source"
							},
							"style": {
								"name": "Style"
							},
							"atrLength": {
								"name": "ATR Length"
							},
							"reversalAmount": {
								"name": "Reversal amount"
							}
						}
					},
					"pnfStyle": {
						"upColor": "rgba( 83, 185, 135, 1)",
						"downColor": "rgba( 255, 77, 92, 1)",
						"upColorProjection": "rgba( 169, 220, 195, 1)",
						"downColorProjection": "rgba( 245, 166, 174, 1)",
						"inputs": {
							"sources": "Close",
							"reversalAmount": 3,
							"boxSize": 1,
							"style": "ATR",
							"atrLength": 14
						},
						"inputInfo": {
							"sources": {
								"name": "Source"
							},
							"boxSize": {
								"name": "Box size"
							},
							"reversalAmount": {
								"name": "Reversal amount"
							},
							"style": {
								"name": "Style"
							},
							"atrLength": {
								"name": "ATR Length"
							}
						}
					},
					"baselineStyle": {
						"baselineColor": "rgba( 117, 134, 150, 1)",
						"topFillColor1": "rgba( 83, 185, 135, 0.1)",
						"topFillColor2": "rgba( 83, 185, 135, 0.1)",
						"bottomFillColor1": "rgba( 235, 77, 92, 0.1)",
						"bottomFillColor2": "rgba( 235, 77, 92, 0.1)",
						"topLineColor": "rgba( 83, 185, 135, 1)",
						"bottomLineColor": "rgba( 235, 77, 92, 1)",
						"topLineWidth": 1,
						"bottomLineWidth": 1,
						"priceSource": "close",
						"transparency": 50,
						"baseLevelPercentage": 50
					},
					"stayle": 3,
					"symbol": "BTC",
					"shortName": "BTC",
					"timeframe": "",
					"onWidget": false,
					"interval": "1"
				}))
			}

		},
		onShow: function() {
			// if (document.body.clientWidth >= 750) {
			//  window.location.href = app.pcUrl;
			// }
			uni.$emit("appShow");
			this.$navFontColor();
		},
		onHide: function() {},
	};
</script>

<style lang="scss">
	.layout-page {
		height: 100vh;
		font-size: 14px;
		background: $panel-1;
		color: $text-color;
	}

	@import "./assets/scss/app.scss";

	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url("/static/uni.ttf");
	}

	/* #endif */
</style>
