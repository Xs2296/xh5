<template>
  <view :prop="config" :change:prop="curve.updateEcharts" :id="chartID"></view>
</template>

<script>
export default {
  props: ["list"],
  data() {
    return {
      chartID:
        "chart" +
        parseInt(Math.random() * 100000) +
        "" +
        parseInt(Math.random() * 100000),
    };
  },
  computed: {
    config() {
      return {
        chartID: this.chartID,
        list: this.list,
      };
    },
  },
  onLoad() {},
  methods: {},
};
</script>

<script module="curve" lang="renderjs">
	import highstock from "highcharts/highstock";
	export default {
		data(){
			return {
				currentList:[],
				currentChartID:''
			}
		},
		mounted() {
			this.initPage();
			this.intiChart();
		},
		methods: {
			initPage() {
				this.currentList = this.config.list.map(item=>item*1)
				this.currentChartID= this.config.chartID
			},
			intiChart() {
				return highstock.stockChart(document.getElementById(this.currentChartID), {
					chart: {
						panning: false,
						spacingRight: 0,
						spacingLeft: 0,
						backgroundColor: "transparent",
					},
					credits: {
						enabled: false,
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
					legend: {
						enabled: false,
					},
					tooltip: {
						enabled: false,
					},
					xAxis: {
						visible: false,
					},
					yAxis: {
						visible: false,
					},
					plotOptions: {
						spline: {
							enableMouseTracking: false,
						},
					},
					series: [{
						color:{
							linearGradient:{
								x1:'0%',
								y1:'0%',
								x2:'100%',
								y2:'100%'
							},
							stops:[
								[0, '#B4EC51'],
								[1, '#429321'],
							]
						},
						data: this.currentList,
						lineWidth: 1.5,
						type: "spline",
					}, ],
				});
			},
			updateEcharts() {
				
			},
		}
	}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.echarts {
  margin-top: 100px;
  width: 100%;
  height: 300px;
}
</style>
