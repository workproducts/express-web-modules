var ew = require('express-web');

var controller = ew.lib.controller;
var view = ew.views.web;
var display = ew.plugins.display;
var stack = ew.plugins.stack;
var modal = ew.plugins.modal;

var $ = module.exports = controller(view());

$.displayAlert = display($.dom.find('#displayAlert'));
$.activityIndicator = display($.dom.find('#activityIndicator'));
$.stack = stack($.dom.find('#stack'));
$.modal = modal($.dom.find('#modal'));