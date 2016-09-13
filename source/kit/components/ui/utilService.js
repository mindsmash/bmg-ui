(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .factory('utilService', utilService);

    function utilService() {
        return {
            isPromise: isPromise,
            hideUndoBtn: hideUndoBtn,
            showUndoBtn: showUndoBtn
        };

        function isPromise(promise) {
            // if it looks like a promise and walks like a promise …
            return angular.isDefined(promise) &&
                angular.isDefined(promise.then) &&
                angular.isFunction(promise.then);
        }

        function hideUndoBtn(undoBtn) {
            undoBtn.removeClass('active');
            undoBtn.attr('disabled', 'disabled');
        }

        function showUndoBtn(undoBtn) {
            undoBtn.addClass('active');
            undoBtn.removeAttr('disabled');
        }
    }
})();
