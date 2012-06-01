app = require('express').createServer();
var port = process.env.PORT | 8080;
var fs = require('fs');

var scriptsFolder = '/scripts';
var imagesFolder = '/images';

//routing
app.get('/', sendIndex);
app.get('/*.html', sendHtml);
app.get('/settings.js', function(req, res) {
    res.writeHead(200, {'Content-Type':'text/javascript'});
    res.end('serverAddress = "http://'+(app.address().address=='0.0.0.0'?'localhost':app.address().address)+'";');
});
app.get('/scripts/*.js', sendJS);
app.get('/*.css', sendCSS);
app.get('/*.png', sendPNG);
//TODO: redirect vk|fb auth page to server with token|sid parameters to mix server's own md5 hash basing on these parameters including user id to check if client-side is really authorized
//this md5-sum will be a key to all social server-side operations such as cross-posting etc.
//it will only be possible when server will be placed on registered allowed domain


app.listen(port, function() {
	console.log('http on '+port);
    require('./sockets_server.js').init(app);
});

function sendFile(filename, type, res) {
    fs.readFile(filename, function(err, data) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8;'});
            return res.end('Error loading index.html');
        }
        res.writeHead(200, {'Content-Type': type + '; charset=utf-8;'});
        res.end(data);
    });
}

function sendIndex(req, res) {
    sendFile(__dirname+'/index.html', 'text/html', res);
}

function sendHtml(req, res) {
    sendFile(__dirname+'/'+req.params[0]+'.html', 'text/html', res);
}

function sendJS(req, res) {
    sendFile(__dirname+scriptsFolder+'/'+req.params[0]+'.js', 'text/javascript', res);
}

function sendCSS(req, res) {
    sendFile(__dirname+'/'+req.params[0]+'.css', 'text/css', res);
}

function sendPNG(req, res) {
    sendFile(__dirname+'/'+req.params[0]+'.png', 'image/png', res);
}