import Serve from '@/api/serve'

class Market {

    /**
     * 轮播图列表
     * @param {Object} data 
     * @param {int} type  请求类型 1是pc(默认) 2是app
     * @param {int} position  位置 1(币币首页) 2(预留扩展)
    */
    static cryptocurrenciesWithdrawal(type, position) {

        return Serve.post(`/market/banner/${type}/${position}`);

    }

    /**
     * 用户收藏交易对信息 需要先登录
     */
    static userFavList() {

        return Serve.get(`/coin/market/collection/list`);

    }


    static blogCategoryList() {
        return Serve.get(`/blogCategory/list`);
    }

    static blogDetailList(categoryId, params) {
        return Serve.get(`/blog/list/${categoryId}`, params );
    }

    static blogDetailContent(id) {
        return Serve.get(`/blog/detail/${id}`);
    }

    // 初始化查询市场行情
    static getMarketList() {
        return Serve.get(`/exchange/getMarketList`);
    }

    // 初始化买卖盘数据
    static getBooks(data) {
        return Serve.get(`/exchange/getMarketInfo`,data);
    }

    // 获取币种信息
    static getCoinInfo(data){
        return Serve.get(`/exchange/getCoinInfo`,data)
    }

}

export default Market;