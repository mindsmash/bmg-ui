(function (angular) {
    'use strict';

    angular.module('bmg-ui.docs', [
        'bmg.components.ui',
        'bmg.components.util',
        'ui.router',
        'ui.bootstrap',
        'toastr',
        'rzModule',
        'ngSanitize',
        'ui.select',
        'ngAside',
        'ngAnimate',
		'angularMoment',
        'sticky',
		'hc.marked',
		'angular-notification-icons',
		'infinite-scroll'
    ]);

})(angular);

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

(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .controller('CheckboxSliderController', CheckboxSliderController);

    CheckboxSliderController.$inject = [];

    function CheckboxSliderController() {

        // checkbox
        this.checkbox = {
            notChecked: false,
            checked: true
        };

        // slider
        this.slider = {
            min: 25,
            max: 75,
            options: {
                floor: 0,
                ceil: 100
            }
        };

        this.radioOption = {
            name: 'a'
        };

    }

})(angular);

(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .controller('DatepickerController', DatepickerController);

    DatepickerController.$inject = [];

    function DatepickerController() {
        this.today = function() {
            this.dt = new Date();
        };
        this.today();

        this.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            startingDay: 1,
            showWeeks: false
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        this.open = function() {
            this.popup.opened = true;
        };

        this.setDate = function(year, month, day) {
            this.dt = new Date(year, month, day);
        };

        this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        this.format = this.formats[0];

        this.popup = {
            opened: false
        };
    }

})(angular);
(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .controller('FormController', FormController)
        .filter('propsFilter', propsFilter);

    FormController.$inject = ['$scope', '$http'];

    function FormController($scope, $http) {
        $scope.email_correct = 'firstname.lastname@bmg.com';
        $scope.email_incorrect = '123456789';
        $scope.password = '***';
        $scope.value = 24000;

        $scope.selected = undefined;
        $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        $scope.address = {};
        $scope.refreshAddresses = function(address) {
            if (!address) {
                address = 'Große Elbstraße 145E';
            }
            var params = {address: address, sensor: false};
            return $http.get(
                'http://maps.googleapis.com/maps/api/geocode/json',
                {params: params}
            ).then(function(response) {
                $scope.addresses = response.data.results;
            });
        };

        var _selected;
        $scope.ngModelOptionsSelected = function(value) {
            if (arguments.length) {
                _selected = value;
            } else {
                return _selected;
            }
        };

        $scope.modelOptions = {
            debounce: {
                default: 500,
                blur: 250
            },
            getterSetter: true
        };

        $scope.allPeople = [{
            name: 'Adam', age: 34, email: 'adam@gmail.com'
        }, {
            name: 'George', age: 46, email: 'george@yahoo.com'
        }, {
            name: 'Eric', age: 62, email: 'eric@gmx.de'
        }, {
            name: 'Robert', age: 23, email: 'robert@gmail.com'
        }, {
            name: 'Vanessa', age: 31, email: 'vanessa@facebook.com'
        }, {
            name: 'Eva', age: 34, email: 'eva@hotmail.com'
        }, {
            name: 'Laura', age: 50, email: 'laura@gmail.com'
        }, {
            name: 'Lisa', age: 24, email: 'lisa@gmx.de'
        }];

        $scope.multipleDemo = {
            selectedPeople: []
        };
    }

    propsFilter.$inject = [];

    function propsFilter() {
        return function(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                var keys = Object.keys(props);

                items.forEach(function(item) {
                    var itemMatches = false;

                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();

                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    }

})(angular);

(function(undefined) {
    'use strict';

    angular
        .module('bmg-ui.docs')
        .controller('InlineEditController', InlineEditController);

    function InlineEditController($q, $timeout) {
        var vm = this;

        vm.data = {
            user: {
                firstname: 'David',
                lastname: 'Hasselhoff',
                birthDate: new Date(1989, 9, 10),
                deathDate: new Date(2067, 6, 14),
                stateOfBirth: 'North Dakota',
                stateOfDeath: 'New Hampshire',
                alive: true,
                dead: false,
                favoriteArtist: {
                    name: 'Justin Bieber',
                    country: 'Canada',
                    age: 22
                },
                leastFavoriteArtist: {
                    name: 'Liam Gallagher',
                    country: 'United Kingdom',
                    age: 43
                },
                answer: 45
            }
        };

        vm.answerError = 'Wrong answer, dumbhead.';

        vm.birthDatepickerOptions = {
            maxDate: new Date(),
            minMode: 'day',
            datepickerMode: 'year',
            showWeeks: false,
            startingDay: 1
        };

        vm.deathDatepickerOptions = angular.copy(vm.birthDatepickerOptions);
        vm.deathDatepickerOptions.maxDate = undefined;

        vm.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        vm.artists = [{
            name: 'Justin Bieber',
            country: 'Canada',
            age: 22
        }, {
            name: 'Britney Spears',
            country: 'United States',
            age: 34
        }, {
            name: 'Liam Gallagher',
            country: 'United Kingdom',
            age: 43
        }];

        function sendToServer(value) {
            var deferred = $q.defer();

            $timeout(function() {
                if (Math.random() > 0.5) {
                    deferred.resolve();
                } else {
                    deferred.reject('Fate has ordained that an error shall occur.');
                }
            }, 1000);

            return deferred.promise;
        }
		vm.sendToServer = sendToServer;

        function saveImmediately(value) {
            // Do sth with the value
        }
		vm.saveImmediately = saveImmediately;
    }

    InlineEditController.$inject = ['$q', '$timeout'];
})();

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
(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .controller('PaginationController', PaginationController);

    PaginationController.$inject = ['$log'];

    function PaginationController($log) {
        this.totalItems = 64;
        this.currentPage = 4;

        this.setPage = function (pageNo) {
            this.currentPage = pageNo;
        };

        this.pageChanged = function() {
            $log.log('Page changed to: ' + this.currentPage);
        };

        this.changePageNumber = function (page) {
            if(page) {
                this.bigCurrentPage = page;
            }
        };

        this.maxSize = 5;
        this.bigTotalItems = 175;
        this.bigCurrentPage = 1;
    }

})(angular);
(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .config(toastrConfig);

    toastrConfig.$inject = ['toastrConfig'];

    function toastrConfig(toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,
            closeButton: true,
            closeHtml: '<button>&times;</button>',
            iconClasses: {
                success: 'toast-success',
                info: 'toast-info',
                warning: 'toast-warning',
                error: 'toast-error'
            },
            newestOnTop: true,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body'
        });
    }

})(angular);
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

(function(undefined) {
    'use strict';

    angular
        .module('bmg-ui.docs')
        .controller('LoadingController', LoadingController)
        .directive('contentPlaceholderReloadButton', contentPlaceholderReloadButton);

    LoadingController.$inject = ['$q', '$timeout'];

    function LoadingController($q, $timeout) {
        var vm = this;

        vm.loadContent = loadContent;

        function loadContent() {
            var deferred = $q.defer();

            $timeout(function() {
                vm.content = {
                    heading: 'Some exciting headline',
                    text: 'An even more exciting content.'
                };

                deferred.resolve();
            }, 2000);

            return deferred.promise;
        }
    }

    contentPlaceholderReloadButton.$inject = ['$compile'];

    function contentPlaceholderReloadButton($compile) {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                $(elem).click(function() {
                    var newElemHtml = '<data-content-placeholder' +
    					'  id="j4825673gr2354f456f3"' +
    					'  data-content-promise="ctrl.loadContent()">' +
    					'  <h2 data-ng-bind="ctrl.content.heading"></h2>' +
    					'  <p data-ng-bind="ctrl.content.text"></p>' +
    				'</data-content-placeholder>';
                    var newElem = angular.element(newElemHtml);

                    $('#j4825673gr2354f456f3').replaceWith(newElem);
                    $compile(newElem)(scope);
                });
            }
        };
    }
})();

(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .controller('ModalInstanceCtrl', ModalInstanceCtrl);

    ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];

    function ModalInstanceCtrl($scope, $uibModalInstance) {
        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})(angular);
(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .controller('ModalController', ModalController);

    ModalController.$inject = ['$uibModal', '$log'];

    function ModalController($uibModal, $log) {
        this.openModal = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/templates/modal/mySimpleModal.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {}, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        this.openSlideModal1 = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/templates/modal/myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {}, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        this.openSlideModal2 = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/templates/modal/myModalContentWithAForm.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {}, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }

})(angular);

(function(angular) {
	'use strict';

	angular.module('bmg-ui.docs')
		.controller('EditableController', EditableController);

	EditableController.$inject = ['$filter', '$rootScope', '$q', '$timeout'];

	function EditableController($filter, $rootScope, $q, $timeout) {
		this.site = {
			value: 2,
			text: 'BMG Rights Management GE'
		};

		this.badgeStatus = 'Success';

		this.data = {
			numberField: {},
			sites: [
				{
					value: 1,
					text: 'BMG Rights Management UK',
					location: 'London'
				}, {
					value: 2,
					text: 'BMG Rights Management GE',
					location: 'Berlin'
				}, {
					value: 3,
					text: 'BMG Rights Management US',
					location: 'Los Angeles'
				}
			],
			badgeStatii: [
				'Success', 'Warning', 'Error'
			],
			barcode: '5016027101519',
			productCode: 'BFFP151',
			altProductCode: '',
			artistName: 'The Merry Pranksters',
			title: 'Peggy the Pistol/Hogs Are a Coming',
			date: new Date(1999, 4, 15),
			stateOfBirth: 'Arkansas',
			releaseDateTentative: true,
			notesComments: 'This is an auto-resizing textarea that will grow and shrink as you type text into it. What an amazing advance in technology.'
		};

		this.errors = {
			barcode: 'Number must be prime.'
		};

		this.loadAsync = function(query) {
			// reload list items based on query
		};

		this.showSites = function() {
			var selected = $filter('filter')(this.data.sites, {value: this.site.value});
			return (this.site.value && selected.length) ? selected[0].text : 'Not set';
		};

		this.opened = {};

		this.open = function($event, elementOpened) {
			$event.preventDefault();
			$event.stopPropagation();

			this.opened[elementOpened] = !this.opened[elementOpened];
		};

		this.updateDate = function(newDate) {
			this.data.date = newDate;
		};

		this.datepickerOptions = {
			maxDate: new Date(),
			minMode: 'day',
			datepickerMode: 'month',
			showWeeks: false,
			startingDay: 1
		};

		this.datepickerModelOptions = {
			//timezone: '+0000'
		};

		this.updateBadge = function(newStatus) {
			var eventName = 'sidebarBadge.generalStatus.';

			$rootScope.$broadcast(eventName + newStatus.toLowerCase());
		};

		this.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

		this.saveValue = function(value) {
			// Do something with the value
		};

		this.promiseValue = function(value) {
			var deferred = $q.defer();

			$timeout(function() {
				if (Math.random() > 0.5) {
					deferred.reject('A disruption in the force was detected.');
				} else {
					deferred.resolve();
				}
			}, 1000);
			return deferred.promise;
		};
	}

})(angular);

(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$uiViewScrollProvider', '$qProvider'];

    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, $uiViewScrollProvider, $qProvider) {
        $uiViewScrollProvider.useAnchorScroll();
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);

		// https://github.com/angular-ui/ui-router/issues/2889
		$qProvider.errorOnUnhandledRejections(false);

        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'app/templates/main.html'
            })
            .state('release-list', {
                url: '/release-list',
                templateUrl: 'app/templates/examples/release-list.html'
            })
            .state('release-detailpage', {
                url: '/release-detailpage',
                templateUrl: 'app/templates/examples/release-detailpage.html'
            })
            .state('release-structure', {
                url: '/release-structure',
                templateUrl: 'app/templates/examples/release-structure.html'
            })
            .state('grid', {
                url: '/grid',
                templateUrl: 'app/templates/examples/grid.html'
            })
            //anchor
            .state('index.typography', {
                url: '#typography'
            })
            .state('index.colors', {
                url: '#colors'
            })
            .state('index.grid', {
                url: '#grid'
            })
            .state('index.buttons', {
                url: '#buttons'
            })
            .state('index.button-group', {
                url: '#button-group'
            })
            .state('index.button-dropdown', {
                url: '#button-dropdown'
            })
            .state('index.pagination', {
                url: '#pagination'
            })
            .state('index.form', {
                url: '#form'
            })
            .state('index.checkbox-slider', {
                url: '#checkbox-slider'
            })
            .state('index.status', {
                url: '#status'
            })
            .state('index.loading-indicator', {
                url: '#loading-indicator'
            })
            .state('index.modal', {
                url: '#modal'
            })
            .state('index.confirmation-dialog', {
                url: '#confirmation-dialog'
            })
            .state('index.slide', {
                url: '#slide'
            })
            .state('index.alerts', {
                url: '#alerts'
            })
            .state('index.table', {
                url: '#table'
            })
            .state('index.datepicker', {
                url: '#datepicker'
            })
            .state('index.activities', {
                url: '#activities'
            })
            .state('index.filter', {
                url: '#filter'
            })
            .state('index.popover', {
                url: '#popover'
            })
			.state('index.notifications', {
                url: '#notifications'
            })
            .state('index.sticky', {
                url: '#sticky'
            })
            .state('index.inlineEdits', {
                url: '#inline-edits'
            })
			.state('index.panel', {
				url: '#panel-example'
			})
            .state('index.css', {
                url: '#css'
            });
    }

})(angular);

