(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .controller('TableController', TableController);

    TableController.$inject = ['$scope', '$aside', 'TableDataService', 'TableColFilterService'];

    function TableController($scope, $aside, TableDataService, TableColFilterService) {

        var tableCtrl = this;

        tableCtrl.openFilterAside = function(position, backdrop) {
            var asideInstance = $aside.open({
                templateUrl: 'app/templates/aside/filter-aside.html',
                placement: position,
                size: 'sm',
                backdrop: backdrop,
                windowClass: 'app-aside-right table-aside',
                controller: function($uibModalInstance, TableDataService) {
                    var asideCtrl = this;

                    asideCtrl.ok = function() {
                        $uibModalInstance.close();
                    };
                    asideCtrl.cancel = function() {
						$('.app-aside-right .modal-content').animate({
							right: '-378px'
						}, 200, function() {
							$uibModalInstance.dismiss();
						});
                    };

                    asideCtrl.applyFilter = function() {
                        TableDataService.applyFilter(asideCtrl.filter);
                    }
                },
                controllerAs: 'asideCtrl'
            });
        };

        tableCtrl.openFilterColAside = function(position, backdrop) {
            var asideInstance = $aside.open({
                templateUrl: 'app/templates/aside/filter-col-aside.html',
                placement: position,
                size: 'sm',
                backdrop: backdrop,
                windowClass: 'app-aside-right table-aside',
                controller: function($uibModalInstance, TableColFilterService) {
                    var asideCtrl = this;

                    asideCtrl.ok = function() {
                        $uibModalInstance.close();
                    };
                    asideCtrl.cancel = function() {
						$('.app-aside-right .modal-content').animate({
							right: '-378px'
						}, 200, function() {
							$uibModalInstance.dismiss();
						});
                    };
                    
                    asideCtrl.colFilter = TableColFilterService.colFilter;
                    
                    asideCtrl.resetColFilter = function() {
                        TableColFilterService.resetColFilter();
                        asideCtrl.colFilter = TableColFilterService.colFilter;
                    };
                },
                controllerAs: 'asideCtrl'
            });
        };

        var fillData = function() {
            var a = [];
            for (var i = 0; i < 10; i++) {
                a.push({'a': 'Content A', 'b': 'Content B', 'c': 'Content C'});
            }
            return a;
        };
        tableCtrl.data = fillData();

        tableCtrl.sortType = '';
        tableCtrl.sortReverse = false;

        tableCtrl.sort = function(row_name) {
            return tableCtrl.sortType == row_name;
        };

        tableCtrl.tSortDir = function() {
            tableCtrl.sortReverse = !tableCtrl.sortReverse;
        };

        $scope.$watch(angular.bind(tableCtrl, function () {
            return TableDataService.data;
        }), function(newData) {
            tableCtrl.bigData = newData;
        });

        $scope.$watch(angular.bind(tableCtrl, function () {
            return TableColFilterService.colFilter;
        }), function(newData) {
            tableCtrl.filterCol = newData;
        });
    }

})(angular);