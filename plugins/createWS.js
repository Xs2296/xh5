let createWS = (url, callbackObj) =>{
    var ws = new WebSocket(url)
    WebSocket.prototype.sendJson = function (obj) {
        this.send(JSON.stringify(obj))
    }
    ws.onopen = function () {
        callbackObj.open && callbackObj.open(ws)
        setInterval(function () {
            ws.send(JSON.stringify({
                type: "heartbeat"
            }))
        }, 10000);
    }
    ws.onclose = function () {
        callbackObj.onclose && callbackObj.onclose(ws)
    }
    return ws
}

export default createWS;