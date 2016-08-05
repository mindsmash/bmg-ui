(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('inlineCheckbox', inlineCheckbox);

    function inlineCheckbox($timeout, miscService) {
        return {
            replace: true,
            scope: {
                ngModel: '=',
                oncommit: '&'
            },
            templateUrl: 'bmg/template/inline/checkbox.html',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                $timeout(function() {
                    var labelElem = $(elem).find('label');
                    var checkboxElem = $(elem).find('input');
                    var successIndicator = $(elem).find('.success-indicator');

                    // internal label support
                    labelElem.on('click', function() {
                        toggleModel();
                    });

                    // global label support
                    $('body').find('label[for="' + attrs.id + '"]').on('click', function() {
                        toggleModel();
                    });

                    function toggleModel() {
                        ngModel.$setViewValue(!ngModel.$viewValue);

                        var commitPromise = angular.isDefined(scope.oncommit) ?
                            scope.oncommit({
                                $data: ngModel.$viewValue
                            }) : undefined;

                        if (miscService.isPromise(commitPromise)) {
                            animateSuccessIndicator(commitPromise);
                        } else {
                            animateSuccessIndicator();
                        }
                    }

                    function animateSuccessIndicator(commitPromise) {
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
                            }, function() {
                                successIndicator
                                    .find('i')
                                    .removeClass('fa-spin fa-spinner')
                                    .addClass('fa-remove');
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
