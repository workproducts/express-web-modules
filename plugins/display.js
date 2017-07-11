module.exports = function(dom) {
    var $ = {
        isHidden: dom.css('display') === 'none'
    };

    $.show = function() {
        dom.css({
            display:'block'
        });
        $.isHidden = false;
    };

    $.hide = function() {
        dom.css({
            display:'none'
        });
        $.isHidden = true;
    };

    $.error = function(error) {
        $.clear();
        var displayMessage = dom.find('[data-display-message]');
        displayMessage.text(error);
        dom.removeClass('success');
        dom.addClass('alert');
        $.show();
        clearTimeout();
    };

    $.message = function(message) {
        $.clear();
        var displayMessage = dom.find('[data-display-message]');
        displayMessage.text(message);
        dom.removeClass('alert');
        dom.addClass('success');
        $.show();
        clearTimeout();
    };

    var clearTimeout = function() {
        setTimeout($.clear, 10000);
    };

    $.clear = function () {
        $.hide();
        var displayMessage = dom.find('[data-display-message]');
        displayMessage.empty();
        return $;
    };

    return $;
}