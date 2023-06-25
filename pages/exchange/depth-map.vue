<template>
  <div
    :prop="config"
    :change:prop="depthmap.changeConfig"
    class="depthMap bg-panel-1"
    ref="depthMap"
  ></div>
</template>
<script>
export default {
  props: {
    serveSellList: {
      default() {
        return [];
      },
      type: Array,
    },
    serveBuyList: {
      default() {
        return [];
      },
      type: Array,
    },
  },
  data() {
    return {
      config:{}
    };
  },
  computed: {
    mapConfig() {
      return {
        chart: {
          type: "areaspline",
          spacingRight: 0,
          spacingLeft: 0,
          zoomType: "xy",
          backgroundColor: "transparent",
        },
        title: { text: null },
        credits: {
          enabled: false,
        },
        tooltip: {
          //   enabled: false,
        },
        xAxis: {
          visible: false,
        },
        yAxis: {
          visible: false,
        },
        legend: {
          floating: true,
          verticalAlign: "top",
          // rtl: true,
        },
        plotOptions: {
          area: {
            fillOpacity: 0.2,
            lineWidth: 1,
            step: "center",
          },
        },
        series: [
          {
            name: this.$t("exchange.b5"),
            lineWidth: 1,
            data: [],
            marker: {
              enabled: false,
            },
            color: "#00c162",

            fillColor: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, "rgba(2,150,82,.5)"],
                [1, "rgba(2,150,82,.2)"],
              ],
            },
          },
          {
            name: this.$t("exchange.b6"),
            lineWidth: 1,
            data: [],
            marker: {
              enabled: false,
            },
            color: "#dd1900",
            fillColor: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, "rgba(221,25,0,.5)"],
                [1, "rgba(221,25,0,.2)"],
              ],
            },

            // fillColor:'#00c162'
          },
        ],
      };
    },
  },
  watch: {
    serveSellList() {
      this.resetData();
    },
    serveBuyList() {
      this.resetData();
    },
  },
  methods: {
    getConfig(){
      return {
        type:'initPage',
        sellList:this.serveSellList,
        buyList:this.serveBuyList,
        config:this.mapConfig
      }
    },
    resetData(){
      this.config = {
        type:'resetData',
        sellList:this.serveSellList,
        buyList:this.serveBuyList,
      }
    }
  },
  created() {
    this.config = this.getConfig()
  },
};
</script>

<script module="depthmap" lang="renderjs">
import Highcharts from "highcharts/highstock";
export default {
  data(){
    return {
      buyList:[],
      sellList:[],
      chartConfig:{},
      chart: undefined,
    } 
  },
  methods: {
    initMap() {
      this.chart = Highcharts.chart(this.$refs.depthMap, this.chartConfig);
    },
    getBuyList() {
      let arr = this.buyList
        .map((item) => {
          return [item.price*1, item.amount];
        })
        .sort((a, b) =>  a[0] - b[0]);
      return arr;
    },
    getSellList() {
      let arr = this.sellList
        .map((item) => {
          return [item.price*1, item.amount];
        })
        .sort((a, b) => a[0] - b[0]);
      return arr;
    },
    setData(){
      this.chart.series[0].setData(this.getBuyList());
      this.chart.series[1].setData(this.getSellList());
    },
    changeConfig(n){
      this.task(n)
    },
    task(obj){
      switch (obj.type) {
        case 'initPage':
          this.buyList = obj.buyList
          this.sellList = obj.sellList
          this.chartConfig = obj.config
          break;
        case 'resetData':
          this.buyList = obj.buyList;
          this.sellList = obj.sellList
          this.setData()
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.task(this.config)
    this.initMap();
  },
}
</script>

<style lang="scss" scoped>
.depthMap {
  height: 200px;
}
</style>