(function(undefined) {
    'use strict';

    angular
        .module('bmg-ui.docs')
        .controller('InlineEditController', InlineEditController);

    function InlineEditController($q, $timeout) {
        var vm = this;

        vm.data = {
            user: {
                firstname: 'David',
                lastname: 'Hasselhoff',
                birthDate: new Date(1989, 9, 10),
                deathDate: new Date(2067, 6, 14),
                stateOfBirth: 'North Dakota',
                stateOfDeath: 'New Hampshire',
                alive: true,
                dead: false,
                favoriteArtist: {
                    name: 'Justin Bieber',
                    country: 'Canada',
                    age: 22
                },
                leastFavoriteArtist: {
                    name: 'Liam Gallagher',
                    country: 'United Kingdom',
                    age: 43
                },
                answer: 45
            }
        };

        vm.answerError = 'Wrong answer, dumbhead.';

        vm.birthDatepickerOptions = {
            maxDate: new Date(),
            minMode: 'day',
            datepickerMode: 'year',
            showWeeks: false,
            startingDay: 1
        };

        vm.deathDatepickerOptions = angular.copy(vm.birthDatepickerOptions);
        vm.deathDatepickerOptions.maxDate = undefined;

        vm.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        vm.artists = [{
            name: 'Justin Bieber',
            country: 'Canada',
            age: 22
        }, {
            name: 'Britney Spears',
            country: 'United States',
            age: 34
        }, {
            name: 'Liam Gallagher',
            country: 'United Kingdom',
            age: 43
        }];

        vm.sendToServer = sendToServer;
        vm.saveImmediately = saveImmediately;

        function sendToServer(value) {
            var deferred = $q.defer();

            $timeout(function() {
                if (Math.random() > 0.5) {
                    deferred.resolve();
                } else {
                    deferred.reject('Fate has ordained that an error shall occur.');
                }
            }, 1000);

            return deferred.promise;
        }

        function saveImmediately(value) {
            // Do sth with the value
        }
    }

    InlineEditController.$inject = ['$q', '$timeout'];
})();
