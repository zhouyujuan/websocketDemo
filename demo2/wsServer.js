var ws = require("nodejs-websocket")
var PORT = 3000
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection")
	// 客户端有消息的时候的回到函数
	conn.on("text", function (str) {
		// 接收到客户端的消息时的处理
		console.log("Received "+str)
		conn.sendText(str.toUpperCase()+"!!!")
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	})
	conn.on("error",function(err){
		console.log('handle err');
		console.log(err);
	})
}).listen(PORT)
console.log("websocket server listening porter 3000")