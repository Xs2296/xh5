import Serve from '@/api/serve/index'
class Profile {
    // 获取用户信息
    static getUserInfo() {
        return Serve.get(`/security/index`);
    }
    // 获取实名认证信息
    static getAuthInfo() {
        return Serve.get(`/security/getAuthInfo`);
    }
    /**
     * 初级认证 （认证第一步）
     * @param {object} data
     * @param {number} data.country_code
     * @param {number} data.country_id // 区号id
     * @param {string} data.realname
     * @param {number} data.id_card //证件号
     * @param {number} data.type //证件类型
     * @param {string} data.birthday //出生日期
     * @param {string} data.address //地址
     * @param {string} data.city //城市
     * @param {string} data.extra //额外信息
     * @param {string} data.postal_code //邮政编码
     * @param {string} data.phone //手机号
    */
    static primaryAuth(data) {
        return Serve.post(`/security/primaryAuth`, data);
    }
    /**
     * 高级认证（认证第二步）
     * @param {object} data
     * @param {string} data.front_img //证件照正面
     * @param {string} data.back_img   //证件照反面
     * @param {string} data.hand_img //手持证件照
    */
    static topAuth(data) {
        return Serve.post(`/security/topAuth`, data);
    }

    /**
     * 登录记录
    */
    static getLoginLogs(data){
        return Serve.get(`/user/getLoginLogs`, data)
    }
    /**
     * 邀请推广
    */
    static generalizeInfo(){
        return Serve.get(`/security/invite`,)
    }
    /**
     * 推广记录
    */
    static generalizeList(data){
        return Serve.get(`/security/invite`,data)
    }
    /**
     * 返佣记录
    */
   static rewardLogs(data){
       return Serve.get('/generalize/rewardLogs',data)
   }
    /**
     * 获取用户等级详情
    */
   static getGradeInfo(){
       return Serve.get('/user/getGradeInfo')
   }
    
}

export default Profile;