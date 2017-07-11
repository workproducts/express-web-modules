module.exports = function(dom, callback) {
    dom.on('keydown', function(e) {
        if (e.keyCode == 13) {
            callback(e);
        }
    });
};