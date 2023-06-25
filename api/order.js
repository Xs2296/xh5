import Serve from '@/api/serve'
class Order {
    /**
     * 发布委托
     * @param {object} data
     * @param {string} data.direction   方向
     * @param {number} data.type - 类型 
     * @param {string} data.symbol - 交易对 
     * @param {number} data.entrust_price - 价格
     * @param {number} data.amount - 数量
     * 
    */
    static storeEntrust(data) {
        return Serve.post(`/exchange/storeEntrust`,data);
    }
    /**
     * 获取历史委托 
     * @param {object} data
     * @param {string} data.direction   方向
     * @param {number} data.type - 类型 
     * @param {string} data.symbol - 交易对 
     * 
    */
    static getHistoryEntrust(data) {
        return Serve.get(`/exchange/getHistoryEntrust`,data);
    }
    /**
     * 获取当前委托
     * @param {object} data
     * @param {string} data.direction   方向
     * @param {number} data.type - 类型 
     * @param {string} data.symbol - 交易对 
     * 
    */
    static getCurrentEntrust(data) {
        return Serve.get(`/exchange/getCurrentEntrust`,data);
    }

    // 获取止盈止损单
    static getConditionEntrust(data) {
        return Serve.get(`/exchange/getConditionEntrust`,data);
    }

    /**
     * 获取委托成交记录
     * @param {object} data
     * @param {string} data.entrust_id   委托id
     * @param {number} data.entrust_type - 买入卖出
     * @param {string} data.symbol - 交易对 
     * 
    */
    static getEntrustTradeRecord(data) {
        return Serve.get(`/exchange/getEntrustTradeRecord`,data);
    }
    
    /**
     * 撤单
     * @param {object} data
     * @param {string} data.entrust_id   委托id
     * @param {number} data.entrust_type - 买入卖出
     * @param {string} data.symbol - 交易对 
     * 
    */
    static cancelEntrust(data) {
        return Serve.post(`/exchange/cancelEntrust`,data);
    }
    /**
     * 批量撤单
     * @param {object} data
     * @param {string} data.symbol - 交易对 
     * 
    */
    static batchCancelEntrust(data) {
        return Serve.post(`/exchange/batchCancelEntrust`,data);
    }
    // 获取交易对
    static getExchangeSymbol(){
        return Serve.get('/exchange/getExchangeSymbol')
    }
    /**
     * 期权交易记录
     * @param {object} [data]
     * @param {string} data.status
     * @param {string} data.pair_id
     * @param {string} data.time_id
     *  
    */ 
    static getOptionHistoryOrders(data){
        return Serve.get('/option/getOptionHistoryOrders',data)
    }
   

}

export default Order;