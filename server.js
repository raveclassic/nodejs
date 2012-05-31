var http = require('http');
var app = http.createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

var vk = require('./vk.js');
vk.init(http);

app.listen(8080, function() {
	console.log("listening to 8080");
});

var users = new Array();

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {	
    if (err) {
      res.writeHead(500, {"Content-Type": "text/plain; charset=utf-8;"});
      return res.end('Error loading index.html');
    }
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8;"});
	res.end(data);
  });
}
 
io.sockets.on('connection', function (socket) {
	socket.emit('message', { response: 'logged!' });
	socket.on('message', function(request) {
		console.log(request);
		switch (request.api) {
			case 'vk':
				if (vk[request.methodName]) {
					vk.getProfile(320520, function(response) {
						socket.emit('message', { response: response });
					});
				} else {
					socket.emit('message', { error: 'unknown method' });
				}					
			break;
		}
	});
});