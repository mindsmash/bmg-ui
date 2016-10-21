(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .controller('CheckboxSliderController', CheckboxSliderController);

    CheckboxSliderController.$inject = [];

    function CheckboxSliderController() {

        // checkbox
        this.checkbox = {
            notChecked: false,
            checked: true
        };

        // slider
        this.slider = {
            min: 25,
            max: 75,
            options: {
                floor: 0,
                ceil: 100
            }
        };

        this.radioOption = {
            name: 'a'
        };

    }

})(angular);
