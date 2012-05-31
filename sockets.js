var io = require('socket.io');
var vk = require('./vk.js');

var users = new Array();

function init(app, http) {
    io = io.listen(app);
    setCallbacks();
    vk.init(http);
}

function setCallbacks() {
    io.sockets.on('connection', function (socket) {
        socket.emit('message', { response: 'logged!' });
        socket.on('message', function(request) {
            switch (request.api) {
                case 'vk':
                    switch (request.methodName) {
                        case 'getProfile':
                            vk.getProfile(request.id, function(response) {
                                socket.emit('message', response);
                            });
                            break;
                        case 'newsfeed.get':
                            vk.getNewsfeed(function(response) {
                               socket.emit('message', response);
                            });
                            break;
                    }
                    break;
            }
        });
    });
}

//exports
module.exports = this;
exports.init = init;