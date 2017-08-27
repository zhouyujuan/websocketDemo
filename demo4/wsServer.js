var ws = require("nodejs-websocket")
var PORT = 3000

// 不只有一个客户端连接
var clientCount = 0

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function(conn) {
    console.log("New connection")
    // 客户端有消息的时候的回到函数
    clientCount++;
    conn.nickname = 'user' + clientCount
    var mes = {}
    mes.type = "enter"
    mes.data = conn.nickname + 'comes in'
    broadcast(JSON.stringify(mes))
    conn.on("text", function(str) {
        // 接收到客户端的消息时的处理
        console.log("Received " + str)
        var mes = {}
        mes.type = "message"
        mes.data = conn.nickname+':'+str
        broadcast(JSON.stringify(mes))
    })
    conn.on("close", function(code, reason) {
        console.log("Connection closed")
        // broadcast(conn.nickname + 'leave')
        var mes = {}
        mes.type = "leave"
        mes.data = conn.nickname + 'leave'
        broadcast(JSON.stringify(mes))
    })
    conn.on("error", function(err) {
        console.log('handle err');
        console.log(err);
    })
}).listen(PORT)
console.log("websocket server listening porter 3000")

function broadcast(str) {
    // 取到server下面的所有连接
    server.connections.forEach(function(connection) {
        connection.sendText(str);
    })
}