var fs = require('fs');
var http = require('http');
var app = http.createServer(handler);
require('./sockets.js').init(app, http);

app.listen(8080, function() {
	console.log("listening to 8080");
});

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