(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineCheckbox', inlineCheckbox);

    function inlineCheckbox($timeout, utilService) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                oncommit: '&',
                disabled: '=?',
                tabindex: '@?'
            },
            templateUrl: 'bmg/template/inline/checkbox.html',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                $timeout(function() {
                    var labelElem = $(elem).find('label');
                    var checkboxElem = $(elem).find('input');
                    var successIndicator = $(elem).find('.success-indicator');
                    var container = $(elem).closest('.inline-edit-container');

                    // internal label support
                    labelElem.on('click', function() {
                        toggleModel();
                    });

                    // global label support
                    utilService.addLabelSupport(attrs.id, function() {
                        toggleModel();
                    });

                    function toggleModel() {
                        ngModel.$setViewValue(!ngModel.$viewValue);

                        // inform tabbable form about focus change
                        if (scope.tabindex) {
                            scope.$emit('inline-form.focus-changed', parseInt(scope.tabindex, 10));
                        }

                        var commitPromise = angular.isDefined(scope.oncommit) ?
                            scope.oncommit({
                                $data: ngModel.$viewValue
                            }) : undefined;

                        if (utilService.isPromise(commitPromise)) {
                            animateSuccessIndicator(commitPromise);
                        } else {
                            animateSuccessIndicator();
                        }
                    }

                    function animateSuccessIndicator(commitPromise) {
                        container.removeClass('has-error');
                        successIndicator.addClass('active');

                        if (commitPromise) {
                            successIndicator
                                .find('i')
                                .removeClass('fa-remove fa-check')
                                .addClass('fa-spin fa-spinner');

                            commitPromise.then(function() {
                                successIndicator
                                    .find('i')
                                    .removeClass('fa-spin fa-spinner')
                                    .addClass('fa-check');
                                endAnimation();
                            }, function(error) {
                                successIndicator
                                    .find('i')
                                    .removeClass('fa-spin fa-spinner')
                                    .addClass('fa-remove');
                                container.addClass('has-error');
                                scope.errorMessage = error;

                                endAnimation();
                            });
                        } else {
                            successIndicator
                                .find('i')
                                .removeClass('fa-check fa-remove')
                                .addClass('fa-check');
                            endAnimation();
                        }
                    }

                    function endAnimation() {
                        $timeout(function() {
                            successIndicator.removeClass('active');
                        }, 500);
                    }
                });
            }
        };
    }
})();
