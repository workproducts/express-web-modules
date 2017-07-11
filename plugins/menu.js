var plugins = require('express-web').plugins;

module.exports = function() {

    var $ = plugins.selectable();

    $.on('selected', function(e) {
        e.dom.addClass('active');
    });

    $.on('unselected', function(e) {
        e.dom.removeClass('active');
    });

    return $;
};