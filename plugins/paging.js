var ew = require('express-web');
var noClick = ew.lib.noClick;
var EventEmitter = require('events');

module.exports = function(dom) {
    var $ = new EventEmitter();
    var paging = null;

    var previousDom = dom.find('[data-previous-page]');
    var currentDom = dom.find('[data-current-page]');
    var lastDom = dom.find('[data-last-page]');
    var nextDom = dom.find('[data-next-page]');
    
    previousDom.on('click', function(e) {
        if (paging.page > 1) {
            $.emit('pageSelected', paging.page - 1);
        }
        return noClick(e);
    });

    nextDom.on('click', function(e) {
        if (paging.page < paging.pages) {
            $.emit('pageSelected', paging.page + 1);
        }
        return noClick(e);
    });

    lastDom.on('click', function(e) {
        $.emit('pageSelected', paging.pages);
        return noClick(e);
    });

    $.load = function(_paging) {
        paging = _paging || {};
        if (paging.page > 1) {
            previousDom.removeClass('disabled');
        } else {
            previousDom.addClass('disabled');
        }
        if (paging.page < paging.pages) {
            nextDom.removeClass('disabled');
        } else {
            nextDom.addClass('disabled');
        }
        currentDom.text(paging.page);
        lastDom.text(paging.pages);

        if (paging.pages == paging.page) {
            lastDom.css('visibility', 'hidden');
        } else {
            lastDom.css('visibility', 'visible');
        }
    };
    
    return $;
};
