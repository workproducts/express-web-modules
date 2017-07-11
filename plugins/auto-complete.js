var EventEmitter = require('events');

module.exports = function(dom) {
    var $ = new EventEmitter();

    var timeout = null;
    var lastFiredValue = null;

    var fire = function() {
        var currentValue = dom.val();
        if (currentValue == lastFiredValue) {
            return;
        }
        lastFiredValue = currentValue;

        $.emit('complete', lastFiredValue);
    };

    var handleEvent = function() {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(fire, 750);
    };

    dom.on('paste', handleEvent);
    dom.on('keydown', handleEvent);

    return $;
};