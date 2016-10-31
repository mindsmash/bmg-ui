(function(undefined) {
    'use strict';

    angular
        .module('bmg.components.ui')
        .directive('sidebarBadge', sidebarBadge);

    function sidebarBadge() {
        return {
            replace: true,
            template: '<span class="tab-status"></span>',
            scope: {
                status: '@?'
            },
            link: function(scope, elem, attrs) {
                var badgeId = attrs.id;
                var possibleStatii = ['warning', 'success', 'error'];

                // initialize
                convertBadgeToType(scope.status || 'error');

                for (var i = 0; i < possibleStatii.length; i++) {
                    scope.$on(
                        'sidebarBadge.' + badgeId + '.' + possibleStatii[i],
                        convertBadgeToType.bind(null, possibleStatii[i])
                    );
                }

                function convertBadgeToType(type) {
                    var i;

                    if (type === 'error') {
                        elem
                            .addClass('status-error')
                            .removeClass('status-warning')
                            .removeClass('status-success');

                        elem.text('');
                        i = angular.element('<i class="fa fa-exclamation"></i>');
                        elem.append(i);
                    } else if (type === 'warning') {
                        elem
                            .addClass('status-warning')
                            .removeClass('status-error')
                            .removeClass('status-success');

                        elem.text('');
                        i = angular.element('<i class="fa fa-question"></i>');
                        elem.append(i);
                    } else if (type === 'success') {
                        elem
                            .addClass('status-success')
                            .removeClass('status-error')
                            .removeClass('status-warning');

                        elem.text('');
                        i = angular.element('<i class="fa fa-check"></i>');
                        elem.append(i);
                    }
                }
            }
        };
    }
})();
