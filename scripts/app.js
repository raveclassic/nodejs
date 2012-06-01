App = function() {};
App.init = function() {
    Sockets.getOnline();
    App.UI.init();

};

//UI

App.UI = function() { };
App.UI.init = function() {

};

App.UI.showError = function(error) {
    console.log(error);
};

if (!console) {
    console = function() {};
    console.log = function() {};
}