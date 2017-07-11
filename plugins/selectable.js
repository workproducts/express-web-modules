var ew = require('express-web');
var Emitter = require('events');
var _ = require('underscore');
var noClick = ew.lib.noClick;

module.exports = function() {

    var $ = new Emitter();

    var lastSelectedDom = null;
    var lastSelectedIndex = -1;
    var doms = null;

    $.load = function(_doms) {
        lastSelectedDom = null;
        lastSelectedIndex = -1;
        doms = _doms;
        _.each(doms, function(dom, index) {
            dom.on('click', function(e) {
                $.select(index);
                return noClick(e);
            });
        });
    };

    var doSelect = function(e) {
        var dom = e.dom;
        var index = e.index;

        if (lastSelectedDom) {
            $.emit('unselected', {
                index: lastSelectedIndex,
                dom: lastSelectedDom
            });
        }
        lastSelectedDom = dom;
        lastSelectedIndex = index;
        return lastSelectedDom;
    };

    $.select = function(index) {
        console.log('index', index);
        console.log('lastSelectedIndex', lastSelectedIndex);
        if (index === lastSelectedIndex) return;

        var dom = doms[index];
        console.log('about to emit selected')
        $.emit('selected', {
            index: index,
            dom: dom
        });
    };

    $.selected = function() {
        return {
            index: lastSelectedIndex,
            dom: lastSelectedDom
        }
    };

    $.on('selected', doSelect);

    return $;
};