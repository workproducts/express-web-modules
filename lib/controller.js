var ew = require('express-web');

module.exports = function(elOrHtml) {
    var manager = ew.lib.manager;

    var controller = manager();
    controller.dom = jQuery(elOrHtml||'<div></div>');
    return controller;
};