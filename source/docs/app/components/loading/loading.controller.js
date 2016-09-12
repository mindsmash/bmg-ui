(function(undefined) {
    'use strict';

    angular
        .module('bmg-ui.docs')
        .controller('LoadingController', LoadingController)
        .directive('contentPlaceholderReloadButton', contentPlaceholderReloadButton);

    LoadingController.$inject = ['$q', '$timeout'];

    function LoadingController($q, $timeout) {
        var vm = this;

        vm.loadContent = loadContent;

        function loadContent() {
            var deferred = $q.defer();

            $timeout(function() {
                vm.content = {
                    heading: 'Some exciting headline',
                    text: 'An even more exciting content.'
                };

                deferred.resolve();
            }, 2000);

            return deferred.promise;
        }
    }

    contentPlaceholderReloadButton.$inject = ['$compile'];

    function contentPlaceholderReloadButton($compile) {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                $(elem).click(function() {
                    var newElemHtml = '<data-content-placeholder' +
    					'  id="j4825673gr2354f456f3"' +
    					'  data-content-promise="ctrl.loadContent()">' +
    					'  <h2 data-ng-bind="ctrl.content.heading"></h2>' +
    					'  <p data-ng-bind="ctrl.content.text"></p>' +
    				'</data-content-placeholder>';
                    var newElem = angular.element(newElemHtml);

                    $('#j4825673gr2354f456f3').replaceWith(newElem);
                    $compile(newElem)(scope);
                });
            }
        };
    }
})();
