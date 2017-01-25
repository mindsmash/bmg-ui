(function(angular) {
	'use strict';

	angular
		.module('bmg.components.ui')
		.run(['$templateCache', function($templateCache) {
			$templateCache.put('app/template/notification/notification-icon.html',
				'<a class="nav-notification-icon" data-ng-click="resetCounter()" uib-popover-template="template" ' +
				'popover-title="{{title}}" ' +
				'popover-placement="bottom-right" ' +
				'popover-class="notification-popover" ' +
				'popover-append-to-body="false" ' +
				'popover-trigger="outsideClick" ' +
				'popover-popup-delay="50"' +
				'popover-is-open="popover.isOpen">' +
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
				template: '=notificationTemplate',
				data: '=notificationData',
				title: '=?notificationTitle',
				loadMore: '&?notificationLoadMore',
				markAllAsRead: '&?notificationMarkAllAsRead',
				goToOverviewPage: '&?notificationGoToOverviewPage',
				handle: '&?notificationHandle',
				handleHighlighted: '&?notificationHandleHighlighted'
			},
			restrict: 'AE',
			templateUrl: 'app/template/notification/notification-icon.html',
			link: function(scope) {
				scope.dataArray = {
					highlightedNotifications: [],
					highlightedNotificationsTitle: '',
					notifications: [],
					notificationsTitle: ''
				};
				scope.highlightedNotificationsAvailable = false;
				scope.notificationsAvailable = false;
				scope.showLoading = true;
				scope.popover = {
					isOpen: false
				};

				var handleDataArray = function(diff) {
					scope.dataArray = {};
					if (!scope.data) {
						return {};
					}
					if (diff == 0) {
						scope.showLoading = false;
					}
					if (!!scope.data.highlightedNotifications && scope.data.highlightedNotifications.length > 0) {
						scope.highlightedNotificationsAvailable = true;
						scope.dataArray.highlightedNotifications = scope.data.highlightedNotifications;
						scope.dataArray.highlightedNotificationsTitle = !!scope.data.highlightedNotificationsTitle ? scope.data.highlightedNotificationsTitle : 'Highlighted notifications';
					}
					if (!!scope.data.notifications && scope.data.notifications.length > 0) {
						scope.notificationsAvailable = true;
						scope.dataArray.notifications = scope.data.notifications;
						scope.dataArray.notificationsTitle = !!scope.data.notificationsTitle ? scope.data.notificationsTitle : 'Notifications';
					}
				};

				scope.$on('navbar-collapsed', function() {
					scope.popover.isOpen = false;
					scope.$digest();
				});

				scope.$watch('data', function(newData, oldData) {
					var diff = 0;
					if (!!newData.notifications && !!oldData.notifications) {
						diff = newData.notifications.legnth - oldData.notifications.length;
					}
					handleDataArray(diff);
				}, true);

				scope.loadMoreNotifications = function() {
					scope.infiniteScrollDisabled = true;
					if (typeof scope.loadMore === "function") {
						scope.loadMore();
					} else {
						console.info('notification: no function is given for property \'loadMore\'.')
					}
					scope.infiniteScrollDisabled = false;
				};

				scope.handleHighlightNotification = function(notification) {
					if (!!scope.handleHighlighted) {
						if (typeof scope.handleHighlighted === "function") {
							scope.handleHighlighted({notification: notification});
						} else {
							console.info('notification: no function is given for property \'handleHighlighted\'.')
						}
					}
				};

				scope.handleNotification = function(notification) {
					if (!!scope.handle) {
						var index = _.findIndex(scope.data.notifications, notification);
						if (index >= 0) {
							scope.data.notifications[index].handled = true;
						}
						if (typeof scope.handle === "function") {
							scope.handle({notification: notification});
						} else {
							console.info('notification: no function is given for property \'handle\'.')
						}
					}
				};

				scope.handleMarkAllAsRead = function() {
					var handledNotifications = [];
					for (var i = 0; i < scope.data.notifications.length; i++) {
						if (!scope.data.notifications[i].handled) {
							scope.data.notifications[i].handled = true;
							handledNotifications.push(scope.data.notifications[i]);
						}
					}
					if (typeof scope.markAllAsRead === "function") {
						scope.markAllAsRead({notifications: handledNotifications});
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
					scope.$emit('notification-open', {newCount: scope.data.count});
				};
			}
		};
	}

})(angular);
