<template>
  <div
    id="hightchart"
    :prop="config"
    :change:prop="highchart.changeConifg"
    class="chart-box"
  ></div>
</template>
<script>
import Option from "@/api/option";
import { mapState } from "vuex";
export default {
  props: ["symbolName"],
  computed: {
    linkSymbol() {
      return this.symbolName.split("/").join("").toLowerCase();
    },
    ...mapState({
      ws: "ws",
      servetheme: "theme",
    }),
    msg() {
      return `newPrice_${this.linkSymbol}`;
    },
  },
  watch: {
    msg(n, o) {
      if (o) {
        this.unSub(o);
        this.getList();
      }
    },
  },
  data() {
    return {
      list: [],

      //   任务对象 自动派发（set即可）
      config: {},
    };
  },
  methods: {
    getList() {
      let data = {
        symbol: this.symbolName,
        name: this.symbolName,
      };
      Option.getNewPriceBook(data).then((res) => {
        let arr = res.data.map((item) => {
          return [item.ts, item.price];
        });
        // 变更任务
        this.config = {
          type: "resetList",
          list: arr,
          symbol: data.symbol,
          theme: this.servetheme,
        };
        this.sub();
      });
    },
    // 订阅消息
    sub() {
      this.ws.send({
        cmd: "sub",
        msg: this.msg,
      });
    },
    // 取消订阅
    unSub(name) {
      this.ws.send({
        cmd: "unsub",
        msg: name,
      });
    },
    // socket接受数据
    socketGetData() {
      this.ws.on("message", (res) => {
        let { data, sub } = res;
        if (sub == this.msg) {
          this.$emit("newData", data);
          this.config = {
            type: "addPoint",
            data,
          };
        }
      });
    },
  },
  created() {
    this.config = {
      type: "init",
      theme: this.servetheme,
    };
  },
  mounted() {
    this.getList();
    this.socketGetData();
  },
  destroyed() {
    this.unSub(this.msg);
  },
};
</script>

<script module="highchart" lang="renderjs">
import highstock from "highcharts/highstock";
export default {
	data(){
		return {
			chart: undefined,
			 theme: "light",
		}
	},
    methods: {
         intiChart($box) {
          highstock.setOptions({
            global: {
              timezoneOffset: -8 * 60,
            },
          });
          let colorMap={
            light:{
              line:'#dcdee0',
              color:'#333'
            },
            dark:{
              line:'#49495F',
              color:'#dcdee0'
            }
      }
          this.chart = highstock.stockChart($box, {
            chart: {
              marginRight: 80,
              marginTop: 0,
              marginLeft: 0,
              padding: 0,
              events: {
                click: function () {},
                load: function () {},
                redraw: function () {},
              },
              panning: !0,
              backgroundColor: "transparent",
              borderColor: "#ffffff00",
              borderWidth: "1",
              plotBackgroundColor: "transparent",
              Point: {
                visible: !1,
              },
            },
            rangeSelector: {
              enabled: false,
            },
            navigator: {
              enabled: false,
            },
            scrollbar: {
              enabled: false,
            },
            exporting: {
              enabled: !0,
            },
            credits: {
              enabled: !1,
            },
            mapNavigation: {
              enabled: !1,
              enableButtons: !1,
            },
            navigation: {
              enabled: !1,
              buttonOptions: {},
            },
            title: {
              text: null,
            },
            yAxis: {
              gridLineWidth: 0.5,
              tickWidth: 0.5,
              tickColor: colorMap[this.theme].line,
              tickAmount: 7,
              // lineWidth: 1,
              lineColor: colorMap[this.theme].line,
              labels: {
                align: "center",
                x: 20,
                style: {
                  color:colorMap[this.theme].color,
                },
                useHTML: !0,
              },
              opposite: !0,
              gridLineColor: colorMap[this.theme].line,
            },
            xAxis: {
              type: "datetime",
              dateTimeLabelFormats: {
                millisecond: "%H:%M:%S.%L",
                second: "%H:%M:%S",
                minute: "%H:%M",
                hour: "%H:%M",
                day: "%m-%d",
                week: "%m-%d",
                month: "%Y-%m",
                year: "%Y",
              },
              tickWidth: 1,
              tickColor: colorMap[this.theme].line,
              lineColor: colorMap[this.theme].line,
              labels: {
                style: {
                  color: colorMap[this.theme].color,
                },
              },
              plotLines: [
                {
                  color: "red",
                  dashStyle: "solid",
                  value: 0,
                  width: 2,
                },
              ],
              plotBands: [
                {
                  color: colorMap[this.theme].line,
                  from: 0,
                  to: 0,
                  zIndex: 1,
                },
              ],
              // gridLineWidth: 1,
              // gridLineColor: "#1E2E3F",
            },
            tooltip: {
              dateTimeLabelFormats: {
                millisecond: "%H:%M:%S.%L",
                second: "%H:%M:%S",
                minute: "%H:%M",
                hour: "%H:%M",
                day: "%Y-%m-%d",
                week: "%m-%d",
                month: "%Y-%m",
                year: "%Y",
              },
            },
            legend: {
              enabled: !1,
            },
            plotOptions: {
              areaspline: {
                fillColor: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1,
                  },
                 stops: [
                [0, "rgba(192,96,194,.58)"],
                [1, "rgba(90,99,251,.13)"],
              ],
                },
                marker: {
                  radius: 2,
                },
                lineWidth: 2,
                states: {
                  hover: {
                    lineWidth: 2,
                  },
                },
                threshold: null,
              },
              series: {
                point: {
                  events: {
                    mouseOver: function () {},
                  },
                },
                events: {
                  mouseOut: function () {},
                },
              },
            },
            series: [
              {
                marker: {
                  radius: 0,
                  lineWidth: 0,
                  lineColor: "#fff",
                  fillColor: "#fff",
                  states: {},
                },
                type: "areaspline",
                name:'',
                data: [],
                lineWidth: 3,
                color: {
                linearGradient:{
                    x1:'0%',
                    y1:'0%',
                    x2:'100%',
                    y2:'100%'
                  },
                  stops:[
                    [0, '#C060C2'],
                    [1, '#5A63FB'],
                  ]
                },
              },
            ],
          });
		},
		// 收到通知
		changeConifg(n,o){
			this.task(n)
		},
		// 任务派发
		task(task){
			switch (task.type) {
				// 重置数据
				case 'resetList':
					this.chart.series[0].setData(task.list.map(item=>{
						return [item[0],item[1]*1]
					}));
          this.chart.series[0].name = task.symbol;
					break;
				// 追加点
				case 'addPoint':
          this.chart.series[0].addPoint([task.data.ts, task.data.price], true, true);
					break;
				case 'init':
          this.theme = task.theme
					break;
				// 默认事件
				default:
					break;
			}
		}
	},
	mounted() {
		this.task(this.config)
		this.intiChart(this.$el);
	},
}
</script>


<style lang="scss" scoped>
.chart-box {
  height: 100%;
  background-color: getColor("panel-3");
}
</style>