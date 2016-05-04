(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .run(routesRun);

    routesRun.$inject = ['$rootScope', '$location', '$anchorScroll', '$state'];

    function routesRun($rootScope, $location, $anchorScroll, $state) {
        $rootScope.$state = $state;
        $rootScope.$on('$routeChangeSuccess', function() {
            if($location.hash()) {
                $anchorScroll();
            }
        });
    }

})(angular);