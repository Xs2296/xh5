class Socket {
    constructor(link) {
        // 初始化socket
        if (link.constructor === WebSocket) {
            this.socket = link;
        } else {
            this.socket = new WebSocket(link);
        }

        // this.socket.binaryType = 'arraybuffer';

        this.doOpen();

        // 连接状态的标识符
        this.readyState = this.socket.readyState;

        // 订阅/发布模型
        this._events = {
            // 订阅的事件 ： 发布的方法

        };

        // 定时验证的标识符
        this.heartBeatTimer = null;

    }

    // 执行socket并发布事件
    doOpen() {

        this.afterOpenEmit = [];

        // 执行socket连接 并初始化验证请求
        this.socket.addEventListener("open", evt => this.onOpen(evt));

        // 接收socket数据
        this.socket.addEventListener("message", evt => this.onMessage(evt));

        // 关闭socket连接
        this.socket.addEventListener("close", evt => this.onClose(evt));

        // 请求发生错误
        this.socket.addEventListener("error", err => this.onError(err));

    }

    // 发布后通知订阅者
    Notify(entry) {
        // 检查是否有订阅者 返回队列
        const cbQueue = this._events[entry.Event];
        if (cbQueue && cbQueue.length) {
            for (let callback of cbQueue) {
                if (callback instanceof Function) callback(entry.Data);
            }
        }
    }

    // 请求数据的方法
    onOpen(evt) {

        // 每隔20s检查连接
        // this.heartBeatTimer = setInterval(() => this.send({
        //     'cmd': 'ping',
        //     'args': ''
        // }), 20000);

        // 通知订阅
        this.Notify({Event: 'open', Data : evt});
    }

    /**
     * 订阅所有的数据
     * @param {array|object} datas 订阅参数集合
     */
    send(datas) {
        if (datas.constructor != Array) {
			datas = [datas];
        }
        
        for (let item of datas) {
            this.socket.send(JSON.stringify(item));
        }
    }


    onMessage(evt) {

        try {

            // 解析推送的数据
            const data = JSON.parse(evt.data);

            // 通知订阅者
            this.Notify({
                Event: 'message',
                Data: data
            });

        } catch (err) {
            console.error(' >> Data parsing error:', err);

            // 通知订阅者
            this.Notify({
                Event: 'error',
                Data: err
            });
        }
    }

    // 添加事件监听
    on(name, handler) {
        this.subscribe(name, handler);
    }

    // 取消订阅事件
    off(name, handler) {
        this.unsubscribe(name, handler);
    }

    // 订阅事件的方法
    subscribe(name, handler) {
        if (this._events[name]) {
            this._events[name].push(handler); // 追加事件
        } else {
            this._events[name] = [handler]; // 添加事件
        }
    }

    // 取消订阅事件
    unsubscribe(name, handler) {

        let start = this._events[name].findIndex(item => item === handler);

        // 删除该事件
        this._events[name].splice(start, 1);

    }

    checkOpen() {
        return this.readyState >= 2;
    }

    onClose(evt) {
        this.Notify({Event: 'close', Data : evt});
    }


    onError(err) {
        this.Notify({Event: 'error', Data : err});
    }

    emit(data) {
        return new Promise((resolve) => {
            this.send(JSON.stringify(data));
            this.on('message', function (data) {
                resolve(data);
            });
        });
    }

    doClose() {
        this.socket.close();
    }

    destroy() {
        if (this.heartBeatTimer) {
            clearInterval(this.heartBeatTimer);
            this.heartBeatTimer = null;
        }
        this.doClose();
        this._events = {};
        this.readyState = 0;
        this.socket = null;
    }
}

export default Socket
