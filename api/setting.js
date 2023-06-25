import Serve from '@/api/serve'
class Setting {
    // 获取用户信息
    static getUserInfo() {
        return Serve.get(`/security/index`);
    }
    /**
     * 修改用户信息
     * @param {{username:string,avatar:'url'}} data
    */
    static updateUserInfo(data) {
        return Serve.post(`/user/updateUserInfo`, data);
    }
    /**
     * 关闭手机号/邮箱/谷歌验证
     * @param {object} data
     * @param {number} data.type 1:手机 2：邮箱 3：谷歌
     * @param {number} data.sms_code 手机验证码
     * @param {number} data.email_code 邮箱验证码
     * @param {number} data.google_code 谷歌验证码
    */
    static disableSmsEmailGoogle(data,{btn}) {
        return Serve.post(`/user/disableSmsEmailGoogle`, data,{btn});
    }
    /**
     * 开启手机号/邮箱/谷歌验证
     * @param {object} data
     * @param {number} data.type 1:手机 2：邮箱 3：谷歌
     * @param {number} data.sms_code 手机验证码
     * @param {number} data.email_code 邮箱验证码
     * @param {number} data.google_code 谷歌验证码
    */
    static enableSmsEmailGoogle(data,{btn}) {
        return Serve.post(`/user/enableSmsEmailGoogle`, data,{btn});
    }
    /**
     * 发送邮箱验证码
     * @param {object} data
     * @param {string} data.email 邮箱号 
    */
    static sendBindEmailCode(data) {
        return Serve.post(`/user/sendBindEmailCode`, data);
    }
    /**
     * 登录二次验证开关
    */
    static switchSecondVerify() {
        return Serve.get(`/user/switchSecondVerify`);
    }
    /**
     * 账号安全信息
    */
    static accountSecurity() {
        return Serve.get(`/user/security/home`);
    }
    /**
     * 设置或重置交易密码
     * @param {object} data
     * @param {string} data.payword
     * @param {string} data.payword_confirmation
     * @param {string} data.sms_code
     * @param {string} data.email_code
     * @param {string} data.google_code
    */
    static setOrResetPaypwd(data) {
        return Serve.post(`/security/payPwd`, data);
    }
    /**
     * 设置或重置登录密码
     * @param {object} data
     * @param {string} data.password
     * @param {string} data.password_confirmation
     * @param {string} data.sms_code
     * @param {string} data.email_code
     * @param {string} data.google_code
    */
    static updatePassword(data,{btn}) {
        return Serve.post(`/security/password`, data,{btn});
    }
    /**
     * 绑定邮箱
     * @param {object} data
     * @param {string} data.email
     * @param {string} data.email_code
     * @param {string} data.sms_code
     * @param {string} data.google_code
    */
    static bindEmail(data,{btn}) {
        return Serve.post(`/security/bindEmail`, data,{btn});
    }

    /**
     * 绑定手机
     * @param {object} data
     * @param {string} data.phone
     * @param {string} data.country_code  - 手机区号
     * @param {string} data.sms_code  
     * @param {string} data.email_code  
     * @param {string} data.google_code  
    */
    static bindPhone(data,{btn}) {
        return Serve.post(`/security/bindPhone`, data,{btn});
    }

    /**
     * 解绑邮箱
     * @param {object} data 
     * @param {string} data.sms_code  
     * @param {string} data.email_code  
     * @param {string} data.google_code  
    */
    static unbindEmail(data) {
        return Serve.post(`/security/unbindEmail`, data);
    }

    /**
     * 解绑手机
     * @param {object} data  
     * @param {string} data.sms_code  
     * @param {string} data.email_code  
     * @param {string} data.google_code  
    */
    static unbindPhone(data) {
        return Serve.post(`/security/unbindPhone`, data);
    }

    /**
     * 忘记登录密码 - 账号确认
     * @param {object} data  
     * @param {string} data.account  
    */
    static forgetPasswordAttempt(data) {
        return Serve.post(`/login/forget`, data,{toast:false});
    }
    /**
     * 忘记登录密码 - 提交
     * @param {object} data
     * @param {string} data.account
     * @param {string} data.email_code
     * @param {string} data.google_code
     * @param {string} data.password
     * @param {string} data.password_confirmation
    */
    static forgetPassword(data,{btn}) {
        return Serve.post(`/login/setPwd`, data,{btn});
    }

    /**
     * 获取谷歌密钥
    */
    static getGoogleToken(data) {
        return Serve.get(`/user/getGoogleToken`, data);
    }
    /**
     * 绑定谷歌
     * @param {object} data  
     * @param {string} data.google_token  
     * @param {string} data.google_code  
     * @param {string} data.sms_code  
     * @param {string} data.email_code  
    */
    static bindGoogleToken(data,{btn}) {
        return Serve.post(`/user/bindGoogleToken`, data,{btn});
    }
    /**
     * 解绑谷歌
     * @param {object} data  
     * @param {string} data.sms_code  
     * @param {string} data.google_code  
     * @param {string} data.email_code  
    */
    static unbindGoogleToken(data) {
        return Serve.post(`/user/unbindGoogleToken`, data);
    }
    /**
     * 发送绑定手机短信验证码
     * @param {object} data  
     * @param {string} data.phone
     * @param {string} data.country_code
    */
    static sendBindSmsCode(data) {
        return Serve.post(`/user/sendBindSmsCode`, data);
    }
    /**
     * 在线获取验证码
     * @param {object} data  
     * @param {string} data.type  1：手机 2：邮箱
    */
    static getCode(data) {
        return Serve.post(`/user/getCode`, data);
    }
    


}

export default Setting;