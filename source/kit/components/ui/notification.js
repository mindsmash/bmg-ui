(function(angular) {
	'use strict';

	angular
		.module('bmg.components.ui')
		.run(['$templateCache', function($templateCache) {
			$templateCache.put('bmg/template/notification/notification-icon.html',
				'<a class="nav-notification-icon" data-ng-click="resetCounter()" uib-popover-template="template" ' +
				'popover-title="{{title}}" ' +
				'popover-placement="bottom-right" ' +
				'popover-class="notification-popover" ' +
				'popover-append-to-body="false" ' +
				'popover-trigger="outsideClick">' +
				'	<notification-icon count="data.count" animation="\'bounce\'">' +
				'		<i class="fa fa-bell-o fa-2x"></i>' +
				'	</notification-icon>' +
				'</a>');
		}]);

	angular
		.module('bmg.components.ui')
		.directive('notification', notification);

	angular
		.module('infinite-scroll')
		.value('THROTTLE_MILLISECONDS', 500);

	notification.$inject = [];

	function notification() {
		return {
			replace: true,
			scope: {
				title: '=',
				template: '=',
				data: '=',
				loadMore: '&?',
				markAllAsRead: '&?',
				goToOverviewPage: '&?',
				handleUrl: '&?',
				handleHighlightUrl: '&?'
			},
			restrict: 'AE',
			templateUrl: 'bmg/template/notification/notification-icon.html',
			link: function(scope) {
				scope.dataArray = {
					highlightedNotifications: [],
					highlightedNotificationsTitle: '',
					notifications: [],
					notificationsTitle: ''
				};
				scope.highlightedNotificationsAvailable = false;
				scope.notificationsAvailable = false;
				scope.loading = true;
				var diff = 0;

				var handleDataArray = function() {
					scope.dataArray = {};
					if (!scope.data) {
						return {};
					}
					if (diff > 0) {
						scope.loading = false;
					}
					if (!!scope.data.highlightedNotifications && scope.data.highlightedNotifications.length > 0) {
						scope.highlightedNotificationsAvailable = true;
						scope.dataArray.highlightedNotifications = scope.data.highlightedNotifications;
						scope.dataArray.highlightedNotificationsTitle = !!scope.data.highlightedNotificationsTitle ? scope.data.highlightedNotificationsTitle : 'Highlighted notifications';
					}
					if (!!scope.data.notifications && scope.data.notifications.length > 0) {
						scope.notificationsAvailable = true;
						scope.dataArray.notificationsTitle = !!scope.data.notificationsTitle ? scope.data.notificationsTitle : 'Notifications';
						scope.dataArray.notifications = scope.data.notifications;
					}
				};

				scope.loadMoreNotifications = function() {
					scope.infiniteScrollDisabled = true;
					if (typeof scope.loadMore === "function") {
						scope.loadMore();
					} else {
						console.info('notification: no function is given for property \'loadMore\'.')
					}
					scope.infiniteScrollDisabled = false;
				};

				scope.$watch('data', function() {
					handleDataArray();
				}, true);

				scope.handleHighlightNotification = function(notification) {
					if (!!scope.handleHighlightUrl) {
						if (typeof scope.handleHighlightUrl === "function") {
							scope.handleHighlightUrl({notification: notification});
						} else {
							console.info('notification: no function is given for property \'handleHighlightUrl\'.')
						}
					}
				};

				scope.handleNotification = function(notification) {
					if (!!scope.handleUrl) {
						scope.handleUrl({notification: notification});
						if (typeof scope.handleUrl === "function") {
							scope.handleUrl({notification: notification});
						} else {
							console.info('notification: no function is given for property \'handleUrl\'.')
						}
					}
				};

				scope.handleMarkAllAsRead = function() {
					for (var i = 0; i < scope.data.notifications.length; i++) {
						if (!scope.data.notifications[i].handled) {
							scope.data.notifications[i].handled = true;
						}
					}
					if (typeof scope.markAllAsRead === "function") {
						scope.markAllAsRead();
					} else {
						console.info('notification: no function is given for property \'markAllAsRead\'.')
					}
				};

				scope.goToOverviewPageAvailable = function() {
					return typeof scope.goToOverviewPage === "function";
				};

				scope.handleOverviewPage = function() {
					if (typeof scope.goToOverviewPage === "function") {
						scope.goToOverviewPage();
					} else {
						console.info('notification: no function is given for property \'goToOverviewPage\'.')
					}
				};

				scope.resetCounter = function() {
					if (!!scope.data.highlightedNotifications) {
						scope.data.count = scope.data.highlightedNotifications.length;
					}
				}
			}
		};
	}

})(angular);
