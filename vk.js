var apiKey = 2977876;
var apiSecret = '8LofcpKjh4K87NPyhTOE';
var host = 'api.vk.com';
var path = '/api.php';
var crypto = require('crypto');
var md5 = function(data) {
	return crypto.createHash('md5').update(data).digest('hex');
}
var httpOptions = {
	host: host,
	port: 80,
	path: path
};

var queryParams = [
	"api_id="+apiKey,
	"format=json",
	"v=3.0"
];

var http = null;
var gid = 'g35483018';

//public
function init(app_http) {
	http = app_http;
}

function getProfile(uid, callback) {
    makeRequest(generateQuery("getProfiles", "uids="+uid), callback);
}

function getNewsfeed(callback) {
    makeRequest(generateQuery("newsfeed.get", ["source_ids="+gid, 'filters=post']), callback);
}

//private
function generateQuery(methodName, methodParams) {
    var newParams = queryParams.slice(0).concat(methodParams);
    newParams.push("method="+methodName);
    newParams.sort();
    return newParams.join("&") + "&sig="+md5(newParams.join('') + apiSecret);
};

function makeRequest(newPath, callback) {
    httpOptions.path = path + "?" + newPath;
    var result = "";
    http.get(httpOptions, function(res) {
        res.setEncoding('utf8');
        var result = "";
        res.on('data', function(chunk) {
            result += chunk;
        });
        res.on('end', function() {
            if (callback)
                callback(JSON.parse(result));
        });
    }).on('error', function(e) {
            console.log('got error: ');
            console.dir(e);
    });
}

//exports
module.exports = this;
exports.init = init;
exports.getProfile = getProfile;
exports.getNewsfeed = getNewsfeed;