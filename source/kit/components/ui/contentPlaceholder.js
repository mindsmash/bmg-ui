(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('contentPlaceholder', contentPlaceholder);

    contentPlaceholder.$inject = ['$compile'];

    function contentPlaceholder($compile) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                contentPromise: '&'
            },
            bindToController: true,
            controllerAs: 'ctrl',
            transclude: true,
            require: 'contentPlaceholder',
            template: '<div data-ng-transclude></div>',
            link: function(scope, elem, attrs, ourCtrl) {
                showLoading();

                if (angular.isFunction(ourCtrl.contentPromise)) {
                    var promise = ourCtrl.contentPromise();

                    if (angular.isFunction(promise.then)) {
                        promise.then(function() {
                            showContent();
                        }, function(err) {
                            showError(err);
                        });
                    }
                }

                function showLoading() {
                    $(elem).children().hide();
                    $(elem)
                        .addClass('content-loading')
                        .append('<i class="fa fa-spin fa-spinner content-placeholder-loading"></i>');
                }

                function showContent() {
                    $(elem)
                        .removeClass('content-loading')
                        .find('.content-placeholder-loading')
                        .remove();
                    $(elem).children().show();
                }

                function showError() {
                    $(elem)
                        .removeClass('content-loading')
                        .find('.content-placeholder-loading')
                        .remove();
                    $(elem)
                        .append('<div class="content-error">' + err + '</div>');
                }
             },
            controller: function() {}
        };
    }
})();
