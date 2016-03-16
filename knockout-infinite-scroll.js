/**
 * InfiniteScroll binding.
 * version 1.0
 */
(function (factory) {
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        // CommonJS or Node: hard-coded dependency on 'knockout'
        factory(require('knockout'), exports);
    } else if (typeof define === 'function' && define['amd']) {
        // AMD anonymous module with hard-coded dependency on 'knockout'
        define(['knockout', 'exports'], factory);
    } else {
        // <script> tag: use the global `ko` object
        factory(ko, {});
    }
}(function (ko, exports) {
    ko.bindingHandlers.infiniteScroll = {
        init: function(element, valueAccessor, allBindingsAccessor) {
            var lengthThreshold = allBindingsAccessor.get('scrollThreshold') || 50,
                timeThreshold = allBindingsAccessor.get('timeThreshold') || 400,
                handler = valueAccessor(),
                handlerTop,
                handlerBottom,
                inverse = false,
                promise = null,
                lastRemaining = 9999,
                lastRemainingInverse = 9999;

            lengthThreshold = parseInt(lengthThreshold, 10);
            timeThreshold = parseInt(timeThreshold, 10);

            switch (typeof handler) {
                case 'function':
                    handlerTop = handler;
                    break;
                case 'object':
                    if (typeof handler['handlerTop'] == 'function') {
                        handlerTop = handler['handlerTop'];
                    }
                    if (typeof handler['handlerBottom'] == 'function') {
                        handlerBottom = handler['handlerBottom'];
                        inverse = true;
                    }
                    if (!handlerTop && !handlerBottom) {
                        throw 'infiniteScroll requires a handlerTop or handlerBottom function';
                    }
                    break;
                default:
                    throw 'infiniteScroll requires a handler function';
            }
            ko.utils.registerEventHandler(element, 'scroll', function () {
                var remainingInverse = inverse ? element.scrollTop : null;
                var remaining = element.scrollHeight - (element.clientHeight + element.scrollTop);

                //if we have reached the threshold and we scroll down
                if (remaining < lengthThreshold && (remaining - lastRemaining) < 0) {
                    //if there is already a timer running which has no expired yet we have to cancel it and restart the timer
                    if (promise !== null) {
                        clearTimeout(promise);
                    }
                    promise = setTimeout(function () {
                        if (typeof handlerTop == 'function') {
                            handlerTop();
                        }
                        promise = null;
                    }, timeThreshold);
                }
                lastRemaining = remaining;

                if (remainingInverse !== null && remainingInverse < lengthThreshold && (remainingInverse - lastRemainingInverse) < 0) {
                    //if there is already a timer running which has no expired yet we have to cancel it and restart the timer
                    if (promise !== null) {
                        clearTimeout(promise);
                    }
                    promise = setTimeout(function () {
                        if (typeof handlerBottom == 'function') {
                            handlerBottom();
                        }
                        promise = null;
                    }, timeThreshold);
                }
                lastRemainingInverse = remainingInverse;
            });
        }
    };
}));