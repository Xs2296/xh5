import {$get,$post,$postFile} from '@/api'

class Record {
    /**
     * fundHistory列表
     * @param {Object} data 
    */
   static fundList(data) {

    return $get(`/coin/getAllList`, data);

   }

    /**
     * 币币用户当前委托记录
     * @param {Object} data 
    */
    static openOrder(data) {

        return $post(`/coin/orders/openOrder`, data);

    }
    static conditionOrders(data) {

        return $post(`/coin/orders/condition/openOrder`, data);

    }


    /**
     * 币币用户取消接口
     * @param {Object} data 
    */
   static openOrderCancel(data) {

          return $post(`/coin/orders/cancel/${data}`);
    
     }
    
    static orderConditionCancel(data) {
        return $post(`/coin/orders/condition/cancel/${data}`)
    }

     /**
     * 币币用户筛选接口
     * @param {Object} data 
    */
   static openOrderfilter() {

          return $post(`/coin/orders/filter`);
    
     }


    /**
     * 用户返佣记录
     * @param {Object} data 
    */
    static rewardList(data) {

        return $post(`/member/rewardList`, data);

    }

    /**
     * 币币用户历史委托
     * @param {Object} data 
    */
    static history(data) {

        return $post(`/coin/orders/history`, data);

    }

    /**
     * 联系我们
     * @param {Object} data 
    */
   static contactUs(data) {
          return $post(`/contactUs/save` , data);
     }

     /**
     * 取消订单
     * @param {Object} data 
    */
   static cancelActiveOrder(data) {
          return $get(`/futuresOrders/cancelActiveOrder/${data}`);
     }

    /**
     * 取消订单
     * @param {Object} data 
    */
   static cancelById(data) {
          return $get(`/futuresConditionOrders/cancelById/${data}`);
     }

}

export default Record;
