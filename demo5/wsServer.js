var app = require('http').createServer()
var io = require('socket.io')(app);

app.listen(3000);

io.on('connection', function (socket) {
	//这里的socket代表的是和客户端的链接，
	//emit  这里可以直接发送一个对象
	//自定义发送事件的名字
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});