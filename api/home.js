
import Serve from '@/api/serve/index'

class Home {
    // 获取大部分数据
    static indexList(data,config){
        return Serve.get('/index/index',data,config)
    }
    // 获取自选数据
    static getCollect(data){
        return Serve.get('/getCollect',data)
    }

    /**
     * 添加自选
     * @param {object} data
     * @param {string} data.pair_id
     * @param {string} data.pair_name
    */
    static option(data){
        return Serve.post('/option',data)
    }
	// 平台简介--富文本
	static getPtContent(data){
	    return Serve.post('/pt/content',data,{loading:true})
	}
}

export default Home;