(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .run(routesRun);

    routesRun.$inject = ['$rootScope', '$location', '$anchorScroll', '$state'];

    function routesRun($rootScope, $location, $anchorScroll, $state) {
        $rootScope.$state = $state;
        $rootScope.$on('$routeChangeSuccess', function() {
            if($location.hash()) {
                $anchorScroll();
            }
        });
		$rootScope.$on('$stateChangeError', function() {
			$state.go('index');
		});
    }

})(angular);
(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .service('TableColFilterService', TableColFilterService);

    TableColFilterService.$inject = [];

    function TableColFilterService() {

        var init = function() {
            var colFilter = {
                'id': true,
                'status': true,
                'song': true,
                'statusKey': true,
                'artist': true,
                'title': true,
                'versionTitle': true,
                'publisher': true,
                'format': true,
                'releaseDate': true
            };
            return colFilter;
        };

        this.colFilter = init();

        this.resetColFilter = function() {
            this.colFilter = init();
        };
    }

})(angular);
(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .service('TableDataService', TableDataService);

    TableDataService.$inject = ['$filter'];

    function TableDataService($filter) {

        var init = function() {
            var randomValue = function(data) {
                return data[Math.floor(Math.random() * data.length)];
            };
            var bigDataStatus = function() {
                return randomValue([true, false]);
            };
            var bigDataSong = function() {
                return randomValue(['1234567890', '2345678901', '836585635', '7542235656']);
            };
            var bigDataStatusKey = function() {
                return randomValue(['LCD123456789A', 'LCD123456789B', 'LCD123456789C', 'LCD123456789S']);
            };
            var bigDataArtist = function() {
                return randomValue(['artist a', 'artist b', 'artist c', 'artist d']);
            };
            var bigDataTitle = function() {
                return randomValue(['title a', 'title b', 'title c', 'title d']);
            };
            var bigDataVerionTitle = function() {
                return randomValue(['verionTitle a', 'verionTitle b', 'verionTitle c', 'verionTitle d']);
            };
            var bigDataPubisher = function() {
                return randomValue(['pubisher a', 'pubisher b', 'pubisher c', 'pubisher d']);
            };
            var bigDataFormat = function() {
                return randomValue(['format a', 'format b', 'format c', 'format d']);
            };
            var bigDataReleaseDate = function() {
                return randomValue(['1-Jul-2012', '12-Jul-2012', '24-Jul-2012', '30-Jul-2012']);
            };

            var fillData = function() {
                var a = [];
                for (var i = 0; i < 50; i++) {
                    a.push({
                        'id': i,
                        'status': bigDataStatus(),
                        'song': bigDataSong(),
                        'statusKey': bigDataStatusKey(),
                        'artist': bigDataArtist(),
                        'title': bigDataTitle(),
                        'versionTitle': bigDataVerionTitle(),
                        'publisher': bigDataPubisher(),
                        'format': bigDataFormat(),
                        'releaseDate': bigDataReleaseDate()
                    });
                }
                return a;
            };
            return fillData();
        };
        this.data = init();

        this.resetData = function() {
            this.data = init();
        };

        this.applyFilter = function(filterData) {
            this.data = init();
            this.data = $filter('filter')(this.data, filterData, true);
        };
    }

})(angular);
(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .controller('TableController', TableController);

    TableController.$inject = ['$scope', '$aside', 'TableDataService', 'TableColFilterService'];

    function TableController($scope, $aside, TableDataService, TableColFilterService) {

        var tableCtrl = this;

        tableCtrl.openFilterAside = function(position, backdrop) {
            var asideInstance = $aside.open({
                templateUrl: 'app/templates/aside/filter-aside.html',
                placement: position,
                size: 'sm',
                backdrop: backdrop,
                windowClass: 'app-aside-right table-aside',
                controller: function($uibModalInstance, TableDataService) {
                    var asideCtrl = this;

                    asideCtrl.ok = function() {
                        $uibModalInstance.close();
                    };
                    asideCtrl.cancel = function() {
						$('.app-aside-right .modal-content').animate({
							right: '-378px'
						}, 200, function() {
							$uibModalInstance.dismiss();
						});
                    };

                    asideCtrl.applyFilter = function() {
                        TableDataService.applyFilter(asideCtrl.filter);
                    }
                },
                controllerAs: 'asideCtrl'
            });
        };

        tableCtrl.openFilterColAside = function(position, backdrop) {
            var asideInstance = $aside.open({
                templateUrl: 'app/templates/aside/filter-col-aside.html',
                placement: position,
                size: 'sm',
                backdrop: backdrop,
                windowClass: 'app-aside-right table-aside',
                controller: function($uibModalInstance, TableColFilterService) {
                    var asideCtrl = this;

                    asideCtrl.ok = function() {
                        $uibModalInstance.close();
                    };
                    asideCtrl.cancel = function() {
						$('.app-aside-right .modal-content').animate({
							right: '-378px'
						}, 200, function() {
							$uibModalInstance.dismiss();
						});
                    };
                    
                    asideCtrl.colFilter = TableColFilterService.colFilter;
                    
                    asideCtrl.resetColFilter = function() {
                        TableColFilterService.resetColFilter();
                        asideCtrl.colFilter = TableColFilterService.colFilter;
                    };
                },
                controllerAs: 'asideCtrl'
            });
        };

        var fillData = function() {
            var a = [];
            for (var i = 0; i < 10; i++) {
                a.push({'a': 'Content A', 'b': 'Content B', 'c': 'Content C'});
            }
            return a;
        };
        tableCtrl.data = fillData();

        tableCtrl.sortType = '';
        tableCtrl.sortReverse = false;

        tableCtrl.sort = function(row_name) {
            return tableCtrl.sortType == row_name;
        };

        tableCtrl.tSortDir = function() {
            tableCtrl.sortReverse = !tableCtrl.sortReverse;
        };

        $scope.$watch(angular.bind(tableCtrl, function () {
            return TableDataService.data;
        }), function(newData) {
            tableCtrl.bigData = newData;
        });

        $scope.$watch(angular.bind(tableCtrl, function () {
            return TableColFilterService.colFilter;
        }), function(newData) {
            tableCtrl.filterCol = newData;
        });
    }

})(angular);
angular.module("bmg-ui.docs").run(["$templateCache", function($templateCache) {$templateCache.put("app/templates/editable-textarea.html","<div class=\"form-group\">\n  <label class=\"col-sm-2 control-label\">Textarea</label>\n  <div class=\"col-sm-10\">\n    <msm-spinner></msm-spinner>\n  </div>\n</div>");
$templateCache.put("app/templates/hljs.html","<script>\n	jQuery(document).ready(function() {\n		$(\'pre code\').each(function(i, block) {\n			hljs.highlightBlock(block);\n		});\n	});\n</script>");
$templateCache.put("app/templates/main.html","<div class=\"body-header\">\n    <div class=\"container\">\n        <h1>BMG Bootstrap Style Guide</h1>\n        <p>This is supposed to be a title that is displayed beneath the navbar.</p>\n        <p>This is a page header for full-width elements that are not supposed to be displayed within a panel.</p>\n        <hr>\n        <h2>BMG UI-Kit dependencies <i class=\"fa fa-exclamation-triangle color-warning\"></i></h2>\n        <p>The BMG UI-Kit has following bower <strong>dependencies</strong>:</p>\n        <ul>\n            <li><a href=\"https://fortawesome.github.io/Font-Awesome/\">font-awesome</a></li>\n            <li><a href=\"https://github.com/mindsmash/mindsmash-source-sans-pro\">mindsmash-source-sans-pro</a></li>\n        </ul>\n        <p>The BMG UI-Kit has following bower <strong>development dependencies</strong>:</p>\n        <ul>\n            <li><a href=\"https://jquery.com/\">jquery</a></li>\n            <li><a href=\"http://getbootstrap.com/\">bootstrap</a></li>\n            <li><a href=\"https://angularjs.org/\">angular</a></li>\n            <li><a href=\"https://angular-ui.github.io/bootstrap/\">angular-bootstrap</a></li>\n            <li><a href=\"https://github.com/Foxandxss/angular-toastr\">angular-toastr</a></li>\n            <li><a href=\"https://github.com/angular-slider/angularjs-slider\">angularjs-slider</a></li>\n            <li><a href=\"https://github.com/angular-ui/ui-select\">angular-ui-select</a></li>\n            <li><a href=\"https://github.com/angular-ui/ui-router\">angular-ui-router</a></li>\n            <li><a href=\"https://github.com/angular/bower-angular-sanitize\">angular-sanitize</a></li>\n            <li><a href=\"https://github.com/dbtek/angular-aside\">angular-aside</a></li>\n            <li><a href=\"https://github.com/angular/bower-angular-animate\">angular-animate</a></li>\n            <li><a href=\"https://github.com/urish/angular-moment\">angular-moment</a></li>\n			<li><a href=\"https://github.com/monospaced/angular-elastic\">angular-elastic</a></li>\n			<li><a href=\"https://github.com/jacob-meacham/angular-notification-icons\">angular-notification-icons</a></li>\n            <li><a href=\"https://highlightjs.org/\">highlightjs</a></li>\n            <li><a href=\"http://holderjs.com/\">holderjs</a></li>\n			<li><a href=\"http://tether.io/\">tether</a></li>\n            <li><a href=\"http://mkoryak.github.io/floatThead/\">floatThead</a></li>\n            <li><a href=\"https://github.com/d-oliveros/ngSticky\">ngSticky</a></li>\n            <li><a href=\"https://github.com/lodash/lodash\">lodash</a></li>\n            <li><a href=\"https://github.com/sroze/ngInfiniteScroll\">ng-infinite-scroll</a></li>\n        </ul>\n        <p>To use some of these features you must include the required dependencies in your <strong>own bower.json</strong>.</p>\n        <h2>UI-Kit components</h2>\n        <p>Please add <strong>\'bmg.components.ui\'</strong> and <strong>\'bmg.components.util\'</strong> to your angular app dependencies!</p>\n        <pre><code class=\"JavaScript\">angular.module(\"app\", [\"bmg.components.ui\", \"bmg.components.util\"]);</code></pre>\n		<hr/>\n		<div marked src=\"\'CHANGELOG.md\'\">\n		</div>\n    </div>\n</div>\n<div class=\"container\" role=\"main\">\n    <!-- in production wrap panel div with: <div class=\"row\"><div class=\"col-lg-12\"> </div></div> -->\n	<!-- Grid -->\n	<div ng-include=\"\'app/templates/components/grid.html\'\"></div>\n    <!-- Typography -->\n	<div ng-include=\"\'app/templates/components/typography.html\'\"></div>\n    <!-- Colors -->\n	<div ng-include=\"\'app/templates/components/colors.html\'\"></div>\n    <!-- Buttons -->\n	<div ng-include=\"\'app/templates/components/buttons.html\'\"></div>\n    <!-- Button Group -->\n	<div ng-include=\"\'app/templates/components/button-group.html\'\"></div>\n    <!-- Button Dropdown -->\n	<div ng-include=\"\'app/templates/components/button-dropdown.html\'\"></div>\n    <!-- Pagination -->\n	<div ng-include=\"\'app/templates/components/pagination.html\'\"></div>\n    <!-- Form / Input Group -->\n	<div ng-include=\"\'app/templates/components/form-input-group.html\'\"></div>\n    <!-- Checkbox / Slider -->\n	<div ng-include=\"\'app/templates/components/checkbox-slider.html\'\"></div>\n    <!-- Status -->\n	<div ng-include=\"\'app/templates/components/status.html\'\"></div>\n    <!-- Loading Indicator -->\n	<div ng-include=\"\'app/templates/components/loading-indicator.html\'\"></div>\n    <!-- Modal -->\n	<div ng-include=\"\'app/templates/components/modal.html\'\"></div>\n    <!-- Confirmation Dialog -->\n    <div ng-include=\"\'app/templates/components/confirmation-dialog.html\'\"></div>\n    <!-- Slide Navigation -->\n	<div ng-include=\"\'app/templates/components/slide-navigation.html\'\"></div>\n    <!-- Alerts -->\n	<div ng-include=\"\'app/templates/components/alerts.html\'\"></div>\n    <!-- Table -->\n	<div ng-include=\"\'app/templates/components/table.html\'\"></div>\n    <!-- Datepicker -->\n	<div ng-include=\"\'app/templates/components/datepicker.html\'\"></div>\n    <!-- Activities -->\n	<div ng-include=\"\'app/templates/components/activities.html\'\"></div>\n    <!-- Filter -->\n	<div ng-include=\"\'app/templates/components/filter.html\'\"></div>\n    <!-- Popover -->\n	<div ng-include=\"\'app/templates/components/popover.html\'\"></div>\n	<!-- Notification Example -->\n	<div ng-include=\"\'app/templates/components/notifications.html\'\"></div>\n    <!-- Sticky -->\n	<div ng-include=\"\'app/templates/components/sticky.html\'\"></div>\n    <!-- Inline Edits -->\n	<div ng-include=\"\'app/templates/components/inline-edits.html\'\"></div>\n	<!-- Panel Example -->\n	<div ng-include=\"\'app/templates/components/panel.html\'\"></div>\n	<!-- Custom CSS-Classes -->\n	<div ng-include=\"\'app/templates/components/custom-css-classes.html\'\"></div>\n</div>\n\n<!-- highlight.js -->\n<div ng-include=\"\'app/templates/hljs.html\'\"></div>\n");
$templateCache.put("app/templates/nav.html","<nav class=\"navbar navbar-default navbar-fixed-top\" collapsing-navbar=\"appCtrl.navbarConfig\">\n    <div class=\"container-fluid\">\n        <!-- Brand and toggle get grouped for better mobile display -->\n        <div class=\"navbar-header\">\n            <a ng-click=\"appCtrl.openAside(\'left\', true)\"><i class=\"fa fa-th pull-left app-aside-left\"></i></a>\n            <a class=\"navbar-brand\" href=\".\" target=\"_self\">\n                <img src=\"images/bmg_logo.png\" alt=\"\">\n                <span class=\"navbar-brand-appname\">UI-Kit</span>\n            </a>\n            <!-- Collapsed: Menu button -->\n            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bmg-navbar-collapsed\" ng-click=\"appCtrl.isCollapsed = !appCtrl.isCollapsed\">\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </button>\n            <!-- /Collapsed: Menu button -->\n        </div>\n\n        <!-- Collect the nav links, forms, and other content for toggling -->\n        <div class=\"collapse navbar-collapse\" id=\"bmg-navbar-collapsed\" uib-collapse=\"appCtrl.isCollapsed\">\n            <ul class=\"nav navbar-nav navbar-left\">\n                <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index\"><i class=\"fa fa-map-o\"></i><span>Overview</span></a></li>\n                <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"release-detailpage\"><i class=\"fa fa-search\"></i><span>Detail</span></a></li>\n                <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"release-list\"><i class=\"fa fa-list\"></i><span>List</span></a></li>\n            </ul>\n            <ul class=\"nav navbar-nav navbar-right\">\n				<li>\n					<notification notification-title=\"appCtrl.notifications.title\"\n								  notification-data=\"appCtrl.notifications.data\"\n								  notification-template=\"appCtrl.notifications.template\"\n								  notification-handle=\"appCtrl.handle({notification: notification})\"\n								  notification-mark-all-as-read=\"appCtrl.markAllAsRead({notifications: notifications})\"\n								  notification-load-more=\"appCtrl.loadMoreNotifications()\"\n								  notification-go-to-overview-page=\"appCtrl.goToOverviewPage()\"></notification>\n				</li>\n                <li class=\"dropdown\" uib-dropdown>\n                    <a href=\"#\" uib-dropdown-toggle>\n                        <i class=\"fa fa-bookmark-o fa-lg\"></i>\n                        <i class=\"fa fa-caret-down\"></i>\n                    </a>\n                    <ul class=\"dropdown-menu\" uib-dropdown-menu ng-click=\"appCtrl.isCollapsed = true\">\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.grid\">Grid</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.typography\">Typography</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.colors\">Colors</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.buttons\">Buttons</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.button-group\">Button Group</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.button-dropdown\">Button Dropdown</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.pagination\">Pagination</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.form\">Form / Input Group</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.checkbox-slider\">Checkbox / Slider</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.status\">Status</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.loading-indicator\">Loading Indicator</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.modal\">Modal</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.confirmation-dialog\">Confirmation Dialog</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.slide\">Slide Navigation</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.alerts\">Alerts</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.table\">Table</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.datepicker\">Datepicker</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.activities\">Activities</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.filter\">Filter</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.popover\">Popover</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.notifications\">Notification Counter</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.sticky\">Sticky header</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.inlineEdits\">Inline Edits</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.panel\">Panel Example</a></li>\n                        <li ui-sref-active=\"active\"><a ui-sref=\"index.css\">Custom CSS-Classes</a></li>\n                    </ul>\n                </li>\n            </ul>\n        </div>\n        <!-- /.navbar-collapse -->\n    </div>\n    <!-- /.container-fluid -->\n</nav>\n");
$templateCache.put("app/templates/aside/apps.html","<div class=\"app-nav\">\n    <h3>\n        BMG Applications\n        <button type=\"button\" class=\"btn btn-secondary-invers btn-circle pull-right\" data-ng-click=\"cancel()\"><i class=\"fa fa-chevron-left\"></i></button>\n    </h3>\n    <ul>\n        <li><a href=\"#\"><img src=\"images/analytics.svg\" />Analytics</a></li>\n        <li><a href=\"#\"><img src=\"images/capture.svg\" />Capture</a></li>\n        <li class=\"active\"><a href=\"#\"><img src=\"images/cashmatch.svg\" />Cash Match</a></li>\n        <li><a href=\"#\"><img src=\"images/datawise.svg\" />Datawise</a></li>\n        <li><a href=\"#\"><img src=\"images/deliver.svg\" />Deliver</a></li>\n        <li><a href=\"#\"><img src=\"images/e-license.svg\" />E-License</a></li>\n        <li><a href=\"#\"><img src=\"images/fileboxes.svg\" />Fileboxes</a></li>\n        <li><a href=\"#\"><img src=\"images/release.svg\" />Release</a></li>\n        <li><a href=\"#\"><img src=\"images/s-print.svg\" />S-Print</a></li>\n        <li><a href=\"#\"><img src=\"images/smartmatch.svg\" />Smartmatch</a></li>\n        <li><a href=\"#\"><img src=\"images/songdelivery.svg\" />Song Delivery</a></li>\n        <li><a href=\"#\"><img src=\"images/songs.svg\" />Songs</a></li>\n        <li><a href=\"#\"><img src=\"images/statementcompression.svg\" />Statement Compression</a></li>\n        <li><a href=\"#\"><img src=\"images/store.svg\" />Store</a></li>\n        <li><a href=\"#\"><img src=\"images/vault.svg\" />Vault</a></li>\n    </ul>\n</div>\n");
$templateCache.put("app/templates/aside/filter-aside.html","<div>\n    <h3>\n        Search / Edit Filters\n        <button type=\"button\" class=\"btn btn-secondary-invers btn-circle pull-right\" data-ng-click=\"asideCtrl.cancel()\"><i class=\"fa fa-chevron-right\"></i></button>\n    </h3>\n    <div class=\"aside-content\">\n        <!--<button class=\"btn btn-primary\">Edit filters</button>-->\n        <div class=\"form-group filter-form-group\">\n            <label for=\"song\">Song</label>\n            <div class=\"inline-form-group has-feedback\">\n                <input type=\"text\" id=\"song\" class=\"form-control\" placeholder=\"\" data-ng-model=\"asideCtrl.filter.song\">\n                <button class=\"btn btn-fa btn-secondary\" ng-click=\"asideCtrl.filter.song = \'\'\"><i class=\"fa fa-trash-o\"></i></button>\n                <span class=\"fa fa-search form-control-feedback\"></span>\n            </div>\n        </div>\n        <div class=\"form-group filter-form-group\">\n            <label for=\"status\">Status</label>\n            <div class=\"inline-form-group has-feedback\">\n                <input type=\"text\" id=\"status\" class=\"form-control\" placeholder=\"\" data-ng-model=\"asideCtrl.filter.status\">\n                <button class=\"btn btn-fa btn-secondary\" ng-click=\"asideCtrl.filter.status = \'\'\"><i class=\"fa fa-trash-o\"></i></button>\n                <span class=\"fa fa-search form-control-feedback\"></span>\n            </div>\n        </div>\n        <div class=\"form-group filter-form-group\">\n            <label for=\"artist\">Artist</label>\n            <div class=\"inline-form-group has-feedback\">\n                <input type=\"text\" id=\"artist\" class=\"form-control\" placeholder=\"\" data-ng-model=\"asideCtrl.filter.artist\">\n                <button class=\"btn btn-fa btn-secondary\" ng-click=\"asideCtrl.filter.artist = \'\'\"><i class=\"fa fa-trash-o\"></i></button>\n                <span class=\"fa fa-search form-control-feedback\"></span>\n            </div>\n        </div>\n\n        <div class=\"form-group filter-form-group\">\n            <label for=\"title\">Title</label>\n            <div class=\"inline-form-group has-feedback\">\n                <input type=\"text\" id=\"title\" class=\"form-control\" placeholder=\"\" data-ng-model=\"asideCtrl.filter.title\">\n                <button class=\"btn btn-fa btn-secondary\" ng-click=\"asideCtrl.filter.title = \'\'\"><i class=\"fa fa-trash-o\"></i></button>\n                <span class=\"fa fa-search form-control-feedback\"></span>\n            </div>\n        </div>\n        <div class=\"form-group filter-form-group\">\n            <label for=\"versionTitle\">Version Title</label>\n            <div class=\"inline-form-group has-feedback\">\n                <input type=\"text\" id=\"versionTitle\" class=\"form-control\" placeholder=\"\" data-ng-model=\"asideCtrl.filter.versionTitle\">\n                <button class=\"btn btn-fa btn-secondary\" ng-click=\"asideCtrl.filter.versionTitle = \'\'\"><i class=\"fa fa-trash-o\"></i></button>\n                <span class=\"fa fa-search form-control-feedback\"></span>\n            </div>\n        </div>\n        <div class=\"form-group filter-form-group\">\n            <label for=\"publisher\">Publisher</label>\n            <div class=\"inline-form-group has-feedback\">\n                <input type=\"text\" id=\"publisher\" class=\"form-control\" placeholder=\"\" data-ng-model=\"asideCtrl.filter.publisher\">\n                <button class=\"btn btn-fa btn-secondary\" ng-click=\"asideCtrl.filter.publisher = \'\'\"><i class=\"fa fa-trash-o\"></i></button>\n                <span class=\"fa fa-search form-control-feedback\"></span>\n            </div>\n        </div>\n        <div class=\"form-group filter-form-group\">\n            <label for=\"format\">Format</label>\n            <div class=\"inline-form-group has-feedback\">\n                <input type=\"text\" id=\"format\" class=\"form-control\" placeholder=\"\" data-ng-model=\"asideCtrl.filter.format\">\n                <button class=\"btn btn-fa btn-secondary\" ng-click=\"asideCtrl.filter.format = \'\'\"><i class=\"fa fa-trash-o\"></i></button>\n                <span class=\"fa fa-search form-control-feedback\"></span>\n            </div>\n        </div>\n        <div class=\"form-group filter-form-group\">\n            <label for=\"releaseDate\">Release Date</label>\n            <div class=\"inline-form-group has-feedback\">\n                <input type=\"text\" id=\"releaseDate\" class=\"form-control\" placeholder=\"\" data-ng-model=\"asideCtrl.filter.releaseDate\">\n                <button class=\"btn btn-fa btn-secondary\" ng-click=\"asideCtrl.filter.releaseDate = \'\'\"><i class=\"fa fa-trash-o\"></i></button>\n                <span class=\"fa fa-search form-control-feedback\"></span>\n            </div>\n        </div>\n        <div class=\"form-group filter-form-group\">\n            <span style=\"height: 26px; display: block;\"></span>\n            <button class=\"btn btn-primary full-width\" data-ng-click=\"asideCtrl.applyFilter()\">Apply Filter</button>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("app/templates/aside/filter-col-aside.html","<div>\n    <h3>\n        Enable / disable table columns\n        <button type=\"button\" class=\"btn btn-secondary-invers btn-circle pull-right\" data-ng-click=\"asideCtrl.cancel()\"><i class=\"fa fa-chevron-right\"></i></button>\n    </h3>\n    <div class=\"aside-content\">\n        <div class=\"form-group\">\n            <div class=\"bmg-checkbox-with-label\">\n                <div class=\"bmg-checkbox\">\n                    <input type=\"checkbox\" id=\"filter-status\" data-ng-model=\"asideCtrl.colFilter.status\"/>\n                    <label for=\"filter-status\"><div></div></label>\n                </div>\n                <label for=\"filter-status\">Status</label>\n            </div>\n\n        </div>\n        <div class=\"form-group\">\n            <div class=\"bmg-checkbox-with-label\">\n                <div class=\"bmg-checkbox\">\n                    <input type=\"checkbox\" id=\"filter-song\" data-ng-model=\"asideCtrl.colFilter.song\"/>\n                    <label for=\"filter-song\"><div></div></label>\n                </div>\n                <label for=\"filter-song\">Song</label>\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <div class=\"bmg-checkbox-with-label\">\n                <div class=\"bmg-checkbox\">\n                    <input type=\"checkbox\" id=\"filter-statusKey\" data-ng-model=\"asideCtrl.colFilter.statusKey\"/>\n                    <label for=\"filter-statusKey\"><div></div></label>\n                </div>\n                <label for=\"filter-statusKey\">Status Key</label>\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <div class=\"bmg-checkbox-with-label\">\n                <div class=\"bmg-checkbox\">\n                    <input type=\"checkbox\" id=\"filter-artist\" data-ng-model=\"asideCtrl.colFilter.artist\"/>\n                    <label for=\"filter-artist\"><div></div></label>\n                </div>\n                <label for=\"filter-artist\">Artist</label>\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <div class=\"bmg-checkbox-with-label\">\n                <div class=\"bmg-checkbox\">\n                    <input type=\"checkbox\" id=\"filter-versionTitle\" data-ng-model=\"asideCtrl.colFilter.versionTitle\"/>\n                    <label for=\"filter-versionTitle\"><div></div></label>\n                </div>\n                <label for=\"filter-versionTitle\">Version Title</label>\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <div class=\"bmg-checkbox-with-label\">\n                <div class=\"bmg-checkbox\">\n                    <input type=\"checkbox\" id=\"filter-publisher\" data-ng-model=\"asideCtrl.colFilter.publisher\"/>\n                    <label for=\"filter-publisher\"><div></div></label>\n                </div>\n                <label for=\"filter-publisher\">Publisher</label>\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <div class=\"bmg-checkbox-with-label\">\n                <div class=\"bmg-checkbox\">\n                    <input type=\"checkbox\" id=\"filter-format\" data-ng-model=\"asideCtrl.colFilter.format\"/>\n                    <label for=\"filter-format\"><div></div></label>\n                </div>\n                <label for=\"filter-format\">Format</label>\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <div class=\"bmg-checkbox-with-label\">\n                <div class=\"bmg-checkbox\">\n                    <input type=\"checkbox\" id=\"filter-releaseDate\" data-ng-model=\"asideCtrl.colFilter.releaseDate\"/>\n                    <label for=\"filter-releaseDate\"><div></div></label>\n                </div>\n                <label for=\"filter-releaseDate\">Release Date</label>\n            </div>\n        </div>\n        <div class=\"form-group filter-form-group\">\n            <span style=\"height: 26px; display: block;\"></span>\n            <button class=\"btn btn-primary full-width\" data-ng-click=\"asideCtrl.resetColFilter()\">Reset filter</button>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("app/templates/components/activities.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"activities\">Activities</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<table class=\"table table-hover table-activities\">\n					<tbody>\n					<tr class=\"activity\">\n						<td style=\"width: 80px;\">\n							<span class=\"fa-stack fa-lg\">\n								<i class=\"fa fa-circle fa-stack-2x color-default\"></i>\n								<i class=\"fa fa-pencil fa-stack-1x fa-inverse\"></i>\n							</span>\n						</td>\n						<td><strong>Miss Moneypenny</strong> edited mission data</td>\n						<td class=\"meta-info-time\">4 hours ago</td>\n					</tr>\n					<tr class=\"activity\">\n						<td>\n							<span class=\"fa-stack fa-lg\">\n								<i class=\"fa fa-circle fa-stack-2x color-success\"></i>\n								<i class=\"fa fa-check fa-stack-1x fa-inverse\"></i>\n							</span>\n						</td>\n						<td><strong>James Bond</strong> exported mission data</td>\n						<td class=\"meta-info-time\">3 hours ago</td>\n					</tr>\n					<tr class=\"activity\">\n						<td>\n							<span class=\"fa-stack fa-lg\">\n								<i class=\"fa fa-circle fa-stack-2x color-secondary\"></i>\n								<i class=\"fa fa-trash fa-stack-1x fa-inverse\"></i>\n							</span>\n						</td>\n						<td><strong>James Bond</strong> deleted mission data</td>\n						<td class=\"meta-info-time\">3 hours ago</td>\n					</tr>\n					<tr class=\"activity\">\n						<td>\n							<span class=\"fa-stack fa-lg\">\n								<i class=\"fa fa-circle fa-stack-2x color-error\"></i>\n								<i class=\"fa fa-times fa-stack-1x fa-inverse\"></i>\n							</span>\n						</td>\n						<td> Mission failed!</td>\n						<td class=\"meta-info-time\">20 minutes ago</td>\n					</tr>\n					</tbody>\n				</table>\n				<br>\n				<pre><code class=\"html\">&lt;table class=\"table table-hover table-activities\"&gt;\n    &lt;tbody&gt;\n        &lt;tr class=\"activity\"&gt;\n            &lt;td style=\"width: 80px;\"&gt;\n                &lt;span class=\"fa-stack fa-lg\"&gt;\n                    &lt;i class=\"fa fa-circle fa-stack-2x color-default\"&gt;&lt;/i&gt;\n                    &lt;i class=\"fa fa-pencil fa-stack-1x fa-inverse\"&gt;&lt;/i&gt;\n                &lt;/span&gt;\n            &lt;/td&gt;\n            &lt;td&gt;&lt;strong&gt;Keywords / username&lt;/strong&gt; a description text&lt;/td&gt;\n            &lt;td class=\"meta-info-time\"&gt;4 hours ago&lt;/td&gt;\n        &lt;/tr&gt;\n        &lt;!-- [...] --&gt;\n    &lt;/tbody&gt;\n&lt;/table&gt;</code></pre>\n			</div>\n		</div>\n	</div>\n</div>\n");
$templateCache.put("app/templates/components/alerts.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"alerts\">Alerts</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<h2>BMG Bootstrap Alerts:</h2>\n\n				<data-bmg-alert\n					data-type=\"success\"\n					data-icon=\"check\">\n					Success\n				</data-bmg-alert>\n\n				<data-bmg-alert\n					data-type=\"info\"\n					data-icon=\"info\">\n					Info\n				</data-bmg-alert>\n\n				<data-bmg-alert\n					data-type=\"warning\"\n					data-icon=\"question\">\n					Warning\n				</data-bmg-alert>\n\n				<data-bmg-alert\n					data-type=\"danger\"\n					data-icon=\"exclamation-triangle\">\n					Danger\n				</data-bmg-alert>\n\n				<pre><code class=\"html\">&lt;data-bmg-alert\n    data-type=&quot;info&quot;\n    data-icon=&quot;info&quot;&gt;\n    Info\n&lt;/data-bmg-alert&gt;</code></pre>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<h2>Toastr Alerts:</h2>\n				<div data-ng-controller=\"NotificationController as notificationCtrl\">\n					<button class=\"btn btn-success\" data-ng-click=\"notificationCtrl.success()\">Click me!</button>\n					<button class=\"btn btn-info\" data-ng-click=\"notificationCtrl.info()\">Click me!</button>\n					<button class=\"btn btn-warning\" data-ng-click=\"notificationCtrl.warning()\">Click me!</button>\n					<button class=\"btn btn-danger\" data-ng-click=\"notificationCtrl.error()\">Click me!</button>\n				</div>\n				<br>\n				<pre><code class=\"html\">&lt;button class=\"btn btn-success\" data-ng-click=\"success()\"&gt;Click me!&lt;/button&gt;</code></pre>\n				<pre><code class=\"JavaScript\">this.success = function() {\n    toastr.success(\'Hello world!\', \'Toastr fun!\');\n};</code></pre>\n				<div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://github.com/Foxandxss/angular-toastr\">angular-toastr</a></div>\n			</div>\n		</div>\n	</div>\n</div>\n");
$templateCache.put("app/templates/components/button-dropdown.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"button-dropdown\">Button Dropdown</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"btn-group\" uib-dropdown>\n					<button type=\"button\" class=\"btn btn-default\">A very long description</button>\n					<button type=\"button\" class=\"btn btn-default\" uib-dropdown-toggle>\n						<span class=\"caret\"></span>\n						<span class=\"sr-only\">Split button!</span>\n					</button>\n					<ul uib-dropdown-menu role=\"menu\" aria-labelledby=\"split-button\">\n						<li role=\"menuitem\"><a href=\"#\">Example A</a></li>\n						<li role=\"menuitem\"><a href=\"#\">Longer Example B</a></li>\n						<li role=\"menuitem\"><a href=\"#\">Example C</a></li>\n					</ul>\n				</div>\n			</div>\n			<div class=\"col-lg-6\">\n				<div class=\"btn-group\" uib-dropdown>\n					<button type=\"button\" class=\"btn btn-default\">Short</button>\n					<button type=\"button\" class=\"btn btn-default\" uib-dropdown-toggle>\n						<span class=\"caret\"></span>\n						<span class=\"sr-only\">Split button!</span>\n					</button>\n					<ul uib-dropdown-menu role=\"menu\" aria-labelledby=\"split-button\">\n						<li role=\"menuitem\"><a href=\"#\">Example A</a></li>\n						<li role=\"menuitem\"><a href=\"#\">Longer Example B</a></li>\n						<li role=\"menuitem\"><a href=\"#\">Example C</a></li>\n					</ul>\n				</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<br>\n				<pre><code class=\"html\">&lt;div class=\"btn-group\" uib-dropdown&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;button type=\"button\" class=\"btn btn-default\"&gt;A very long description&lt;/button&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;button type=\"button\" class=\"btn btn-default\" uib-dropdown-toggle&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class=\"caret\"&gt;&lt;/span&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class=\"sr-only\"&gt;Split button!&lt;/span&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;/button&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;ul uib-dropdown-menu role=\"menu\" aria-labelledby=\"split-button\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li role=\"menuitem\"&gt;&lt;a href=\"#\"&gt;Example A&lt;/a&gt;&lt;/li&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li role=\"menuitem\"&gt;&lt;a href=\"#\"&gt;Longer Example B&lt;/a&gt;&lt;/li&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li role=\"menuitem\"&gt;&lt;a href=\"#\"&gt;Example C&lt;/a&gt;&lt;/li&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;/ul&gt;\n&lt;/div&gt;</code></pre>\n			</div>\n		</div>\n	</div>\n</div>");
$templateCache.put("app/templates/components/button-group.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"button-group\">Button Group</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"btn-group\" role=\"group\">\n					<button type=\"button\" class=\"btn btn-default\">S</button>\n					<button type=\"button\" class=\"btn btn-default\">M</button>\n					<button type=\"button\" class=\"btn btn-default\">L</button>\n				</div>\n			</div>\n			<div class=\"col-lg-6\">\n				<div class=\"btn-group\" role=\"group\">\n					<button type=\"button\" class=\"btn btn-default disabled\">Left</button>\n					<button type=\"button\" class=\"btn btn-default disabled\">Middle</button>\n					<button type=\"button\" class=\"btn btn-default disabled\">Right</button>\n				</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<br>\n				<pre><code class=\"html\">&lt;div class=\"btn-group\" role=\"group\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;button type=\"button\" class=\"btn btn-default\"&gt;S&lt;/button&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;button type=\"button\" class=\"btn btn-default\"&gt;M&lt;/button&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;button type=\"button\" class=\"btn btn-default\"&gt;L&lt;/button&gt;\n&lt;/div&gt;</code></pre>\n			</div>\n		</div>\n	</div>\n</div>");
$templateCache.put("app/templates/components/buttons.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"buttons\">Buttons</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\">\n			<div class=\"col-lg-3\">\n				<button type=\"button\" class=\"btn btn-primary\">Primary</button>\n			</div>\n			<div class=\"col-lg-3\">\n				<button type=\"button\" class=\"btn btn-secondary\">Secondary</button>\n			</div>\n			<div class=\"col-lg-3 col-lg-offset-3\">\n				<button type=\"button\" class=\"btn btn-success disabled\" disabled>Disabled</button>\n			</div>\n		</div>\n		<div class=\"row\" style=\"margin-top: 20px;\">\n			<div class=\"col-lg-3\">\n				<button type=\"button\" class=\"btn btn-success\">Success</button>\n			</div>\n			<div class=\"col-lg-3\">\n				<button type=\"button\" class=\"btn btn-info\">Info</button>\n			</div>\n			<div class=\"col-lg-3\">\n				<button type=\"button\" class=\"btn btn-warning\">Warning</button>\n			</div>\n			<div class=\"col-lg-3\">\n				<button type=\"button\" class=\"btn btn-danger\">Danger</button>\n			</div>\n		</div>\n		<br>\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n                    <pre><code class=\"html\">&lt;button type=\"button\" class=\"btn btn-primary\"&gt;Primary&lt;/button&gt;\n&lt;!-- to disable any button use the disabled attribute and the .disabled class --&gt;\n&lt;button type=\"button\" class=\"btn btn-success disabled\" disabled&gt;Save&lt;/button&gt;</code></pre>\n			</div>\n		</div>\n		<div class=\"row\" style=\"margin-top: 10px;\">\n			<div class=\"col-lg-6\">\n				<button type=\"button\" class=\"btn btn-primary btn-fa\"><i class=\"fa fa-star-o\"></i></button>\n				<button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-star\"></i></button>\n				<br>\n				<br>\n				<pre><code class=\"html\">&lt;button type=\"button\" class=\"btn btn-primary btn-fa\"&gt;&lt;i class=\"fa fa-star-o\"&gt;&lt;/i&gt;&lt;/button&gt;</code></pre>\n			</div>\n			<div class=\"col-lg-6\">\n				<button type=\"button\" class=\"btn btn-primary-invers btn-circle\"><i class=\"fa fa-chevron-right\"></i>\n				</button>\n				<button type=\"button\" class=\"btn btn-primary btn-circle\"><i class=\"fa fa-check\"></i></button>\n				<button type=\"button\" class=\"btn btn-disabled btn-circle\"><i class=\"fa fa-check\"></i></button>\n				<button type=\"button\" class=\"btn btn-danger btn-circle\"><i class=\"fa fa-remove\"></i></button>\n				<button type=\"button\" class=\"btn btn-disabled btn-circle\"><i class=\"fa fa-remove\"></i></button>\n				<br>\n				<br>\n				<pre style=\"margin-top: 5px\"><code class=\"html\">&lt;button type=\"button\" class=\"btn btn-primary btn-circle\"&gt;&lt;i class=\"fa fa-check\"&gt;&lt;/i&gt;&lt;/button&gt;</code></pre>\n			</div>\n		</div>\n	</div>\n</div>");
$templateCache.put("app/templates/components/checkbox-slider.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"checkbox-slider\">Checkbox / Slider</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\" data-ng-controller=\"CheckboxSliderController as checkboxSliderCtrl\">\n			<div class=\"col-lg-12\">\n				<h2>Checkbox</h2>\n				<div class=\"bmg-checkbox-with-label\">\n					<div class=\"bmg-checkbox\">\n						<input type=\"checkbox\" id=\"squaredCheckbox1\"\n							   data-ng-model=\"checkboxSliderCtrl.checkbox.checked\"/>\n						<label for=\"squaredCheckbox1\"><div></div></label>\n					</div>\n					<label for=\"squaredCheckbox1\">Check me out!</label>\n				</div>\n\n				<div class=\"bmg-checkbox-with-label\">\n					<div class=\"bmg-checkbox\">\n						<input type=\"checkbox\" id=\"squaredCheckbox2\"\n							   data-ng-model=\"checkboxSliderCtrl.checkbox.notChecked\"/>\n						<label for=\"squaredCheckbox2\"><div></div></label>\n					</div>\n					<label for=\"squaredCheckbox2\">Check me out too!</label>\n				</div>\n				<br>\n				<pre><code class=\"html\">&lt;div class=&quot;bmg-checkbox-with-label&quot;&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=&quot;bmg-checkbox&quot;&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type=&quot;checkbox&quot; id=&quot;squaredCheckbox1&quot; data-ng-model=&quot;checked&quot;/&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;label for=&quot;squaredCheckbox1&quot;&gt;&lt;div&gt;&lt;/div&gt;&lt;/label&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;label for=&quot;squaredCheckbox1&quot;&gt;Check me out!&lt;/label&gt;\n&lt;/div&gt;</code></pre>\n\n				<h2>Inline Checkboxes</h2>\n				<div class=\"bmg-checkbox-with-label bmg-checkbox-inline\">\n					<div class=\"bmg-checkbox\">\n						<input type=\"checkbox\" id=\"squaredCheckbox3\"\n							   data-ng-model=\"checkboxSliderCtrl.checkbox.lala\"/>\n						<label for=\"squaredCheckbox3\"><div></div></label>\n					</div>\n					<label for=\"squaredCheckbox3\">I\'m the first in line</label>\n				</div>\n\n				<div class=\"bmg-checkbox-with-label bmg-checkbox-inline\">\n					<div class=\"bmg-checkbox\">\n						<input type=\"checkbox\" id=\"squaredCheckbox4\"\n							   data-ng-model=\"checkboxSliderCtrl.checkbox.lulu\"/>\n						<label for=\"squaredCheckbox4\"><div></div></label>\n					</div>\n					<label for=\"squaredCheckbox4\">And I\'m right next to you!</label>\n				</div>\n				<br />\n				<pre><code class=\"html\">&lt;div class=&quot;bmg-checkbox-with-label bmg-checkbox-inline&quot;&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=&quot;bmg-checkbox&quot;&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type=&quot;checkbox&quot; id=&quot;squaredCheckbox3&quot; data-ng-model=&quot;checked&quot;/&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;label for=&quot;squaredCheckbox3&quot;&gt;&lt;div&gt;&lt;/div&gt;&lt;/label&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;label for=&quot;squaredCheckbox3&quot;&gt;I\'m the first in line&lt;/label&gt;\n&lt;/div&gt;</code></pre>\n\n				<h2>Radio button</h2>\n				<div class=\"bmg-radio-button-with-label\">\n					<div class=\"bmg-radio-button\">\n						<input\n							type=\"radio\"\n							id=\"radio-button-1\"\n							data-ng-model=\"checkboxSliderCtrl.radioOption.name\"\n							value=\"a\" />\n						<label for=\"radio-button-1\"><div></div></label>\n					</div>\n					<label for=\"radio-button-1\">Option 1</label>\n				</div>\n\n				<div class=\"bmg-radio-button-with-label\">\n					<div class=\"bmg-radio-button\">\n						<input\n							type=\"radio\"\n							id=\"radio-button-2\"\n							data-ng-model=\"checkboxSliderCtrl.radioOption.name\"\n							value=\"b\" />\n						<label for=\"radio-button-2\"><div></div></label>\n					</div>\n					<label for=\"radio-button-2\">Option 2</label>\n				</div>\n\n				<div class=\"bmg-radio-button-with-label\">\n					<div class=\"bmg-radio-button\">\n						<input\n							type=\"radio\"\n							id=\"radio-button-3\"\n							data-ng-model=\"checkboxSliderCtrl.radioOption.name\"\n							value=\"c\" />\n						<label for=\"radio-button-3\"><div></div></label>\n					</div>\n					<label for=\"radio-button-3\">Option 3</label>\n				</div>\n\n				<pre><code class=\"html\">&lt;div class=&quot;bmg-radio-button-with-label&quot;&gt;\n    &lt;div class=&quot;bmg-radio-button&quot;&gt;\n        &lt;input type=&quot;radio&quot; id=&quot;radio-button-1&quot; data-ng-model=&quot;checkboxSliderCtrl.radioOption.name&quot; value=&quot;a&quot; /&gt;\n        &lt;label for=&quot;radio-button-1&quot;&gt;&lt;div&gt;&lt;/div&gt;&lt;/label&gt;\n    &lt;/div&gt;\n    &lt;label for=&quot;radio-button-1&quot;&gt;Option 1&lt;/label&gt;\n&lt;/div&gt;</code></pre>\n\n				<h2>Inline Radio Buttons</h2>\n				<div class=\"bmg-radio-button-with-label bmg-radio-button-inline\">\n					<div class=\"bmg-radio-button\">\n						<input type=\"radio\" id=\"radioInline1\" value=\"orange\"\n							   data-ng-model=\"checkboxSliderCtrl.checkbox.lulu\"/>\n						<label for=\"radioInline1\"><div></div></label>\n					</div>\n					<label for=\"radioInline1\">Option 1</label>\n				</div>\n\n				<div class=\"bmg-radio-button-with-label bmg-radio-button-inline\">\n					<div class=\"bmg-radio-button\">\n						<input type=\"radio\" id=\"radioInline2\" value=\"purple\"\n							   data-ng-model=\"checkboxSliderCtrl.checkbox.lulu\"/>\n						<label for=\"radioInline2\"><div></div></label>\n					</div>\n					<label for=\"radioInline2\">Option 2</label>\n				</div>\n\n				<div class=\"bmg-radio-button-with-label bmg-radio-button-inline\">\n					<div class=\"bmg-radio-button\">\n						<input type=\"radio\" id=\"radioInline3\" value=\"yellow\"\n							   data-ng-model=\"checkboxSliderCtrl.checkbox.lulu\"/>\n						<label for=\"radioInline3\"><div></div></label>\n					</div>\n					<label for=\"radioInline3\">Option 3</label>\n				</div>\n\n				<pre><code class=\"html\">&lt;div class=&quot;bmg-radio-button-with-label bmg-radio-button-inline&quot;&gt;\n    &lt;div class=&quot;bmg-radio-button&quot;&gt;\n        &lt;input type=&quot;radio&quot; id=&quot;radioInline1&quot; value=&quot;orange&quot; data-ng-model=&quot;checkboxSliderCtrl.checkbox.lulu&quot;/&gt;\n        &lt;label for=&quot;radioInline1&quot;&gt;&lt;div&gt;&lt;/div&gt;&lt;/label&gt;\n    &lt;/div&gt;\n    &lt;label for=&quot;radioInline1&quot;&gt;Option 1&lt;/label&gt;\n&lt;/div&gt;</code></pre>\n\n				<h2>Slider</h2>\n				<div>\n					<rzslider\n						rz-slider-model=\"checkboxSliderCtrl.slider.min\"\n						rz-slider-high=\"checkboxSliderCtrl.slider.max\"\n						rz-slider-options=\"checkboxSliderCtrl.slider.options\"></rzslider>\n				</div>\n				<br>\n				<pre><code class=\"html\">&lt;rzslider rz-slider-options=\"slider.options\"\n&nbsp;&nbsp;&nbsp;&nbsp;rz-slider-model=\"slider.min\"\n&nbsp;&nbsp;&nbsp;&nbsp;rz-slider-high=\"slider.max\"&gt;&lt;/rzslider&gt;</code></pre>\n				<div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://github.com/angular-slider/angularjs-slider\">angularjs-slider</a></div>\n			</div>\n		</div>\n	</div>\n</div>\n");
$templateCache.put("app/templates/components/colors.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"colors\">Colors</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"color-grid head\">COLOR</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid head\">SCSS CONSTANT</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid head\">SCSS ALIAS</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid head\">HEX COLOR CODE</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"color-grid color ec-primary\">Primary</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-malibu</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-primary</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">#51D0FF</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"color-grid color ec-secondary\">Secondary</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-tundora</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-secondary</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">#4D4D4D</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"color-grid color ec-success\">Success</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-rio-grande</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-success</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">#AFCE06</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"color-grid color ec-info\">Info</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-turquoise</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-info</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">#18CCAE</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"color-grid color ec-warning\">Warning</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-supernova</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-warning</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">#FFCC00</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"color-grid color ec-status\">Status</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-carrot</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-status</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">#F59422</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"color-grid color ec-error\">Error</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-monza</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-error</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">#C80031</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<hr>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"color-grid color ec-black\">Black</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-black</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-text</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">#4D4D4D</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"color-grid color ec-stack\">Stack</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-stack</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\"></div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">#999999</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"color-grid color ec-celeste\">Celeste</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-celeste</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\"></div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">#EDEDED</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"color-grid color ec-white\">White</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-white</div>\n			</div>\n			<div class=\"col-lg-2\">\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">#FFFFFF</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"color-grid color ec-spice\">Spice</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-spice</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\"></div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">#A7572C</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"color-grid color ec-pine-green\">Pine Green</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-pine-green</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\"></div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">#319990</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"color-grid color ec-jazzberry\">Jazzberry</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">$bmg-jazzberry</div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\"></div>\n			</div>\n			<div class=\"col-lg-2\">\n				<div class=\"color-grid\">#A11762</div>\n			</div>\n		</div>\n	</div>\n</div>");
$templateCache.put("app/templates/components/confirmation-dialog.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"confirmation-dialog\">Confirmation Dialog</h1>\n	</div>\n	<div class=\"panel-body\" data-ng-controller=\"ConfirmationCtrl as ctrl\">\n		<div class=\"row\">\n			<div class=\"col-xs-12\">\n				<button\n                    class=\"btn btn-info\"\n                    data-ng-click=\"ctrl.confirm()\">Open confirmation dialog</button>\n			</div>\n		</div>\n        <br />\n\n        <pre><code class=\"javascript\">// inject \'userDialogs\' into your angular component\nuserDialogs.askForConfirmation(\n    \'Do you really want to hurt me?\',       // title\n    \'Do you really want to make me cry?\',   // text\n    \'Hurt him\',                             // primary button caption\n    \'Cancel\',                               // secondary button caption\n    \'danger\'                                // primary button class suffix (optional); \'primary\' by default\n).then(function() {\n    toastr.success(\'Confirmed dialog successfully.\', \'Success\');\n}, function() {\n    toastr.error(\'Canceled the dialog.\', \'Canceled\');\n});</code></pre>\n	</div>\n</div>\n");
$templateCache.put("app/templates/components/custom-css-classes.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"css\">Custom CSS-Classes</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<h2>Width</h2>\n				<p>Use w[VALUE] for a specific width. VALUE can be one of the following numbers: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100</p>\n				<pre><code class=\"html\">&lt;div class=\"w50\"&gt;50%&lt;/div&gt;</code></pre>\n				<p>For the width minimum use the \"shrink\" class.</p>\n				<pre><code class=\"html\">&lt;div class=\"shrink\"&gt;Content&lt;/div&gt;</code></pre>\n				<h2>Height</h2>\n				<p>Use h[VALUE] for a specific height. VALUE can be one of the following numbers: 25, 50, 75, 100</p>\n				<pre><code class=\"html\">&lt;div class=\"h75\"&gt;75%&lt;/div&gt;</code></pre>\n			</div>\n		</div>\n	</div>\n</div>");
$templateCache.put("app/templates/components/datepicker.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"datepicker\">Datepicker</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\" data-ng-controller=\"DatepickerController as datepickerCtrl\">\n			<div class=\"col-lg-4\">\n				<p class=\"input-group\">\n					<input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"{{datepickerCtrl.format}}\"\n						   ng-model=\"datepickerCtrl.dt\" is-open=\"datepickerCtrl.popup.opened\"\n						   datepicker-options=\"datepickerCtrl.dateOptions\" ng-required=\"true\"\n						   close-text=\"Close\"\n						   popup-placement=\"auto top bottom\" />\n					<span class=\"input-group-btn\">\n                            <button type=\"button\" class=\"btn btn-default shrink\" ng-click=\"datepickerCtrl.open()\">\n                                <i class=\"color-primary fa fa-calendar\"></i>\n                            </button>\n                        </span>\n				</p>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n                    <pre><code class=\"html\">&lt;p class=\"input-group\"&gt;\n    &lt;input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"&#123;&#123;datepickerCtrl.format&#125;&#125;\" ng-model=\"datepickerCtrl.date\" is-open=\"datepickerCtrl.popup.opened\"\n           datepicker-options=\"datepickerCtrl.dateOptions\" ng-required=\"true\" close-text=\"Close\" popup-placement=\"auto top bottom\" /&gt;\n    &lt;span class=\"input-group-btn\"&gt;\n        &lt;button type=\"button\" class=\"btn btn-default shrink\" ng-click=\"datepickerCtrl.open()\"&gt;\n            &lt;i class=\"color-primary fa fa-calendar\"&gt;&lt;/i&gt;\n        &lt;/button&gt;\n    &lt;/span&gt;\n&lt;/p&gt;</code></pre>\n				<div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://angular-ui.github.io/bootstrap/\">angular-bootstrap</a></div>\n			</div>\n		</div>\n	</div>\n</div>");
$templateCache.put("app/templates/components/filter.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"filter\">Filter</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<div class=\"filter\">\n					<i class=\"fa fa-plus-circle color-info\"></i>\n					Filter with a long long long long long long text!\n					<button type=\"button\" class=\"close\"><span>&times;</span>\n					</button>\n				</div>\n				<div class=\"filter\">\n					<i class=\"fa fa-minus-circle color-error\"></i>\n					Nobody will build a filter!\n					<button type=\"button\" class=\"close\"><span aria-hidden=\"true\">&times;</span>\n					</button>\n				</div>\n				<br>\n				<br>\n				<pre><code class=\"html\">&lt;div class=\"filter\"&gt;\n    &lt;i class=\"fa fa-plus-circle color-info\"&gt;&lt;/i&gt; Filter text\n    &lt;button type=\"button\" class=\"close\"&gt;&lt;span&gt;&#38;times;&lt;/span&gt;&lt;/button&gt;\n&lt;/div&gt;</code></pre>\n			</div>\n		</div>\n	</div>\n</div>");
$templateCache.put("app/templates/components/form-input-group.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"form\">Form Group / Input Group</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\" data-ng-controller=\"FormController\">\n			<div class=\"col-lg-12\">\n				<h2>Text / E-Mail input fields</h2>\n				<form>\n					<div class=\"form-group\">\n						<label for=\"exampleInputEmail1\">Email address (empty)</label>\n						<input type=\"email\" class=\"form-control\" id=\"exampleInputEmail1\" placeholder=\"E-Mail\">\n					</div>\n					<pre><code class=\"html\">&lt;div class=\"form-group\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;label for=\"email\"&gt;Email address&lt;/label&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type=\"email\" class=\"form-control\" id=\"email\" placeholder=\"E-Mail\" data-ng-model=\"email\"&gt;\n&lt;/div&gt;</code></pre>\n					<div class=\"form-group has-success has-feedback\">\n						<label for=\"exampleInputEmail2\">Email address (correct)</label>\n						<input type=\"email\" class=\"form-control\" id=\"exampleInputEmail2\" placeholder=\"E-Mail\"\n							   data-ng-model=\"email_correct\">\n						<span class=\"fa fa-check form-control-feedback\"></span>\n					</div>\n					<pre><code class=\"html\">&lt;div class=\"form-group has-success has-feedback\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;label for=\"email1\"&gt;Email address&lt;/label&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type=\"email\" class=\"form-control\" id=\"email1\" placeholder=\"E-Mail\" data-ng-model=\"email\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class=\"fa fa-check form-control-feedback\"&gt;&lt;/span&gt;\n&lt;/div&gt;</code></pre>\n					<div class=\"form-group has-error has-feedback\">\n						<label for=\"exampleInputEmail3\">Email address (incorrect)</label>\n						<input type=\"email\" class=\"form-control\" id=\"exampleInputEmail3\" placeholder=\"E-Mail\"\n							   data-ng-model=\"email_incorrect\">\n						<span class=\"fa fa-times form-control-feedback\"></span>\n						<p class=\"help-block\">Please correct your e-mail address</p>\n					</div>\n					<pre><code class=\"html\">&lt;div class=\"form-group has-error has-feedback\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;label for=\"email2\"&gt;Email address&lt;/label&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type=\"email\" class=\"form-control\" id=\"email2\" placeholder=\"E-Mail\" data-ng-model=\"email\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class=\"fa fa-times form-control-feedback\"&gt;&lt;/span&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;p class=\"help-block\"&gt;Please correct your e-mail address&lt;/p&gt;\n&lt;/div&gt;</code></pre>\n					<div class=\"form-group\">\n						<label for=\"exampleInputPassword1\">Password</label>\n						<input type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\"\n							   placeholder=\"Password\" data-ng-model=\"password\">\n					</div>\n					<div class=\"form-group\">\n						<label>Notes</label>\n						<textarea class=\"form-control\" rows=\"3\"></textarea>\n					</div>\n					<pre><code class=\"html\">&lt;div class=\"form-group\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;label&gt;Notes&lt;/label&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;textarea class=\"form-control\" rows=\"3\"&gt;&lt;/textarea&gt;\n&lt;/div&gt;</code></pre>\n					<h2>File input</h2>\n					<div class=\"form-group\">\n						<input type=\"file\" title=\"Search for a file to add\" ng-cloak=\"\">\n						<p class=\"help-block\">Select a file to upload.</p>\n					</div>\n					<pre><code class=\"html\">&lt;div class=\"form-group\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type=\"file\" title=\"Search for a file to add\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;p class=\"help-block\"&gt;Select a file to upload.&lt;/p&gt;\n&lt;/div&gt;</code></pre>\n					Init BootstrapFileInput to avoid default style for the file input field:\n					<pre><code class=\"JavaScript\">jQuery(document).ready(function() {\n&nbsp;&nbsp;&nbsp;&nbsp;$(\'input[type=file]\').bootstrapFileInput();\n});</code></pre>\n					<div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependeny: <a href=\"https://jquery.com/\">jquery</a></div>\n					<h2>Select</h2>\n					<div class=\"form-group\">\n						<ui-select ng-model=\"address.selected\"\n								   theme=\"bootstrap\"\n								   ng-disabled=\"disabled\"\n								   reset-search-input=\"false\">\n							<ui-select-match allow-clear=\"true\" placeholder=\"Enter an address...\">\n								{{$select.selected.formatted_address}}\n							</ui-select-match>\n							<ui-select-choices repeat=\"address in addresses track by $index\"\n											   refresh=\"refreshAddresses($select.search)\"\n											   refresh-delay=\"0\">\n								<div ng-bind-html=\"address.formatted_address | highlight: $select.search\"></div>\n							</ui-select-choices>\n						</ui-select>\n					</div>\n					<pre><code class=\"html\" ng-non-bindable>&lt;div class=\"form-group\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;ui-select ng-model=\"address.selected\" theme=\"bootstrap\" ng-disabled=\"disabled\" reset-search-input=\"false\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;ui-select-match placeholder=\"Enter an address...\"&gt;{{$select.selected.formatted_address}}&lt;/ui-select-match&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;ui-select-choices repeat=\"address in addresses track by $index\" refresh=\"refreshAddresses($select.search)\" refresh-delay=\"0\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div ng-bind-html=\"address.formatted_address | highlight: $select.search\"&gt;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/ui-select-choices&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;/ui-select&gt;\n&lt;/div&gt;</code></pre>\n					<div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://github.com/angular-ui/ui-select\">angular-ui-select</a></div>\n					<br>\n					<br>\n					<button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n				</form>\n\n				<h2>Multi-Select</h2>\n				<div class=\"form-group\">\n					<ui-select\n						multiple\n						data-ng-model=\"multipleDemo.selectedPeople\"\n						theme=\"bootstrap\"\n						sortable=\"true\"\n						close-on-select=\"true\">\n						<ui-select-match\n							placeholder=\"Select people …\">{{$item.name}} &lt;{{$item.email}}&gt;</ui-select-match>\n						<ui-select-choices\n							repeat=\"person in allPeople | propsFilter: { name: $select.search, age: $select.search, email: $select.search }\">\n							<div\n								data-ng-bind-html=\"person.name | highlight: $select.search\"></div>\n							<small>\n							Email: <span data-ng-bind-html=\"person.email | highlight: $select.search\"></span>\n							Age: <span data-ng-bind-html=\"\'\'+person.age | highlight: $select.search\"></span>\n							</small>\n						</ui-select-choices>\n					</ui-select>\n				</div>\n				<pre><code class=\"html\">&lt;ui-select\n    multiple\n    data-ng-model=&quot;multipleDemo.selectedPeople&quot;\n    theme=&quot;bootstrap&quot;\n    sortable=&quot;true&quot;\n    close-on-select=&quot;true&quot;&gt;\n    &lt;ui-select-match\n        placeholder=&quot;Select people &hellip;&quot;&gt;{{$item.name}} &amp;lt;{{$item.email}}&amp;gt;&lt;/ui-select-match&gt;\n    &lt;ui-select-choices\n        repeat=&quot;person in allPeople | propsFilter: { name: $select.search, age: $select.search, email: $select.search }&quot;&gt;\n        &lt;div\n            data-ng-bind-html=&quot;person.name | highlight: $select.search&quot;&gt;&lt;/div&gt;\n        &lt;small&gt;\n        Email: &lt;span data-ng-bind-html=&quot;person.email | highlight: $select.search&quot;&gt;&lt;/span&gt;\n        Age: &lt;span data-ng-bind-html=&quot;\'\'+person.age | highlight: $select.search&quot;&gt;&lt;/span&gt;\n        &lt;/small&gt;\n    &lt;/ui-select-choices&gt;\n&lt;/ui-select&gt;</code></pre>\n				<div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://github.com/angular-ui/ui-select\">angular-ui-select</a></div>\n\n				<br/>\n				<h2>Input Group</h2>\n				<div class=\"form-group\">\n					<label>Seperate Units</label>\n					<div class=\"input-group\">\n						<input type=\"text\" class=\"form-control\" placeholder=\"Value\" data-ng-model=\"value\">\n						<span class=\"input-group-addon\">$</span>\n					</div>\n				</div>\n				<br>\n				<pre><code class=\"html\">&lt;label&gt;Seperate Units&lt;/label&gt;\n&lt;div class=\"input-group\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type=\"text\" class=\"form-control\" placeholder=\"Value\" data-ng-model=\"value\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class=\"input-group-addon\"&gt;$&lt;/span&gt;\n&lt;/div&gt;</code></pre>\n				<h2>Typeahead</h2>\n				<div class=\"form-group has-feedback\">\n					<label class=\"control-label\" for=\"inputSearch\">Search (US states)</label>\n					<input type=\"text\" id=\"inputSearch\" class=\"form-control\" placeholder=\"Search...\"\n						   ng-model=\"ngModelOptionsSelected\"\n						   ng-model-options=\"modelOptions\"\n						   uib-typeahead=\"state for state in states | filter:$viewValue\">\n					<span class=\"fa fa-search form-control-feedback\"></span>\n				</div>\n				<pre><code class=\"html\">&lt;div class=\"form-group has-feedback\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;label class=\"control-label\" for=\"inputSearch\"&gt;Search (US states)&lt;/label&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type=\"text\" id=\"inputSearch\" class=\"form-control\" placeholder=\"Search...\" ng-model=\"ngModelOptionsSelected\" ng-model-options=\"modelOptions\" uib-typeahead=\"state for state in states | filter:$viewValue\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class=\"fa fa-search form-control-feedback\"&gt;&lt;/span&gt;\n&lt;/div&gt;</code></pre>\n				<div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://angular-ui.github.io/bootstrap/\">angular-bootstrap</a></div>\n			</div>\n		</div>\n	</div>\n</div>\n\n<script>\n	jQuery(document).ready(function() {\n		$(\'input[type=file]\').bootstrapFileInput();\n\n		$(\'pre code\').each(function(i, block) {\n			hljs.highlightBlock(block);\n		});\n	});\n</script>\n");
$templateCache.put("app/templates/components/grid.html","<div class=\"panel panel-default panel-first\">\n	<div class=\"panel-heading\">\n		<h1 id=\"grid\">Grid</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<div class=\"visible-grid\">1</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-6\">\n				<div class=\"visible-grid\">1</div>\n			</div>\n			<div class=\"col-lg-6\">\n				<div class=\"visible-grid\">2</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-4\">\n				<div class=\"visible-grid\">1</div>\n			</div>\n			<div class=\"col-lg-4\">\n				<div class=\"visible-grid\">2</div>\n			</div>\n			<div class=\"col-lg-4\">\n				<div class=\"visible-grid\">3</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-3\">\n				<div class=\"visible-grid\">1</div>\n			</div>\n			<div class=\"col-lg-3\">\n				<div class=\"visible-grid\">2</div>\n			</div>\n			<div class=\"col-lg-3\">\n				<div class=\"visible-grid\">3</div>\n			</div>\n			<div class=\"col-lg-3\">\n				<div class=\"visible-grid\">4</div>\n			</div>\n		</div>\n		<div class=\"pull-right\">\n			<a ui-sref=\"grid\">View full page example</a>\n		</div>\n	</div>\n</div>");
$templateCache.put("app/templates/components/inline-edits.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"inline-edits\">Inline Edits</h1>\n	</div>\n	<div\n			class=\"panel-body\"\n			data-ng-controller=\"InlineEditController as inlineCtrl\">\n		<div class=\"row\">\n			<div class=\"col-xs-12\">\n				<p>\n					For detail pages and other areas where data should be viewable and quickly editable\n					at the same time, there are directives to achieve that for various types of input.\n				</p>\n				<p>\n					They all work on the same principle that as soon as the input element loses\n					focus, the <code>oncommit</code> callback function is called. If this callback\n					function returns a promise, a spinning wheel is displayed until the promise is\n					resolved or rejected, at which point success or error feedback is shown where\n					the spinner previously was. The parameter given to the <code>reject</code> function\n					will be used as the error message and displayed unterneath the input element. If the\n					callback function does not return a promise, success feedback is shown instantly.\n				</p>\n				<p>\n					Forms using inline edits on detail pages should arrange them in a two column layout\n					like suggested below and on the <a href=\"/release-detailpage#top\">detail page</a>.\n				</p>\n			</div>\n		</div>\n\n		<h2>Inline text input</h2>\n		<div class=\"inline-form\">\n			<div class=\"row\">\n				<div class=\"form-group\">\n					<div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n						<label for=\"user-firstname-text\">First name</label>\n					</div>\n					<div class=\"col-xs-8 col-sm-4 col-md-3\">\n						<data-inline-text\n								id=\"user-firstname-text\"\n								data-ng-model=\"inlineCtrl.data.user.firstname\"\n								placeholder=\"First name\"\n								oncommit=\"inlineCtrl.sendToServer($data)\"></data-inline-text>\n					</div>\n					<div class=\"clearfix visible-xs\"></div>\n					<div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n					<div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n						<label for=\"user-surname-text\">Surname</label>\n					</div>\n					<div class=\"col-xs-8 col-sm-4 col-md-3\">\n						<data-inline-text\n								id=\"user-surname-text\"\n								data-ng-model=\"inlineCtrl.data.user.lastname\"\n								placeholder=\"Surname\"\n								oncommit=\"inlineCtrl.saveImmediately($data)\"></data-inline-text>\n					</div>\n					<div class=\"clearfix visible-xs\"></div>\n				</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-xs-12\">\n                    <pre><code class=\"html\">&lt;div class=&quot;inline-form&quot;&gt;\n    &lt;div class=&quot;row&quot;&gt;\n        &lt;div class=&quot;col-xs-12&quot;&gt;\n            &lt;div class=&quot;form-group&quot;&gt;\n                &lt;div class=&quot;col-xs-4 col-sm-2 col-md-2 label-container&quot;&gt;\n                    &lt;label for=&quot;user-firstname-text&quot;&gt;First name&lt;/label&gt;\n                &lt;/div&gt;\n                &lt;div class=&quot;col-xs-8 col-sm-4 col-md-3&quot;&gt;\n                    &lt;data-inline-text\n                        id=&quot;user-firstname-text&quot;\n                        data-ng-model=&quot;inlineCtrl.data.user.firstname&quot;\n                        placeholder=&quot;First name&quot;\n                        oncommit=&quot;inlineCtrl.sendToServer($data)&quot;&gt;&lt;/data-inline-text&gt;\n                &lt;/div&gt;\n                &lt;div class=&quot;clearfix visible-xs&quot;&gt;&lt;/div&gt;\n                &lt;div class=&quot;narrow col-md-2 hidden-xs hidden-sm&quot;&gt;&lt;/div&gt;\n\n                &lt;div class=&quot;col-xs-4 col-sm-2 col-md-2 label-container&quot;&gt;\n                    &lt;label for=&quot;user-surname-text&quot;&gt;Surname&lt;/label&gt;\n                &lt;/div&gt;\n                &lt;div class=&quot;col-xs-8 col-sm-4 col-md-3&quot;&gt;\n                    &lt;data-inline-text\n                        id=&quot;user-surname-text&quot;\n                        data-ng-model=&quot;inlineCtrl.data.user.lastname&quot;\n                        placeholder=&quot;Surname&quot;\n                        oncommit=&quot;inlineCtrl.saveImmediately($data)&quot;&gt;&lt;/data-inline-text&gt;\n                &lt;/div&gt;\n                &lt;div class=&quot;clearfix visible-xs&quot;&gt;&lt;/div&gt;\n            &lt;/div&gt;\n        &lt;/div&gt;\n    &lt;/div&gt;\n&lt;/div&gt;</code></pre>\n			</div>\n		</div>\n\n		<div ng-include=\"\'app/templates/components/config-blocks/inline-text.html\'\"></div>\n\n		<h2>Inline datepicker</h2>\n		<p>\n			The datepicker supports all <code>datepickerOptions</code> that the\n			<a href=\"https://angular-ui.github.io/bootstrap/#/datepickerPopup\">UI Bootstrap datepicker</a>\n			supports.\n		</p>\n		<div class=\"inline-form\">\n			<div class=\"row\">\n				<div class=\"form-group\">\n					<div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n						<label for=\"user-birthdate-picker\">Date of birth</label>\n					</div>\n					<div class=\"col-xs-8 col-sm-4 col-md-3\">\n						<inline-datepicker\n								id=\"user-birthdate-picker\"\n								data-ng-model=\"inlineCtrl.data.user.birthDate\"\n								datepicker-options=\"inlineCtrl.birthDatepickerOptions\"\n								placeholder=\"Pick your birth date\"\n								date-format=\"dd/MM/yyyy\"\n								popup-placement=\"auto top bottom\"\n								oncommit=\"inlineCtrl.sendToServer($data)\"></inline-datepicker>\n					</div>\n					<div class=\"clearfix visible-xs\"></div>\n					<div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n					<div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n						<label for=\"user-deathdate-picker\">Date of death</label>\n					</div>\n					<div class=\"col-xs-8 col-sm-4 col-md-3\">\n						<inline-datepicker\n								id=\"user-deathdate-picker\"\n								data-ng-model=\"inlineCtrl.data.user.deathDate\"\n								datepicker-options=\"inlineCtrl.deathDatepickerOptions\"\n								placeholder=\"Pick your death date\"\n								date-format=\"dd/MM/yyyy\"\n								popup-placement=\"auto top bottom\"\n								oncommit=\"inlineCtrl.saveImmediately($data)\"></inline-datepicker>\n					</div>\n					<div class=\"clearfix visible-xs\"></div>\n				</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-xs-12\">\n                    <pre><code class=\"html\">&lt;inline-datepicker\n    id=&quot;user-birthdate-picker&quot;\n    data-ng-model=&quot;inlineCtrl.data.user.birthDate&quot;\n    datepicker-options=&quot;inlineCtrl.birthDatepickerOptions&quot;\n    placeholder=&quot;Pick your birth date&quot;\n    date-format=&quot;dd/MM/yyyy&quot;\n    popup-placement=&quot;auto top bottom&quot;\n    oncommit=&quot;inlineCtrl.sendToServer($data)&quot;&gt;&lt;/inline-datepicker&gt;</code></pre>\n			</div>\n		</div>\n\n		<div ng-include=\"\'app/templates/components/config-blocks/inline-datepicker.html\'\"></div>\n\n		<h2>Inline typeahead</h2>\n		<p>\n			The typeahead is based on the\n			<a href=\"https://angular-ui.github.io/bootstrap/#/typeahead\">UI Bootstrap typeahead component</a>.\n		</p>\n		<div class=\"inline-form\">\n			<div class=\"row\">\n				<div class=\"form-group\">\n					<div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n						<label for=\"state-of-birth-typeahead\">State of birth</label>\n					</div>\n					<div class=\"col-xs-8 col-sm-4 col-md-3\">\n						<data-inline-typeahead\n								id=\"state-of-birth-typeahead\"\n								data-ng-model=\"inlineCtrl.data.user.stateOfBirth\"\n								placeholder=\"Search states …\"\n								items=\"inlineCtrl.states\"\n								oncommit=\"inlineCtrl.sendToServer($data)\"></data-inline-typeahead>\n					</div>\n					<div class=\"clearfix visible-xs\"></div>\n					<div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n					<div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n						<label for=\"state-of-death-typeahead\">State of death</label>\n					</div>\n					<div class=\"col-xs-8 col-sm-4 col-md-3\">\n						<data-inline-typeahead\n								id=\"state-of-death-typeahead\"\n								data-ng-model=\"inlineCtrl.data.user.stateOfDeath\"\n								placeholder=\"Search states …\"\n								items=\"inlineCtrl.states\"\n								oncommit=\"inlineCtrl.saveImmediately($data)\"></data-inline-typeahead>\n					</div>\n					<div class=\"clearfix visible-xs\"></div>\n				</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-xs-12\">\n                    <pre><code class=\"html\">&lt;data-inline-typeahead\n    id=&quot;state-of-birth-typeahead&quot;\n    data-ng-model=&quot;inlineCtrl.data.user.stateOfBirth&quot;\n    placeholder=&quot;Search states &hellip;&quot;\n    items=&quot;inlineCtrl.states&quot;\n    oncommit=&quot;inlineCtrl.sendToServer($data)&quot;&gt;&lt;/data-inline-typeahead&gt;</code></pre>\n			</div>\n		</div>\n\n		<div ng-include=\"\'app/templates/components/config-blocks/inline-typeahead.html\'\"></div>\n\n		<h2>Inline select</h2>\n		<div class=\"inline-form\">\n			<div class=\"row\">\n				<div class=\"form-group\">\n					<div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n						<label for=\"state-of-birth-typeahead\">Favorite artist</label>\n					</div>\n					<div class=\"col-xs-8 col-sm-4 col-md-3\">\n						<data-inline-select\n								id=\"site-select\"\n								data-ng-model=\"inlineCtrl.data.user.favoriteArtist\"\n								display-property=\"name\"\n								placeholder=\"Select or search an artist in the list …\"\n								items=\"inlineCtrl.artists\"\n								oncommit=\"inlineCtrl.sendToServer($data)\">\n							<div>\n								<span data-ng-bind-html=\"(item.name + \' (\' + item.age + \')\') | highlight:$select.search\"></span><br />\n								<small>Country:\n									<span data-ng-bind-html=\"item.country | highlight:$select.search\"></span>\n								</small>\n							</div>\n						</data-inline-select>\n					</div>\n					<div class=\"clearfix visible-xs\"></div>\n					<div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n					<div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n						<label for=\"state-of-death-typeahead\">Least favorite artist</label>\n					</div>\n					<div class=\"col-xs-8 col-sm-4 col-md-3\">\n						<data-inline-select\n								id=\"site-select\"\n								data-ng-model=\"inlineCtrl.data.user.leastFavoriteArtist\"\n								display-property=\"name\"\n								placeholder=\"Select or search an artist in the list …\"\n								items=\"inlineCtrl.artists\"\n								oncommit=\"inlineCtrl.saveImmediately($data)\">\n							<div>\n								<span data-ng-bind-html=\"(item.name + \' (\' + item.age + \')\') | highlight:$select.search\"></span><br />\n								<small>Country:\n									<span data-ng-bind-html=\"item.country | highlight:$select.search\"></span>\n								</small>\n							</div>\n						</data-inline-select>\n					</div>\n					<div class=\"clearfix visible-xs\"></div>\n				</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-xs-12\">\n                    <pre><code class=\"html\">&lt;data-inline-select\n    id=&quot;site-select&quot;\n    data-ng-model=&quot;inlineCtrl.data.user.favoriteArtist&quot;\n    display-property=&quot;name&quot;\n    placeholder=&quot;Select or search an artist in the list &hellip;&quot;\n    items=&quot;inlineCtrl.artists&quot;\n    oncommit=&quot;inlineCtrl.sendToServer($data)&quot;&gt;\n    &lt;div&gt;\n        &lt;span data-ng-bind-html=&quot;(item.name + \' (\' + item.age + \')\') | highlight:$select.search&quot;&gt;&lt;/span&gt;&lt;br /&gt;\n        &lt;small&gt;Country: &lt;span data-ng-bind-html=&quot;item.country | highlight:$select.search&quot;&gt;&lt;/span&gt;&lt;/small&gt;\n    &lt;/div&gt;\n&lt;/data-inline-select&gt;</code></pre>\n			</div>\n		</div>\n\n		<div ng-include=\"\'app/templates/components/config-blocks/inline-select.html\'\"></div>\n\n		<h2>Inline checkbox</h2>\n		<div class=\"inline-form\">\n			<div class=\"row\">\n				<div class=\"form-group\">\n					<div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n						<label for=\"user-alive-checkbox\">Alive</label>\n					</div>\n					<div class=\"col-xs-8 col-sm-4 col-md-3\">\n						<data-inline-checkbox\n								id=\"user-alive-checkbox\"\n								data-ng-model=\"inlineCtrl.data.user.alive\"\n								oncommit=\"inlineCtrl.sendToServer($data)\"></data-inline-checkbox>\n					</div>\n					<div class=\"clearfix visible-xs\"></div>\n					<div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n					<div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n						<label for=\"user-dead-checkbox\">Dead</label>\n					</div>\n					<div class=\"col-xs-8 col-sm-4 col-md-3\">\n						<data-inline-checkbox\n								id=\"user-dead-checkbox\"\n								data-ng-model=\"inlineCtrl.data.user.dead\"\n								oncommit=\"inlineCtrl.saveImmediately($data)\"></data-inline-checkbox>\n					</div>\n					<div class=\"clearfix visible-xs\"></div>\n				</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-xs-12\">\n                    <pre><code class=\"html\">&lt;data-inline-checkbox\n    id=&quot;user-alive-checkbox&quot;\n    data-ng-model=&quot;inlineCtrl.data.user.alive&quot;\n    oncommit=&quot;inlineCtrl.sendToServer($data)&quot;&gt;&lt;/data-inline-checkbox&gt;</code></pre>\n			</div>\n		</div>\n\n		<div ng-include=\"\'app/templates/components/config-blocks/inline-checkbox.html\'\"></div>\n\n		<h2>Inline textarea</h2>\n\n		<p>\n			Inline textareas are dynamic text field that grow with their content. They start out as\n			single-line text fields and will dynamically adapt to be tall enough to display all their\n			content as it\'s being entered, up to a maximum height of 200px.\n		</p>\n\n		<div class=\"inline-form\">\n			<div class=\"row\">\n				<div class=\"form-group\">\n					<div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n						<label for=\"user-biography-text\">Biography</label>\n					</div>\n					<div class=\"col-xs-8 col-sm-4 col-md-3\">\n						<data-inline-textarea\n							id=\"user-biography-text\"\n							placeholder=\"Biography\"\n							data-ng-model=\"inlineCtrl.data.user.biography\"\n							oncommit=\"inlineCtrl.sendToServer($data)\"></data-inline-textarea>\n					</div>\n\n					<div class=\"clearfix visible-xs\"></div>\n					<div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n					<div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n						<label for=\"user-testament-text\">Testament</label>\n					</div>\n					<div class=\"col-xs-8 col-sm-4 col-md-3\">\n						<data-inline-textarea\n							id=\"user-testament-text\"\n							placeholder=\"Testament\"\n							data-ng-model=\"inlineCtrl.data.user.testament\"\n							oncommit=\"inlineCtrl.saveImmediately($data)\"></data-inline-textarea>\n					</div>\n				</div>\n			</div>\n		</div>\n\n		<div class=\"row\">\n			<div class=\"col-xs-12\">\n				<pre><code class=\"html\">&lt;data-inline-textarea\n    id=&quot;user-biography-text&quot;\n    placeholder=&quot;Biography&quot;\n    data-ng-model=&quot;inlineCtrl.data.user.biography&quot;\n    oncommit=&quot;inlineCtrl.sendToServer($data)&quot;&gt;&lt;/data-inline-textarea&gt;</code></pre>\n\n				<div class=\"dependency-warning\" style=\"margin-bottom: 10px;\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://github.com/monospaced/angular-elastic\">angular-elastic</a></div>\n			</div>\n		</div>\n\n		<div ng-include=\"\'app/templates/components/config-blocks/inline-textarea.html\'\"></div>\n\n		<h2>Error display in labels</h2>\n\n		<div class=\"inline-form\">\n			<div class=\"row\">\n				<div class=\"form-group\">\n					<div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n						<label\n							for=\"user-answer-text\"\n							inline-error-display=\"inlineCtrl.answerError\">Answer to everything</label>\n					</div>\n					<div class=\"col-xs-8 col-sm-4 col-md-3\">\n						<data-inline-textarea\n							id=\"user-answer-text\"\n							placeholder=\"Answer\"\n							data-ng-model=\"inlineCtrl.data.user.answer\"\n							oncommit=\"inlineCtrl.saveImmediately($data)\"></data-inline-textarea>\n					</div>\n				</div>\n			</div>\n		</div>\n\n		<div class=\"row\">\n			<div class=\"col-xs-12\">\n				<pre><code class=\"html\">&lt;label for=&quot;user-answer-text&quot; inline-error-display=&quot;inlineCtrl.answerError&quot;&gt;Answer to everything&lt;/label&gt;</code></pre>\n			</div>\n		</div>\n	</div>\n</div>\n");
$templateCache.put("app/templates/components/loading-indicator.html","<div class=\"panel panel-default panel-first\">\n	<div class=\"panel-heading\">\n		<h1 id=\"loading-indicator\">Loading Indicator</h1>\n	</div>\n	<div class=\"panel-body\" data-ng-controller=\"LoadingController as ctrl\">\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n                <p>\n                    Waiting animation for content that is currently loading.\n                </p>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n                <div class=\"content-loading\">\n                    <i class=\"fa fa-spin fa-spinner content-placeholder-loading\"></i>\n                </div>\n            </div>\n        </div>\n\n        <pre><code class=\"html\">&lt;div class=&quot;content-loading&quot;&gt;\n    &lt;i class=&quot;fa fa-spin fa-spinner content-placeholder-loading&quot;&gt;&lt;/i&gt;\n&lt;/div&gt;</code></pre>\n\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n                <p>\n                    You can also specify a function that loads the content. Until the promise returned\n                    by that function resolves, the loading animation will be displayed:\n                </p>\n            </div>\n        </div>\n\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<button\n					class=\"btn btn-info\"\n					data-content-placeholder-reload-button>Reload content</button>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<data-content-placeholder\n					id=\"j4825673gr2354f456f3\"\n					data-content-promise=\"ctrl.loadContent()\">\n					<h2 data-ng-bind=\"ctrl.content.heading\"></h2>\n					<p data-ng-bind=\"ctrl.content.text\"></p>\n				</data-content-placeholder>\n			</div>\n		</div>\n\n		<pre><code class=\"html\">&lt;data-content-placeholder\n    data-content-promise=&quot;ctrl.loadContent()&quot;&gt;\n    &lt;h2 data-ng-bind=&quot;ctrl.content.heading&quot;&gt;&lt;/h2&gt;\n    &lt;p data-ng-bind=&quot;ctrl.content.text&quot;&gt;&lt;/p&gt;\n&lt;/data-content-placeholder&gt;</code></pre>\n	</div>\n</div>\n");
$templateCache.put("app/templates/components/modal.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"modal\">Modal</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\" data-ng-controller=\"ModalController as modalCtrl\">\n			<div class=\"col-lg-12\">\n				<button class=\"btn btn-info\" data-ng-click=\"modalCtrl.openModal()\">Open modal</button>\n			</div>\n		</div>\n		<br>\n		<pre><code class=\"html\">&lt;div class=\"modal-close\"&gt;\n    &lt;button type=\"button\" class=\"close\" ng-click=\"cancel()\"&gt;&lt;i class=\"fa fa-times color-secondary\"&gt;&lt;/i&gt;&lt;/button&gt;\n&lt;/div&gt;\n&lt;div class=\"modal-header\"&gt;\n    &lt;h2 class=\"modal-title\"&gt;A simple Modal&lt;/h2&gt;\n&lt;/div&gt;\n&lt;div class=\"modal-body\"&gt;\n    &lt;form&gt;\n        &lt;div class=\"row\"&gt;\n            &lt;div class=\"col-lg-4\"&gt;\n                &lt;div class=\"form-group\"&gt;\n                    &lt;label for=\"firstName\"&gt;First Name&lt;/label&gt;\n                    &lt;input type=\"text\" class=\"form-control\" id=\"firstName\" placeholder=\"First Name\"&gt;\n                &lt;/div&gt;\n            &lt;/div&gt;\n            &lt;div class=\"col-lg-4\"&gt;\n                &lt;div class=\"form-group\"&gt;\n                    &lt;label for=\"secondName\"&gt;Second Name&lt;/label&gt;\n                    &lt;input type=\"text\" class=\"form-control\" id=\"secondName\" placeholder=\"Second Name\"&gt;\n                &lt;/div&gt;\n            &lt;/div&gt;\n                &lt;div class=\"col-lg-4\"&gt;\n                    &lt;div class=\"form-group\"&gt;\n                    &lt;label for=\"lastName\"&gt;Last Name&lt;/label&gt;\n                    &lt;input type=\"text\" class=\"form-control\" id=\"lastName\" placeholder=\"Last Name\"&gt;\n                &lt;/div&gt;\n            &lt;/div&gt;\n        &lt;/div&gt;\n    &lt;/form&gt;\n    &lt;hr&gt;\n    Any other content you need...\n&lt;/div&gt;\n&lt;div class=\"modal-footer\"&gt;\n    &lt;hr&gt;\n    &lt;button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\"&gt;Create&lt;/button&gt;\n    &lt;button class=\"btn btn-secondary\" type=\"button\" ng-click=\"cancel()\"&gt;Cancel&lt;/button&gt;\n&lt;/div&gt;</code></pre>\n		<div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://angular-ui.github.io/bootstrap/\">angular-bootstrap</a></div>\n	</div>\n</div>");
$templateCache.put("app/templates/components/notification-popover.html","<div class=\"notifications\">\n	<table class=\"table table-hover\">\n		<tbody id=\"scroll-container\">\n			<tr class=\"highlighted-notification-title\" data-ng-if=\"!!dataArray.highlightedNotificationsTitle\">\n				<td colspan=\"2\">\n					<div class=\"title\"><strong>{{::dataArray.highlightedNotificationsTitle}}</strong></div>\n				</td>\n				<td>\n					<a class=\"go-to-overview\" data-ng-if=\"goToOverviewPageAvailable()\" data-ng-click=\"handleOverviewPage()\">See all</a>\n				</td>\n			</tr>\n			<tr class=\"highlight-notification highlight\" data-ng-repeat=\"highlightedNotification in dataArray.highlightedNotifications | orderBy: \'date\':true\">\n				<td style=\"width: 100px;\" class=\"pointer\" data-ng-init=\"highlightedNotification.collapsed = true\" data-ng-click=\"highlightedNotification.collapsed = !highlightedNotification.collapsed\">\n					<span class=\"fa-stack fa-lg\">\n						<i class=\"fa fa-circle fa-stack-2x {{::highlightedNotification.icon.color}}\"></i>\n						<i class=\"fa {{::highlightedNotification.icon.symbol}} fa-stack-1x fa-inverse\"></i>\n					</span>\n					<span data-ng-if=\"!!highlightedNotification.message\">\n						<i class=\"fa fa-lg\" data-ng-class=\"{\'fa-caret-right\' : highlightedNotification.collapsed, \'fa-caret-down\' : !highlightedNotification.collapsed}\"></i>\n					</span>\n				</td>\n				<td class=\"pointer\" data-ng-click=\"handleHighlightNotification(highlightedNotification)\">\n					<div class=\"action\">\n						<strong>{{::highlightedNotification.username}}</strong> {{::highlightedNotification.action}}\n					</div>\n					<div class=\"message\" data-ng-if=\"!!highlightedNotification.message\" uib-collapse=\"highlightedNotification.collapsed\">\n						<div class=\"details\"><span>{{::highlightedNotification.message}}</span></div>\n					</div>\n				</td>\n				<td class=\"meta-info-time\" am-time-ago=\"highlightedNotification.date\" title=\"{{highlightedNotification.date | date:\'yyyy-mm-dd hh:mm:ss\'}}\"></td>\n			</tr>\n			<tr class=\"notification-title\" data-ng-if=\"!!dataArray.notificationsTitle\">\n				<td colspan=\"2\">\n					<div class=\"title\"><strong>{{::dataArray.notificationsTitle}}</strong></div>\n				</td>\n				<td>\n					<a class=\"go-to-overview\" data-ng-if=\"goToOverviewPageAvailable()\" data-ng-click=\"handleOverviewPage()\">See all</a>\n				</td>\n			</tr>\n			<tr class=\"notification\" data-ng-repeat=\"notification in dataArray.notifications | orderBy: \'date\':true\"\n				data-ng-class=\"{\'unread\': !notification.handled}\">\n				<td style=\"width: 100px;\" class=\"pointer\" data-ng-init=\"notification.collapsed = true\" data-ng-click=\"notification.collapsed = !notification.collapsed\">\n					<span class=\"fa-stack fa-lg\">\n						<i class=\"fa fa-circle fa-stack-2x {{::notification.icon.color}}\"></i>\n						<i class=\"fa {{::notification.icon.symbol}} fa-stack-1x fa-inverse\"></i>\n					</span>\n					<span data-ng-if=\"notification.message\">\n						<i class=\"fa fa-lg\" data-ng-class=\"{\'fa-caret-right\' : notification.collapsed, \'fa-caret-down\' : !notification.collapsed}\"></i>\n					</span>\n				</td>\n				<td class=\"pointer\" data-ng-click=\"handleNotification(notification)\">\n					<div class=\"action\">\n						<strong>{{::notification.username}}</strong> {{::notification.action}}\n					</div>\n					<div class=\"message\" data-ng-if=\"!!notification.message\" uib-collapse=\"notification.collapsed\">\n						<div class=\"details\"><span>{{::notification.message}}</span></div>\n					</div>\n				</td>\n				<td class=\"meta-info-time\" am-time-ago=\"notification.date\" title=\"{{notification.date | date:\'yyyy-mm-dd hh:mm:ss\'}}\"></td>\n			</tr>\n			<tr data-ng-show=\"showLoading\">\n				<td colspan=\"3\">\n					<div class=\"text-center\">\n						<i class=\"fa fa-refresh fa-spin fa-2x fa-fw\"></i>\n						<span class=\"sr-only\">Loading...</span>\n					</div>\n				</td>\n			</tr>\n		</tbody>\n	</table>\n	<div class=\"footer notifications-mark-all-as-read\"><a data-ng-click=\"handleMarkAllAsRead()\">Mark all as read</a></div>\n	<div infinite-scroll=\"loadMoreNotifications()\" infinite-scroll-disabled=\"infiniteScrollDisabled\" infinite-scroll-container=\"\'.popover-content\'\" infinite-scroll-distance=\"0.5\"></div>\n</div>");
$templateCache.put("app/templates/components/notifications.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"notifications\">Notifications</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<p></p>\n				<p>Take a look into the navbar for the notification icon and the notification count.</p>\n				<p>\n					<button class=\"btn btn-default\" data-ng-click=\"appCtrl.addNotification()\"><i class=\"fa fa-bell-slash-o\"></i> Add a read notification</button>\n					<button class=\"btn btn-default\" data-ng-click=\"appCtrl.addNewNotification()\"><i class=\"fa fa-bell-o\"></i> Add a new notification</button>\n					<button class=\"btn btn-default\" data-ng-click=\"appCtrl.addHighlightedNotification()\"><i class=\"fa fa-bell-o\"></i> Add a new highlighted notification</button>\n				</p>\n				<pre><code class=\"html\">&lt;notification\n	notification-title=&quot;ctrl.notifications.title&quot;\n	notification-template=&quot;ctrl.notifications.template&quot;\n	notification-data=&quot;ctrl.notifications.data&quot;\n	notification-handle=&quot;ctrl.notifications.handle({notification: notification})&quot;\n	notification-handle-highlighted=&quot;ctrl.notifications.handleHighlighted({notification: notification})&quot;\n	notification-mark-all-as-read=&quot;ctrl.notifications.markAllAsRead({notifications: notifications})&quot;\n	notification-load-more=&quot;ctrl.notifications.loadMoreNotifications()&quot;&gt;&lt;/notification&gt;</code></pre>\n				<div ng-include=\"\'app/templates/components/config-blocks/notification.html\'\"></div>\n				<div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependencies:\n					<a href=\"https://github.com/jacob-meacham/angular-notification-icons\">angular-notification-icons</a>,\n					<a href=\"https://github.com/sroze/ngInfiniteScroll\">ng-infinite-scroll</a>,\n					<a href=\"https://angular-ui.github.io/bootstrap/\">angular-bootstrap</a>,\n					<a href=\"https://github.com/urish/angular-moment\">angular-moment</a>,\n					<a href=\"https://github.com/angular/bower-angular-animate\">angular-animate</a>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>");
$templateCache.put("app/templates/components/pagination.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"pagination\">Pagination</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\" data-ng-controller=\"PaginationController as paginationCtrl\">\n			<div class=\"col-lg-12\">\n				<uib-pagination total-items=\"paginationCtrl.bigTotalItems\" ng-model=\"paginationCtrl.bigCurrentPage\" max-size=\"paginationCtrl.maxSize\"\n								class=\"pagination pull-left with-page-number-input\" boundary-links=\"true\"\n								force-ellipses=\"false\"></uib-pagination>\n				<input type=\"text\" class=\"pagination-page-number-input\" placeholder=\"Page...\" ng-model=\"paginationCtrl.pageNumber\"\n					   data-ng-change=\"paginationCtrl.changePageNumber(paginationCtrl.pageNumber)\">\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n                    <pre><code class=\"html\">&lt;uib-pagination total-items=\"bigTotalItems\" ng-model=\"bigCurrentPage\" max-size=\"maxSize\"\n&nbsp;&nbsp;&nbsp;&nbsp;class=\"pagination pull-left with-page-number-input\" boundary-links=\"true\" force-ellipses=\"false\"&gt;&lt;/uib-pagination&gt;\n&lt;input type=\"text\" class=\"pagination-page-number-input\" placeholder=\"Page...\" ng-model=\"pageNumber\" data-ng-change=\"changePageNumber(pageNumber)\"&gt;</code></pre>\n				<div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://angular-ui.github.io/bootstrap/\">angular-bootstrap</a></div>\n			</div>\n		</div>\n	</div>\n</div>");
$templateCache.put("app/templates/components/panel.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"panel-example\">Panel Example</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<div>Panel Body</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-12 data-create-code\">\n                    <pre><code class=\"html\">&lt;div class=\"panel panel-default\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"panel-heading\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;h1 id=\"status\"&gt;Panel Header&lt;/h1&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"panel-body\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"row\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"col-lg-12\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;Panel Body&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"panel-footer\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"row\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"col-lg-12\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div&gt;Panel Footer&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;\n&lt;/div&gt;</code></pre>\n			</div>\n		</div>\n	</div>\n	<div class=\"panel-footer\">\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<div>Panel Footer</div>\n			</div>\n		</div>\n	</div>\n</div>");
$templateCache.put("app/templates/components/popover.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"popover\">Popover</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n                    <span\n							class=\"popover-anchor\"\n							id=\"popover-hover-anchor\"\n							uib-popover=\"Darth Vader acknowledges fatherhood of rebel alliance youngster Luke Skywalker.\"\n							popover-title=\"Breaking News\"\n							popover-placement=\"auto top-left\"\n							popover-trigger=\"mouseenter\">Move the cursor over me</span>\n			</div>\n		</div>\n\n		<br />\n		<br />\n\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<p>\n					Popovers can be declared on an element using the regular UI Bootstrap Popover directive.\n					Popovers can also specify custom templates containing arbitrary HTML. For detailed info on\n					how to do this, consult the <a href=\"https://angular-ui.github.io/bootstrap/#/popover\">UI Bootstrap documentation</a>.\n				</p>\n			</div>\n		</div>\n\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n                    <pre><code class=\"html\">&lt;span\n&nbsp;&nbsp;&nbsp;&nbsp;uib-popover=&quot;Content&quot;\n&nbsp;&nbsp;&nbsp;&nbsp;popover-title=&quot;Title&quot;\n&nbsp;&nbsp;&nbsp;&nbsp;popover-placement=&quot;auto top-left&quot;\n&nbsp;&nbsp;&nbsp;&nbsp;popover-trigger=&quot;mouseenter&quot;&gt;Move the cursor over me&lt;/span&gt;</code></pre>\n				<div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://angular-ui.github.io/bootstrap/\">angular-bootstrap</a></div>\n			</div>\n		</div>\n	</div>\n</div>");
$templateCache.put("app/templates/components/slide-navigation.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"slide\">Slide navigation</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\" data-ng-controller=\"ModalController as modalCtrl\">\n			<div class=\"col-lg-12\">\n				<button class=\"btn btn-info\" data-ng-click=\"modalCtrl.openSlideModal1()\">Open modal</button>\n				<button class=\"btn btn-info\" data-ng-click=\"modalCtrl.openSlideModal2()\">Open modal with nested form</button>\n			</div>\n		</div>\n		<br>\n		<pre><code class=\"html\">&lt;div class=\"modal-header\"&gt;\n    &lt;h2 class=\"modal-title\"&gt;Create Deal&lt;/h2&gt;\n&lt;/div&gt;\n&lt;div class=\"modal-body\"&gt;\n    &lt;uib-tabset active=\"activeJustified\" justified=\"true\" template-url=\"\"&gt;\n        &lt;uib-tab index=\"0\" heading=\"Common\"&gt;\n            &lt;uib-tab-heading&gt;\n                &lt;div class=\"number-circle\"&gt;1&lt;/div&gt; Common&lt;/h5&gt;\n            &lt;/uib-tab-heading&gt;\n            &lt;div class=\"form-group has-success has-feedback\"&gt;\n                &lt;label for=\"deal\"&gt;Deal&lt;/label&gt;\n                &lt;input type=\"text\" class=\"form-control\" id=\"deal\" placeholder=\"Deal\"&gt;\n                &lt;span class=\"fa fa-check form-control-feedback\"&gt;&lt;/span&gt;\n            &lt;/div&gt;\n        &lt;/uib-tab&gt;\n        &lt;uib-tab index=\"1\"&gt;\n            &lt;uib-tab-heading&gt;\n                &lt;span class=\"number-circle\"&gt;2&lt;/span&gt; Financial\n            &lt;/uib-tab-heading&gt;\n            Financial data...\n        &lt;/uib-tab&gt;\n        &lt;uib-tab index=\"2\" heading=\"People\"&gt;\n            &lt;uib-tab-heading&gt;\n                &lt;span class=\"number-circle\"&gt;3&lt;/span&gt; People\n            &lt;/uib-tab-heading&gt;\n            People data...\n        &lt;/uib-tab&gt;\n    &lt;/uib-tabset&gt;\n&lt;/div&gt;\n&lt;div class=\"modal-footer\"&gt;\n    &lt;button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\"&gt;Create&lt;/button&gt;\n    &lt;button class=\"btn btn-secondary\" type=\"button\" ng-click=\"cancel()\"&gt;Cancel&lt;/button&gt;\n&lt;/div&gt;</code></pre>\n		<div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://angular-ui.github.io/bootstrap/\">angular-bootstrap</a></div>\n	</div>\n</div>");
$templateCache.put("app/templates/components/status.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"status\">Status</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<h2>A four step status bar</h2>\n				<div class=\"row\">\n					<div class=\"col-lg-6\">\n						<div class=\"progress-status\">\n							<div class=\"progress-display-status\">\n								<div class=\"status-line\"></div>\n								<div class=\"status-active\">1</div>\n								<div class=\"status-open\"></div>\n								<div class=\"status-open\"></div>\n								<div class=\"status-open\"></div>\n							</div>\n							<div class=\"status-percentage\">0&#37;<span\n									class=\"status-percentage-text\">complete</span>\n							</div>\n						</div>\n					</div>\n					<div class=\"col-lg-6\">\n						<div class=\"progress-status\">\n							<div class=\"progress-display-status\">\n								<div class=\"status-line\"></div>\n								<div class=\"status-finished\"></div>\n								<div class=\"status-active\">2</div>\n								<div class=\"status-open\"></div>\n								<div class=\"status-open\"></div>\n							</div>\n							<div class=\"status-percentage\">25&#37;<span\n									class=\"status-percentage-text\">complete</span>\n							</div>\n						</div>\n					</div>\n				</div>\n				<div class=\"row\">\n					<div class=\"col-lg-6\">\n						<div class=\"progress-status\">\n							<div class=\"progress-display-status\">\n								<div class=\"status-line\"></div>\n								<div class=\"status-finished\"></div>\n								<div class=\"status-finished\"></div>\n								<div class=\"status-active\">3</div>\n								<div class=\"status-open\"></div>\n							</div>\n							<div class=\"status-percentage\">50&#37;<span\n									class=\"status-percentage-text\">complete</span>\n							</div>\n						</div>\n					</div>\n					<div class=\"col-lg-6\">\n						<div class=\"progress-status\">\n							<div class=\"progress-display-status\">\n								<div class=\"status-line\"></div>\n								<div class=\"status-finished\"></div>\n								<div class=\"status-finished\"></div>\n								<div class=\"status-finished\"></div>\n								<div class=\"status-active\">4</div>\n							</div>\n							<div class=\"status-percentage\">75&#37;<span\n									class=\"status-percentage-text\">complete</span>\n							</div>\n						</div>\n					</div>\n				</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<h2>Longer status bar</h2>\n				<div class=\"progress-status\">\n					<div class=\"progress-display-status\">\n						<div class=\"status-line\"></div>\n						<div class=\"status-finished\"></div>\n						<div class=\"status-finished\"></div>\n						<div class=\"status-finished\"></div>\n						<div class=\"status-finished\"></div>\n						<div class=\"status-finished\"></div>\n						<div class=\"status-finished\"></div>\n						<div class=\"status-finished\"></div>\n						<div class=\"status-active\">8</div>\n						<div class=\"status-open\"></div>\n						<div class=\"status-open\"></div>\n					</div>\n					<div class=\"status-percentage\">70&#37;<span class=\"status-percentage-text\">complete</span>\n					</div>\n				</div>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-12 data-create-code\">\n                    <pre><code class=\"html\">&lt;div class=\"progress-status\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"progress-display-status\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"status-line\"&gt;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"status-finished\"&gt;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"status-finished\"&gt;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"status-active\"&gt;3&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"status-open\"&gt;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"status-percentage\"&gt;50&amp;&#35;&#51;&#55;&#59;&lt;span class=\"status-percentage-text\"&gt;complete&lt;/span&gt;&lt;/div&gt;\n&lt;/div&gt;</code></pre>\n			</div>\n		</div>\n	</div>\n</div>");
$templateCache.put("app/templates/components/sticky.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"sticky\">Sticky header</h1>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<p>For a sticky panel-heading or body-header add the \"sticky\"-directive.</p>\n			</div>\n		</div>\n		<div class=\"row\">\n			<div class=\"col-lg-12\">\n				<pre><code class=\"html\">&lt;div class=\"panel-heading\" sticky offset=\"75\" sticky-class=\"sticky\"&gt;&lt;/div&gt;</code></pre>\n				<div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://github.com/d-oliveros/ngSticky\">ngSticky</a></div>\n			</div>\n		</div>\n	</div>\n</div>");
$templateCache.put("app/templates/components/table.html","<div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n        <h1 id=\"table\">Table</h1>\n    </div>\n    <div class=\"panel-body\">\n        <div class=\"row\">\n            <div class=\"col-lg-12\">\n                <div data-ng-controller=\"TableController as tableCtrl\">\n                    <h2>Table</h2>\n                    <div class=\"tableStandard-responsive\">\n                        <table id=\"tableStandard\" class=\"table table-hover table-fluid table-fixed-header\">\n                        <thead>\n                        <tr>\n                            <th class=\"shrink\">\n                                <div class=\"bmg-checkbox\">\n                                    <input type=\"checkbox\" id=\"tableCheckAll\"/>\n                                    <label for=\"tableCheckAll\"><div></div></label>\n                                </div>\n                            </th>\n                            <th>Header A <i class=\"fa fa-sort\"></i></th>\n                            <th>Header B <i class=\"fa fa-sort\"></i></th>\n                            <th>Header C <i class=\"fa fa-sort\"></i></th>\n                            <th class=\"shrink\">\n                                <div class=\"pull-right\">\n                                    <button type=\"button\" class=\"btn btn-secondary btn-fa\">\n                                        <i class=\"fa fa-columns\"></i>\n                                    </button>\n                                    <button type=\"button\" class=\"btn btn-secondary btn-fa\">\n                                        <i class=\"fa fa-filter\"></i>\n                                    </button>\n                                </div>\n                            </th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr ng-repeat=\"content in tableCtrl.data\">\n                            <td>\n                                <div class=\"bmg-checkbox\">\n                                    <input type=\"checkbox\" id=\"row-{{$index}}\"/>\n                                    <label for=\"row-{{$index}}\"><div></div></label>\n                                </div>\n                            </td>\n                            <td>{{ content.a }}{{ $index }}</td>\n                            <td>{{ content.b }}{{ $index }}</td>\n                            <td>{{ content.c }}{{ $index }}</td>\n                            <td>\n                                <div class=\"pull-right\">\n                                    <button type=\"button\" class=\"btn btn-primary btn-fa\">\n                                        <i class=\"fa fa-pencil\"></i>\n                                    </button>\n                                </div>\n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                    </div>\n                    <h2>Table condensed</h2>\n                    <div class=\"tableCondensed-responsive\">\n                        <table id=\"tableCondensed\" class=\"table-condensed table-hover table-fluid\">\n                        <thead>\n                        <tr>\n                            <th class=\"shrink\">\n                                <div class=\"bmg-checkbox\">\n                                    <input type=\"checkbox\" id=\"tableCondensedCheckAll\"/>\n                                    <label for=\"tableCondensedCheckAll\"><div></div></label>\n                                </div>\n                            </th>\n                            <th>Header A <i class=\"fa fa-sort\"></i></th>\n                            <th>Header B <i class=\"fa fa-sort\"></i></th>\n                            <th>Header C <i class=\"fa fa-sort\"></i></th>\n                            <th class=\"shrink\">\n                                <div class=\"pull-right\">\n                                    <button type=\"button\" class=\"btn btn-secondary btn-xs btn-fa\">\n                                        <i class=\"fa fa-columns\"></i>\n                                    </button>\n                                    <button type=\"button\" class=\"btn btn-secondary btn-xs btn-fa\">\n                                        <i class=\"fa fa-filter\"></i>\n                                    </button>\n                                </div>\n                            </th>\n                        </tr>\n                        </thead>\n                        <tbody>\n                        <tr ng-repeat=\"content in tableCtrl.data\">\n                            <td>\n                                <div class=\"bmg-checkbox\">\n                                    <input type=\"checkbox\" id=\"rowc-{{$index}}\"/>\n                                    <label for=\"rowc-{{$index}}\"><div></div></label>\n                                </div>\n                            </td>\n                            <td>{{ content.a }}{{ $index }}</td>\n                            <td>{{ content.b }}{{ $index }}</td>\n                            <td>{{ content.c }}{{ $index }}</td>\n                            <td>\n                                <div class=\"pull-right\">\n                                    <button type=\"button\" class=\"btn btn-primary btn-xs btn-fa\">\n                                        <i class=\"fa fa-pencil\"></i>\n                                    </button>\n                                </div>\n                            </td>\n                        </tr>\n                        <tr>\n                            <td>\n                                <div class=\"bmg-checkbox\">\n                                    <input type=\"checkbox\" id=\"row-master\"/>\n                                    <label for=\"row-master\"><div></div></label>\n                                </div>\n                            </td>\n                            <td>I am a master row</td>\n                            <td>I can be expanded</td>\n                            <td>\n                                <a\n                                    href=\"#\"\n                                    data-row-expander\n                                    data-row-expanded-by-default=\"false\">Just click here</a>\n                            </td>\n                            <td>\n                                <div class=\"pull-right\">\n                                    <button type=\"button\" class=\"btn btn-primary btn-xs btn-fa\">\n                                        <i class=\"fa fa-pencil\"></i>\n                                    </button>\n                                </div>\n                            </td>\n                        </tr>\n                        <tr class=\"slave-row\">\n                            <td colspan=\"5\">\n                                <div>\n                                    Expanded content.\n                                </div>\n                            </td>\n                        </tr>\n                        <tr>\n                            <td>\n                                <div class=\"bmg-checkbox\">\n                                    <input type=\"checkbox\" id=\"rowc-appendix\"/>\n                                    <label for=\"rowc-appendix\"><div></div></label>\n                                </div>\n                            </td>\n                            <td>Content A10</td>\n                            <td>Content B10</td>\n                            <td>Content C10</td>\n                            <td>\n                                <div class=\"pull-right\">\n                                    <button type=\"button\" class=\"btn btn-primary btn-xs btn-fa\">\n                                        <i class=\"fa fa-pencil\"></i>\n                                    </button>\n                                </div>\n                            </td>\n                        </tr>\n                        </tbody>\n                    </table>\n                    </div>\n                    <br>\n                    <pre><code class=\"html\" ng-non-bindable>&lt;div class=\"table-id-responsive\"&gt;\n&lt;table class=\"table table-hover table-fluid\"&gt; &lt;!-- use css class \"table-condensed\" for small size table --&gt;\n&lt;thead&gt;\n    &lt;tr&gt;\n        &lt;th class=\"shrink\"&gt;\n            &lt;div class=\"bmg-checkbox\"&gt;\n                &lt;input type=\"checkbox\" id=\"checkAll\"/&gt;\n                &lt;label for=\"checkAll\"&gt;&lt;div&gt;&lt;/div&gt;&lt;/label&gt;\n            &lt;/div&gt;\n        &lt;/th&gt;\n        &lt;th&gt;Header A &lt;i class=\"fa fa-sort\"&gt;&lt;/i&gt;&lt;/th&gt;\n        &lt;th&gt;Header B &lt;i class=\"fa fa-sort\"&gt;&lt;/i&gt;&lt;/th&gt;\n        &lt;th&gt;Header C &lt;i class=\"fa fa-sort\"&gt;&lt;/i&gt;&lt;/th&gt;\n        &lt;th class=\"shrink\"&gt;\n            &lt;div class=\"pull-right\"&gt;\n                &lt;button type=\"button\" class=\"btn btn-secondary btn-fa\"&gt;\n                    &lt;i class=\"fa fa-columns\"&gt;&lt;/i&gt;\n                &lt;/button&gt;\n                &lt;button type=\"button\" class=\"btn btn-secondary btn-fa\"&gt;\n                    &lt;i class=\"fa fa-filter\"&gt;&lt;/i&gt;\n                &lt;/button&gt;\n            &lt;/div&gt;\n        &lt;/th&gt;\n    &lt;/tr&gt;\n&lt;/thead&gt;\n&lt;tbody&gt;\n    &lt;tr ng-repeat=\"content in data\"&gt;\n        &lt;td&gt;\n            &lt;div class=\"bmg-checkbox\"&gt;\n                &lt;input type=\"checkbox\" id=\"row-&#123;&#123;$index&#125;&#125;\"/&gt;\n                &lt;label for=\"row-&#123;&#123;$index&#125;&#125;\"&gt;&lt;div&gt;&lt;/div&gt;&lt;/label&gt;\n            &lt;/div&gt;\n        &lt;/td&gt;\n        &lt;td&gt;&#123;&#123; content.a &#125;&#125;&#123;&#123; $index &#125;&#125;&lt;/td&gt;\n        &lt;td&gt;&#123;&#123; content.b &#125;&#125;&#123;&#123; $index &#125;&#125;&lt;/td&gt;\n        &lt;td&gt;&#123;&#123; content.c &#125;&#125;&#123;&#123; $index &#125;&#125;&lt;/td&gt;\n        &lt;td&gt;\n            &lt;div class=\"pull-right\"&gt;\n                &lt;button type=\"button\" class=\"btn btn-primary btn-fa\"&gt;\n                    &lt;i class=\"fa fa-pencil\"&gt;&lt;/i&gt;\n                &lt;/button&gt;\n            &lt;/div&gt;\n        &lt;/td&gt;\n    &lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;\n&lt;/div&gt;</code></pre>\n                </div>\n                <hr>\n                Add this to your html file(s) for a fixed table header:\n                <pre><code class=\"html\">&lt;!-- Add this meta tag into your header to placate IE --&gt;\n&lt;meta http-equiv=\"X-UA-Compatible\" content=\"IE=10; IE=9; IE=8; IE=7; IE=EDGE\" /&gt;</code></pre>\n                <pre><code class=\"JavaScript\">&lt;script&gt;\njQuery(document).ready(function() {\n    &#36;(\'table#table-id\').floatThead({\n        top: function(&#36;table) {\n            return &#36;table.top = 75;\n        },\n        responsiveContainer: function($table){\n            return $table.closest(\'.table-id-responsive\');\n        }\n    });\n});\n&lt;/script&gt;</code></pre>\n                <div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"http://mkoryak.github.io/floatThead/\">floatThead</a> version <= 1.4.3</div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<script>\n    jQuery(document).ready(function() {\n        $(\'table#tableStandard\').floatThead({\n            top: function($table) {\n                return $table.top = 75;\n            },\n            responsiveContainer: function($table){\n                return $table.closest(\'.tableStandard-responsive\');\n            }\n        });\n\n        $(\'table#tableCondensed\').floatThead({\n            top: function($table) {\n                return $table.top = 75;\n            },\n            responsiveContainer: function($table){\n                return $table.closest(\'.tableCondensed-responsive\');\n            }\n        });\n    });\n</script>\n");
$templateCache.put("app/templates/components/typography.html","<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h1 id=\"typography\">Typography</h1>\n	</div>\n	<div class=\"panel-body\">\n		<h1>h1. Bootstrap heading</h1>\n		<h2>h2. Bootstrap heading</h2>\n		<h3>h3. Bootstrap heading</h3>\n		<h4>h4. Bootstrap heading</h4>\n		<h5>h5. Bootstrap heading</h5>\n		<h6>h6. Bootstrap heading</h6>\n	</div>\n</div>");
$templateCache.put("app/templates/examples/grid.html","<div class=\"body-header\">\n    <div class=\"container\">\n        <div class=\"row vertical-center\">\n            <div class=\"col-lg-6\">\n                <h2><strong>Grid example</strong></h2>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-lg-12\">\n            <div class=\"panel panel-default panel-first panel-example\">col 12</div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-lg-6\">\n            <div class=\"panel panel-default panel-example\">col 6</div>\n        </div>\n        <div class=\"col-lg-6\">\n            <div class=\"panel panel-default panel-example\">col 6</div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-lg-4\">\n            <div class=\"panel panel-default panel-example\">col 4</div>\n        </div>\n        <div class=\"col-lg-4\">\n            <div class=\"panel panel-default panel-example\">col 4</div>\n        </div>\n        <div class=\"col-lg-4\">\n            <div class=\"panel panel-default panel-example\">col 4</div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-lg-3\">\n            <div class=\"panel panel-default panel-example\">col 3</div>\n        </div>\n        <div class=\"col-lg-3\">\n            <div class=\"panel panel-default panel-example\">col 3</div>\n        </div>\n        <div class=\"col-lg-3\">\n            <div class=\"panel panel-default panel-example\">col 3</div>\n        </div>\n        <div class=\"col-lg-3\">\n            <div class=\"panel panel-default panel-example\">col 3</div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-lg-2\">\n            <div class=\"panel panel-default panel-example\">col 2</div>\n        </div>\n        <div class=\"col-lg-2\">\n            <div class=\"panel panel-default panel-example\">col 2</div>\n        </div>\n        <div class=\"col-lg-2\">\n            <div class=\"panel panel-default panel-example\">col 2</div>\n        </div>\n        <div class=\"col-lg-2\">\n            <div class=\"panel panel-default panel-example\">col 2</div>\n        </div>\n        <div class=\"col-lg-2\">\n            <div class=\"panel panel-default panel-example\">col 2</div>\n        </div>\n        <div class=\"col-lg-2\">\n            <div class=\"panel panel-default panel-example\">col 2</div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n    </div>\n</div>");
$templateCache.put("app/templates/examples/release-detailpage.html","<div class=\"panel panel-default\">\n    <div class=\"full-width\">\n        <div class=\"panel-heading condensed\" sticky offset=\"75\" sticky-class=\"sticky\">\n            <div class=\"row vertical-center\">\n                <div class=\"col-md-4 button-with-headline\">\n                    <button type=\"button\" class=\"btn btn-default btn-circle pull-left\">\n                        <i class=\"fa fa-chevron-left\"></i>\n                    </button>\n                    <h5><strong>Edit Project</strong> Moby beautiful</h5>\n                </div>\n                <div class=\"col-md-4\">\n                    <div class=\"progress-status horizontal-center\">\n                        <div class=\"progress-display-status\">\n                            <div class=\"status-line\"></div>\n                            <div class=\"status-finished\"></div>\n                            <div class=\"status-finished\"></div>\n                            <div class=\"status-active\">3</div>\n                            <div class=\"status-open\"></div>\n                        </div>\n                        <div class=\"status-percentage\">50&#37;<span class=\"status-percentage-text\">complete</span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-md-4\">\n                    <div class=\"actions\">\n                        <button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-share-square-o\"></i></button>\n                        <button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-file-pdf-o\"></i></button>\n                        <button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-history\"></i></button>\n                        <button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-gear\"></i></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"panel-body-fluid\">\n        <div class=\"row row-with-sidebar\">\n            <div class=\"col-lg-2 sidebar\">\n                <ul class=\"nav nav-sidebar\">\n                    <li class=\"active\">\n                        <a href=\"\">\n                            <span class=\"nav-text\">General</span>\n                            <data-sidebar-badge\n                                data-status=\"success\"\n                                id=\"generalStatus\"></data-sidebar-badge>\n                        </a>\n                    </li>\n                    <li>\n                        <a ui-sref=\"release-structure\">\n                            <span class=\"nav-text\">Structure</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Rights</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Split Ownership</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Exploration</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Local Data</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Contributors</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Recordings</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Packages</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Projects</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Assets</span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"col-lg-10 sidebar-content\" data-ng-controller=\"EditableController as editableCtrl\">\n                <div class=\"form-horizontal inline-form\">\n\n                    <h4>Header</h4>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n                            <label for=\"site-select\">Site</label>\n                        </div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">\n                            <data-inline-select\n                                id=\"site-select\"\n                                tabindex=\"1\"\n                                disabled=\"false\"\n                                allow-clear=\"true\"\n                                data-ng-model=\"editableCtrl.site\"\n                                display-property=\"text\"\n                                placeholder=\"Select or search a site in the list …\"\n                                items=\"editableCtrl.data.sites\"\n                                position=\"auto\"\n                                refresh=\"editableCtrl.loadAsync($query)\"\n                                refresh-delay=\"1000\"\n                                oncommit=\"editableCtrl.promiseValue($data)\">\n                                <div>\n                                    <span data-ng-bind-html=\"item.text | highlight:$select.search\"></span><br />\n                                    <small>ID:\n                                        <span\n                                            data-ng-bind-html=\"item.value | highlight:$select.search\"></span>,\n                                        Location:\n                                        <span\n                                            data-ng-bind-html=\"item.location | highlight:$select.search\"></span>\n                                    </small>\n                                </div>\n                            </data-inline-select>\n                        </div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n                            <label\n                                for=\"barcode-text\"\n                                inline-error-display=\"editableCtrl.errors.barcode\">Barcode</label>\n                        </div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">\n                            <data-inline-text\n                                id=\"barcode-text\"\n                                tabindex=\"2\"\n                                input-type=\"number\"\n                                data-ng-model=\"editableCtrl.data.barcode\"\n                                placeholder=\"Barcode\"\n                                disabled=\"false\"\n                                oncommit=\"editableCtrl.promiseValue($data)\"></data-inline-text>\n                        </div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Package</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">N/a</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n                            <label for=\"release-date-datepicker\">Release Date</label>\n                        </div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">\n                            <data-inline-datepicker\n                                id=\"release-date-datepicker\"\n                                tabindex=\"3\"\n                                data-ng-model=\"editableCtrl.data.date\"\n                                data-ng-model-options=\"{ timezone: \'+0000\' }\"\n                                datepicker-options=\"editableCtrl.datepickerOptions\"\n                                placeholder=\"Pick a release date\"\n                                date-format=\"dd.MM.yyyy\"\n                                show-button-bar=\"true\"\n                                disabled=\"false\"\n                                popup-placement=\"auto top bottom\"\n                                oncommit=\"editableCtrl.promiseValue($data)\"></data-inline-datepicker>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n                            <label for=\"product-code-text\">Product Code</label>\n                        </div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">\n                            <data-inline-text\n                                id=\"product-code-text\"\n                                tabindex=\"4\"\n                                data-ng-model=\"editableCtrl.data.productCode\"\n                                placeholder=\"Product Code\"\n                                select-on-focus=\"true\"\n                                oncommit=\"editableCtrl.saveValue($data)\"></data-inline-text>\n                        </div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n                            <label for=\"email-text\">Email Address</label>\n                        </div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">\n                            <data-inline-text\n                                id=\"email-text\"\n                                tabindex=\"5\"\n                                input-type=\"email\"\n                                data-ng-model=\"editableCtrl.data.emailAddress\"\n                                placeholder=\"Email Address\"\n                                oncommit=\"editableCtrl.saveValue($data)\"></data-inline-text>\n                        </div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n                            <label for=\"artist-name-text\">Display Artist Name</label>\n                        </div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">\n                            <data-inline-text\n                                id=\"artist-name-text\"\n                                tabindex=\"6\"\n                                data-ng-model=\"editableCtrl.data.artistName\"\n                                placeholder=\"Display Artist Name\"\n                                oncommit=\"editableCtrl.saveValue($data)\"></data-inline-text>\n                        </div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n                            <label for=\"state-of-birth-typeahead\">State of birth</label>\n                        </div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">\n                            <data-inline-typeahead\n                                id=\"state-of-birth-typeahead\"\n                                tabindex=\"7\"\n                                data-ng-model=\"editableCtrl.data.stateOfBirth\"\n                                placeholder=\"Search states …\"\n                                items=\"editableCtrl.states\"\n                                disabled=\"false\"\n                                oncommit=\"editableCtrl.promiseValue($data)\"></data-inline-typeahead>\n                        </div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Product Title</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">Peggy the Pistol/Hogs Are a Coming</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n                            <label for=\"sidebar-badge-status-select\">Sidebar badge status</label>\n                        </div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">\n                            <data-inline-select\n                                id=\"sidebar-badge-status-select\"\n                                tabindex=\"8\"\n                                data-ng-model=\"editableCtrl.badgeStatus\"\n                                placeholder=\"Select or search a status in the list …\"\n                                items=\"editableCtrl.data.badgeStatii\"\n                                allow-commit-unchanged=\"true\"\n                                oncommit=\"editableCtrl.updateBadge($data)\"></data-inline-select>\n                        </div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n                            <label for=\"title-text\">Title</label>\n                        </div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">\n                            <data-inline-text\n                                id=\"title-text\"\n                                tabindex=\"9\"\n                                data-ng-model=\"editableCtrl.data.title\"\n                                placeholder=\"Title\"\n                                oncommit=\"editableCtrl.saveValue($data)\"></data-inline-text>\n                        </div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n                            <label for=\"release-date-tentative-checkbox\">Release date is tentative</label>\n                        </div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">\n                            <data-inline-checkbox\n                                id=\"release-date-tentative-checkbox\"\n                                tabindex=\"10\"\n                                disabled=\"false\"\n                                data-ng-model=\"editableCtrl.data.releaseDateTentative\"\n                                oncommit=\"editableCtrl.promiseValue($data)\"></data-inline-checkbox>\n                        </div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n\n                    <hr>\n                    <h4>Ownership</h4>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Ownership Type</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">Exclusive License</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Remaster</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">No</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Copyright Year</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">1994</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Orig. Copyright Year</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">1993</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Version Title</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\"></div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Internal Version Title</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\"></div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Format</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">Vinyl Single Standard 7\" (Double Sided)</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Duration</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">00:00:00</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\"># Tracks</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">0</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\"># Tracks by BMG</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">0</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Repertoire Owner</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">Mute Records Ltd., a BMG Company</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Label</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">Mute, a BMG Company</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\"></div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\"></div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">GVL Label Code</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\"></div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Genre</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\"></div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Alt. Genre</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\"></div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Advisory Content</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">Clean</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Advisory Lyrics</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">Not Applicable</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Contractual Rights</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\"></div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Release Intent</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\"></div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Promo</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">No</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\"># Promo Units</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\"></div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Mech. Licenses</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">Show Licenses</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Includes Booklet</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">No</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Compilation</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">No</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Partial</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">No</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Soundtrack</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">No</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Metadata Lang.</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">English</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Copyright Owner</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">Billy Ray Cyrus</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Copyright Notice</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">Mute Records Ltd., a BMG Company, under exclusive license to [PIAS] UK\n                            Ltd\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Artwork Year</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">2001</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Artwork Owner</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Artwork Notice</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">Mute Records Ltd., a BMG Company, under exclusive license to [PIAS] UK\n                            Ltd\n                        </div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n\n                    <hr>\n                    <h4>Other</h4>\n\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Prod. Manager</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">Unknown at Data Takeon</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">LC Coordinator</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">Unknown at Data Takeon</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">\n                            <label for=\"notes-comments-text\">Notes &amp; Comments</label>\n                        </div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">\n                            <data-inline-textarea\n                                id=\"notes-comments-text\"\n                                tabindex=\"11\"\n                                minlength=\"0\"\n                                maxlength=\"10\"\n                                data-ng-model=\"editableCtrl.data.notesComments\"\n                                oncommit=\"editableCtrl.promiseValue($data)\"\n                                placeholder=\"Notes &amp; Comments\"></data-inline-textarea>\n                        </div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n\n                    <div class=\"form-group\">\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Lawyer Contact</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">Johnny Flannagan</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                        <div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n                        <div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Art Director</div>\n                        <div class=\"col-xs-8 col-sm-4 col-md-3\">Don Draper</div>\n                        <div class=\"clearfix visible-xs\"></div>\n                    </div>\n\n					<div class=\"form-group\">\n						<div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Step (0.001)</div>\n						<div class=\"col-xs-8 col-sm-4 col-md-3\">\n							<data-inline-text\n								id=\"numberFieldWithStep\"\n								tabindex=\"12\"\n								input-type=\"number\"\n								data-ng-model=\"editableCtrl.data.numberField.step\"\n								placeholder=\"number\"\n								disabled=\"false\"\n								step=\"0.001\"></data-inline-text>\n						</div>\n						<div class=\"clearfix visible-xs\"></div>\n						<div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n						<div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Min (-10) and Max (+10)</div>\n						<div class=\"col-xs-8 col-sm-4 col-md-3\">\n							<data-inline-text\n									id=\"numberFieldWithMinAndMax\"\n									tabindex=\"13\"\n									input-type=\"number\"\n									data-ng-model=\"editableCtrl.data.numberField.minMax\"\n									placeholder=\"number\"\n									disabled=\"false\"\n									min=\"-10\"\n									max=\"10\"></data-inline-text>\n						</div>\n						<div class=\"clearfix visible-xs\"></div>\n					</div>\n\n					<div class=\"form-group\">\n						<div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Step (any), Min (-10) and Max (+10)</div>\n						<div class=\"col-xs-8 col-sm-4 col-md-3\">\n							<data-inline-text\n									id=\"numberFieldWithStep\"\n									tabindex=\"12\"\n									input-type=\"number\"\n									data-ng-model=\"editableCtrl.data.numberField.step\"\n									placeholder=\"number\"\n									disabled=\"false\"\n									step=\"any\" min=\"-10\" max=\"10\"></data-inline-text>\n						</div>\n						<div class=\"clearfix visible-xs\"></div>\n						<div class=\"narrow col-md-2 hidden-xs hidden-sm\"></div>\n\n						<div class=\"col-xs-4 col-sm-2 col-md-2 label-container\">Info</div>\n						<div class=\"col-xs-8 col-sm-4 col-md-3\">\n							Inline edit number test fields to show step, min and max attributes.\n						</div>\n						<div class=\"clearfix visible-xs\"></div>\n					</div>\n\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("app/templates/examples/release-list.html","<div class=\"body-header\">\n    <div class=\"container\">\n        <div class=\"row vertical-center\">\n            <div class=\"col-lg-6\">\n                <h1>Products</h1>\n            </div>\n            <div class=\"col-lg-6\">\n                <div class=\"pull-right\" data-ng-controller=\"TableController as tableCtrl\">\n                    <button type=\"button\" class=\"btn btn-primary\">Create</button>\n                    <button type=\"button\" class=\"btn btn-secondary btn-fa\" ng-click=\"tableCtrl.openFilterColAside(\'right\', false)\"><i class=\"fa fa-list\"></i></button>\n                    <button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-times\"></i></button>\n                    <button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-file-pdf-o\"></i></button>\n                    <button type=\"button\" class=\"btn btn-secondary btn-fa\" ng-click=\"tableCtrl.openFilterAside(\'right\', false)\"><i class=\"fa fa-filter\"></i></button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"panel\" data-ng-controller=\"TableController as tableCtrl\">\n    <div class=\"table-responsive\">\n        <table id=\"table1\" class=\"table table-hover\">\n            <thead>\n            <tr>\n                <th ng-show=\"tableCtrl.filterCol.status\" style=\"width: 8%;\">\n                    Status\n                    <a ng-click=\"tableCtrl.sortType = \'status\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'status\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'status\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n                <th ng-show=\"tableCtrl.filterCol.song\" style=\"width: 11%;\">\n                    Song\n                    <a ng-click=\"tableCtrl.sortType = \'song\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'song\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'song\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n                <th ng-show=\"tableCtrl.filterCol.statusKey\" style=\"width: 12%;\">\n                    Status Key\n                    <a ng-click=\"tableCtrl.sortType = \'statusKey\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'statusKey\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'statusKey\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n                <th ng-show=\"tableCtrl.filterCol.artist\" style=\"width: 10%;\">\n                    Artist\n                    <a ng-click=\"tableCtrl.sortType = \'artist\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'artist\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'artist\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n                <th ng-show=\"tableCtrl.filterCol.title\" style=\"width: 10%;\">\n                    Title\n                    <a ng-click=\"tableCtrl.sortType = \'title\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'title\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'title\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n                <th ng-show=\"tableCtrl.filterCol.versionTitle\" style=\"width: 12%;\">\n                    Version Title\n                    <a ng-click=\"tableCtrl.sortType = \'versionTitle\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'versionTitle\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'versionTitle\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n                <th ng-show=\"tableCtrl.filterCol.publisher\" style=\"width: 11%;\">\n                    Publisher\n                    <a ng-click=\"tableCtrl.sortType = \'publisher\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'publisher\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'publisher\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n                <th ng-show=\"tableCtrl.filterCol.format\" style=\"width: 11%;\">\n                    Format\n                    <a ng-click=\"tableCtrl.sortType = \'format\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'format\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'format\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n                <th ng-show=\"tableCtrl.filterCol.releaseDate\" style=\"width: 15%;\">\n                    Release Date\n                    <a ng-click=\"tableCtrl.sortType = \'releaseDate\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'releaseDate\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'releaseDate\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr ng-repeat=\"content in tableCtrl.bigData | orderBy:tableCtrl.sortType:tableCtrl.sortReverse\">\n                <td ng-show=\"tableCtrl.filterCol.status\">\n                    <span ng-if=\"content.status\">\n                        <span class=\"fa-stack fa-lg scale-6\">\n                            <i class=\"fa fa-circle-thin fa-stack-2x color-success\"></i>\n                            <i class=\"fa fa-check fa-stack-1x color-success\"></i>\n                        </span>\n                    </span>\n                    <span ng-if=\"!content.status\">\n                        <span class=\"fa-stack fa-lg scale-6\">\n                            <i class=\"fa fa-circle-thin fa-stack-2x color-error\"></i>\n                            <i class=\"fa fa-exclamation fa-stack-1x color-error\"></i>\n                        </span>\n                    </span>\n                </td>\n                <td ng-show=\"tableCtrl.filterCol.song\">{{content.song}}</td>\n                <td ng-show=\"tableCtrl.filterCol.statusKey\">{{content.statusKey}}</td>\n                <td ng-show=\"tableCtrl.filterCol.artist\">{{content.artist}}</td>\n                <td ng-show=\"tableCtrl.filterCol.title\">{{content.title}}</td>\n                <td ng-show=\"tableCtrl.filterCol.versionTitle\">{{content.versionTitle}}</td>\n                <td ng-show=\"tableCtrl.filterCol.publisher\">{{content.publisher}}</td>\n                <td ng-show=\"tableCtrl.filterCol.format\">{{content.format}}</td>\n                <td ng-show=\"tableCtrl.filterCol.releaseDate\">{{content.releaseDate}}</td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n\n</div>\n\n<script>\n    jQuery(document).ready(function() {\n        var $table = $(\'table#table1\');\n        $table.floatThead({\n            top: function($table) {\n                return $table.top = 75;\n            },\n            responsiveContainer: function($table){\n                return $table.closest(\'.table-responsive\');\n            }\n        });\n    });\n</script>\n");
$templateCache.put("app/templates/examples/release-structure.html","<div class=\"panel panel-default\">\n    <div class=\"full-width\">\n        <div class=\"panel-heading condensed\" sticky offset=\"75\" sticky-class=\"sticky\">\n            <div class=\"row vertical-center\">\n                <div class=\"col-md-4 button-with-headline\">\n                    <button type=\"button\" class=\"btn btn-default btn-circle pull-left\">\n                        <i class=\"fa fa-chevron-left\"></i>\n                    </button>\n                    <h5><strong>Edit Project</strong> Moby beautiful</h5>\n                </div>\n                <div class=\"col-md-4\">\n                    <div class=\"progress-status horizontal-center\">\n                        <div class=\"progress-display-status\">\n                            <div class=\"status-line\"></div>\n                            <div class=\"status-finished\"></div>\n                            <div class=\"status-finished\"></div>\n                            <div class=\"status-active\">3</div>\n                            <div class=\"status-open\"></div>\n                        </div>\n                        <div class=\"status-percentage\">50&#37;<span class=\"status-percentage-text\">complete</span>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-md-4\">\n                    <div class=\"actions\">\n                        <button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-share-square-o\"></i></button>\n                        <button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-file-pdf-o\"></i></button>\n                        <button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-history\"></i></button>\n                        <button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-gear\"></i></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"panel-body-fluid\">\n        <div class=\"row row-with-sidebar\">\n            <div class=\"col-lg-2 sidebar\">\n                <ul class=\"nav nav-sidebar\">\n                    <li>\n                        <a ui-sref=\"release-detailpage\">\n                            <span class=\"nav-text\">General</span>\n                            <data-sidebar-badge\n                                data-status=\"success\"\n                                id=\"generalStatus\"></data-sidebar-badge>\n                        </a>\n                    </li>\n                    <li class=\"active\">\n                        <a href=\"\">\n                            <span class=\"nav-text\">Structure</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Rights</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Split Ownership</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Exploration</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Local Data</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Contributors</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Recordings</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Packages</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Projects</span>\n                        </a>\n                    </li>\n                    <li>\n                        <a href=\"\">\n                            <span class=\"nav-text\">Assets</span>\n                        </a>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"col-lg-10 sidebar-content\" data-ng-controller=\"EditableController as editableCtrl\">\n                <div class=\"form-horizontal inline-form\">\n                    <h4>Structure</h4>\n\n                    <p>\n                        You have found an obscure place. Well done.\n                    </p>\n\n                    <img\n                        src=\"images/egg.jpg\"\n                        alt=\"No easter egg for you\"\n                        class=\"img-thumbnail\"\n                        style=\"height: 200px;\" />\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("app/templates/modal/myModalContent.html","<div class=\"modal-header\">\n    <h2 class=\"modal-title\">Create Deal</h2>\n</div>\n<div class=\"modal-body\">\n    <uib-tabset active=\"activeJustified\" justified=\"true\" template-url=\"\">\n        <uib-tab index=\"0\" heading=\"Common\">\n            <uib-tab-heading>\n                <div class=\"number-circle\">1</div> Common</h5>\n            </uib-tab-heading>\n            <div class=\"form-group has-success has-feedback\">\n                <label for=\"deal\">Deal</label>\n                <input type=\"text\" class=\"form-control\" id=\"deal\" placeholder=\"Deal\">\n                <span class=\"fa fa-check form-control-feedback\"></span>\n            </div>\n        </uib-tab>\n        <uib-tab index=\"1\">\n            <uib-tab-heading>\n                <span class=\"number-circle\">2</span> Financial\n            </uib-tab-heading>\n            Financial data...\n        </uib-tab>\n        <uib-tab index=\"2\" heading=\"People\">\n            <uib-tab-heading>\n                <span class=\"number-circle\">3</span> People\n            </uib-tab-heading>\n            People data...\n        </uib-tab>\n    </uib-tabset>\n</div>\n<div class=\"modal-footer\">\n    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">Create</button>\n    <button class=\"btn btn-secondary\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n</div>\n");
$templateCache.put("app/templates/modal/myModalContentWithAForm.html","<div class=\"modal-header\">\n    <h2 class=\"modal-title\">Create Deal</h2>\n</div>\n<div class=\"modal-body\">\n    <form name=\"outerForm\" class=\"tab-form-demo\">\n        <uib-tabset active=\"activeForm\" justified=\"true\">\n            <uib-tab index=\"0\">\n                <uib-tab-heading>\n                    <span class=\"number-circle\">1</span> Common\n                </uib-tab-heading>\n                <ng-form name=\"nestedForm\">\n                    <div class=\"form-group\">\n                        <label>Name</label>\n                        <input type=\"text\" class=\"form-control\" required ng-model=\"model.name\"/>\n                    </div>\n                </ng-form>\n            </uib-tab>\n            <uib-tab index=\"1\"  >\n                <uib-tab-heading>\n                    <span class=\"number-circle\">2</span> Financial\n                </uib-tab-heading>\n                Financial data...\n            </uib-tab>\n            <uib-tab index=\"2\">\n                <uib-tab-heading>\n                    <span class=\"number-circle\">3</span> People\n                </uib-tab-heading>\n                People data...\n            </uib-tab>\n        </uib-tabset>\n    </form>\n</div>\n<div class=\"modal-footer\">\n    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">Create</button>\n    <button class=\"btn btn-secondary\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n</div>\n");
$templateCache.put("app/templates/modal/mySimpleModal.html","<div class=\"modal-close\">\n    <button type=\"button\" class=\"close\" ng-click=\"cancel()\"><i class=\"fa fa-times color-secondary\"></i></button>\n</div>\n<div class=\"modal-header\">\n    <h2 class=\"modal-title\">A simple Modal</h2>\n</div>\n<div class=\"modal-body\">\n    <form>\n        <div class=\"row\">\n            <div class=\"col-lg-4\">\n                <div class=\"form-group\">\n                    <label for=\"firstName\">First Name</label>\n                    <input type=\"text\" class=\"form-control\" id=\"firstName\" placeholder=\"First Name\">\n                </div>\n            </div>\n            <div class=\"col-lg-4\">\n                <div class=\"form-group\">\n                    <label for=\"secondName\">Second Name</label>\n                    <input type=\"text\" class=\"form-control\" id=\"secondName\" placeholder=\"Second Name\">\n                </div>\n            </div>\n                <div class=\"col-lg-4\">\n                    <div class=\"form-group\">\n                    <label for=\"lastName\">Last Name</label>\n                    <input type=\"text\" class=\"form-control\" id=\"lastName\" placeholder=\"Last Name\">\n                </div>\n            </div>\n        </div>\n    </form>\n    <hr>\n    Any other content you need...\n</div>\n<div class=\"modal-footer\">\n    <button class=\"btn btn-secondary\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">Primary action</button>\n</div>\n");
$templateCache.put("app/templates/components/config-blocks/inline-checkbox.html","<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <p>\n            Configuration:\n        </p>\n\n        <table class=\"table table-condensed inline-properties-table\">\n            <thead>\n                <tr>\n                    <th>Property</th>\n                    <th>Values</th>\n                    <th>Explanation</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td><code>ng-model</code></td>\n                    <td>Angular expression</td>\n                    <td>The model representing the checkbox\'s value</td>\n                </tr>\n                <tr>\n                    <td><code>oncommit</code></td>\n                    <td>Function</td>\n                    <td>\n                        <p>\n                            Function to be called when the checkbox\'s value has changed\n                        </p>\n                        <p>\n                            Parameters:\n                            <ul>\n                                <li>\n                                    <code>$data</code> contains the entered value to be\n                                    committed\n                                </li>\n                            </ul>\n                        </p>\n                        <p>\n                            Return value:\n\n                            <ul>\n                                <li>\n                                    If the function returns a promise, the inline text field\n                                    will display a spinning wheel until the promise is resolved or rejected.\n                                </li>\n                                <li>\n                                    If the promise gets resolved, a green success indicator is displayed.\n                                </li>\n                                <li>\n                                    If the promise gets rejected, a red error indicator is displayed.\n                                    Additionally, the parameter with which the promise was rejected\n                                    will be displayed as the error message underneath the text field.\n                                </li>\n                                <li>\n                                    If the function does not return a promise, the green success indicator is shown immediately.\n                                </li>\n                            </ul>\n                        </p>\n                    </td>\n                </tr>\n                <tr>\n                    <td><code>tabindex</code></td>\n                    <td>Number</td>\n                    <td>The index of this form field for tab navigation</td>\n                </tr>\n                <tr>\n                    <td><code>disabled</code></td>\n                    <td>Angular expression</td>\n                    <td>If this expression evaluates to true, the input field will be disabled.</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n");
$templateCache.put("app/templates/components/config-blocks/inline-datepicker.html","<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <p>\n            Configuration:\n        </p>\n\n        <table class=\"table table-condensed inline-properties-table\">\n            <thead>\n                <tr>\n                    <th>Property</th>\n                    <th>Values</th>\n                    <th>Explanation</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td><code>ng-model</code></td>\n                    <td>Angular expression</td>\n                    <td>The model representing the datepicker\'s content</td>\n                </tr>\n                <tr>\n                    <td><code>ng-model-options</code></td>\n                    <td>Angular expression</td>\n                    <td>Model options for the datepicker. Can be used to configure the time zone.</td>\n                </tr>\n                <tr>\n                    <td><code>placeholder</code></td>\n                    <td>String</td>\n                    <td>Text displayed when the datepicker is empty</td>\n                </tr>\n                <tr>\n                    <td><code>oncommit</code></td>\n                    <td>Function</td>\n                    <td>\n                        <p>\n                            Function to be called when the datepicker\'s value is committed\n                            (either by hitting Enter or due to a blur event).\n                        </p>\n                        <p>\n                            Parameters:\n                            <ul>\n                                <li>\n                                    <code>$data</code> contains the entered value to be\n                                    committed\n                                </li>\n                            </ul>\n                        </p>\n                        <p>\n                            Return value:\n\n                            <ul>\n                                <li>\n                                    If the function returns a promise, the inline text field\n                                    will display a spinning wheel until the promise is resolved or rejected.\n                                </li>\n                                <li>\n                                    If the promise gets resolved, a green success indicator is displayed.\n                                </li>\n                                <li>\n                                    If the promise gets rejected, a red error indicator is displayed.\n                                    Additionally, the parameter with which the promise was rejected\n                                    will be displayed as the error message underneath the text field.\n                                </li>\n                                <li>\n                                    If the function does not return a promise, the green success indicator is shown immediately.\n                                </li>\n                            </ul>\n                        </p>\n                    </td>\n                </tr>\n                <tr>\n                    <td><code>tabindex</code></td>\n                    <td>Number</td>\n                    <td>The index of this form field for tab navigation</td>\n                </tr>\n                <tr>\n                    <td><code>disabled</code></td>\n                    <td>Angular expression</td>\n                    <td>If this expression evaluates to true, the input field will be disabled.</td>\n                </tr>\n                <tr>\n                    <td><code>datepicker-options</code></td>\n                    <td>Angular expression</td>\n                    <td>See <a href=\"http://angular-ui.github.io/bootstrap/versioned-docs/1.3.2/#/datepickerPopup\">UI Bootstrap documentation</a></td>\n                </tr>\n                <tr>\n                    <td><code>popup-placement</code></td>\n                    <td>String</td>\n                    <td>See <a href=\"http://angular-ui.github.io/bootstrap/versioned-docs/1.3.2/#/datepickerPopup\">UI Bootstrap documentation</a></td>\n                </tr>\n                <tr>\n                    <td><code>date-format</code></td>\n                    <td>String</td>\n                    <td>Date format string used to display the date and to parse manually entered dates</td>\n                </tr>\n                <tr>\n                    <td><code>show-button-bar</code></td>\n                    <td>Angular expression</td>\n                    <td>See <a href=\"http://angular-ui.github.io/bootstrap/versioned-docs/1.3.2/#/datepickerPopup\">UI Bootstrap documentation</a></td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n");
$templateCache.put("app/templates/components/config-blocks/inline-select.html","<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <p>\n            Configuration:\n        </p>\n\n        <table class=\"table table-condensed inline-properties-table\">\n            <thead>\n                <tr>\n                    <th>Property</th>\n                    <th>Values</th>\n                    <th>Explanation</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td><code>ng-model</code></td>\n                    <td>Angular expression</td>\n                    <td>The model representing the selected element</td>\n                </tr>\n                <tr>\n                    <td><code>placeholder</code></td>\n                    <td>String</td>\n                    <td>Text displayed when the select\'s text field is empty or the select is opened</td>\n                </tr>\n                <tr>\n                    <td><code>oncommit</code></td>\n                    <td>Function</td>\n                    <td>\n                        <p>\n                            Function to be called when the selected value value is committed\n                        </p>\n                        <p>\n                            Parameters:\n                            <ul>\n                                <li>\n                                    <code>$data</code> contains the entered value to be\n                                    committed\n                                </li>\n                            </ul>\n                        </p>\n                        <p>\n                            Return value:\n\n                            <ul>\n                                <li>\n                                    If the function returns a promise, the inline text field\n                                    will display a spinning wheel until the promise is resolved or rejected.\n                                </li>\n                                <li>\n                                    If the promise gets resolved, a green success indicator is displayed.\n                                </li>\n                                <li>\n                                    If the promise gets rejected, a red error indicator is displayed.\n                                    Additionally, the parameter with which the promise was rejected\n                                    will be displayed as the error message underneath the text field.\n                                </li>\n                                <li>\n                                    If the function does not return a promise, the green success indicator is shown immediately.\n                                </li>\n                            </ul>\n                        </p>\n                    </td>\n                </tr>\n                <tr>\n                    <td><code>items</code></td>\n                    <td>Array</td>\n                    <td>The array of values to be used as the select\'s possible values</td>\n                </tr>\n                <tr>\n                    <td><code>tabindex</code></td>\n                    <td>Number</td>\n                    <td>The index of this form field for tab navigation</td>\n                </tr>\n                <tr>\n                    <td><code>disabled</code></td>\n                    <td>Angular expression</td>\n                    <td>If this expression evaluates to true, the input field will be disabled.</td>\n                </tr>\n                <tr>\n                    <td><code>display-property</code></td>\n                    <td>String</td>\n                    <td>\n                        If the values in the <code>items</code> array are objects, this argument can be\n                        used to determine which property of those objects will be used as the display value\n                        of the selected element when the select is closed.\n                    </td>\n                </tr>\n                <tr>\n                    <td><code>position</code></td>\n                    <td>String</td>\n                    <td>In which direction the dropdown should open. See <a href=\"https://github.com/angular-ui/ui-select/wiki\">UI Select documentation</a></td>\n                </tr>\n                <tr>\n                    <td><code>refresh</code></td>\n                    <td>Function</td>\n                    <td>\n                        <p>\n                            Function used to dynamically load source data for this select\'s items.\n                        </p>\n                        <p>\n                            Parameters:\n                            <ul>\n                                <li>\n                                    <code>$query</code> The search string typed into the select\'s text field by the user\n                                </li>\n                            </ul>\n                        </p>\n                        <p>\n                            See <a href=\"https://github.com/angular-ui/ui-select/wiki/ui-select-choices\">UI Select documentation</a>\n                        </p>\n                    </td>\n                </tr>\n                <tr>\n                    <td><code>refresh-delay</code></td>\n                    <td>Number</td>\n                    <td>See <a href=\"https://github.com/angular-ui/ui-select/wiki/ui-select-choices\">UI Select documentation</a></td>\n                </tr>\n                <tr>\n                    <td><code>allow-clear</code></td>\n                    <td>Angular expression</td>\n                    <td>\n                        If the expression evaluates to <code>true</code>, the content of the inline-select will be\n                        clearable via a <i class=\"fa fa-times-thin\"></i> button.\n                    </td>\n                </tr>\n                <tr>\n                    <td><code>allow-commit-unchanged</code></td>\n                    <td>Angular expression</td>\n                    <td>\n                        If the expression evaluates to <code>true</code>, the <code>oncommit</code> handler will\n                        be called regardless of whether the selected value actually changed or not.\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n\n        <p>\n            The HTML inside\n			the <code>data-inline-select</code> element will be used as a template for the select items\n			when the select is opened. The current item object is available in the <code>item</code>\n			variable. Apply the <code>highlight</code> filter as demonstrated above to visually highlight\n			the search text entered by the user inside the select items. If no child element of\n            <code>data-inline-select</code> is supplied, the following HTML will be used as the default\n            item template:\n        </p>\n        <pre><code class=\"html\">&lt;span data-ng-bind-html=&quot;item | highlight:$select.search&quot;&gt;&lt;/span&gt;</code></pre>\n    </div>\n</div>\n\n<script>\n	jQuery(document).ready(function() {\n		$(\'pre code\').each(function(i, block) {\n			hljs.highlightBlock(block);\n		});\n	});\n</script>\n");
$templateCache.put("app/templates/components/config-blocks/inline-text.html","<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <p>\n            Configuration:\n        </p>\n\n        <table class=\"table table-condensed inline-properties-table\">\n            <thead>\n                <tr>\n                    <th>Property</th>\n                    <th>Values</th>\n                    <th>Explanation</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td><code>ng-model</code></td>\n                    <td>Angular expression</td>\n                    <td>The model representing the text field\'s content</td>\n                </tr>\n                <tr>\n                    <td><code>placeholder</code></td>\n                    <td>String</td>\n                    <td>Text displayed when the text field is empty</td>\n                </tr>\n                <tr>\n                    <td><code>oncommit</code></td>\n                    <td>Function</td>\n                    <td>\n                        <p>\n                            Function to be called when the text field\'s value is committed\n                            (either by hitting Enter or due to a blur event).\n                        </p>\n                        <p>\n                            Parameters:\n                            <ul>\n                                <li>\n                                    <code>$data</code> contains the entered value to be\n                                    committed\n                                </li>\n                            </ul>\n                        </p>\n                        <p>\n                            Return value:\n\n                            <ul>\n                                <li>\n                                    If the function returns a promise, the inline text field\n                                    will display a spinning wheel until the promise is resolved or rejected.\n                                </li>\n                                <li>\n                                    If the promise gets resolved, a green success indicator is displayed.\n                                </li>\n                                <li>\n                                    If the promise gets rejected, a red error indicator is displayed.\n                                    Additionally, the parameter with which the promise was rejected\n                                    will be displayed as the error message underneath the text field.\n                                </li>\n                                <li>\n                                    If the function does not return a promise, the green success indicator is shown immediately.\n                                </li>\n                            </ul>\n                        </p>\n                    </td>\n                </tr>\n                <tr>\n                    <td><code>tabindex</code></td>\n                    <td><code>number</code></td>\n                    <td>The index of this form field for tab navigation</td>\n                </tr>\n                <tr>\n                    <td><code>disabled</code></td>\n                    <td>Angular expression</td>\n                    <td>If this expression evaluates to true, the input field will be disabled.</td>\n                </tr>\n				<tr>\n					<td><code>step</code></td>\n					<td><code>number</code></td>\n					<td>Set the step for the number input field. If you want to disable the step validation use step=\"any\". This attribute is optional.</td>\n				</tr>\n				<tr>\n					<td><code>min</code></td>\n					<td><code>number</code></td>\n					<td>Set the minimal value for the number input field. This attribute is optional.</td>\n				</tr>\n				<tr>\n					<td><code>max</code></td>\n					<td><code>number</code></td>\n					<td>Set the maximal value for the number input field. This attribute is optional.</td>\n				</tr>\n                <tr>\n                    <td><code>input-type</code></td>\n                    <td>\n                        <code>text</code> |\n                        <code>number</code> |\n                        <code>email</code> |\n                        <code>password</code> |\n                        <code>url</code>\n                    </td>\n                    <td>Input type of this text field used for additional validation</td>\n                </tr>\n                <tr>\n	                <td><code>select-on-focus</code></td>\n	                <td>Angular expression</td>\n	                <td>Pass true to automatically select the existing field text when the field receives input focus. Defaults to false.</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n");
$templateCache.put("app/templates/components/config-blocks/inline-textarea.html","<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <p>\n            Configuration:\n        </p>\n\n        <table class=\"table table-condensed inline-properties-table\">\n            <thead>\n                <tr>\n                    <th>Property</th>\n                    <th>Values</th>\n                    <th>Explanation</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td><code>ng-model</code></td>\n                    <td>Angular expression</td>\n                    <td>The model representing the textarea\'s content</td>\n                </tr>\n                <tr>\n                    <td><code>placeholder</code></td>\n                    <td>String</td>\n                    <td>Text displayed when the textarea is empty</td>\n                </tr>\n                <tr>\n                    <td><code>oncommit</code></td>\n                    <td>Function</td>\n                    <td>\n                        <p>\n                            Function to be called when the textarea\'s value is committed\n                        </p>\n                        <p>\n                            Parameters:\n                            <ul>\n                                <li>\n                                    <code>$data</code> contains the entered value to be\n                                    committed\n                                </li>\n                            </ul>\n                        </p>\n                        <p>\n                            Return value:\n\n                            <ul>\n                                <li>\n                                    If the function returns a promise, the inline text field\n                                    will display a spinning wheel until the promise is resolved or rejected.\n                                </li>\n                                <li>\n                                    If the promise gets resolved, a green success indicator is displayed.\n                                </li>\n                                <li>\n                                    If the promise gets rejected, a red error indicator is displayed.\n                                    Additionally, the parameter with which the promise was rejected\n                                    will be displayed as the error message underneath the text field.\n                                </li>\n                                <li>\n                                    If the function does not return a promise, the green success indicator is shown immediately.\n                                </li>\n                            </ul>\n                        </p>\n                    </td>\n                </tr>\n                <tr>\n                    <td><code>tabindex</code></td>\n                    <td>Number</td>\n                    <td>The index of this form field for tab navigation</td>\n                </tr>\n                <tr>\n                    <td><code>disabled</code></td>\n                    <td>Angular expression</td>\n                    <td>If this expression evaluates to true, the input field will be disabled.</td>\n                </tr>\n                <tr>\n                    <td><code>minlength</code></td>\n                    <td>Angular expression</td>\n                    <td>Minimum number of characters needed to make the input field valid.</td>\n                </tr>\n                <tr>\n                    <td><code>maxlength</code></td>\n                    <td>Angular expression</td>\n                    <td>Maximum number of characters that can be entered into the textarea.</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n");
$templateCache.put("app/templates/components/config-blocks/inline-typeahead.html","<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <p>\n            Configuration:\n        </p>\n\n        <table class=\"table table-condensed inline-properties-table\">\n            <thead>\n                <tr>\n                    <th>Property</th>\n                    <th>Values</th>\n                    <th>Explanation</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr>\n                    <td><code>ng-model</code></td>\n                    <td>Angular expression</td>\n                    <td>The model representing the typeahead\'s content</td>\n                </tr>\n                <tr>\n                    <td><code>placeholder</code></td>\n                    <td>String</td>\n                    <td>Text displayed when the typeahead\'s text field is empty</td>\n                </tr>\n                <tr>\n                    <td><code>oncommit</code></td>\n                    <td>Function</td>\n                    <td>\n                        <p>\n                            Function to be called when the typeahead\'s value is committed\n                        </p>\n                        <p>\n                            Parameters:\n                            <ul>\n                                <li>\n                                    <code>$data</code> contains the entered value to be\n                                    committed\n                                </li>\n                            </ul>\n                        </p>\n                        <p>\n                            Return value:\n\n                            <ul>\n                                <li>\n                                    If the function returns a promise, the inline text field\n                                    will display a spinning wheel until the promise is resolved or rejected.\n                                </li>\n                                <li>\n                                    If the promise gets resolved, a green success indicator is displayed.\n                                </li>\n                                <li>\n                                    If the promise gets rejected, a red error indicator is displayed.\n                                    Additionally, the parameter with which the promise was rejected\n                                    will be displayed as the error message underneath the text field.\n                                </li>\n                                <li>\n                                    If the function does not return a promise, the green success indicator is shown immediately.\n                                </li>\n                            </ul>\n                        </p>\n                    </td>\n                </tr>\n                <tr>\n                    <td><code>items</code></td>\n                    <td>Array</td>\n                    <td>The array of values to be used as the typeahead\'s possible values</td>\n                </tr>\n                <tr>\n                    <td><code>tabindex</code></td>\n                    <td>Number</td>\n                    <td>The index of this form field for tab navigation</td>\n                </tr>\n                <tr>\n                    <td><code>disabled</code></td>\n                    <td>Angular expression</td>\n                    <td>If this expression evaluates to true, the input field will be disabled.</td>\n                </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n");
$templateCache.put("app/templates/components/config-blocks/notification.html","<div class=\"row\">\n	<div class=\"col-xs-12\">\n		<p>\n			Configuration:\n		</p>\n\n		<table class=\"table table-condensed inline-properties-table\">\n			<thead>\n			<tr>\n				<th>Property</th>\n				<th style=\"width: 180px;\">Values</th>\n				<th>Explanation</th>\n			</tr>\n			</thead>\n			<tbody>\n			<tr>\n				<td><code>notification-title</code></td>\n				<td>string (optional)</td>\n				<td>The string representing the popover title. If no title is given, the title header within the popover\n					will not be displayed.\n				</td>\n			</tr>\n			<tr>\n				<td><code>notification-template</code></td>\n				<td>string</td>\n				<td>Representing the location of a template to use for the popover body. Note that the contents of this\n					template need to be wrapped in a tag, e.g.: &lt;div&gt;&lt;/div&gt;</td>\n			</tr>\n			<tr>\n				<td><code>notification-data</code></td>\n				<td>object</td>\n				<td>\n					<p>The data object contains all notification data. The data object has following properties:</p>\n					<p><code>count</code>, <code>highlightedNotifications</code>,\n						<code>highlightedNotificationsTitle</code>, <code>notifications</code>,\n						<code>notificationsTitle</code></p>\n				</td>\n			</tr>\n			<tr>\n				<td><code><span class=\"dim\">data.</span>count</code></td>\n				<td>number</td>\n				<td>This number will displayed in the red bubble and shows the number of new notifications and/or\n					highlighted notifications.\n				</td>\n			</tr>\n			<tr>\n				<td><code><span class=\"dim\">data.</span>highlightedNotificationsTitle</code></td>\n				<td>string (optional)</td>\n				<td>Optional title for highlighted notifications section. If no title is given the section title will\n					not be displayed.\n				</td>\n			</tr>\n			<tr>\n				<td><code><span class=\"dim\">data.</span>highlightedNotifications</code></td>\n				<td>array</td>\n				<td>\n					<p>Array including highlightedNotification objects. If the array is empty the highlighted\n						notifications section will not be displayed. The highlightedNotifications object has following\n						required properties:</p>\n					<p><code>icon</code>, <code>handled</code>, <code>username</code>, <code>action</code>,\n						<code>message</code>, <code>date</code></p>\n					<p>You can add more properties (e.g. id), if the notification functions (e.g. handleUrl or\n						markAllAsRead) need them.</p>\n				</td>\n			</tr>\n			<tr>\n				<td><code><span class=\"dim\">data.</span>notificationsTitle</code></td>\n				<td>string (optional)</td>\n				<td>Optional title for notifications section. If no title is given the section title will not be\n					displayed.\n				</td>\n			</tr>\n			<tr>\n				<td><code><span class=\"dim\">data.</span>notifications</code></td>\n				<td>array</td>\n				<td>\n					<p>Array including notification objects. If the array is empty the notifications section will not be\n						displayed. The notifications object has following required properties:</p>\n					<p><code>handled</code>, <code>icon</code>, <code>username</code>, <code>action</code>,\n						<code>message</code>, <code>date</code></p>\n					<p>You can add more properties (e.g. id), if the notification functions (e.g. handleUrl or\n						markAllAsRead) need them.</p>\n				</td>\n			</tr>\n			<tr>\n				<td><code><span class=\"dim\">data.notifications[i].</span>handled</code></td>\n				<td>boolean (required)</td>\n				<td>A boolean flag to show the handled (read) status of an notification.</td>\n			</tr>\n			<tr>\n				<td><code><span class=\"dim\">data.notifications[i].</span>username</code></td>\n				<td>string</td>\n				<td>A string to display the name of the notification triggering person.</td>\n			</tr>\n			<tr>\n				<td><code><span class=\"dim\">data.notifications[i].</span>action</code></td>\n				<td>string</td>\n				<td>A short text about the action.</td>\n			</tr>\n			<tr>\n				<td><code><span class=\"dim\">data.notifications[i].</span>message</code></td>\n				<td>string (optional)</td>\n				<td>A additional (more detailed) message for an action.</td>\n			</tr>\n			<tr>\n				<td><code><span class=\"dim\">data.notifications[i].</span>date</code></td>\n				<td>Date</td>\n				<td>The notification date.</td>\n			</tr>\n			<tr>\n				<td><code><span class=\"dim\">data.notifications[i].</span>icon</code></td>\n				<td>object</td>\n				<td>\n					<p>Icon object to display an icon for the notification. The icon object has following required\n						properties:</p>\n					<p><code>symbol</code>, <code>color</code></p>\n				</td>\n			</tr>\n			<tr>\n				<td><code><span class=\"dim\">data.notifications[i].icon.</span>symbol</code></td>\n				<td>string</td>\n				<td>A font awesome icon e.g. fa-check.</td>\n			</tr>\n			<tr>\n				<td><code><span class=\"dim\">data.notifications[i].icon.</span>color</code></td>\n				<td>string</td>\n				<td>A color class.</td>\n			</tr>\n			<tr>\n				<td><code>notification-load-more</code></td>\n				<td>function (optional)</td>\n				<td>A custom function that will be called if the infinite scroll event ist triggered. This function\n					should update the data object.\n				</td>\n			</tr>\n			<tr>\n				<td><code>notification-handle</code></td>\n				<td>function (optional)</td>\n				<td>A custom function that will be called if a notification is clicked (redirect to an specific page,\n					mark notification as read, ...). If no function is available a click will not do anything.\n					The function (as directive property) should have \'{notification: notification}\' as function\n					argument if you need the notification data.\n					If a notification is clicked, the directive will return a notification object that contains all the\n					data of the clicked notification.\n				</td>\n			</tr>\n			<tr>\n				<td><code>notification-handle-highlighted</code></td>\n				<td>function (optional)</td>\n				<td>A custom function that will be called if a highlighted notification is clicked (redirect to an\n					specific page, mark highlighted notification as read, ...). If no function is available a click will\n					not do anything.\n					The function (as directive property) should have \'{notification: notification}\' as function\n					argument if you need the notification data.\n					If a notification is clicked, the directive will return a notification object that contains all the\n					data of the clicked notification.\n				</td>\n			</tr>\n			<tr>\n				<td><code>notification-go-to-overview-page</code></td>\n				<td>function (optional)</td>\n				<td>A custom function that will be called if the \'See all\' link is clicked (redirect to an\n					specific page). If no function is available the see all link will not be displayed.\n				</td>\n			</tr>\n			<tr>\n				<td><code>notification-mark-all-as-read</code></td>\n				<td>function (optional)</td>\n				<td>A custom function with additional behavior will be called if the \'mark all as read\' link is clicked.\n					In this case the (directive) internal function will set the handled flag of all notifications\n					(except the highlighted notifications) to true.\n					The function (as directive property) should have \'{notifications: notifications}\' as function\n					argument if you need the notifications data array of the \'mark as read\'-notifications.\n				</td>\n			</tr>\n			</tbody>\n		</table>\n	</div>\n</div>\n");}]);