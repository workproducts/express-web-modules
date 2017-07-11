module.exports = function(dom) {
    var $ = {};

    var contentDom = dom.find('[data-modal-content]');

    $.load = function(controller) {
        contentDom.empty();
        contentDom.append(controller.dom);
    };

    $.open = function() {
        dom.foundation('open');
    };

    $.close = function() {
        dom.foundation('close');
    };

    return $;
};