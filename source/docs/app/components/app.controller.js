(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$aside', '$timeout', '$state'];

    function AppController($scope, $aside, $timeout, $state) {
    	var self = this;

		Array.prototype.randomElement = function () {
			return this[Math.floor(Math.random() * this.length)];
		};

		var id = 1;
		var usernames = ['Mariam Poche', 'Nenita Schamber', 'Breann Hartung', 'Moshe Pinero', 'Caterina Steimle', 'Isabelle Vermillion', 'Henriette Joyce', 'Dorian Radke', 'Dale Stanton', 'Jenny Alward'];
		var actions = ['edited data', 'exported data', 'deleted data', 'commented data'];
		var icons = [
			['fa-pencil', 'color-default'],
			['fa-check', 'color-success'],
			['fa-trash', 'color-secondary'],
			['fa-times', 'color-error']
		];
		var offsetTime = 60;

		self.isCollapsed = true;

		self.notifications = {
			title: 'Notifications',
			template: 'app/templates/components/notification-popover.html',
			data: createNotificationsData(null, 10, true)
		};

		function createNotificationsData(oldData, dataCount, handled, highlight, push) {
			var notificationsCount = 0;
			if (!!oldData) {
				var notificationData = oldData;
			} else {
				var notificationData = {
					highlightedNotifications: [],
					highlightedNotificationsTitle: 'Call to actions',
					notifications: [],
					notificationsTitle: 'Notifications',
					count: 0
				};
			}
			var date = new Date();
			var timestamp = undefined;
			if (!!push) {
				timestamp = date.setTime(date.getTime() - offsetTime * 60000);
			} else {
				timestamp = date.setTime(date.getTime() - 30 * 60000);
			}
			for (var i = 0; i < dataCount; i++) {
				var icon = icons.randomElement();
				var data = {
					id: id++,
					handled: handled !== undefined ? !handled : Math.random() >= 0.5,
					icon: {
						symbol: icon[0],
						color: icon[1]
					},
					username: usernames.randomElement(),
					action: actions.randomElement(),
					message: Math.random() >= 0.6 ? 'a long example message text' : undefined,
					date: timestamp,
					url: 'notifications'
				};
				if (highlight !== undefined ? highlight : Math.random() >= 0.8) {
					if (!!push) {
						notificationData.highlightedNotifications.push(data);
					} else {
						notificationData.highlightedNotifications.unshift(data);
					}
					notificationsCount++;
				} else {
					if (!!push) {
						notificationData.notifications.push(data);
					} else {
						notificationData.notifications.unshift(data);
					}
					if (handled === undefined || handled) {
						notificationsCount++;
					}
				}
			}
			notificationData.count += notificationsCount;
			return notificationData;
		}

		self.addNotification = function() {
			self.notifications.data = createNotificationsData(self.notifications.data, 1, false, false);
		};

		self.addNewNotification = function() {
			self.notifications.data = createNotificationsData(self.notifications.data, 1, true, false);
		};

		self.addHighlightedNotification = function() {
			self.notifications.data = createNotificationsData(self.notifications.data, 1, true, true);
		};

		self.loadMoreNotifications = function() {
			self.notifications.data = createNotificationsData(self.notifications.data, 10, false, false, true);
			offsetTime += 60;
		};

		self.handle = function(data) {
			$state.go('index.' + data.notification.url);
		};

		self.markAllAsRead = function(data) {
			console.info('mark all notifications as read', data);
		};

		self.goToOverviewPage = function() {
			$state.go('release-detailpage');
		};

        self.navbarConfig = {
            collapsedHeight: 20,
            expandedHeight: 75,
            mindFloatThead: true
        };

        self.openAside = function(position, backdrop) {
            var asideInstance = $aside.open({
                templateUrl: 'app/templates/aside/apps.html',
                placement: position,
                size: 'sm',
                backdrop: 'static',
                windowClass: 'app-aside-left',
                animation: true,
                controller: function($scope, $uibModalInstance) {
                    var backdropElem;

                    $scope.ok = function() {
                        $uibModalInstance.close();
                    };

                    $scope.cancel = function() {
                        fadeOut($uibModalInstance, backdropElem);
                    };

                    $timeout(function () {
                        backdropElem = $('.modal-backdrop').parent();
                        backdropElem.click(function(e) {
                            if ($(e.target).hasClass('modal')) {
                                fadeOut($uibModalInstance, backdropElem);
                            }
                        });
                    });

                    $scope.$on('$destroy', function() {
                        backdropElem.unbind('click');
                    });
                }
            });

            function fadeOut($uibModalInstance, backdropElem) {
                backdropElem.find('.modal-backdrop').animate({
                    opacity: 0
                }, 200);

                $('.app-aside-left .modal-content').animate({
                    left: '-378px'
                }, 200, function() {
                    $uibModalInstance.dismiss();
                });
            }
        };

		$scope.$on('notification-open', function(event, data) {
			self.notifications.data.count = data.newCount;
		});

    }

})(angular);
