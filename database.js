function DatabaseConnector() {
    mongo = require("mongodb");

    dbHost = "ds033217.mongolab.com";
    dbPort = 33217;
    dbName = "heroku_app4757825";
    dbLogin = "global_vibes_admin";
    dbPassword = "globalvibespassword525";

    connection = null;
}

DatabaseConnector.prototype.open = function(onSuccess, onError) {
    console.log("Connecting to",dbHost+":"+dbPort+"/"+dbName);
    var client = new mongo.Db(dbName, new mongo.Server(dbHost, dbPort, {}));
    client.open(function(err, p_client) {
        if (err) {
            console.dir(err);
            if (onError)
                onError(err);
        } else {
            connection = p_client;
            if (onSuccess)
                onSuccess();
        }
    });
}

exports.open = DatabaseConnector.prototype.open;
exports.connection = DatabaseConnector.connection;
module.exports = new DatabaseConnector();