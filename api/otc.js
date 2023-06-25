import Serve from '@/api/serve/index'
class Otc {
    static userPayment(data) {
        return Serve.get(`/userPayment`,data,{loading:true});
    }
    static editUserPayment(data) {
        return Serve.post(`/userPayment/${data.id}`,data,{loading:true});
    }
    static getUserPayment(data) {
        return Serve.post(`/userPayment/${data.id}`,{},{loading:true});
    }
    static addUserPayment(data) {
        return Serve.post(`/userPayment`,data,{loading:true});
    }
    static otcTicker(){
        return Serve.get(`/otc/otcTicker`,{});
    }
    static tradingEntrusts(data){
        return Serve.get(`/otc/tradingEntrusts`,data,{loading:true})
    }
    static storeEntrust(data){
        return Serve.post(`/otc/storeEntrust`,data,{loading:true})
    }
    static storeOrder(data){
        return Serve.post(`/otc/storeOrder`,data,{loading:true})
    }
    static myEntrusts(data){
        return Serve.get(`/otc/myEntrusts`,data,{loading:true})
    }
    static myOrders(data){
        return Serve.get(`/otc/myOrders`,data,{loading:true})
    }
    static cancelEntrust(data){
        return Serve.post(`/otc/cancelEntrust`,data,{loading:true})
    }
    static cancelOrder(data){
        return Serve.post(`/otc/cancelOrder`,data,{loading:true})
    }
    static confirmPaidOrder(data){
        return Serve.post(`/otc/confirmPaidOrder`,data,{loading:true})
    }
    static confirmOrder(data){
        return Serve.post(`/otc/confirmOrder`,data,{loading:true})
    }
    static notConfirmOrder(data){
        return Serve.post(`/otc/notConfirmOrder`,data,{loading:true})
    }
    static orderDetail(data){
        return Serve.get(`/otc/orderDetail`,data,{loading:true})
    }
    static otcAccount(data){
        return Serve.get(`/otc/otcAccount`,data,{loading:false})
    }
	
	static getBankList(data){
	    return Serve.get(`/user/bankList`,data,{loading:true})
	}
	
	static delBankList(data){
	    return Serve.get(`/user/dontNeed`,data,{loading:true})
	}
	
	static setBankInfo(data){
	    return Serve.post(`/user/addBank`,data,{loading:true})
	}
}

export default Otc;