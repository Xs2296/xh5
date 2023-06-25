import {$get,$post,$postFile} from '@/api'


class Assets {
    /**
     * 数字货币提现
     * @param {Object} data 
    */
    static cryptocurrenciesWithdrawal(data) {

        return $post(`/withdraw/cryptocurrenciesWithdrawal`, data);
        
    }



    /**
     * assets页面
     * @param {Object} data 
    */
    static assets(data) {

        return $post(`/userCoin/assets`, data);

    }


    /**
     * assets页面
     * @param {Object} data 
    */
    static getAllList(data) {

        return $get(`coin/getAllList`, data);

    }

    /**
     * 币币用户历史委托
     * @param {Object} data 
    */
    static history(data) {

        return $post(`/coin/orders/history`, data);

    }

    /**
     * 资金划转记录
     * @param {Object} data 
    */
    static fundsTransferRecordPageList(data) {

        return $post(`/fundsTransferRecord/pageList`, data);

    }

    /**
     * 资金划转
     * @param {Object} data 
    */
    static transfer(data) {

        return $post(`/userCoin/transfer`, data);

    }

    /**
     * 数字货币充值
     * @param {int} params 
    */
    static cryptocurrenciesRecharge(coinId) {

        return $get(`/recharge/cryptocurrenciesRecharge/${coinId}`);

    }

    /**
     * 数字货币充值记录
     * @param {Object} data 
    */
    static cryptocurrenciesRechargeRecords(data) {

        return $post(`/recharge/cryptocurrenciesRechargeRecords`, data);

    }


    /**
     * 用户数字货币提现记录
     * @param {Object} data 
    */
    static cryptocurrenciesWithdrawRecords(data) {

        return $post(`/withdraw/cryptocurrenciesWithdrawRecords`, data);

    }

    /**
     * 删除提现地址
     * @param {Object} data 
    */
    static deleteById(data) {

        return $post(`/withdrawAddress/deleteById`, data);

    }

    /**
     * 编辑提现地址
     * @param {Object} data 
    */
    static editById(data) {

        return $post(`/withdrawAddress/editById`, data);

    }

    /**
    * 移除添加地址
    * @param {Object} data 
   */
    static addRemove(data) {

        return $post(`/withdrawAddress/addOrRemoveWhiteList`, data);

    }


    /**
     * 提现地址分页列表
     * @param {Object} data 
    */
    static pageList(data) {

        return $post(`/withdrawAddress/pageList`, data);

    }


    /**
     * 添加提现地址
     * @param {Object} data 
    */
    static save(data) {

        return $post(`/withdrawAddress/save`, data);

    }


    /**
     * 费率列表(手续费)
     * @param {Object} data 
    */
    static getList(data) {

        return $get(`/transferFee/getList`, data);

    }

    /**
     * 用户合约资金
     * @param {Object} data 
    */
    static contractsAccount(data) {

        return $get(`/futuresUserCoin/contractsAccount`, data);

    }
    /**
     * 用户合约资金(详情)
     * @param {number} accountId 
    */
    static contractsAccountDetail(accountId) {

        return $get(`/futuresUserCoin/contractsAccountDetail/${accountId}`);

    }

    /**
     * 用户资金历史记录
     * @param {Object} data 
    */
    static transactionHistory(data) {

        return $post(`/futuresUserCoin/transactionHistory`, data);

    }
    /**
         * 确认是否白名单地址
         * @param {Object} data 
        */
    static checkIsWhiteList(data) {

        return $post(`/withdrawAddress/checkIsWhiteList`, data);

    }

    /**
         * 用户已实现盈亏列表
         * @param {Object} data 
        */
    static realisedPnlLog(data) {

        return $post(`/realisedPnlLog/list`, data);

    }

    /**
        * 定期宝列表
        * @param {Object} data 
    */
    static financeList(data) {

        return $post(`/finance/list`, data);

    }
    /**
        * 理财订单列表
        * @param {Object} data 
    */
    static financeOrderList(data) {

        return $post(`/finance/order/list`, data);

    }
    /**
        * 定期宝列表
        * @param {Object} data 
    */
    static financeApply(data) {

        return $post(`/finance/apply`, data);

    }
    /**
        * 定期理财账户资产
        * @param {Object} data 
    */
    static financeAccount(data) {

        return $post(`/finance/account`, data);

    }



}

export default Assets;