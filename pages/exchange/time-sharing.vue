<template>
  <div id="chart122" :prop="config" :change:prop="highstock.changeConfig" class="chart-box"></div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    tradeList: {
      default() {
        return [];
      },
      type: Array,
      required: false,
    },
    query: {
      default: {},
      type: Object,
      required: false,
    },
  },
  computed: {
    ...mapState({
      serveTheme: "theme",
    }),
  },
  watch: {},
  data() {
    return {
      config: {},
    };
  },
  methods: {
    resetData(){
      this.config = '';
      this.$nextTick(()=>{
        this.config = {
          type:'resetList',
          list:this.tradeList,
          date:new Date()
        }
      })
    },
    addPoint(data){
      this.config = {
        type:'addPoint',
        point:data,
        date:new Date()
      }
    },
    getConfig() {
      return {
        type: "initPage",
        list: this.tradeList,
        theme:this.serveTheme
      };
    },
  },
  created() {
    this.config = this.getConfig();
  },
};
</script>
<script module="highstock" lang="renderjs">
import highstock from "highcharts/highstock";
export default {
 
  computed: {
    list() {
      return this.chartTradList.map((item) => {
        return [item.ts, item.price*1];
      });
    },
   
  },
  watch: {},
  data() {
    return {
      chart: undefined,
      chartTradList:[],
      theme:'light'
    };
  },
  methods: {
    changeConfig(config){
      this.task(config)
    },
    task(config){
      switch (config.type) {
        case 'resetList':
          this.chartTradList = config.list;
          this.setData(this.list)
          break;
        case 'addPoint':
          this.webAddPoint(config.point)
          break;
        case 'initPage':
          this.chartTradList = config.list;
          this.theme = config.theme;
          break;
        default:
          break;
      }
    },
    intiChart($box) {
      highstock.setOptions({
        global: {
          timezoneOffset: -8 * 60,
        },
      });

      this.chart = highstock.stockChart($box, {
        chart: {
          marginTop: 0,
          // marginLeft: 0,
          marginBottom: 20,
          padding: 0,
          panning: false, //禁用放大
          pinchType: "", //禁用手势操作
          zoomType: "",
          panKey: "shift",
          backgroundColor: "transparent",
          borderColor: "transparent",
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
          gridLineWidth: 1,
          tickWidth: 0,
          tickColor: "#1E2E3F",
          tickAmount: 7,
          // lineWidth: 1,
          lineColor: "#1E2E3F",
          labels: {
            align: "center",
            x: 0,
            style: {
              color: this.theme=='light'?"#333":"#dcdee0",
              fontSize: "8px",
            },
            useHTML: !0,
            formatter: (ev) => {
              return this.nFormatter(ev.value, 3);
            },
          },
          opposite: false,
          gridLineColor: "transparent",
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
          tickWidth: 0,
          lineWidth: "0",
          tickLength: 0,
          labels: {
            style: {
              color:  this.theme=='light'?"#333":"#dcdee0",
              fontSize: "10px",
            },
            y: 10,
          },
        },
        tooltip: {
          enabled: false,
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
            allowPointSelect:false,
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
            threshold: null,
          },
        },
        series: [
          {
            marker: {
              radius: 0,
              lineWidth: 0,
              lineColor: "#fba845",
              fillColor: "#fba845",
              states: {},
            },
            type: "areaspline",
            name: "",
            data: this.list,
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
    nFormatter(num, digits) {
      const si = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" },
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      let i;
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }
      return (
        (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol
      );
    },
    setData(arr) {
      if(this.chart) this.chart.series[0].setData(arr);
    },
    webAddPoint(obj){
     if(this.chart) this.chart.series[0].addPoint(obj,true,true)
    }
  },
  mounted() {
    this.task(this.config)
    this.intiChart(document.getElementById("chart122"));
  },
  destroyed() {},
};
</script>
<style lang="scss" scoped>
.chart-box {
  height: 100%;
}
</style>