var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(8080);

var users = new Array();

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500, {"Content-Type": "text/plain"});
      return res.end('Error loading index.html');
    }

    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(data);
  });
}
 
io.sockets.on('connection', function (socket) {
		console.log("new client!");
		console.dir(socket);
		socket.emit('logon', { currentOnline: users.length });
		socket.on('my other event', function (data) {
		console.log(data);
	});
});