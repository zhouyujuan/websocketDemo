var app = require("http").createServer()
var io = require('socket.io')(app)
var PORT = 3000

// socket.emit  发送消息
//io.emit  广播

// 不只有一个客户端连接
var clientCount = 0

app.listen(PORT)

io.on('connection',function(socket){
    clientCount++;
    socket.nickname = 'user' + clientCount
    // 有人连接上了，发送一个广播
    io.emit('enter',socket.nickname + 'comes in')
    // 接受到客户端的消息，然后把接受到的消息发送出去
    socket.on('message',function(str){
    	io.emit('message',socket.nickname + 'says:'+str)
    })
    // 断开连接
    socket.on('disconnect',function(){
        io.emit('leave',socket.nickname + 'leave')
    })

})


console.log("websocket server listening porter 3000")

