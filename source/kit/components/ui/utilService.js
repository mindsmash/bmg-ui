(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .factory('utilService', utilService);

    utilService.$inject = ['$timeout'];

    function utilService($timeout) {
        return {
            isPromise: isPromise,
            hideUndoBtn: hideUndoBtn,
            showUndoBtn: showUndoBtn,
            animateSuccessIndicator: animateSuccessIndicator,
            endAnimation: endAnimation,
            addLabelSupport: addLabelSupport
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

        function animateSuccessIndicator(commitPromise, undoBtn, container, errorCallback) {
            container.removeClass('has-error');
            showUndoBtn(undoBtn);

            if (commitPromise) {
                undoBtn
                    .find('i')
                    .removeClass('fa-undo')
                    .addClass('fa-spin fa-spinner');

                commitPromise.then(function() {
                    undoBtn
                        .find('i')
                        .removeClass('fa-spin fa-spinner')
                        .addClass('fa-check');
                    endAnimation(undoBtn);
                }, function(error) {
                    undoBtn
                        .find('i')
                        .removeClass('fa-spin fa-spinner')
                        .addClass('fa-remove');
                    container.addClass('has-error');
                    errorCallback(error);

                    endAnimation(undoBtn);
                });
            } else {
                undoBtn
                    .find('i')
                    .removeClass('fa-undo')
                    .addClass('fa-check');
                endAnimation(undoBtn);
            }
        }

        function endAnimation(undoBtn) {
            $timeout(function() {
                hideUndoBtn(undoBtn);
            }, 500);

            $timeout(function() {
                undoBtn
                    .find('i')
                    .removeClass('fa-check fa-remove')
                    .addClass('fa-undo');
            }, 600);
        }

        function addLabelSupport(id, callback) {
            if (id) {
                var labels = $('body').find('label[for=' + id + ']');

                labels.on('click', callback);
            }
        }
    }
})();
