var apiKey = 2977876;
var apiSecret = '8LofcpKjh4K87NPyhTOE';
var allRights = 2015231;
var redirectURI = 'http://oauth.vk.com/blank.html';
var host = 'api.vk.com';
var path = '/api.php';
var crypto = require('crypto');

var accessToken = 'access_token=946ce23cdba21f2394dafa4b6b944576609946e9476b9ca1737299c78763a4b';

var md5 = function(data) {
	return crypto.createHash('md5').update(data).digest('hex');
}
//http://oauth.vk.com/authorize?client_id=2977876&scope=2015231&redirect_uri=http://oauth.vk.com/blank.html&display=page&response_type=token
//access_token=946ce23cdba21f2394dafa4b6b944576609946e9476b9ca1737299c78763a4b
var authRequest = 'http://oauth.vk.com/authorize?client_id='+apiKey+'&scope='+allRights+'&redirect_uri='+redirectURI+'&display=page&response_type=token';
var _authRequest = 'http://vkontakte.ru/login.php?app=2977876&layout=popup&type=browser';

var httpOptions = {
	host: host,
	port: 80,
	path: path
};

var queryParams = [
	'api_id='+apiKey,
	'format=json',
	'v=3.0'
];

var http = require('http'); //TODO: replace with Express
var gid = 'g35483018';

function makeRequest(methodName, methodParams, callback) {
    var newParams = queryParams.slice(0).concat(methodParams);
    newParams.push('method='+methodName);
    newParams.sort();
    httpOptions.path = path + '?' + newParams.join('&') + '&sig='+md5(newParams.join('') + apiSecret);
    var result = '';
    http.get(httpOptions, function(res) {
        res.setEncoding('utf8');
        var result = '';
        res.on('data', function(chunk) {
            result += chunk;
        });
        res.on('end', function() {
            if (callback)
                callback(checkResult(JSON.parse(result)));
        });
    }).on('error', function(e) {
            console.log('got error: ');
            console.dir(e);
    });
}

function checkResult(response, methodName) {
    response.status = response.error?'error':'ok';
    response.api = 'vk';
    response.methodName = methodName;
    return response;
}

//exports
module.exports = this;