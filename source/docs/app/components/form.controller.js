(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .controller('FormController', FormController)
        .filter('propsFilter', propsFilter);

    FormController.$inject = ['$scope', '$http'];

    function FormController($scope, $http) {
        $scope.email_correct = 'firstname.lastname@bmg.com';
        $scope.email_incorrect = '123456789';
        $scope.password = '***';
        $scope.value = 24000;

        $scope.selected = undefined;
        $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        $scope.address = {};
        $scope.refreshAddresses = function(address) {
            if (!address) {
                address = 'Große Elbstraße 145E';
            }
            var params = {address: address, sensor: false};
            return $http.get(
                'https://maps.googleapis.com/maps/api/geocode/json',
                {params: params}
            ).then(function(response) {
                $scope.addresses = response.data.results;
            });
        };

        var _selected;
        $scope.ngModelOptionsSelected = function(value) {
            if (arguments.length) {
                _selected = value;
            } else {
                return _selected;
            }
        };

        $scope.modelOptions = {
            debounce: {
                default: 500,
                blur: 250
            },
            getterSetter: true
        };

        $scope.allPeople = [{
            name: 'Adam', age: 34, email: 'adam@gmail.com'
        }, {
            name: 'George', age: 46, email: 'george@yahoo.com'
        }, {
            name: 'Eric', age: 62, email: 'eric@gmx.de'
        }, {
            name: 'Robert', age: 23, email: 'robert@gmail.com'
        }, {
            name: 'Vanessa', age: 31, email: 'vanessa@facebook.com'
        }, {
            name: 'Eva', age: 34, email: 'eva@hotmail.com'
        }, {
            name: 'Laura', age: 50, email: 'laura@gmail.com'
        }, {
            name: 'Lisa', age: 24, email: 'lisa@gmx.de'
        }];

        $scope.multipleDemo = {
            selectedPeople: []
        };
    }

    propsFilter.$inject = [];

    function propsFilter() {
        return function(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                var keys = Object.keys(props);

                items.forEach(function(item) {
                    var itemMatches = false;

                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();

                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    }

})(angular);
