import Serve from '@/api/serve'

class Exchange {

    // 获取账户余额
    static getUserBalance(data) {
        return Serve.get(`/exchange/getUserCoinBalance`,data);
    }

    /**
     * 提交订单
     * @param {object} data
     * @param {string} data.direction buy sell
     * @param {string} data.type 1限价2市价
     * @param {string} data.symbol 交易对
     * @param {number} data.entrust_price 限价单价
     * @param {number} data.amount 限价数量
     * @param {number} data.trigger_price 条件单单价
     * @param {number} data.total 市价单总价
     * 
    */
    static storeEntrust(data,config) {
        return Serve.post(`/exchange/storeEntrust`, data,config);
    }

    // 获取币种基本信息
    static getSymbolInfo(data) {
        return Serve.post(`/user/tradingPairCurrency`, data);
    }

    // 查询最新资讯
    static newTrends() {
        return Serve.get(`/newTrends`);
    }
    // 获取汇率
    static getCurrencyExCny(data){
        return Serve.get('/market/getCurrencyExCny',data)
    }
}

export default Exchange;