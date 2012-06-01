var io = require('socket.io');
var vk = require('./vk_server.js');
var db = require('./db.js');

var users = new Array();

function init(server) {
    io = io.listen(server);
    io.sockets.on('connection', function (socket) {
        if (users.indexOf(socket) == -1) {
            users.push(socket);
            socket.broadcast.emit('response', {
                status: 'ok',
                methodName: 'getOnline',
                api: 'common',
                response: users.length
            });
        }
        socket.on('request', function(request) { processRequest(request, socket); });
        socket.on('disconnect', function() {
            users.splice(users.indexOf(socket), 1);
            socket.broadcast.emit('response', {
                status: 'ok',
                methodName: 'getOnline',
                api: 'common',
                response: users.length
            });
        });
    });
}

function processRequest(request, socket) {
    switch (request.api) {
        case 'vk':
//                    switch (request.methodName) {
//                        case 'getProfile':
//                            vk.getProfile(request.id, function(response) {
//                               socket.emit('response', response);
//                            });
//                            break;
//                        case 'newsfeed.get':
//                            vk.getNewsfeed(function(response) {
//                               socket.emit('response', response);
//                            });
//                            break;
//                    }
            break;
        case 'fb':
            break;
        case 'db':  //TODO: check the token!
            if (request.methodName && db[request.methodName]) {
                db[request.methodName](request.params, function(response) {
                    response.api = request.api;
                    socket.emit('response', response);
                });
            } else {
                socket.emit('response', {
                    status:'error',
                    error:'unknown method',
                    methodName: request.methodName,
                    api: request.api
                });
            }

            break;
        case 'common':
            switch (request.methodName) {
                case 'getOnline':
                    socket.emit('response', {
                        status: 'ok',
                        methodName: 'getOnline',
                        api: 'common',
                        response: users.length
                    });
                    break;
            }
            break;
    }
}

//exports
module.exports = this;
exports.init = init;