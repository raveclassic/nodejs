var dbHost = 'ds033257.mongolab.com';
var dbPort = 33257;
var dbName = 'vibesdb';
var dbUser = 'vibes_db_user';
var dbPass = 'a8d00b190faf07c76ec3c195a5984334';
var dbURI = 'mongodb://'+dbUser+':'+dbPass+'@'+dbHost+':'+dbPort+'/'+dbName;

var mongo = require('mongodb');
var db = null;
var connected = false;

connect();

function connect() {
    console.log('connecting to: '+dbURI);
    mongo.connect(dbURI, {}, function(err, data) {
        if (err) {
            console.log('error', err);
        } else {
            console.log('db is connected and authentificated');
        db = data;
//            data.collection('users', function(err, collection) { users = collection; });

            connected = true;
        }
    });
}

exports.getAllUsers = function(params, callback) {
    if (!connected) {
        return callback({
            status:'error',
            error:'db is down',
            methodName: 'getAllUsers'
        });
    }
    db.collection('users', function(err, collection) {
        callback({
            status:'ok',
            response:collection.find(),
            methodName: 'getAllUsers'
        });
    });
};


exports.getUserSettings = function(params, callback) {
    if (!connected) {
        return callback({
            status:'error',
            error:'db is down',
            methodName: 'getUserSettings'
        });
    }
    db.collection('users', function(err, collection) {
        console.log('searching for '+JSON.stringify(params));
        collection.findOne(params, function(err, data){
            callback({
                status:'ok',
                response: data,
                methodName: 'getUserSettings'
            });
        });
    });
};


//exports
module.exports = this;
exports.connected = connected;


//tests
//console.log(exports.getAllUsers());