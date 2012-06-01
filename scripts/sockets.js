Sockets = io.connect(serverAddress); //extend socket.io namespace
Sockets.on('response', function(response) {
    switch (response.status) {
        case 'ok':
            Sockets.processResponse(response);
            break;
        case 'error':
            App.UI.showError(response);
            break;
    }
});

Sockets.processResponse = function(response) {
    switch (response.api) {
        case 'vk':
            Sockets.processVK(response);
            break;
        case 'fb':
            Sockets.processFB(response);
            break;
        case 'db':
            Sockets.processDB(response);
            break;
        case 'common':
            Sockets.processCommon(response);
            break;
    }
};

Sockets.getUserSettings = function() {
    Sockets.emit('request', {
        api: 'db',
        methodName: 'getUserSettings',
        params: {
            vkId: "320520"
        }
    });
};

Sockets.getOnline = function() {
    Sockets.emit('request', {
        api: 'common',
        methodName: 'getOnline'
    });
};

//
Sockets.processVK = function(response) {

};
Sockets.processFB = function(response) {

};
Sockets.processDB = function(response) {

};
Sockets.processCommon = function(response) {
    switch (response.methodName) {
        case 'getOnline':
            if (response.response)
                console.log('current online',response.response);
            break;
    }
};