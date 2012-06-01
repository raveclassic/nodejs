VK = function() { };
VK.apiKey = 2977876;
VK.allRights = 2015231;
VK.accessToken = '946ce23cdba21f2394dafa4b6b944576609946e9476b9ca1737299c78763a4b';
VK.apiUrl = 'https://api.vk.com/method/';
VK.redirectURI = 'http://oauth.vk.com/blank.html';

VK.requestToken = function() {
    alert('please copy accessToken value and paste it into the field in the upper part of the window!');
    try {
        VK.authWindow.close();
        VK.authWindow = null;
    } catch (e) { }
    VK.authWindow = window.open('http://oauth.vk.com/authorize?client_id='+VK.apiKey+'&scope='+VK.allRights+'&redirect_uri='+VK.redirectURI+'&display=page&response_type=token');
};

VK.updateToken = function() {
    var token = $.trim($("#tokenTextBox").val());
    if (token && token != '') {
        try {
            VK.authWindow.close();
            VK.authWindow = null;
        } catch (e) { }
        VK.accessToken = token;
    }
};

VK.makeRequest = function(method, params, callback) {
    $.ajax({
        url: VK.apiUrl + method + "?" + params.join('&') + "&access_token=" + VK.accessToken,
        success: function(response) {
            if (callback)
                callback(response);
        },
        error: function(error) {
            console.log('error', error);
        }
    });
};

VK.getUserInfo = function(uids, callback) {
    VK.makeRequest('users.get', 'uids='+uid.join(','), callback);
};