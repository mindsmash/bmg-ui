(function(undefined) {
    'use strict';

    angular
        .module('bmg-ui.docs')
        .controller('BmgDatepickerController', BmgDatepickerController);

    function BmgDatepickerController() {
        this.today = function() {
            this.dt = new Date();
        };
        this.today();

        this.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            startingDay: 1,
            showWeeks: false
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        this.open = function() {
            this.popup.opened = true;
        };

        this.setDate = function(year, month, day) {
            this.dt = new Date(year, month, day);
        };

        this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        this.format = this.formats[2];

        this.popup = {
            opened: false
        };
    }

})();
