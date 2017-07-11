module.exports = function(defaultImage) {
    var $ = {};

    $.load = function(elDom) {
        if (elDom[0].nodeName === 'IMG') {
            elDom.on('error', function() {
                elDom.attr('src', defaultImage);
            });
        } else {
            elDom.find('img').on('error', function(e) {
                jQuery(e.target).attr('src', defaultImage);
            });
        }
    };

    return $;
};