import Serve from '@/api/serve'

class College {
    static college() {
        return Serve.get(`/college`);
    }

    static getArticleList(data) {
        return Serve.get(`/article/list`, data);
    }

    static getServiceIndex(data) {
        return Serve.get(`/index/services`, data);
    }


    static getCategoryList() {
        return Serve.get(`/categoryList`);
    }

    static getArticleDetail(data) {
        return Serve.get(`/article/detail`, data);
    }

    static getRecommend() {
        return Serve.get(`/recommend`);
    }

    // 服务分类列表
    static getServiceList() {
        return Serve.get(`/services`);
    }

    // 获取服务的文章详情
    static getServiceDetail(cid) {
        return Serve.get(`/article/serviceDetail?id=${cid}`);
    }
}

export default College;
