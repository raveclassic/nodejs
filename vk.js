var apiKey = 2977876;
var apiSecret = '8LofcpKjh4K87NPyhTOE';
var host = 'api.vk.com';
var path = '/api.php';
var md5 = function(data) {
	return require('crypto').createHash('md5').update(data).digest('hex');
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

function init(app_http) {
	http = app_http;
}

function generateQuery(methodName, methodParams) {
	var newParams = queryParams.slice(0).concat(methodParams); 
	newParams.push("method="+methodName);
	newParams.sort();
	return newParams.join("&") + "&sig="+md5(newParams.join('') + apiSecret); 
};

function getProfile(userId, callback) {
	httpOptions.path = path + "?" + generateQuery("getProfiles", ["uids="+userId]);
	console.dir(httpOptions);
	var self = this;
	var result = "";
	http.get(httpOptions, function(res) {
		//console.log(JSON.stringify(res.headers));
		res.setEncoding('utf8');
		var result = "";  
		
		res.on('data', function(chunk) {
			//console.log(chunk);
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
exports.init = init;
exports.getProfile = getProfile;
exports.generateQuery = generateQuery;
