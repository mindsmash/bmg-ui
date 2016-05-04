(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .service('TableDataService', TableDataService);

    TableDataService.$inject = ['$filter'];

    function TableDataService($filter) {

        var init = function() {
            var randomValue = function(data) {
                return data[Math.floor(Math.random() * data.length)];
            };
            var bigDataStatus = function() {
                return randomValue([true, false]);
            };
            var bigDataSong = function() {
                return randomValue(['1234567890', '2345678901', '836585635', '7542235656']);
            };
            var bigDataStatusKey = function() {
                return randomValue(['LCD123456789A', 'LCD123456789B', 'LCD123456789C', 'LCD123456789S']);
            };
            var bigDataArtist = function() {
                return randomValue(['artist a', 'artist b', 'artist c', 'artist d']);
            };
            var bigDataTitle = function() {
                return randomValue(['title a', 'title b', 'title c', 'title d']);
            };
            var bigDataVerionTitle = function() {
                return randomValue(['verionTitle a', 'verionTitle b', 'verionTitle c', 'verionTitle d']);
            };
            var bigDataPubisher = function() {
                return randomValue(['pubisher a', 'pubisher b', 'pubisher c', 'pubisher d']);
            };
            var bigDataFormat = function() {
                return randomValue(['format a', 'format b', 'format c', 'format d']);
            };
            var bigDataReleaseDate = function() {
                return randomValue(['1-Jul-2012', '12-Jul-2012', '24-Jul-2012', '30-Jul-2012']);
            };

            var fillData = function() {
                var a = [];
                for (var i = 0; i < 50; i++) {
                    a.push({
                        'id': i,
                        'status': bigDataStatus(),
                        'song': bigDataSong(),
                        'statusKey': bigDataStatusKey(),
                        'artist': bigDataArtist(),
                        'title': bigDataTitle(),
                        'versionTitle': bigDataVerionTitle(),
                        'publisher': bigDataPubisher(),
                        'format': bigDataFormat(),
                        'releaseDate': bigDataReleaseDate()
                    });
                }
                return a;
            };
            return fillData();
        };
        this.data = init();

        this.resetData = function() {
            this.data = init();
        };

        this.applyFilter = function(filterData) {
            this.data = init();
            this.data = $filter('filter')(this.data, filterData, true);
        };
    }

})(angular);