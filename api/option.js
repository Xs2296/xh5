import Serve from '@/api/serve'

class Option {
	// 交易对
	static getOptionSymbol() {
		return Serve.get(`/option/getOptionSymbol`);
	}
	/**
	 * 获取期权交割记录
	 * @param {object} data
	 * @param {string} data.pair_id
	 * @param {string} data.time_id
	 */
	static getSceneResultList(data) {
		return Serve.get(`/option/getSceneResultList`, data)
	}
	/**
	 * 获取k线数据
	 * @param {object} data
	 * @param {string} data.symbol
	 * @param {string} data.period
	 * @param {string} data.size
	 * @param {string} data.form
	 * @param {string} data.to
	 */
	static getKline(data) {
		// let url =  `https://api.hadax.com/market/history/kline`;
		let url = `/option/getKline`;
		return Serve.get(url, data)
	}
	/**
	 * 获取可用于期权交易的币种列表
	 */
	static getBetCoinList() {
		return Serve.get(`/option/getBetCoinList`)
	}
	/**
	 * 获取指定币种的余额
	 * @param {object} data
	 * @param {string} data.coin_id
	 */
	static getUserCoinBalance(data) {
		return Serve.get(`/option/getUserCoinBalance`, data)
	}
	/**
	 * 获取当前最新期权场景
	 * @param {object} data
	 * @param {string} data.pair_id
	 * @param {string} data.time_id
	 */
	static sceneDetail(data) {
		return Serve.get(`/option/sceneDetail`, data)
	}
	/**
	 * 获取全部期权场景
	 */
	static sceneListByPairs() {
		return Serve.get(`/option/sceneListByPairs`)
	}
	/**
	 * 获取当前最新期权场景赔率
	 * @param {object} data
	 * @param {string} data.pair_id
	 * @param {string} data.time_id
	 */
	static getOddsList(data) {
		return Serve.get(`/option/getOddsList`, data)
	}
	/**
	 * 获取用户期权购买记录
	 * @param {object} data
	 * @param {string} data.status
	 * @param {string} data.pair_id
	 * @param {string} data.time_id
	 */
	static getOptionHistoryOrders(data) {
		return Serve.get(`/option/getOptionHistoryOrders`, data)
	}
	/**
	 * 购买期权
	 * @param {object} data
	 * @param {string} data.bet_amount
	 * @param {string} data.bet_coin_id
	 * @param {string} data.odds_id
	 * */
	static betScene(data) {
		return Serve.post(`/option/betScene`, data)
	}
	/**
	 * 获取交易价格组
	 * @param {object} data
	 * @param {string} data.symbol
	 *  
	 */
	static getNewPriceBook(data) {
		return Serve.get('/option/getNewPriceBook', data)
	}
	/**
	 * 移动端期权列表
	 */
	static sceneListByTimes() {
		return Serve.get('/option/sceneListByTimes')
	}
	/**
	 * 移动端详情
	 * @param {object} data
	 * @param {string} data.order_id
	 */
	static getOptionOrderDetail(data) {
		return Serve.get('/option/getOptionOrderDetail', data)
	}

	/**
	 * 获取期权购买金额最小值
	 * @returns {number} data
	 */
	static limit_charge() {
		return Serve.get(`/option/limitCharge`)
	}
}

export default Option;
