import Serve from '@/api/serve/index'


class Pledge {
	static indexList(){
	    return Serve.get('/pledge/productList');
	}
	
	static getDetail(param){
		return Serve.get('/pledge/product',param);
	}
	
	/**
	 * 购买产品
	 * @param data {id,num}
	 */
	static buygoods(data) {
	    return Serve.post('/pledge/buyProduct', data);
	}
	
	/**
	 * 购买产品
	 * @param data {id,num}
	 */
	static getOrderList() {
	    return Serve.get('/pledge/orderList');
	}
}

export default Pledge;