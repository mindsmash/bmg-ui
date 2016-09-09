(function(undefined) {
    'use strict';

    angular
        .module('bmg-ui.docs')
        .controller('ConfirmationCtrl', ConfirmationCtrl);

    ConfirmationCtrl.$inject = ['userDialogs', 'toastr'];

    function ConfirmationCtrl(userDialogs, toastr) {
        var vm = this;

        vm.confirm = confirm;

        function confirm() {
            userDialogs.askForConfirmation(
                'Do you really want to hurt me?', // title
                'Do you really want to make me cry?', // text
                'Hurt him', // primary button caption
                'Cancel', // secondary button caption
                'danger' // primary button class suffix (optional)
            ).then(function() {
                toastr.success('Confirmed dialog successfully.', 'Success');
            }, function() {
                toastr.error('Canceled the dialog.', 'Canceled');
            });
        }
    }
})();
