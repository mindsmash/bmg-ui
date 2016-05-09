(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .service('TableColFilterService', TableColFilterService);

    TableColFilterService.$inject = [];

    function TableColFilterService() {

        var init = function() {
            var colFilter = {
                'id': true,
                'status': true,
                'song': true,
                'statusKey': true,
                'artist': true,
                'title': true,
                'versionTitle': true,
                'publisher': true,
                'format': true,
                'releaseDate': true
            };
            return colFilter;
        };

        this.colFilter = init();

        this.resetColFilter = function() {
            this.colFilter = init();
        };
    }

})(angular);