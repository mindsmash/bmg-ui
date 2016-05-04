(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .controller('NotificationController', NotificationController);

    NotificationController.$inject = ['toastr'];

    function NotificationController(toastr) {
        this.success = function() { toastr.success('Hello world!', 'Toastr fun!'); };
        this.warning = function() { toastr.warning('Your computer is about to explode!', 'Warning'); };
        this.info = function() { toastr.info('We are open today from 10 to 22', 'Information'); };
        this.error = function() { toastr.error('Your credentials are gone', 'Error'); };
    }

})(angular);