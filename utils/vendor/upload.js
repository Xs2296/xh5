
/**
 * 上传文件处理，验证文件类型和大小 验证通过返回数据
 * {
 *    errCode : 0为通过，1为类型错误，2为大小超出，
 *    url : base64位的文件数据
 * }
 * @author lautin
 * @created 2019-11-22 17:20:32
 */

// 将buffer转化成utf-8格式
function iconvToUtf8(bufferArr, encoding) {
    let x = new Uint8Array(bufferArr);
    let ret = new TextDecoder(encoding).decode(x);
    return ret;
}

class Upload {

    constructor(conf) {
        // 获取文件DOM对象
        if (!conf.ele.nodeType)  conf.ele = document.querySelector(conf.ele);

        // 将配置信息写入实例对象中
        Object.assign(this, {
            file: conf.ele.files[0],  // 文件对象
            name: conf.ele.files[0].name, // 文件名称

            error: '',  // 错误代号
            data: '',   // 存储数据
            
            // 类型检测
            isIMG: null,
            isTXT: null,
        }, conf);

    }

    checkType() {
        // 验证文件类型，allowType需要设置['images/jpg', 'image/png'...]
        if (this.allowType) {
            if (!this.allowType.includes(this.file.type)) {
                this.error = `${this.file.type}类型文件不合法`;
                this.errno = 101;
            }
        }
        this.isIMG = this.file.type.startsWith("image");
        this.isTXT = this.file.type.startsWith("text");
    }

    checkSize() {
        // 验证文件类型，allowSize传入的值以M为单位
        if (this.allowSize) {
            const maxByte = this.allowSize * 1024 * 1024;
            if (this.file.size > maxByte) {
                this.error = `文件大小不能超出${this.allowSize}M`;
                this.errno = 102;
            }
        }
    }

    readFile() {

        return new Promise((resolve, reject) => {

            const fr = new FileReader;

            fr.onloadend = function () {
                
                // 如果为文本 返回文件内容
                let data;

                switch (true) {
                    case this.isIMG : 
                        data = fr.result;
                        break;
                    case this.isTXT :
                        data = iconvToUtf8(fr.result, "gbk");
                        break;
                    default :
                        data = null;
                        break;
                }

                resolve(data);

            }.bind(this);


            fr.onabort = function () {
                // 上传意外被中断
                reject(new Error(103));
            }

            fr.onerror = function () {
                // 上传过程发生错误
                reject(new Error(104));
            }

            // 如果是图片的话 则返回base64 URL格式数据 否则返回ArrayBuffer
            this.isIMG ? fr.readAsDataURL(this.file) : fr.readAsArrayBuffer(this.file);

        });

    }

    static async start(settings) {
        // 创建实例
        const ins = new Upload(settings);
        // 验证类型
        ins.checkType();
        // 验证大小
        ins.checkSize();
        
        console.log(ins.errno);
        // 验证不通过 则直接触发reject
        console.log()
        if (ins.error) throw new Error(ins.errno);

        else {
            // 读取文件的操作 发生错误会进入catch 成功则返回data数据
            ins.data = await ins.readFile();
            return ins;
        }
    }
}

export default Upload.start;
