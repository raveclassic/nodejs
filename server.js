var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var db = require('./database.js');

var test = require('./test.js');

var port = process.env.PORT || 8080;

app.listen(port, function() {
    console.log("Listening on port: ", port);
});
var users = new Array();
db.open(
    function() {
        console.log("Connection established");
        console.log("Waiting for requests..");
        io.sockets.on('connection',
            function(socket) {
                console.log("new client!");
                socket.emit('logon', {
                    currentOnline: users.length
                });
                socket.on('my other event',
                    function(data) {
                        console.log(data);
                    });
            }
        );
    },
    function(err) {
        console.dir(err);
    }
);


function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function(err, data) {
            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                return res.end('Error loading index.html');
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            res.end(data);
        });
}