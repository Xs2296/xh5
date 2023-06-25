import Serve from '@/api/serve'

class Contract {
    /**
     * 合约初始化面板数据
     * @param {Object} data
    */
    static getMarketInfo(data) {
		let nowtime = new Date().getTime();
        return Serve.get(`/contract/getMarketInfo?nowtime=`+nowtime, data);
    }

    /**
     * 获取合约市场
    */
    static getMarketList(data) {
        return Serve.get('/contract/getMarketList', data)
    }

    /**
     * 获取合约账户信息
    */
    static contractAccount(data, config) {
        return Serve.get('/contract/contractAccount', data, config)
    }

    /**
     * 获取合约详情
    */
    static getSymbolDetail(data) {
        return Serve.get('/contract/getSymbolDetail', data)
    }
    /**
     * 可开张数(合约上限)
     * */
    static openNum(data,config) {
        return Serve.get('/contract/openNum', data,config)
    }
    /**
     * 合约开仓
    */
    static openPosition(data, config) {
        return Serve.post('/contract/openPosition', data, config)
    }

    // 获取合约持仓
    static holdPosition(data, config) {
        return Serve.get('/contract/holdPosition', data, config)
    }
    // 合约平仓
    static closePosition(data, config) {
        return Serve.post('/contract/closePosition', data, config)
    }
    // 一键全平
    static closeAllPosition(data, config) {
        return Serve.post('/contract/closeAllPosition', data, config)
    }
    // 获取当前合约委托
    static getCurrentEntrust(data, config) {
        return Serve.get('/contract/getCurrentEntrust', data, config)
    }
    // 撤单
    static cancelEntrust(data, config) {
        return Serve.post('/contract/cancelEntrust', data, config)
    }
    // 历史委托
    static getHistoryEntrust(data, config) {
        return Serve.get('/contract/getHistoryEntrust', data, config)
    }
    // 获取k线数据
    static getKline(data, config) {
        return Serve.get('/contract/getKline', data, config)
    }
    // 获取委托明细
    static getEntrustDealList(data, config) {
        return Serve.get('/contract/getEntrustDealList', data, config)
    }
    // 获取开通状态
    static openStatus() {
        return Serve.get('/contract/openStatus')
    }
    //  开通永续合约
    static opening() {
        return Serve.post('/contract/opening')
    }
    static setStrategy(data, config) {
        return Serve.post('/contract/setStrategy', data, config)
    }
    // 委托盈亏分享
    static entrustShare(data) {
        return Serve.get('/contract/entrustShare', data, { loading: true })
    }
    // 持仓盈亏分享
    static positionShare(data) {
        return Serve.get('/contract/positionShare', data, { loading: true })
    }
    // 一键全平
    static onekeyAllFlat(data) {
        return Serve.post('/contract/onekeyAllFlat', data, { loading: true })
    }
    // 一键反向
    static onekeyReverse(data) {
        return Serve.post('/contract/onekeyReverse', data, { loading: true })
    }
	// 取消预约
	static dingshiCancel(data) {
	    return Serve.post('/second/contact/dingshi/cancel', data, { loading: true })
	}
	// 预约订单列表
	static dingshiOrderList(data) {
	    return Serve.post('/second/contact/dingshiOrderList', data, { loading: true })
	}
}

export default Contract;