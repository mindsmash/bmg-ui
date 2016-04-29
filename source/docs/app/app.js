(function (angular) {
    'use strict';

    angular.module('bmg-ui.docs', [
        'ui.router',
        'bmg.components.ui',
        'ui.bootstrap',
        'toastr',
        'rzModule',
        'ngSanitize',
        'ui.select',
        'xeditable',
        'ngAside'
    ]).run(runConfig)
        .config(routesConfig)
        .config(toastrConfig)
        .controller('AppController', AppController)
        .controller('ModalController', ModalController)
        .controller('ModalInstanceCtrl', ModalInstanceCtrl)
        .controller('NotificationController', NotificationController)
        .controller('PaginationController', PaginationController)
        .controller('FormController', FormController)
        .controller('CheckboxSliderController', CheckboxSliderController)
        .controller('TableController', TableController)
        .controller('XEditableController', XEditableController)
        .controller('DatepickerController', DatepickerController);

    // run
    function runConfig(editableOptions, editableThemes, $rootScope, $location, $anchorScroll, $state) {
        //xeditable
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary"><i class="fa fa-check"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" class="btn btn-secondary" ng-click="$form.$cancel()"><i class="fa fa-times"></i></button>';

        //ui-router
        $rootScope.$state = $state;
        $rootScope.$on('$routeChangeSuccess', function() {
            if($location.hash()) {
                $anchorScroll();
            }
        });
    }

    // config
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, $uiViewScrollProvider) {
        $uiViewScrollProvider.useAnchorScroll();
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);
        $stateProvider
            .state('index', {
                url: "/",
                templateUrl: "app/templates/main.html"
            })
            .state('release-list', {
                url: "/release-list",
                templateUrl: "app/templates/examples/release-list.html"
            })
            .state('release-detailpage', {
                url: "/release-detailpage",
                templateUrl: "app/templates/examples/release-detailpage.html"
            })
            .state('grid', {
                url: "/grid",
                templateUrl: "app/templates/examples/grid.html"
            })
            //anchor
            .state('index.typography', {
                url: "#typography"
            })
            .state('index.colors', {
                url: "#colors"
            })
            .state('index.grid', {
                url: "#grid"
            })
            .state('index.buttons', {
                url: "#buttons"
            })
            .state('index.button-group', {
                url: "#button-group"
            })
            .state('index.button-dropdown', {
                url: "#button-dropdown"
            })
            .state('index.pagination', {
                url: "#pagination"
            })
            .state('index.form', {
                url: "#form"
            })
            .state('index.checkbox-slider', {
                url: "#checkbox-slider"
            })
            .state('index.status', {
                url: "#status"
            })
            .state('index.modal', {
                url: "#modal"
            })
            .state('index.slide', {
                url: "#slide"
            })
            .state('index.alerts', {
                url: "#alerts"
            })
            .state('index.table', {
                url: "#table"
            })
            .state('index.datepicker', {
                url: "#datepicker"
            })
            .state('index.activities', {
                url: "#activities"
            })
            .state('index.filter', {
                url: "#filter"
            })
    }

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

    // controller
    function AppController($aside) {
        this.openAside = function(position, backdrop) {
            var asideInstance = $aside.open({
                templateUrl: '../templates/apps.html',
                placement: 'position',
                size: 'sm',
                backdrop: backdrop,
                windowClass: 'app-aside-left',
                controller: function($scope, $uibModalInstance) {
                    $scope.ok = function() {
                        $uibModalInstance.close();
                    };
                    $scope.cancel = function() {
                        $uibModalInstance.dismiss();
                    };
                }
            });
        };
    }

    AppController.$inject = ['$aside'];

    function ModalController($uibModal, $log) {
        this.openModal = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/templates/mySimpleModal.html',
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
                templateUrl: 'app/templates/myModalContent.html',
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
                templateUrl: 'app/templates/myModalContentWithAForm.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {}, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }

    ModalController.$inject = ['$uibModal', '$log'];

    function ModalInstanceCtrl($scope, $uibModalInstance) {
        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

    ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];

    function NotificationController(toastr) {
        this.success = function() { toastr.success('Hello world!', 'Toastr fun!'); };
        this.warning = function() { toastr.warning('Your computer is about to explode!', 'Warning'); };
        this.info = function() { toastr.info('We are open today from 10 to 22', 'Information'); };
        this.error = function() { toastr.error('Your credentials are gone', 'Error'); };
    }

    NotificationController.$inject = ['toastr'];

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

    PaginationController.$inject = ['$log'];

    function FormController($scope, $http) {
        $scope.email_correct = 'firstname.lastname@bmg.com';
        $scope.email_incorrect = '123456789';
        $scope.password = '***';
        $scope.value = 24000;

        var _selected;

        $scope.selected = undefined;
        $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

        $scope.address = {};
        $scope.refreshAddresses = function(address) {
            var params = {address: address, sensor: false};
            return $http.get(
                'http://maps.googleapis.com/maps/api/geocode/json',
                {params: params}
            ).then(function(response) {
                $scope.addresses = response.data.results
            });
        };

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
    }

    FormController.$inject = ['$scope', '$http'];

    function CheckboxSliderController() {
        this.notChecked = false;
        this.checked = true;

        // Slider
        this.slider = {
            min: 25,
            max: 75,
            options: {
                floor: 0,
                ceil: 100
            }
        };
    }

    CheckboxSliderController.$inject = [];

    function TableController() {
        this.data = [
            {'a': 'Content A', 'b': 'Content B', 'c': 'Content C'},
            {'a': 'Content A', 'b': 'Content B', 'c': 'Content C'},
            {'a': 'Content A', 'b': 'Content B', 'c': 'Content C'},
            {'a': 'Content A', 'b': 'Content B', 'c': 'Content C'},
            {'a': 'Content A', 'b': 'Content B', 'c': 'Content C'},
            {'a': 'Content A', 'b': 'Content B', 'c': 'Content C'},
            {'a': 'Content A', 'b': 'Content B', 'c': 'Content C'},
            {'a': 'Content A', 'b': 'Content B', 'c': 'Content C'},
            {'a': 'Content A', 'b': 'Content B', 'c': 'Content C'},
            {'a': 'Content A', 'b': 'Content B', 'c': 'Content C'},
            {'a': 'Content A', 'b': 'Content B', 'c': 'Content C'}
        ];
    }

    TableController.$inject = [];

    function XEditableController($filter) {

        this.site = {
            value: 2
        };
        this.data = {
            'sites' : [
                {value: 1, text: 'BMG Rights Management UK'},
                {value: 2, text: 'BMG Rights Management GE'},
                {value: 3, text: 'BMG Rights Management US'}
            ],
            'barcode' : '5016027101519',
            'productCode' : 'BFFP151',
            'altProductCode' : '',
            'artistName': 'The Merry Pranksters',
            'title': 'Peggy the Pistol/Hogs Are a Coming'
        };

        this.showSites = function() {
            var selected = $filter('filter')(this.data.sites, {value: this.site.value});
            return (this.site.value && selected.length) ? selected[0].text : 'Not set';
        };
    }

    XEditableController.$inject = ['$filter'];

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

    DatepickerController.$inject = [];

})(angular);