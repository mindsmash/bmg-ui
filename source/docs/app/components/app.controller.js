(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .controller('AppController', AppController);

    AppController.$inject = ['$aside', '$timeout'];

    function AppController($aside, $timeout) {

        this.isCollapsed = true;

        this.openAside = function(position, backdrop) {
            var asideInstance = $aside.open({
                templateUrl: 'app/templates/apps.html',
                placement: position,
                size: 'sm',
                backdrop: 'static',
                windowClass: 'app-aside-left',
                animation: true,
                controller: function($scope, $uibModalInstance) {
                    var backdropElem;

                    $scope.ok = function() {
                        $uibModalInstance.close();
                    };

                    $scope.cancel = function() {
                        fadeOut($uibModalInstance, backdropElem);
                    };

                    $timeout(function () {
                        backdropElem = $('.modal-backdrop').parent();
                        backdropElem.click(function(e) {
                            if ($(e.target).hasClass('modal')) {
                                fadeOut($uibModalInstance, backdropElem);
                            }
                        });
                    });

                    $scope.$on('$destroy', function() {
                        backdropElem.unbind('click');
                    });
                }
            });

            function fadeOut($uibModalInstance, backdropElem) {
                backdropElem.find('.modal-backdrop').animate({
                    opacity: 0
                }, 200);

                $('.app-aside-left .modal-content').animate({
                    left: '-378px'
                }, 200, function() {
                    $uibModalInstance.dismiss();
                });
            }
        };
    }

})(angular);
