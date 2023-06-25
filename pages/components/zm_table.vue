<template>
	<view style="width: 100%;">
		<table class="w-max a">
			<thead>
				<tr class="fn-sm">
					<th class="p-l-md p-y-xs fn-left">{{ $t('exchange.f7') }}</th>
					<th class="fn-right">{{ $t('exchange.f8') }}</th>
					<th class="p-r-md p-y-xs fn-right">{{ $t('exchange.f9') }}</th>
				</tr>
			</thead>
			<tbody class="table-list">
				<!-- <tr class="link-active" v-for="item in dataList.marketInfoList" :key="item.symbol" v-show="isShow(item.pair_name)" @click=""> -->
				<tr class="link-active" v-for="item in dataList.marketInfoList" :key="item.symbol" @click="openPage(item)">
					<td class="p-l-md p-y-xs rounded-tl-xs rounded-bl-xs">
						<!-- <template v-if="dataList.isCollect"> -->
							<!-- <span class="color-light">{{ item.pair_name }}</span> -->
						<!-- </template> -->
						<!-- <template v-else> -->
							<!-- <span class="color-light">{{ item.coin_name || item.symbol }}</span> -->
							<!-- <span class="fn-sm">/{{ dataList.coin_name }}</span> -->
						<!-- </template> -->
						
						<template>
							<span class="color-light">{{ item.pair_name }}</span>
						</template>
					</td>
					<td class="fn-right" :class="item.increase < 0 ? 'color-sell' : 'color-buy'">{{ item.price }}</td>
					<td :class="item.increase < 0 ? 'color-sell' : 'color-buy'" class="p-r-md p-y-xs fn-right rounded-tr-xs rounded-br-xs">{{ item.increaseStr }}</td>
				</tr>
			</tbody>
		</table>
	</view>
</template>

<script>
export default {
	name: '',
	props: {
		dataList: {
			type: Object,
			default(){
				return { coin_name: '', isCollect: true, marketInfoList: [] };
			}
		},
		type:{
			type: Number,
			default(){
				return 0;
			}
		}
	},
	data() {
		return {
			data: [],
			filterText: '',
			dataList2: {}
		};
	},
	components: {},
	created() {
		
	},
	mounted() {
		
	},
	methods: {
		isShow(str) {
			return str.toLocaleLowerCase().indexOf(this.filterText.toLocaleLowerCase()) != -1;
		},
		openPage(item){
			switch(this.type){
				case 0:
				uni.$emit('topNavTab', {  name: 'exchange-operation',obj:item  });				
				break;
				case 1:
				uni.$emit('topNavTab', {  name: 'contract',obj:item  });
				break;
				case 2:
				uni.$emit('topNavTab', {  name: 'contract-m',obj:item  });
				break;
			}
		},
		refData(data){
			this.dataList = data;
			this.$forceUpdate();
		}
	},
	watch: {
		data: {
			handler(val) {},
			// 深度监视
			deep: true,
			// 是否立即执行一次
			immediate: true
		},
		// dataList:{
		// 	handler(val) {
		// 		console.log('dataList-----',val)
		// 	},
		// }
	}
};
</script>

<style scoped lang="scss">
.table-list {
	tr:nth-of-type(2n-1) {
		td {
			background: $panel-3;
		}
	}
}
</style>
