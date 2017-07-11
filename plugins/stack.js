var noClick = require('express-web').lib.noClick;

var _ = require('underscore');

module.exports = function(dom) {
    var $ = {
        dom: dom
    };

    var controllers = [];
    var scrollPositions = [];

    var isPushing = false;
    $.push = function(controller) {
        if (isPushing) {
            return false;
        }

        var backTop = window.scrollY;
        scrollPositions.push(backTop);

        var top = $.top();
        if (top) {
            top.dom.css({
                display:'none'
            });
        }

        if (controller.dom.css('display') === 'none') {
            controller.dom.css('display', 'block');
        }

        controller.dom.find('[data-stack-pop]').on('click', function(e) {
            $.pop();
            return noClick(e);
        });

        dom.append(controller.dom);
        controllers.push(controller);

        controller.trigger('push');

        isPushing = false;
        return true;
    };

    $.swap = function(controller) {
        if (controller === $.top()) {
            return;
        }
        if ($.push(controller)) {
            var removeIndex = controllers.length - 2;
            if (removeIndex >= 0) {
                controllers[removeIndex].dom.detach();
                controllers.splice(removeIndex, 1);
            }
        }
    };

    $.swapAll = function(controller) {
        if (controller === $.top()) {
            return;
        }

        var oldControllers = controllers;
        controllers = [];

        if ($.push(controller)) {
            _.each(oldControllers, function(oldController) {
                if (oldController !== controller) {
                    oldController.dom.detach();
                }
            });
        } else {
            controllers = oldControllers;
        }
    };

    var isPopping = false;
    $.pop = function(force) {
        if (isPopping) {
            return false;
        }
        if (controllers.length===1 && !force) {
            return false;
        }

        var controller = controllers.pop();
        var backTop = scrollPositions.pop();
        controller.dom.detach();

        setTimeout(function() {
            window.scrollTo(0,backTop);
        },0);

        controller.trigger('pop');

        var top = $.top();
        if (top) {
            top.dom.css({
                display: 'block'
            });
            top.trigger('redisplay');
        }

        isPopping = false;
        return true;
    };

    $.count = function() {
        return controllers.length;
    };

    $.top = function() {
        return (controllers.length > 0 && controllers[controllers.length - 1]) || null;
    };

    $.popTo = function(index) {
        while(controllers.length > index) {
            $.pop(true);
        }
    };

    return $;
};