(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .factory('userDialogs', userDialogs)
        .controller('UserDialogConfirmCtrl', UserDialogConfirmCtrl);

    userDialogs.$inject = ['$uibModal'];

    function userDialogs($uibModal) {
        return {
            askForConfirmation: askForConfirmation
        };

        function askForConfirmation(title, text, primaryActionCaption, secondaryActionCaption,
                primaryClass) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'user/dialogs/confirm.html',
                controller: 'UserDialogConfirmCtrl as ctrl',
                resolve: {
                    title: function() {
                        return title;
                    },
                    text: function() {
                        return text;
                    },
                    primaryActionCaption: function() {
                        return primaryActionCaption;
                    },
                    secondaryActionCaption: function() {
                        return secondaryActionCaption;
                    },
                    primaryClass: function() {
                        return angular.isDefined(primaryClass) ? primaryClass : 'primary';
                    }
                }
            });

            return modalInstance.result;
        }
    }

    UserDialogConfirmCtrl.$inject = ['$uibModalInstance', 'title', 'text',
        'primaryActionCaption', 'secondaryActionCaption', 'primaryClass'];

    function UserDialogConfirmCtrl($uibModalInstance, title, text,
            primaryActionCaption, secondaryActionCaption, primaryClass) {
        var vm = this;

        vm.ok = ok;
        vm.cancel = cancel;
        vm.title = title;
        vm.text = text;
        vm.primaryActionCaption = primaryActionCaption;
        vm.secondaryActionCaption = secondaryActionCaption;
        vm.primaryClass = primaryClass;

        function ok() {
            $uibModalInstance.close();
        }

        function cancel() {
            $uibModalInstance.dismiss();
        }
    }
})();
