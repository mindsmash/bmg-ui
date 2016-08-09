(function(undefined) {
    'use strict';

    angular
        .module('bmg-ui.docs')
        .controller('InlineEditController', InlineEditController);

    function InlineEditController($q, $timeout) {
        var vm = this;

        vm.data = {
            user: {
                name: 'David Hasselhoff',
                birthDate: new Date(1989, 9, 10),
                residence: 'North Dakota'
            }
        };

        vm.datepickerOptions = {
            maxDate: new Date(),
            minMode: 'day',
            datepickerMode: 'month',
            showWeeks: false,
            startingDay: 1
        };

        vm.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

        vm.sendToServer = sendToServer;

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
    }

    InlineEditController.$inject = ['$q', '$timeout'];
})();
