import Serve from '@/api/serve'

class Contract {
	/**
	 * 合约、秒合约列表
	 * type 1:合约，3:秒合约
	 */
	static getCombinationData(data) {
		return Serve.get('/contract/getMarketList', data ,{loading:true})
	}
	/**
	 * 获取自选列表
	 * ctype 类型：1现货2合约3秒合约
	 */
	static getCollect(data) {
		return Serve.get('/getCollect', data,{loading:true})
	}
	// second/contact/detail
	/**
	 * 获取自选列表
	 * ctype 类型：1现货2合约3秒合约
	 */
	static getDetail(data) {
		return Serve.get('/second/contact/detail', data,{loading:true})
	}
	
	static setOrder(data){
		return Serve.post('/second/contact/orderCreate',data,{loading:true})
	}
	static getOrderLog(data){
		return Serve.post('/second/contact/orderList',data,{loading:true})
	}
	
	// 秒合约账户资金流水
	static getMiaoHeyueLiushui(data){
		return Serve.post('/second/contact/accountFlow',data,{loading:true})
	}
	// 币币账户流水
	static getBiBiLiushui(data){
		return Serve.post('/user/otcWalletLogs',data,{loading:true})
	}
}
export default Contract;
