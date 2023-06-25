
import Serve from '@/api/serve'

class Subscribe {
    /**
     * 请求数据
    */
    static subscribeTokenList(data){
        return Serve.get('/subscribe/record',data)
    }
   static subscribe(data){
       return Serve.get('/subscribe/index',data)
   }
    /**
     * 提交数据
     * @param {object} data
     * @param {string} data.amount
     * @param {string} data.coin_name
    */
   static subscribeNow(data){
        return Serve.post('/subscribe/sumbit',data)
   }
}

export default Subscribe;