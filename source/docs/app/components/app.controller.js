(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .controller('AppController', AppController);

    AppController.$inject = ['$aside', '$timeout', '$state'];

    function AppController($aside, $timeout, $state) {

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
		var notificationsCount = 0;
		var offsetTime = 60;

		var createNotificationsData = function(oldData, dataCount, handled, highlight, push) {
			notificationsCount = 0;
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
				} else {
					if (handled === undefined || handled) {
						notificationsCount++;
					}
					if (!!push) {
						notificationData.notifications.push(data);
					} else {
						notificationData.notifications.unshift(data);
					}
				}
				if (handled || highlight || handled === undefined || highlight === undefined) {
					notificationData.count = notificationData.highlightedNotifications.length + notificationsCount;
				}
			}
			return notificationData;
		};

        this.isCollapsed = true;

        this.notifications = {
			title: 'Notifications',
			template: 'app/template	s/components/notification-popover.html',
			data: createNotificationsData(null, 10, true)
		};

		this.addNotification = function() {
			this.notifications.data = createNotificationsData(this.notifications.data, 1, false, false);
		};

		this.addNewNotification = function() {
			this.notifications.data = createNotificationsData(this.notifications.data, 1, true, false);
		};

		this.addHighlightedNotification = function() {
			this.notifications.data = createNotificationsData(this.notifications.data, 1, true, true);
		};

		this.loadMoreItems = function() {
			this.notifications.data = createNotificationsData(this.notifications.data, 10, false, false, true);
			offsetTime += 60;
		};

		this.handleUrl = function(data) {
			for (var i = 0; i < this.notifications.data.notifications.length; i++) {
				if (this.notifications.data.notifications[i].id === data.notification.id && !this.notifications.data.notifications[i].handled) {
					this.notifications.data.notifications[i].handled = true;
				}
				$state.go('index.' + data.notification.url);
			}
		};

		this.markAllAsRead = function() {
			console.info('mark all notifications as read');
		};

		this.goToOverviewPage = function() {
			$state.go('release-detailpage');
		};

        this.navbarConfig = {
            collapsedHeight: 20,
            expandedHeight: 75,
            mindFloatThead: true
        };

        this.openAside = function(position, backdrop) {
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
    }

})(angular);
