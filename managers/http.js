var ew = require('express-web');

var manager = ew.lib.manager;
var http = ew.lib.http;
var webController = ew.controllers.web;

var $ = module.exports = manager();

http.baseUrl = window.location.protocol + "//" + window.location.host;

http.persistentHeaders({
    'x-os-name' : 'web'
});

http.on('request', function() {
    webController.activityIndicator.show();
});

http.on('response', function() {
    webController.activityIndicator.hide();
});

http.on('timeout', function() {
    webController.displayAlert.clear().error("We're experiencing network issues. Please try again later.");
    webController.activityIndicator.hide();
});

http.on('bad-request', function(json) {
    webController.displayAlert.clear().error([json.error]);
    webController.activityIndicator.hide();
});

http.on('error', function(response, json) {
    var message = json && json.error || "We're sorry, but something went wrong.  We've been notified about this issue and we'll take a look at it shortly."
    webController.displayAlert.clear().error([message]);
    webController.activityIndicator.hide();
});