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
    ]);
    
})(angular);
(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .controller('AppController', AppController);

    AppController.$inject = ['$aside'];

    function AppController($aside) {

        this.isCollapsed = true;

        this.openAside = function(position, backdrop) {
            var asideInstance = $aside.open({
                templateUrl: 'app/templates/apps.html',
                placement: position,
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
        .controller('FormController', FormController);

    FormController.$inject = ['$scope', '$http'];

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

})(angular);
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

})(angular);

(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$uiViewScrollProvider'];

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

})(angular);
angular.module("bmg-ui.docs").run(["$templateCache", function($templateCache) {$templateCache.put("app/templates/apps.html","<div class=\"app-nav\">\n    <h3>\n        BMG Applications\n        <button type=\"button\" class=\"btn btn-secondary-invers btn-circle pull-right\" data-ng-click=\"cancel()\"><i class=\"fa fa-chevron-left\"></i></button>\n    </h3>\n    <ul>\n        <li><a href=\"#\"><span class=\"app-icon\">a1</span> App 1</a></li>\n        <li class=\"active\"><a href=\"#\"><span class=\"app-icon\">a2</span> App 2</a></li>\n        <li><a href=\"#\"><span class=\"app-icon\">a3</span> App 3</a></li>\n        <li><a href=\"#\"><span class=\"app-icon\">a4</span> App 4</a></li>\n        <li><a href=\"#\"><span class=\"app-icon\">a5</span> App 5</a></li>\n        <li><a href=\"#\"><span class=\"app-icon\">a6</span> App 6</a></li>\n        <li><a href=\"#\"><span class=\"app-icon\">a7</span> App 7</a></li>\n        <li><a href=\"#\"><span class=\"app-icon\">a8</span> App 8</a></li>\n        <li><a href=\"#\"><span class=\"app-icon\">a9</span> App 9</a></li>\n        <li><a href=\"#\"><span class=\"app-icon\">b1</span> App 10</a></li>\n    </ul>\n</div>\n");
$templateCache.put("app/templates/editable-textarea.html","<div class=\"form-group\">\n  <label class=\"col-sm-2 control-label\">Textarea</label>\n  <div class=\"col-sm-10\">\n    <msm-spinner></msm-spinner>\n  </div>\n</div>");
$templateCache.put("app/templates/filter-aside.html","<div>\n    <h3>\n        Search / Edit Filters\n        <button type=\"button\" class=\"btn btn-secondary-invers btn-circle pull-right\" data-ng-click=\"asideCtrl.cancel()\"><i class=\"fa fa-chevron-right\"></i></button>\n    </h3>\n    <div class=\"aside-content\">\n        <!--<button class=\"btn btn-primary\">Edit filters</button>-->\n        <div class=\"form-group filter-form-group\">\n            <label for=\"song\">Song</label>\n            <div class=\"inline-form-group has-feedback\">\n                <input type=\"text\" id=\"song\" class=\"form-control\" placeholder=\"\" data-ng-model=\"asideCtrl.filter.song\">\n                <button class=\"btn btn-fa btn-secondary\" ng-click=\"asideCtrl.filter.song = \'\'\"><i class=\"fa fa-trash-o\"></i></button>\n                <span class=\"fa fa-search form-control-feedback\"></span>\n            </div>\n        </div>\n        <div class=\"form-group filter-form-group\">\n            <label for=\"status\">Status</label>\n            <div class=\"inline-form-group has-feedback\">\n                <input type=\"text\" id=\"status\" class=\"form-control\" placeholder=\"\" data-ng-model=\"asideCtrl.filter.status\">\n                <button class=\"btn btn-fa btn-secondary\" ng-click=\"asideCtrl.filter.status = \'\'\"><i class=\"fa fa-trash-o\"></i></button>\n                <span class=\"fa fa-search form-control-feedback\"></span>\n            </div>\n        </div>\n        <div class=\"form-group filter-form-group\">\n            <label for=\"artist\">Artist</label>\n            <div class=\"inline-form-group has-feedback\">\n                <input type=\"text\" id=\"artist\" class=\"form-control\" placeholder=\"\" data-ng-model=\"asideCtrl.filter.artist\">\n                <button class=\"btn btn-fa btn-secondary\" ng-click=\"asideCtrl.filter.artist = \'\'\"><i class=\"fa fa-trash-o\"></i></button>\n                <span class=\"fa fa-search form-control-feedback\"></span>\n            </div>\n        </div>\n\n        <div class=\"form-group filter-form-group\">\n            <label for=\"title\">Title</label>\n            <div class=\"inline-form-group has-feedback\">\n                <input type=\"text\" id=\"title\" class=\"form-control\" placeholder=\"\" data-ng-model=\"asideCtrl.filter.title\">\n                <button class=\"btn btn-fa btn-secondary\" ng-click=\"asideCtrl.filter.title = \'\'\"><i class=\"fa fa-trash-o\"></i></button>\n                <span class=\"fa fa-search form-control-feedback\"></span>\n            </div>\n        </div>\n        <div class=\"form-group filter-form-group\">\n            <label for=\"versionTitle\">Version Title</label>\n            <div class=\"inline-form-group has-feedback\">\n                <input type=\"text\" id=\"versionTitle\" class=\"form-control\" placeholder=\"\" data-ng-model=\"asideCtrl.filter.versionTitle\">\n                <button class=\"btn btn-fa btn-secondary\" ng-click=\"asideCtrl.filter.versionTitle = \'\'\"><i class=\"fa fa-trash-o\"></i></button>\n                <span class=\"fa fa-search form-control-feedback\"></span>\n            </div>\n        </div>\n        <div class=\"form-group filter-form-group\">\n            <label for=\"publisher\">Publisher</label>\n            <div class=\"inline-form-group has-feedback\">\n                <input type=\"text\" id=\"publisher\" class=\"form-control\" placeholder=\"\" data-ng-model=\"asideCtrl.filter.publisher\">\n                <button class=\"btn btn-fa btn-secondary\" ng-click=\"asideCtrl.filter.publisher = \'\'\"><i class=\"fa fa-trash-o\"></i></button>\n                <span class=\"fa fa-search form-control-feedback\"></span>\n            </div>\n        </div>\n        <div class=\"form-group filter-form-group\">\n            <label for=\"format\">Format</label>\n            <div class=\"inline-form-group has-feedback\">\n                <input type=\"text\" id=\"format\" class=\"form-control\" placeholder=\"\" data-ng-model=\"asideCtrl.filter.format\">\n                <button class=\"btn btn-fa btn-secondary\" ng-click=\"asideCtrl.filter.format = \'\'\"><i class=\"fa fa-trash-o\"></i></button>\n                <span class=\"fa fa-search form-control-feedback\"></span>\n            </div>\n        </div>\n        <div class=\"form-group filter-form-group\">\n            <label for=\"releaseDate\">Release Date</label>\n            <div class=\"inline-form-group has-feedback\">\n                <input type=\"text\" id=\"releaseDate\" class=\"form-control\" placeholder=\"\" data-ng-model=\"asideCtrl.filter.releaseDate\">\n                <button class=\"btn btn-fa btn-secondary\" ng-click=\"asideCtrl.filter.releaseDate = \'\'\"><i class=\"fa fa-trash-o\"></i></button>\n                <span class=\"fa fa-search form-control-feedback\"></span>\n            </div>\n        </div>\n        <div class=\"form-group filter-form-group\">\n            <span style=\"height: 26px; display: block;\"></span>\n            <button class=\"btn btn-primary full-width\" data-ng-click=\"asideCtrl.applyFilter()\">Apply Filter</button>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("app/templates/filter-col-aside.html","<div>\n    <h3>\n        Enable / disable table columns\n        <button type=\"button\" class=\"btn btn-secondary-invers btn-circle pull-right\" data-ng-click=\"asideCtrl.cancel()\"><i class=\"fa fa-chevron-right\"></i></button>\n    </h3>\n    <div class=\"aside-content\">\n        <div class=\"form-group\">\n            <div class=\"bmg-checkbox-with-label\">\n                <div class=\"bmg-checkbox\">\n                    <input type=\"checkbox\" id=\"filter-status\" data-ng-model=\"asideCtrl.colFilter.status\"/>\n                    <label for=\"filter-status\"><div></div></label>\n                </div>\n                Status\n            </div>\n\n        </div>\n        <div class=\"form-group\">\n            <div class=\"bmg-checkbox-with-label\">\n                <div class=\"bmg-checkbox\">\n                    <input type=\"checkbox\" id=\"filter-song\" data-ng-model=\"asideCtrl.colFilter.song\"/>\n                    <label for=\"filter-song\"><div></div></label>\n                </div>\n                Song\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <div class=\"bmg-checkbox-with-label\">\n                <div class=\"bmg-checkbox\">\n                    <input type=\"checkbox\" id=\"filter-statusKey\" data-ng-model=\"asideCtrl.colFilter.statusKey\"/>\n                    <label for=\"filter-statusKey\"><div></div></label>\n                </div>\n                Status Key\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <div class=\"bmg-checkbox-with-label\">\n                <div class=\"bmg-checkbox\">\n                    <input type=\"checkbox\" id=\"filter-artist\" data-ng-model=\"asideCtrl.colFilter.artist\"/>\n                    <label for=\"filter-artist\"><div></div></label>\n                </div>\n                Artist\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <div class=\"bmg-checkbox-with-label\">\n                <div class=\"bmg-checkbox\">\n                    <input type=\"checkbox\" id=\"filter-versionTitle\" data-ng-model=\"asideCtrl.colFilter.versionTitle\"/>\n                    <label for=\"filter-versionTitle\"><div></div></label>\n                </div>\n                Version Title\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <div class=\"bmg-checkbox-with-label\">\n                <div class=\"bmg-checkbox\">\n                    <input type=\"checkbox\" id=\"filter-publisher\" data-ng-model=\"asideCtrl.colFilter.publisher\"/>\n                    <label for=\"filter-publisher\"><div></div></label>\n                </div>\n                Publisher\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <div class=\"bmg-checkbox-with-label\">\n                <div class=\"bmg-checkbox\">\n                    <input type=\"checkbox\" id=\"filter-format\" data-ng-model=\"asideCtrl.colFilter.format\"/>\n                    <label for=\"filter-format\"><div></div></label>\n                </div>\n                Format\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <div class=\"bmg-checkbox-with-label\">\n                <div class=\"bmg-checkbox\">\n                    <input type=\"checkbox\" id=\"filter-releaseDate\" data-ng-model=\"asideCtrl.colFilter.releaseDate\"/>\n                    <label for=\"filter-releaseDate\"><div></div></label>\n                </div>\n                Release Date\n            </div>\n        </div>\n        <div class=\"form-group filter-form-group\">\n            <span style=\"height: 26px; display: block;\"></span>\n            <button class=\"btn btn-primary full-width\" data-ng-click=\"asideCtrl.resetColFilter()\">Reset filter</button>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("app/templates/main.html","<div class=\"body-header\">\n    <div class=\"container\">\n        <h1>BMG Bootstrap Style Guide</h1>\n        <p>This is supposed to be a title that is displayed beneath the navbar.</p>\n        <p>This is a page header for full-width elements that are not supposed to be displayed within a panel.</p>\n        <h2>BMG UI-Kit dependencies <i class=\"fa fa-exclamation-triangle color-warning\"></i></h2>\n        <p>The BMG UI-Kit has following bower <strong>dependencies</strong>:</p>\n        <ul>\n            <li><a href=\"https://fortawesome.github.io/Font-Awesome/\">font-awesome</a></li>\n            <li><a href=\"https://github.com/mindsmash/mindsmash-source-sans-pro\">mindsmash-source-sans-pro</a></li>\n        </ul>\n        <p>The BMG UI-Kit has following bower <strong>development dependencies</strong>:</p>\n        <ul>\n            <li><a href=\"https://jquery.com/\">jquery</a></li>\n            <li><a href=\"https://angularjs.org/\">angular</a></li>\n            <li><a href=\"https://angular-ui.github.io/bootstrap/\">angular-bootstrap</a></li>\n            <li><a href=\"https://github.com/Foxandxss/angular-toastr\">angular-toastr</a></li>\n            <li><a href=\"https://github.com/angular-slider/angularjs-slider\">angularjs-slider</a></li>\n            <li><a href=\"https://github.com/angular-ui/ui-select\">angular-ui-select</a></li>\n            <li><a href=\"https://github.com/angular-ui/ui-router\">angular-ui-router</a></li>\n            <li><a href=\"https://github.com/angular/bower-angular-sanitize\">angular-sanitize</a></li>\n            <li><a href=\"https://vitalets.github.io/angular-xeditable/\">angular-xeditable</a></li>\n            <li><a href=\"https://github.com/dbtek/angular-aside\">angular-aside</a></li>\n            <li><a href=\"http://mkoryak.github.io/floatThead/\">floatThead</a></li>\n        </ul>\n        <p>To use some of these features you must include the required dependencies in your <strong>own bower.json</strong>.</p>\n    </div>\n</div>\n<div class=\"container\" role=\"main\">\n    <!-- in production wrap panel div with: <div class=\"row\"><div class=\"col-lg-12\"> </div></div> -->\n    <!-- Grid -->\n    <div class=\"panel panel-default panel-first\">\n        <div class=\"panel-body\">\n            <div class=\"page-header\">\n                <h1 id=\"grid\">Grid</h1>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-12\">\n                    <div class=\"visible-grid\">1</div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-6\">\n                    <div class=\"visible-grid\">1</div>\n                </div>\n                <div class=\"col-lg-6\">\n                    <div class=\"visible-grid\">2</div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-4\">\n                    <div class=\"visible-grid\">1</div>\n                </div>\n                <div class=\"col-lg-4\">\n                    <div class=\"visible-grid\">2</div>\n                </div>\n                <div class=\"col-lg-4\">\n                    <div class=\"visible-grid\">3</div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-3\">\n                    <div class=\"visible-grid\">1</div>\n                </div>\n                <div class=\"col-lg-3\">\n                    <div class=\"visible-grid\">2</div>\n                </div>\n                <div class=\"col-lg-3\">\n                    <div class=\"visible-grid\">3</div>\n                </div>\n                <div class=\"col-lg-3\">\n                    <div class=\"visible-grid\">4</div>\n                </div>\n            </div>\n            <div class=\"pull-right\">\n                <a ui-sref=\"grid\">View full page example</a>\n            </div>\n        </div>\n    </div>\n    <!-- Typography -->\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"page-header\">\n                <h1 id=\"typography\">Typography</h1>\n            </div>\n            <h1>h1. Bootstrap heading</h1>\n            <h2>h2. Bootstrap heading</h2>\n            <h3>h3. Bootstrap heading</h3>\n            <h4>h4. Bootstrap heading</h4>\n            <h5>h5. Bootstrap heading</h5>\n            <h6>h6. Bootstrap heading</h6>\n        </div>\n    </div>\n    <!-- Colors -->\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"page-header\">\n                <h1 id=\"colors\">Colors</h1>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-6\">\n                    <div class=\"color-grid head\">COLOR</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid head\">SCSS CONSTANT</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid head\">SCSS ALIAS</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid head\">HEX COLOR CODE</div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-6\">\n                    <div class=\"color-grid color ec-primary\">Primary</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-malibu</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-primary</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">#51d0ff</div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-6\">\n                    <div class=\"color-grid color ec-secondary\">Secondary</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-tundora</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-secondary</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">#4D4D4D</div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-6\">\n                    <div class=\"color-grid color ec-success\">Success</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-rio-grande</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-success</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">#AFCE06</div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-6\">\n                    <div class=\"color-grid color ec-info\">Info</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-turquoise</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-info</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">#1CE0D0</div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-6\">\n                    <div class=\"color-grid color ec-warning\">Warning</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-supernova</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-warning</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">#FFCC00</div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-6\">\n                    <div class=\"color-grid color ec-error\">Error</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-monza</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-error</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">#C80031</div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-12\">\n                    <hr>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-6\">\n                    <div class=\"color-grid color ec-black\">Black</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-black</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-text</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">#4C4C4C</div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-6\">\n                    <div class=\"color-grid color ec-stack\">Stack</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-stack</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\"></div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">#999999</div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-6\">\n                    <div class=\"color-grid color ec-celeste\">Celeste</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-celeste</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\"></div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">#EDEDED</div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-6\">\n                    <div class=\"color-grid color ec-white\">White</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-white</div>\n                </div>\n                <div class=\"col-lg-2\">\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">#FFFFFF</div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-6\">\n                    <div class=\"color-grid color ec-spice\">Spice</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-spice</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\"></div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">#A7572C</div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-6\">\n                    <div class=\"color-grid color ec-pine-green\">Pine Green</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-pine-green</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\"></div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">#319990</div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-6\">\n                    <div class=\"color-grid color ec-jazzberry\">Jazzberry</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">$bmg-jazzberry</div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\"></div>\n                </div>\n                <div class=\"col-lg-2\">\n                    <div class=\"color-grid\">#A11762</div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- Buttons -->\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"page-header\">\n                <h1 id=\"buttons\">Buttons</h1>\n            </div>\n            <div class=\"row\" style=\"margin-top: 20px;\">\n                <div class=\"col-lg-3\">\n                    <button type=\"button\" class=\"btn btn-primary\">Primary</button>\n                </div>\n                <div class=\"col-lg-3\">\n                    <button type=\"button\" class=\"btn btn-secondary\">Secondary</button>\n                </div>\n                <div class=\"col-lg-3\">\n                    <button type=\"button\" class=\"btn btn-default\">Default</button>\n                    <button type=\"button\" class=\"btn btn-default btn-disabled\" disabled>Default (disabled)</button>\n                </div>\n                <div class=\"col-lg-3\">\n                    <button type=\"button\" class=\"btn btn-default disabled\">Disabled</button>\n                </div>\n            </div>\n            <div class=\"row\" style=\"margin-top: 20px;\">\n                <div class=\"col-lg-3\">\n                    <button type=\"button\" class=\"btn btn-success\">Success</button>\n                </div>\n                <div class=\"col-lg-3\">\n                    <button type=\"button\" class=\"btn btn-info\">Info</button>\n                </div>\n                <div class=\"col-lg-3\">\n                    <button type=\"button\" class=\"btn btn-warning\">Warning</button>\n                </div>\n                <div class=\"col-lg-3\">\n                    <button type=\"button\" class=\"btn btn-danger\">Danger</button>\n                </div>\n            </div>\n            <br>\n            <div class=\"row\">\n                <div class=\"col-lg-12\">\n                    <pre><code class=\"html\">&lt;button type=\"button\" class=\"btn btn-primary\"&gt;Primary&lt;/button&gt;</code></pre>\n                </div>\n            </div>\n            <div class=\"row\" style=\"margin-top: 10px;\">\n                <div class=\"col-lg-4\">\n                    <button type=\"button\" class=\"btn btn-default\"><i class=\"fa fa-star-o\"></i> Text</button>\n                    <br>\n                    <br>\n                    <pre><code class=\"html\">&lt;button type=\"button\" class=\"btn btn-default\"&gt;&lt;i class=\"fa fa-star-o\"&gt;&lt;/i&gt; Text&lt;/button&gt;</code></pre>\n                </div>\n                <div class=\"col-lg-4\">\n                    <button type=\"button\" class=\"btn btn-primary btn-fa\"><i class=\"fa fa-star-o\"></i></button>\n                    <button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-star\"></i></button>\n                    <br>\n                    <br>\n                    <pre><code class=\"html\">&lt;button type=\"button\" class=\"btn btn-primary btn-fa\"&gt;&lt;i class=\"fa fa-star-o\"&gt;&lt;/i&gt;&lt;/button&gt;</code></pre>\n                </div>\n                <div class=\"col-lg-4\">\n                    <button type=\"button\" class=\"btn btn-primary-invers btn-circle\"><i class=\"fa fa-chevron-right\"></i>\n                    </button>\n                    <button type=\"button\" class=\"btn btn-primary btn-circle\"><i class=\"fa fa-check\"></i></button>\n                    <button type=\"button\" class=\"btn btn-disabled btn-circle\"><i class=\"fa fa-check\"></i></button>\n                    <button type=\"button\" class=\"btn btn-danger btn-circle\"><i class=\"fa fa-remove\"></i></button>\n                    <button type=\"button\" class=\"btn btn-disabled btn-circle\"><i class=\"fa fa-remove\"></i></button>\n                    <br>\n                    <br>\n                    <pre style=\"margin-top: 5px\"><code class=\"html\">&lt;button type=\"button\" class=\"btn btn-primary btn-circle\"&gt;&lt;i class=\"fa fa-check\"&gt;&lt;/i&gt;&lt;/button&gt;</code></pre>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- Button Group -->\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"page-header\">\n                <h1 id=\"button-group\">Button Group</h1>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-6\">\n                    <div class=\"btn-group\" role=\"group\">\n                        <button type=\"button\" class=\"btn btn-default\">S</button>\n                        <button type=\"button\" class=\"btn btn-default\">M</button>\n                        <button type=\"button\" class=\"btn btn-default\">L</button>\n                    </div>\n                </div>\n                <div class=\"col-lg-6\">\n                    <div class=\"btn-group\" role=\"group\">\n                        <button type=\"button\" class=\"btn btn-default disabled\">Left</button>\n                        <button type=\"button\" class=\"btn btn-default disabled\">Middle</button>\n                        <button type=\"button\" class=\"btn btn-default disabled\">Right</button>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-12\">\n                    <br>\n                    <pre><code class=\"html\">&lt;div class=\"btn-group\" role=\"group\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;button type=\"button\" class=\"btn btn-default\"&gt;S&lt;/button&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;button type=\"button\" class=\"btn btn-default\"&gt;M&lt;/button&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;button type=\"button\" class=\"btn btn-default\"&gt;L&lt;/button&gt;\n&lt;/div&gt;</code></pre>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- Button Dropdown -->\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"page-header\">\n                <h1 id=\"button-dropdown\">Button Dropdown</h1>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-6\">\n                    <div class=\"btn-group\" uib-dropdown>\n                        <button type=\"button\" class=\"btn btn-default\">A very long description</button>\n                        <button type=\"button\" class=\"btn btn-default\" uib-dropdown-toggle>\n                            <span class=\"caret\"></span>\n                            <span class=\"sr-only\">Split button!</span>\n                        </button>\n                        <ul uib-dropdown-menu role=\"menu\" aria-labelledby=\"split-button\">\n                            <li role=\"menuitem\"><a href=\"#\">Example A</a></li>\n                            <li role=\"menuitem\"><a href=\"#\">Longer Example B</a></li>\n                            <li role=\"menuitem\"><a href=\"#\">Example C</a></li>\n                        </ul>\n                    </div>\n                </div>\n                <div class=\"col-lg-6\">\n                    <div class=\"btn-group\" uib-dropdown>\n                        <button type=\"button\" class=\"btn btn-default\">Short</button>\n                        <button type=\"button\" class=\"btn btn-default\" uib-dropdown-toggle>\n                            <span class=\"caret\"></span>\n                            <span class=\"sr-only\">Split button!</span>\n                        </button>\n                        <ul uib-dropdown-menu role=\"menu\" aria-labelledby=\"split-button\">\n                            <li role=\"menuitem\"><a href=\"#\">Example A</a></li>\n                            <li role=\"menuitem\"><a href=\"#\">Longer Example B</a></li>\n                            <li role=\"menuitem\"><a href=\"#\">Example C</a></li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-12\">\n                    <br>\n                        <pre><code class=\"html\">&lt;div class=\"btn-group\" uib-dropdown&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;button type=\"button\" class=\"btn btn-default\"&gt;A very long description&lt;/button&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;button type=\"button\" class=\"btn btn-default\" uib-dropdown-toggle&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class=\"caret\"&gt;&lt;/span&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class=\"sr-only\"&gt;Split button!&lt;/span&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;/button&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;ul uib-dropdown-menu role=\"menu\" aria-labelledby=\"split-button\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li role=\"menuitem\"&gt;&lt;a href=\"#\"&gt;Example A&lt;/a&gt;&lt;/li&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li role=\"menuitem\"&gt;&lt;a href=\"#\"&gt;Longer Example B&lt;/a&gt;&lt;/li&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;li role=\"menuitem\"&gt;&lt;a href=\"#\"&gt;Example C&lt;/a&gt;&lt;/li&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;/ul&gt;\n&lt;/div&gt;</code></pre>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- Pagination -->\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"page-header\">\n                <h1 id=\"pagination\">Pagination</h1>\n            </div>\n            <div class=\"row\" data-ng-controller=\"PaginationController as paginationCtrl\">\n                <div class=\"col-lg-12\">\n                    <uib-pagination total-items=\"paginationCtrl.bigTotalItems\" ng-model=\"paginationCtrl.bigCurrentPage\" max-size=\"paginationCtrl.maxSize\"\n                                    class=\"pagination pull-left with-page-number-input\" boundary-links=\"true\"\n                                    force-ellipses=\"false\"></uib-pagination>\n                    <input type=\"text\" class=\"pagination-page-number-input\" placeholder=\"Page...\" ng-model=\"paginationCtrl.pageNumber\"\n                           data-ng-change=\"paginationCtrl.changePageNumber(paginationCtrl.pageNumber)\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-12\">\n                    <pre><code class=\"html\">&lt;uib-pagination total-items=\"bigTotalItems\" ng-model=\"bigCurrentPage\" max-size=\"maxSize\"\n&nbsp;&nbsp;&nbsp;&nbsp;class=\"pagination pull-left with-page-number-input\" boundary-links=\"true\" force-ellipses=\"false\"&gt;&lt;/uib-pagination&gt;\n&lt;input type=\"text\" class=\"pagination-page-number-input\" placeholder=\"Page...\" ng-model=\"pageNumber\" data-ng-change=\"changePageNumber(pageNumber)\"&gt;</code></pre>\n                    <div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://angular-ui.github.io/bootstrap/\">angular-bootstrap</a></div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- Form / Input Group -->\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"page-header\">\n                <h1 id=\"form\">Form Group / Input Group</h1>\n            </div>\n            <div class=\"row\" data-ng-controller=\"FormController\">\n                <div class=\"col-lg-12\">\n                    <h2>Text / E-Mail input fields</h2>\n                    <form>\n                        <div class=\"form-group\">\n                            <label for=\"exampleInputEmail1\">Email address (empty)</label>\n                            <input type=\"email\" class=\"form-control\" id=\"exampleInputEmail1\" placeholder=\"E-Mail\">\n                        </div>\n                         <pre><code class=\"html\">&lt;div class=\"form-group\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;label for=\"email\"&gt;Email address&lt;/label&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type=\"email\" class=\"form-control\" id=\"email\" placeholder=\"E-Mail\" data-ng-model=\"email\"&gt;\n&lt;/div&gt;</code></pre>\n                        <div class=\"form-group has-success has-feedback\">\n                            <label for=\"exampleInputEmail2\">Email address (correct)</label>\n                            <input type=\"email\" class=\"form-control\" id=\"exampleInputEmail2\" placeholder=\"E-Mail\"\n                                   data-ng-model=\"email_correct\">\n                            <span class=\"fa fa-check form-control-feedback\"></span>\n                        </div>\n                        <pre><code class=\"html\">&lt;div class=\"form-group has-success has-feedback\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;label for=\"email1\"&gt;Email address&lt;/label&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type=\"email\" class=\"form-control\" id=\"email1\" placeholder=\"E-Mail\" data-ng-model=\"email\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class=\"fa fa-check form-control-feedback\"&gt;&lt;/span&gt;\n&lt;/div&gt;</code></pre>\n                        <div class=\"form-group has-error has-feedback\">\n                            <label for=\"exampleInputEmail3\">Email address (incorrect)</label>\n                            <input type=\"email\" class=\"form-control\" id=\"exampleInputEmail3\" placeholder=\"E-Mail\"\n                                   data-ng-model=\"email_incorrect\">\n                            <span class=\"fa fa-times form-control-feedback\"></span>\n                            <p class=\"help-block\">Please correct your e-mail address</p>\n                        </div>\n                        <pre><code class=\"html\">&lt;div class=\"form-group has-error has-feedback\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;label for=\"email2\"&gt;Email address&lt;/label&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type=\"email\" class=\"form-control\" id=\"email2\" placeholder=\"E-Mail\" data-ng-model=\"email\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class=\"fa fa-times form-control-feedback\"&gt;&lt;/span&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;p class=\"help-block\"&gt;Please correct your e-mail address&lt;/p&gt;\n&lt;/div&gt;</code></pre>\n                        <div class=\"form-group\">\n                            <label for=\"exampleInputPassword1\">Password</label>\n                            <input type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\"\n                                   placeholder=\"Password\" data-ng-model=\"password\">\n                        </div>\n                        <div class=\"form-group\">\n                            <label>Notes</label>\n                            <textarea class=\"form-control\" rows=\"3\"></textarea>\n                        </div>\n                        <pre><code class=\"html\">&lt;div class=\"form-group\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;label&gt;Notes&lt;/label&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;textarea class=\"form-control\" rows=\"3\"&gt;&lt;/textarea&gt;\n&lt;/div&gt;</code></pre>\n                        <h2>File input</h2>\n                        <div class=\"form-group\">\n                            <input type=\"file\" title=\"Search for a file to add\">\n                            <p class=\"help-block\">Select a file to upload.</p>\n                        </div>\n                        <pre><code class=\"html\">&lt;div class=\"form-group\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type=\"file\" title=\"Search for a file to add\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;p class=\"help-block\"&gt;Select a file to upload.&lt;/p&gt;\n&lt;/div&gt;</code></pre>\n                        Init BootstrapFileInput to avoid default style for the file input field:\n                        <pre><code class=\"JavaScript\">jQuery(document).ready(function() {\n&nbsp;&nbsp;&nbsp;&nbsp;$(\'input[type=file]\').bootstrapFileInput();\n});</code></pre>\n                        <div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependeny: <a href=\"https://jquery.com/\">jquery</a></div>\n                        <h2>Select</h2>\n                        <div class=\"form-group\">\n                            <ui-select ng-model=\"address.selected\"\n                                       theme=\"bootstrap\"\n                                       ng-disabled=\"disabled\"\n                                       reset-search-input=\"false\">\n                                <ui-select-match placeholder=\"Enter an address...\">\n                                    {{$select.selected.formatted_address}}\n                                </ui-select-match>\n                                <ui-select-choices repeat=\"address in addresses track by $index\"\n                                                   refresh=\"refreshAddresses($select.search)\"\n                                                   refresh-delay=\"0\">\n                                    <div ng-bind-html=\"address.formatted_address | highlight: $select.search\"></div>\n                                </ui-select-choices>\n                            </ui-select>\n                        </div>\n                        <pre><code class=\"html\" ng-non-bindable>&lt;div class=\"form-group\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;ui-select ng-model=\"address.selected\" theme=\"bootstrap\" ng-disabled=\"disabled\" reset-search-input=\"false\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;ui-select-match placeholder=\"Enter an address...\"&gt;{{$select.selected.formatted_address}}&lt;/ui-select-match&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;ui-select-choices repeat=\"address in addresses track by $index\" refresh=\"refreshAddresses($select.search)\" refresh-delay=\"0\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div ng-bind-html=\"address.formatted_address | highlight: $select.search\"&gt;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/ui-select-choices&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;/ui-select&gt;\n&lt;/div&gt;</code></pre>\n                        <div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://github.com/angular-ui/ui-select\">angular-ui-select</a></div>\n                        <br>\n                        <br>\n                        <button type=\"submit\" class=\"btn btn-primary\">Submit</button>\n                    </form>\n\n                    <br/>\n                    <h2>Input Group</h2>\n                    <div class=\"form-group\">\n                    <label>Seperate Units</label>\n                        <div class=\"input-group\">\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Value\" data-ng-model=\"value\">\n                            <span class=\"input-group-addon\">$</span>\n                        </div>\n                    </div>\n                    <br>\n                    <pre><code class=\"html\">&lt;label&gt;Seperate Units&lt;/label&gt;\n&lt;div class=\"input-group\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type=\"text\" class=\"form-control\" placeholder=\"Value\" data-ng-model=\"value\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class=\"input-group-addon\"&gt;$&lt;/span&gt;\n&lt;/div&gt;</code></pre>\n                    <h2>Typeahead</h2>\n                    <div class=\"form-group has-feedback\">\n                        <label class=\"control-label\" for=\"inputSearch\">Search (US states)</label>\n                        <input type=\"text\" id=\"inputSearch\" class=\"form-control\" placeholder=\"Search...\"\n                               ng-model=\"ngModelOptionsSelected\"\n                               ng-model-options=\"modelOptions\"\n                               uib-typeahead=\"state for state in states | filter:$viewValue\">\n                        <span class=\"fa fa-search form-control-feedback\"></span>\n                    </div>\n                    <pre><code class=\"html\">&lt;div class=\"form-group has-feedback\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;label class=\"control-label\" for=\"inputSearch\"&gt;Search (US states)&lt;/label&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type=\"text\" id=\"inputSearch\" class=\"form-control\" placeholder=\"Search...\" ng-model=\"ngModelOptionsSelected\" ng-model-options=\"modelOptions\" uib-typeahead=\"state for state in states | filter:$viewValue\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class=\"fa fa-search form-control-feedback\"&gt;&lt;/span&gt;\n&lt;/div&gt;</code></pre>\n                    <div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://angular-ui.github.io/bootstrap/\">angular-bootstrap</a></div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- Checkbox / Slider -->\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"page-header\">\n                <h1 id=\"checkbox-slider\">Checkbox / Slider</h1>\n            </div>\n            <div class=\"row\" data-ng-controller=\"CheckboxSliderController as checkboxSliderCtrl\">\n                <div class=\"col-lg-12\">\n                    <h2>Checkbox</h2>\n                    <div class=\"bmg-checkbox-with-label\">\n                        <div class=\"bmg-checkbox\">\n                            <input type=\"checkbox\" id=\"squaredCheckbox1\"\n                                   data-ng-model=\"checkboxSliderCtrl.checkbox.checked\"/>\n                            <label for=\"squaredCheckbox1\"><div></div></label>\n                        </div>\n                        Check me out!\n                    </div>\n\n                    <div class=\"bmg-checkbox-with-label\">\n                        <div class=\"bmg-checkbox\">\n                            <input type=\"checkbox\" id=\"squaredCheckbox2\"\n                                   data-ng-model=\"checkboxSliderCtrl.checkbox.notChecked\"/>\n                            <label for=\"squaredCheckbox2\"><div></div></label>\n                        </div>\n                        Check me out too!\n                    </div>\n                    <br>\n                    <pre><code class=\"html\">&lt;div class=\"bmg-checkbox-with-label\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"bmg-checkbox\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type=\"checkbox\" id=\"checkboxId\" data-ng-model=\"checked\"/&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;label for=\"checkboxId\"&gt;&lt;div&gt;&lt;/div&gt;&lt;/label&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;Check me out!\n&lt;/div&gt;</code></pre>\n                    <h2>Slider</h2>\n                    <div>\n                        <rzslider\n                                rz-slider-model=\"checkboxSliderCtrl.slider.min\"\n                                rz-slider-high=\"checkboxSliderCtrl.slider.max\"\n                                rz-slider-options=\"checkboxSliderCtrl.slider.options\"></rzslider>\n                    </div>\n                    <br>\n                    <pre><code class=\"html\">&lt;rzslider rz-slider-options=\"slider.options\"\n&nbsp;&nbsp;&nbsp;&nbsp;rz-slider-model=\"slider.min\"\n&nbsp;&nbsp;&nbsp;&nbsp;rz-slider-high=\"slider.max\"&gt;&lt;/rzslider&gt;</code></pre>\n                    <div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://github.com/angular-slider/angularjs-slider\">angularjs-slider</a></div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- Status -->\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"page-header\">\n                <h1 id=\"status\">Status</h1>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-12\">\n                    <h2>A four step status bar</h2>\n                    <div class=\"row\">\n                        <div class=\"col-lg-6\">\n                            <div class=\"progress-status\">\n                                <div class=\"progress-display-status\">\n                                    <div class=\"status-line\"></div>\n                                    <div class=\"status-active\">1</div>\n                                    <div class=\"status-open\"></div>\n                                    <div class=\"status-open\"></div>\n                                    <div class=\"status-open\"></div>\n                                </div>\n                                <div class=\"status-percentage\">0&#37;<span\n                                        class=\"status-percentage-text\">complete</span>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-lg-6\">\n                            <div class=\"progress-status\">\n                                <div class=\"progress-display-status\">\n                                    <div class=\"status-line\"></div>\n                                    <div class=\"status-finished\"></div>\n                                    <div class=\"status-active\">2</div>\n                                    <div class=\"status-open\"></div>\n                                    <div class=\"status-open\"></div>\n                                </div>\n                                <div class=\"status-percentage\">25&#37;<span\n                                        class=\"status-percentage-text\">complete</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-lg-6\">\n                            <div class=\"progress-status\">\n                                <div class=\"progress-display-status\">\n                                    <div class=\"status-line\"></div>\n                                    <div class=\"status-finished\"></div>\n                                    <div class=\"status-finished\"></div>\n                                    <div class=\"status-active\">3</div>\n                                    <div class=\"status-open\"></div>\n                                </div>\n                                <div class=\"status-percentage\">50&#37;<span\n                                        class=\"status-percentage-text\">complete</span>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-lg-6\">\n                            <div class=\"progress-status\">\n                                <div class=\"progress-display-status\">\n                                    <div class=\"status-line\"></div>\n                                    <div class=\"status-finished\"></div>\n                                    <div class=\"status-finished\"></div>\n                                    <div class=\"status-finished\"></div>\n                                    <div class=\"status-active\">4</div>\n                                </div>\n                                <div class=\"status-percentage\">75&#37;<span\n                                        class=\"status-percentage-text\">complete</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-12\">\n                    <h2>Longer status bar</h2>\n                    <div class=\"col-lg-12\">\n                        <div class=\"progress-status\">\n                            <div class=\"progress-display-status\">\n                                <div class=\"status-line\"></div>\n                                <div class=\"status-finished\"></div>\n                                <div class=\"status-finished\"></div>\n                                <div class=\"status-finished\"></div>\n                                <div class=\"status-finished\"></div>\n                                <div class=\"status-finished\"></div>\n                                <div class=\"status-finished\"></div>\n                                <div class=\"status-finished\"></div>\n                                <div class=\"status-active\">8</div>\n                                <div class=\"status-open\"></div>\n                                <div class=\"status-open\"></div>\n                            </div>\n                            <div class=\"status-percentage\">70&#37;<span class=\"status-percentage-text\">complete</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-12 data-create-code\">\n                    <pre><code class=\"html\">&lt;div class=\"progress-status\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"progress-display-status\"&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"status-line\"&gt;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"status-finished\"&gt;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"status-finished\"&gt;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"status-active\"&gt;3&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"status-open\"&gt;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;\n&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"status-percentage\"&gt;50&amp;&#35;&#51;&#55;&#59;&lt;span class=\"status-percentage-text\"&gt;complete&lt;/span&gt;&lt;/div&gt;\n&lt;/div&gt;</code></pre>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- Modal -->\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"page-header\">\n                <h1 id=\"modal\">Modal</h1>\n            </div>\n            <div class=\"row\" data-ng-controller=\"ModalController as modalCtrl\">\n                <div class=\"col-lg-12\">\n                    <button class=\"btn btn-info\" data-ng-click=\"modalCtrl.openModal()\">Open modal</button>\n                </div>\n            </div>\n            <br>\n            <pre><code class=\"html\">&lt;div class=\"modal-close\"&gt;\n    &lt;button type=\"button\" class=\"close\" ng-click=\"cancel()\"&gt;&lt;i class=\"fa fa-times color-secondary\"&gt;&lt;/i&gt;&lt;/button&gt;\n&lt;/div&gt;\n&lt;div class=\"modal-header\"&gt;\n    &lt;h2 class=\"modal-title\"&gt;A simple Modal&lt;/h2&gt;\n&lt;/div&gt;\n&lt;div class=\"modal-body\"&gt;\n    &lt;form&gt;\n        &lt;div class=\"row\"&gt;\n            &lt;div class=\"col-lg-4\"&gt;\n                &lt;div class=\"form-group\"&gt;\n                    &lt;label for=\"firstName\"&gt;First Name&lt;/label&gt;\n                    &lt;input type=\"text\" class=\"form-control\" id=\"firstName\" placeholder=\"First Name\"&gt;\n                &lt;/div&gt;\n            &lt;/div&gt;\n            &lt;div class=\"col-lg-4\"&gt;\n                &lt;div class=\"form-group\"&gt;\n                    &lt;label for=\"secondName\"&gt;Second Name&lt;/label&gt;\n                    &lt;input type=\"text\" class=\"form-control\" id=\"secondName\" placeholder=\"Second Name\"&gt;\n                &lt;/div&gt;\n            &lt;/div&gt;\n                &lt;div class=\"col-lg-4\"&gt;\n                    &lt;div class=\"form-group\"&gt;\n                    &lt;label for=\"lastName\"&gt;Last Name&lt;/label&gt;\n                    &lt;input type=\"text\" class=\"form-control\" id=\"lastName\" placeholder=\"Last Name\"&gt;\n                &lt;/div&gt;\n            &lt;/div&gt;\n        &lt;/div&gt;\n    &lt;/form&gt;\n    &lt;hr&gt;\n    Any other content you need...\n&lt;/div&gt;\n&lt;div class=\"modal-footer\"&gt;\n    &lt;hr&gt;\n    &lt;button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\"&gt;Create&lt;/button&gt;\n    &lt;button class=\"btn btn-secondary\" type=\"button\" ng-click=\"cancel()\"&gt;Cancel&lt;/button&gt;\n&lt;/div&gt;</code></pre>\n            <div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://angular-ui.github.io/bootstrap/\">angular-bootstrap</a></div>\n        </div>\n    </div>\n    <!-- Slide Navigation -->\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"page-header\">\n                <h1 id=\"slide\">Slide navigation</h1>\n            </div>\n            <div class=\"row\" data-ng-controller=\"ModalController as modalCtrl\">\n                <div class=\"col-lg-12\">\n                    <button class=\"btn btn-info\" data-ng-click=\"modalCtrl.openSlideModal1()\">Open modal</button>\n                    <button class=\"btn btn-info\" data-ng-click=\"modalCtrl.openSlideModal2()\">Open modal with nested form</button>\n                </div>\n            </div>\n            <br>\n            <pre><code class=\"html\">&lt;div class=\"modal-header\"&gt;\n    &lt;h2 class=\"modal-title\"&gt;Create Deal&lt;/h2&gt;\n&lt;/div&gt;\n&lt;div class=\"modal-body\"&gt;\n    &lt;uib-tabset active=\"activeJustified\" justified=\"true\" template-url=\"\"&gt;\n        &lt;uib-tab index=\"0\" heading=\"Common\"&gt;\n            &lt;uib-tab-heading&gt;\n                &lt;div class=\"number-circle\"&gt;1&lt;/div&gt; Common&lt;/h5&gt;\n            &lt;/uib-tab-heading&gt;\n            &lt;div class=\"form-group has-success has-feedback\"&gt;\n                &lt;label for=\"deal\"&gt;Deal&lt;/label&gt;\n                &lt;input type=\"text\" class=\"form-control\" id=\"deal\" placeholder=\"Deal\"&gt;\n                &lt;span class=\"fa fa-check form-control-feedback\"&gt;&lt;/span&gt;\n            &lt;/div&gt;\n        &lt;/uib-tab&gt;\n        &lt;uib-tab index=\"1\"&gt;\n            &lt;uib-tab-heading&gt;\n                &lt;span class=\"number-circle\"&gt;2&lt;/span&gt; Financial\n            &lt;/uib-tab-heading&gt;\n            Financial data...\n        &lt;/uib-tab&gt;\n        &lt;uib-tab index=\"2\" heading=\"People\"&gt;\n            &lt;uib-tab-heading&gt;\n                &lt;span class=\"number-circle\"&gt;3&lt;/span&gt; People\n            &lt;/uib-tab-heading&gt;\n            People data...\n        &lt;/uib-tab&gt;\n    &lt;/uib-tabset&gt;\n&lt;/div&gt;\n&lt;div class=\"modal-footer\"&gt;\n    &lt;button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\"&gt;Create&lt;/button&gt;\n    &lt;button class=\"btn btn-secondary\" type=\"button\" ng-click=\"cancel()\"&gt;Cancel&lt;/button&gt;\n&lt;/div&gt;</code></pre>\n            <div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://angular-ui.github.io/bootstrap/\">angular-bootstrap</a></div>\n        </div>\n    </div>\n    <!-- Alerts -->\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"page-header\">\n                <h1 id=\"alerts\">Alerts</h1>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-12\">\n                    <h2>BMG Bootstrap Alerts:</h2>\n                    <div class=\"alert alert-success\" role=\"alert\">\n                        Success!\n                    </div>\n                    <div class=\"alert alert-info\" role=\"alert\">\n                        Info!\n                    </div>\n                    <div class=\"alert alert-warning\" role=\"alert\">\n                        Warning!\n                    </div>\n                    <div class=\"alert alert-danger\" role=\"alert\">\n                        Danger!\n                    </div>\n                    <pre><code class=\"html\">&lt;div class=\"alert alert-success\" role=\"alert\"&gt;\n    Success!\n&lt;/div&gt;</code></pre>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-12\">\n                    <h2>Toastr Alerts:</h2>\n                    <div data-ng-controller=\"NotificationController as notificationCtrl\">\n                        <button class=\"btn btn-success\" data-ng-click=\"notificationCtrl.success()\">Click me!</button>\n                        <button class=\"btn btn-info\" data-ng-click=\"notificationCtrl.info()\">Click me!</button>\n                        <button class=\"btn btn-warning\" data-ng-click=\"notificationCtrl.warning()\">Click me!</button>\n                        <button class=\"btn btn-danger\" data-ng-click=\"notificationCtrl.error()\">Click me!</button>\n                    </div>\n                    <br>\n                    <pre><code class=\"html\">&lt;button class=\"btn btn-success\" data-ng-click=\"success()\"&gt;Click me!&lt;/button&gt;</code></pre>\n                    <pre><code class=\"JavaScript\">this.success = function() {\n    toastr.success(\'Hello world!\', \'Toastr fun!\');\n};</code></pre>\n                    <div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://github.com/Foxandxss/angular-toastr\">angular-toastr</a></div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- Table -->\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"page-header\">\n                <h1 id=\"table\">Table</h1>\n            </div>\n            <div class=\"row\" style=\"margin-top: 50px;\">\n                <div class=\"col-lg-12\">\n                    <div data-ng-controller=\"TableController as tableCtrl\">\n                        <h2>Table</h2>\n                        <table id=\"tableStandard\" class=\"table table-hover table-fluid table-fixed-header\">\n                            <thead>\n                            <tr>\n                                <th class=\"shrink\">\n                                    <div class=\"bmg-checkbox\">\n                                        <input type=\"checkbox\" id=\"tableCheckAll\"/>\n                                        <label for=\"tableCheckAll\"><div></div></label>\n                                    </div>\n                                </th>\n                                <th>Header A <i class=\"fa fa-sort\"></i></th>\n                                <th>Header B <i class=\"fa fa-sort\"></i></th>\n                                <th>Header C <i class=\"fa fa-sort\"></i></th>\n                                <th class=\"shrink\">\n                                    <div class=\"pull-right\">\n                                        <button type=\"button\" class=\"btn btn-secondary btn-fa\">\n                                            <i class=\"fa fa-columns\"></i>\n                                        </button>\n                                        <button type=\"button\" class=\"btn btn-secondary btn-fa\">\n                                            <i class=\"fa fa-filter\"></i>\n                                        </button>\n                                    </div>\n                                </th>\n                            </tr>\n                            </thead>\n                            <tbody>\n                            <tr ng-repeat=\"content in tableCtrl.data\">\n                                <td>\n                                    <div class=\"bmg-checkbox\">\n                                        <input type=\"checkbox\" id=\"row-{{$index}}\"/>\n                                        <label for=\"row-{{$index}}\"><div></div></label>\n                                    </div>\n                                </td>\n                                <td>{{ content.a }}{{ $index }}</td>\n                                <td>{{ content.b }}{{ $index }}</td>\n                                <td>{{ content.c }}{{ $index }}</td>\n                                <td>\n                                    <div class=\"pull-right\">\n                                        <button type=\"button\" class=\"btn btn-primary btn-fa\">\n                                            <i class=\"fa fa-pencil\"></i>\n                                        </button>\n                                    </div>\n                                </td>\n                            </tr>\n                            </tbody>\n                        </table>\n                        \n                        <h2>Table condensed</h2>\n                        <table id=\"tableCondensed\" class=\"table-condensed table-hover table-fluid\">\n                            <thead>\n                            <tr>\n                                <th class=\"shrink\">\n                                    <div class=\"bmg-checkbox\">\n                                        <input type=\"checkbox\" id=\"tableCondensedCheckAll\"/>\n                                        <label for=\"tableCondensedCheckAll\"><div></div></label>\n                                    </div>\n                                </th>\n                                <th>Header A <i class=\"fa fa-sort\"></i></th>\n                                <th>Header B <i class=\"fa fa-sort\"></i></th>\n                                <th>Header C <i class=\"fa fa-sort\"></i></th>\n                                <th class=\"shrink\">\n                                    <div class=\"pull-right\">\n                                        <button type=\"button\" class=\"btn btn-secondary btn-xs btn-fa\">\n                                            <i class=\"fa fa-columns\"></i>\n                                        </button>\n                                        <button type=\"button\" class=\"btn btn-secondary btn-xs btn-fa\">\n                                            <i class=\"fa fa-filter\"></i>\n                                        </button>\n                                    </div>\n                                </th>\n                            </tr>\n                            </thead>\n                            <tbody>\n                            <tr ng-repeat=\"content in tableCtrl.data\">\n                                <td>\n                                    <div class=\"bmg-checkbox\">\n                                        <input type=\"checkbox\" id=\"rowc-{{$index}}\"/>\n                                        <label for=\"rowc-{{$index}}\"><div></div></label>\n                                    </div>\n                                </td>\n                                <td>{{ content.a }}{{ $index }}</td>\n                                <td>{{ content.b }}{{ $index }}</td>\n                                <td>{{ content.c }}{{ $index }}</td>\n                                <td>\n                                    <div class=\"pull-right\">\n                                        <button type=\"button\" class=\"btn btn-primary btn-xs btn-fa\">\n                                            <i class=\"fa fa-pencil\"></i>\n                                        </button>\n                                    </div>\n                                </td>\n                            </tr>\n                            </tbody>\n                        </table>\n                        <br>\n                        <pre><code class=\"html\" ng-non-bindable>&lt;table class=\"table table-hover table-fluid\"&gt; &lt;!-- use css class \"table-condensed\" for small size table --&gt;\n&lt;thead&gt;\n    &lt;tr&gt;\n        &lt;th class=\"shrink\"&gt;\n            &lt;div class=\"bmg-checkbox\"&gt;\n                &lt;input type=\"checkbox\" id=\"checkAll\"/&gt;\n                &lt;label for=\"checkAll\"&gt;&lt;div&gt;&lt;/div&gt;&lt;/label&gt;\n            &lt;/div&gt;\n        &lt;/th&gt;\n        &lt;th&gt;Header A &lt;i class=\"fa fa-sort\"&gt;&lt;/i&gt;&lt;/th&gt;\n        &lt;th&gt;Header B &lt;i class=\"fa fa-sort\"&gt;&lt;/i&gt;&lt;/th&gt;\n        &lt;th&gt;Header C &lt;i class=\"fa fa-sort\"&gt;&lt;/i&gt;&lt;/th&gt;\n        &lt;th class=\"shrink\"&gt;\n            &lt;div class=\"pull-right\"&gt;\n                &lt;button type=\"button\" class=\"btn btn-secondary btn-fa\"&gt;\n                    &lt;i class=\"fa fa-columns\"&gt;&lt;/i&gt;\n                &lt;/button&gt;\n                &lt;button type=\"button\" class=\"btn btn-secondary btn-fa\"&gt;\n                    &lt;i class=\"fa fa-filter\"&gt;&lt;/i&gt;\n                &lt;/button&gt;\n            &lt;/div&gt;\n        &lt;/th&gt;\n    &lt;/tr&gt;\n&lt;/thead&gt;\n&lt;tbody&gt;\n    &lt;tr ng-repeat=\"content in data\"&gt;\n        &lt;td&gt;\n            &lt;div class=\"bmg-checkbox\"&gt;\n                &lt;input type=\"checkbox\" id=\"row-&#123;&#123;$index&#125;&#125;\"/&gt;\n                &lt;label for=\"row-&#123;&#123;$index&#125;&#125;\"&gt;&lt;div&gt;&lt;/div&gt;&lt;/label&gt;\n            &lt;/div&gt;\n        &lt;/td&gt;\n        &lt;td&gt;&#123;&#123; content.a &#125;&#125;&#123;&#123; $index &#125;&#125;&lt;/td&gt;\n        &lt;td&gt;&#123;&#123; content.b &#125;&#125;&#123;&#123; $index &#125;&#125;&lt;/td&gt;\n        &lt;td&gt;&#123;&#123; content.c &#125;&#125;&#123;&#123; $index &#125;&#125;&lt;/td&gt;\n        &lt;td&gt;\n            &lt;div class=\"pull-right\"&gt;\n                &lt;button type=\"button\" class=\"btn btn-primary btn-fa\"&gt;\n                    &lt;i class=\"fa fa-pencil\"&gt;&lt;/i&gt;\n                &lt;/button&gt;\n            &lt;/div&gt;\n        &lt;/td&gt;\n    &lt;/tr&gt;\n&lt;/tbody&gt;\n&lt;/table&gt;</code></pre>\n                    </div>\n                    <hr>\n                    For fixed table header:\n                    <pre><code class=\"JavaScript\">&#36;(\'table#table-id\').floatThead({\n    scrollingTop: function(&#36;table) {\n        return &#36;table.top = 75;\n    }\n});</code></pre>\n                    <div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"http://mkoryak.github.io/floatThead/\">floatThead</a></div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- Datepicker -->\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"page-header\">\n                <h1 id=\"datepicker\">Datepicker</h1>\n            </div>\n            <div class=\"row\" data-ng-controller=\"DatepickerController as datepickerCtrl\">\n                <div class=\"col-lg-4\">\n                    <p class=\"input-group\">\n                        <input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"{{datepickerCtrl.format}}\"\n                               ng-model=\"datepickerCtrl.dt\" is-open=\"datepickerCtrl.popup.opened\"\n                               datepicker-options=\"datepickerCtrl.dateOptions\" ng-required=\"true\"\n                               close-text=\"Close\"\n                               popup-placement=\"auto top bottom\" />\n                        <span class=\"input-group-btn\">\n                            <button type=\"button\" class=\"btn btn-default shrink\" ng-click=\"datepickerCtrl.open()\">\n                                <i class=\"color-primary fa fa-calendar\"></i>\n                            </button>\n                        </span>\n                    </p>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-12\">\n                    <pre><code class=\"html\">&lt;p class=\"input-group\"&gt;\n    &lt;input type=\"text\" class=\"form-control\" uib-datepicker-popup=\"&#123;&#123;datepickerCtrl.format&#125;&#125;\" ng-model=\"datepickerCtrl.date\" is-open=\"datepickerCtrl.popup.opened\"\n           datepicker-options=\"datepickerCtrl.dateOptions\" ng-required=\"true\" close-text=\"Close\" popup-placement=\"auto top bottom\" /&gt;\n    &lt;span class=\"input-group-btn\"&gt;\n        &lt;button type=\"button\" class=\"btn btn-default shrink\" ng-click=\"datepickerCtrl.open()\"&gt;\n            &lt;i class=\"color-primary fa fa-calendar\"&gt;&lt;/i&gt;\n        &lt;/button&gt;\n    &lt;/span&gt;\n&lt;/p&gt;</code></pre>\n                    <div class=\"dependency-warning\"><i class=\"fa fa-exclamation-triangle color-warning\"></i> Dependency: <a href=\"https://angular-ui.github.io/bootstrap/\">angular-bootstrap</a></div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- Activities -->\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"page-header\">\n                <h1 id=\"activities\">Activities</h1>\n            </div>\n            <div class=\"row\" style=\"margin-top: 50px;\">\n                <div class=\"col-lg-12\">\n                    <table class=\"table table-hover table-activities\">\n                        <tbody>\n                        <tr class=\"activity\">\n                            <td style=\"width: 80px;\">\n                                <span class=\"fa-stack fa-lg\">\n                                    <i class=\"fa fa-circle fa-stack-2x color-default\"></i>\n                                    <i class=\"fa fa-pencil fa-stack-1x fa-inverse\"></i>\n                                </span>\n                            </td>\n                            <td><strong>Miss Moneypenny</strong> edited mission data</td>\n                            <td class=\"meta-info-time\">4 hours ago</td>\n                        </tr>\n                        <tr class=\"activity\">\n                            <td>\n                                <span class=\"fa-stack fa-lg\">\n                                    <i class=\"fa fa-circle fa-stack-2x color-success\"></i>\n                                    <i class=\"fa fa-check fa-stack-1x fa-inverse\"></i>\n                                </span>\n                            </td>\n                            <td>\n                                <strong>James Bond</strong> exported mission data\n                            </td>\n                            <td class=\"meta-info-time\">3 hours ago</td>\n                        </tr>\n                        <tr class=\"activity\">\n                            <td>\n                                <span class=\"fa-stack fa-lg\">\n                                    <i class=\"fa fa-circle fa-stack-2x color-secondary\"></i>\n                                    <i class=\"fa fa-trash fa-stack-1x fa-inverse\"></i>\n                                </span>\n                            </td>\n                            <td><strong>James Bond</strong> deleted mission data</td>\n                            <td class=\"meta-info-time\">3 hours ago</td>\n                        </tr>\n                        <tr class=\"activity\">\n                            <td>\n                                <span class=\"fa-stack fa-lg\">\n                                    <i class=\"fa fa-circle fa-stack-2x color-error\"></i>\n                                    <i class=\"fa fa-times fa-stack-1x fa-inverse\"></i>\n                                </span>\n                            </td>\n                            <td> Mission failed!</td>\n                            <td class=\"meta-info-time\">20 minutes ago</td>\n                        </tr>\n                        </tbody>\n                    </table>\n                    <br>\n                    <pre><code class=\"html\">&lt;table class=\"table table-hover table-activities\"&gt;\n    &lt;tbody&gt;\n        &lt;tr class=\"activity\"&gt;\n            &lt;td style=\"width: 80px;\"&gt;\n                &lt;span class=\"fa-stack fa-lg\"&gt;\n                    &lt;i class=\"fa fa-circle fa-stack-2x color-default\"&gt;&lt;/i&gt;\n                    &lt;i class=\"fa fa-pencil fa-stack-1x fa-inverse\"&gt;&lt;/i&gt;\n                &lt;/span&gt;\n            &lt;/td&gt;\n            &lt;td&gt;&lt;strong&gt;Keywords / username&lt;/strong&gt; a description text&lt;/td&gt;\n            &lt;td class=\"meta-info-time\"&gt;4 hours ago&lt;/td&gt;\n        &lt;/tr&gt;\n        &lt;!-- [...] --&gt;\n    &lt;/tbody&gt;\n&lt;/table&gt;</code></pre>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- Filter -->\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"page-header\">\n                <h1 id=\"filter\">Filter</h1>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-12\">\n                    <div class=\"filter\">\n                        <i class=\"fa fa-plus-circle color-info\"></i>\n                        Filter with a long long long long long long text!\n                        <button type=\"button\" class=\"close\"><span>&times;</span>\n                        </button>\n                    </div>\n                    <div class=\"filter\">\n                        <i class=\"fa fa-minus-circle color-error\"></i>\n                        Nobody will build a filter!\n                        <button type=\"button\" class=\"close\"><span aria-hidden=\"true\">&times;</span>\n                        </button>\n                    </div>\n                    <br>\n                    <br>\n                    <pre><code class=\"html\">&lt;div class=\"filter\"&gt;\n    &lt;i class=\"fa fa-plus-circle color-info\"&gt;&lt;/i&gt; Filter text\n    &lt;button type=\"button\" class=\"close\"&gt;&lt;span&gt;&#38;times;&lt;/span&gt;&lt;/button&gt;\n&lt;/div&gt;</code></pre>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- /container -->\n\n<script>\n    jQuery(document).ready(function() {\n        $(\'input[type=file]\').bootstrapFileInput();\n\n        $(\'pre code\').each(function(i, block) {\n            hljs.highlightBlock(block);\n        });\n\n        $(\'table#tableStandard\').floatThead({\n            top: function($table) {\n                return $table.top = 75;\n            }\n        });\n\n        $(\'table#tableCondensed\').floatThead({\n            top: function($table) {\n                return $table.top = 75;\n            }\n        });\n    });\n</script>\n");
$templateCache.put("app/templates/myModalContent.html","<div class=\"modal-header\">\n    <h2 class=\"modal-title\">Create Deal</h2>\n</div>\n<div class=\"modal-body\">\n    <uib-tabset active=\"activeJustified\" justified=\"true\" template-url=\"\">\n        <uib-tab index=\"0\" heading=\"Common\">\n            <uib-tab-heading>\n                <div class=\"number-circle\">1</div> Common</h5>\n            </uib-tab-heading>\n            <div class=\"form-group has-success has-feedback\">\n                <label for=\"deal\">Deal</label>\n                <input type=\"text\" class=\"form-control\" id=\"deal\" placeholder=\"Deal\">\n                <span class=\"fa fa-check form-control-feedback\"></span>\n            </div>\n        </uib-tab>\n        <uib-tab index=\"1\">\n            <uib-tab-heading>\n                <span class=\"number-circle\">2</span> Financial\n            </uib-tab-heading>\n            Financial data...\n        </uib-tab>\n        <uib-tab index=\"2\" heading=\"People\">\n            <uib-tab-heading>\n                <span class=\"number-circle\">3</span> People\n            </uib-tab-heading>\n            People data...\n        </uib-tab>\n    </uib-tabset>\n</div>\n<div class=\"modal-footer\">\n    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">Create</button>\n    <button class=\"btn btn-secondary\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n</div>\n");
$templateCache.put("app/templates/myModalContentWithAForm.html","<div class=\"modal-header\">\n    <h2 class=\"modal-title\">Create Deal</h2>\n</div>\n<div class=\"modal-body\">\n    <form name=\"outerForm\" class=\"tab-form-demo\">\n        <uib-tabset active=\"activeForm\" justified=\"true\">\n            <uib-tab index=\"0\">\n                <uib-tab-heading>\n                    <span class=\"number-circle\">1</span> Common\n                </uib-tab-heading>\n                <ng-form name=\"nestedForm\">\n                    <div class=\"form-group\">\n                        <label>Name</label>\n                        <input type=\"text\" class=\"form-control\" required ng-model=\"model.name\"/>\n                    </div>\n                </ng-form>\n            </uib-tab>\n            <uib-tab index=\"1\"  >\n                <uib-tab-heading>\n                    <span class=\"number-circle\">2</span> Financial\n                </uib-tab-heading>\n                Financial data...\n            </uib-tab>\n            <uib-tab index=\"2\">\n                <uib-tab-heading>\n                    <span class=\"number-circle\">3</span> People\n                </uib-tab-heading>\n                People data...\n            </uib-tab>\n        </uib-tabset>\n    </form>\n</div>\n<div class=\"modal-footer\">\n    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">Create</button>\n    <button class=\"btn btn-secondary\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n</div>\n");
$templateCache.put("app/templates/mySimpleModal.html","<div class=\"modal-close\">\n    <button type=\"button\" class=\"close\" ng-click=\"cancel()\"><i class=\"fa fa-times color-secondary\"></i></button>\n</div>\n<div class=\"modal-header\">\n    <h2 class=\"modal-title\">A simple Modal</h2>\n</div>\n<div class=\"modal-body\">\n    <form>\n        <div class=\"row\">\n            <div class=\"col-lg-4\">\n                <div class=\"form-group\">\n                    <label for=\"firstName\">First Name</label>\n                    <input type=\"text\" class=\"form-control\" id=\"firstName\" placeholder=\"First Name\">\n                </div>\n            </div>\n            <div class=\"col-lg-4\">\n                <div class=\"form-group\">\n                    <label for=\"secondName\">Second Name</label>\n                    <input type=\"text\" class=\"form-control\" id=\"secondName\" placeholder=\"Second Name\">\n                </div>\n            </div>\n                <div class=\"col-lg-4\">\n                    <div class=\"form-group\">\n                    <label for=\"lastName\">Last Name</label>\n                    <input type=\"text\" class=\"form-control\" id=\"lastName\" placeholder=\"Last Name\">\n                </div>\n            </div>\n        </div>\n    </form>\n    <hr>\n    Any other content you need...\n</div>\n<div class=\"modal-footer\">\n    <hr>\n    <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">Create</button>\n    <button class=\"btn btn-secondary\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n</div>\n");
$templateCache.put("app/templates/nav.html","<nav class=\"navbar navbar-default navbar-fixed-top\">\n    <div class=\"container-fluid\">\n        <!-- Brand and toggle get grouped for better mobile display -->\n        <div class=\"navbar-header\">\n            <a ng-click=\"appCtrl.openAside(\'left\', true)\"><i class=\"fa fa-th pull-left app-aside-left\"></i></a>\n            <a class=\"navbar-brand\" href=\".\" target=\"_self\">\n                <img src=\"images/bmg_logo.png\" alt=\"\">\n                <span class=\"navbar-brand-appname\">UI-Kit</span>\n            </a>\n            <!-- Collapsed: Menu button -->\n            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bmg-navbar-collapsed\" ng-click=\"appCtrl.isCollapsed = !appCtrl.isCollapsed\">\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </button>\n            <!-- /Collapsed: Menu button -->\n        </div>\n\n        <!-- Collect the nav links, forms, and other content for toggling -->\n        <div class=\"collapse navbar-collapse\" id=\"bmg-navbar-collapsed\" uib-collapse=\"appCtrl.isCollapsed\">\n            <ul class=\"nav navbar-nav navbar-left\">\n                <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index\"><i class=\"fa fa-map-o\"></i><span>Overview</span></a></li>\n                <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"release-detailpage\"><i class=\"fa fa-search\"></i><span>Detail</span></a></li>\n                <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"release-list\"><i class=\"fa fa-list\"></i><span>List</span></a></li>\n            </ul>\n            <ul class=\"nav navbar-nav navbar-right\">\n                <li class=\"dropdown\" uib-dropdown>\n                    <a href=\"#\" uib-dropdown-toggle>\n                        <i class=\"fa fa-bookmark-o fa-lg\"></i>\n                        <i class=\"fa fa-caret-down\"></i>\n                    </a>\n                    <ul class=\"dropdown-menu\" uib-dropdown-menu>\n                        <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index.grid\">Grid</a></li>\n                        <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index.typography\">Typography</a></li>\n                        <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index.colors\">Colors</a></li>\n                        <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index.buttons\">Buttons</a></li>\n                        <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index.button-group\">Button Group</a></li>\n                        <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index.button-dropdown\">Button Dropdown</a></li>\n                        <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index.pagination\">Pagination</a></li>\n                        <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index.form\">Form / Input Group</a></li>\n                        <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index.checkbox-slider\">Checkbox / Slider</a></li>\n                        <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index.status\">Status</a></li>\n                        <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index.modal\">Modal</a></li>\n                        <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index.slide\">Slide Navigation</a></li>\n                        <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index.alerts\">Alerts</a></li>\n                        <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index.table\">Table</a></li>\n                        <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index.datepicker\">Datepicker</a></li>\n                        <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index.activities\">Activities</a></li>\n                        <li ui-sref-active=\"active\" ng-click=\"appCtrl.isCollapsed = true\"><a ui-sref=\"index.filter\">Filter</a></li>\n                    </ul>\n                </li>\n            </ul>\n        </div>\n        <!-- /.navbar-collapse -->\n    </div>\n    <!-- /.container-fluid -->\n</nav>\n\n");
$templateCache.put("app/templates/examples/grid.html","<div class=\"body-header\">\n    <div class=\"container\">\n        <div class=\"row vertical-center\">\n            <div class=\"col-lg-6\">\n                <h2><strong>Grid example</strong></h2>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-lg-12\">\n            <div class=\"panel panel-default panel-first panel-example\">col 12</div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-lg-6\">\n            <div class=\"panel panel-default panel-example\">col 6</div>\n        </div>\n        <div class=\"col-lg-6\">\n            <div class=\"panel panel-default panel-example\">col 6</div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-lg-4\">\n            <div class=\"panel panel-default panel-example\">col 4</div>\n        </div>\n        <div class=\"col-lg-4\">\n            <div class=\"panel panel-default panel-example\">col 4</div>\n        </div>\n        <div class=\"col-lg-4\">\n            <div class=\"panel panel-default panel-example\">col 4</div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-lg-3\">\n            <div class=\"panel panel-default panel-example\">col 3</div>\n        </div>\n        <div class=\"col-lg-3\">\n            <div class=\"panel panel-default panel-example\">col 3</div>\n        </div>\n        <div class=\"col-lg-3\">\n            <div class=\"panel panel-default panel-example\">col 3</div>\n        </div>\n        <div class=\"col-lg-3\">\n            <div class=\"panel panel-default panel-example\">col 3</div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-lg-2\">\n            <div class=\"panel panel-default panel-example\">col 2</div>\n        </div>\n        <div class=\"col-lg-2\">\n            <div class=\"panel panel-default panel-example\">col 2</div>\n        </div>\n        <div class=\"col-lg-2\">\n            <div class=\"panel panel-default panel-example\">col 2</div>\n        </div>\n        <div class=\"col-lg-2\">\n            <div class=\"panel panel-default panel-example\">col 2</div>\n        </div>\n        <div class=\"col-lg-2\">\n            <div class=\"panel panel-default panel-example\">col 2</div>\n        </div>\n        <div class=\"col-lg-2\">\n            <div class=\"panel panel-default panel-example\">col 2</div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n        <div class=\"col-lg-1\">\n            <div class=\"panel panel-default panel-example\">col 1</div>\n        </div>\n    </div>\n</div>");
$templateCache.put("app/templates/examples/release-detailpage.html","<div class=\"panel panel-default\">\n    <div class=\"panel-heading panel-heading-with-actions\">\n        <div class=\"row vertical-center\">\n            <div class=\"col-lg-4 button-with-headline\">\n                <button type=\"button\" class=\"btn btn-default btn-circle pull-left\">\n                    <i class=\"fa fa-chevron-left\"></i>\n                </button>\n                <h5><strong>Edit Project</strong> Moby beautiful</h5>\n            </div>\n            <div class=\"col-lg-4\">\n                <div class=\"progress-status pull-right\">\n                    <div class=\"progress-display-status\">\n                        <div class=\"status-line\"></div>\n                        <div class=\"status-finished\"></div>\n                        <div class=\"status-finished\"></div>\n                        <div class=\"status-active\">3</div>\n                        <div class=\"status-open\"></div>\n                    </div>\n                    <div class=\"status-percentage\">50&#37;<span class=\"status-percentage-text\">complete</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-lg-4\">\n                <div class=\"actions\">\n                    <button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-share-square-o\"></i></button>\n                    <button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-file-pdf-o\"></i></button>\n                    <button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-history\"></i></button>\n                    <button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-gear\"></i></button>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"panel-body-fluid\">\n        <div class=\"row row-with-sidebar\">\n            <div class=\"col-lg-3 sidebar\">\n                <ul class=\"nav nav-sidebar\">\n                    <li class=\"active\"><a href=\"\"><span class=\"fa-stack fa-lg\">\n                                  <i class=\"fa fa-circle fa-stack-2x\"></i>\n                                  <i class=\"fa fa-home fa-stack-1x fa-inverse\"></i>\n                                </span><span class=\"nav-text\">General</span></a></li>\n                    <li><a href=\"\"><span class=\"fa-stack fa-lg\">\n                                  <i class=\"fa fa-circle fa-stack-2x\"></i>\n                                  <i class=\"fa fa-sitemap fa-stack-1x fa-inverse\"></i>\n                                </span><span class=\"nav-text\">Structure</span></a></li>\n                    <li><a href=\"\"><span class=\"fa-stack fa-lg\">\n                                  <i class=\"fa fa-circle fa-stack-2x\"></i>\n                                  <i class=\"fa fa-legal fa-stack-1x fa-inverse\"></i>\n                                </span><span class=\"nav-text\">Rights</span></a></li>\n                    <li><a href=\"\"><span class=\"fa-stack fa-lg\">\n                                  <i class=\"fa fa-circle fa-stack-2x\"></i>\n                                  <i class=\"fa fa-globe fa-stack-1x fa-inverse\"></i>\n                                </span><span class=\"nav-text\">Split Ownership</span></a></li>\n                    <li><a href=\"\"><span class=\"fa-stack fa-lg\">\n                                  <i class=\"fa fa-circle fa-stack-2x\"></i>\n                                  <i class=\"fa fa-globe fa-stack-1x fa-inverse\"></i>\n                                </span><span class=\"nav-text\">Exploration</span></a></li>\n                    <li><a href=\"\"><span class=\"fa-stack fa-lg\">\n                                  <i class=\"fa fa-circle fa-stack-2x\"></i>\n                                  <i class=\"fa fa-map-marker fa-stack-1x fa-inverse\"></i>\n                                </span><span class=\"nav-text\">Local Data</span></a></li>\n                    <li><a href=\"\"><span class=\"fa-stack fa-lg\">\n                                  <i class=\"fa fa-circle fa-stack-2x\"></i>\n                                  <i class=\"fa fa-group fa-stack-1x fa-inverse\"></i>\n                                </span><span class=\"nav-text\">Contributors</span></a></li>\n                    <li><a href=\"\"><span class=\"fa-stack fa-lg\">\n                                  <i class=\"fa fa-circle fa-stack-2x\"></i>\n                                  <i class=\"fa fa-microphone fa-stack-1x fa-inverse\"></i>\n                                </span><span class=\"nav-text\">Recordings</span></a></li>\n                    <li><a href=\"\"><span class=\"fa-stack fa-lg\">\n                                  <i class=\"fa fa-circle fa-stack-2x\"></i>\n                                  <i class=\"fa fa-archive fa-stack-1x fa-inverse\"></i>\n                                </span><span class=\"nav-text\">Packages</span></a></li>\n                    <li><a href=\"\"><span class=\"fa-stack fa-lg\">\n                                  <i class=\"fa fa-circle fa-stack-2x\"></i>\n                                  <i class=\"fa fa-briefcase fa-stack-1x fa-inverse\"></i>\n                                </span><span class=\"nav-text\">Projects</span></a></li>\n                    <li><a href=\"\"><span class=\"fa-stack fa-lg\">\n                                  <i class=\"fa fa-circle fa-stack-2x\"></i>\n                                  <i class=\"fa fa-link fa-stack-1x fa-inverse\"></i>\n                                </span><span class=\"nav-text\">Assets</span></a></li>\n                </ul>\n            </div>\n            <div class=\"col-lg-9 sidebar-content\" data-ng-controller=\"XEditableController as xEditableCtrl\">\n                <div class=\"form-horizontal x-editable-form\">\n\n                    <h5>Header</h5>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Site</div>\n                        <div class=\"col-lg-4\"><a href=\"#\" editable-select=\"xEditableCtrl.site.value\"\n                                                 e-ng-options=\"s.value as s.text for s in xEditableCtrl.data.sites\">{{\n                            xEditableCtrl.showSites() }}</a></div>\n                        <div class=\"col-lg-2 text-right\">Barcode</div>\n                        <div class=\"col-lg-4\"><a href=\"#\" editable-text=\"xEditableCtrl.data.barcode\">{{\n                            xEditableCtrl.data.barcode }}</a></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Package</div>\n                        <div class=\"col-lg-4\">N/a</div>\n                        <div class=\"col-lg-2 text-right\">GRID</div>\n                        <div class=\"col-lg-4\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Product Code</div>\n                        <div class=\"col-lg-4\"><a href=\"#\" editable-text=\"xEditableCtrl.data.productCode\">{{\n                            xEditableCtrl.data.productCode }}</a></div>\n                        <div class=\"col-lg-2 text-right\">Alt. Product Codes</div>\n                        <div class=\"col-lg-4\"><a href=\"#\" editable-text=\"xEditableCtrl.data.altProductCode\">{{\n                            xEditableCtrl.data.altProductCode }}</a></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Display Artist Name</div>\n                        <div class=\"col-lg-10\"><a href=\"#\" editable-text=\"xEditableCtrl.data.artistName\">{{\n                            xEditableCtrl.data.artistName}}</a></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Product Title</div>\n                        <div class=\"col-lg-10\">Peggy the Pistol/Hogs Are a Coming</div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Title</div>\n                        <div class=\"col-lg-10\"><a href=\"#\" editable-text=\"xEditableCtrl.data.title\">{{\n                            xEditableCtrl.data.title }}</a></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Version Title</div>\n                        <div class=\"col-lg-10\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Internal Version Title</div>\n                        <div class=\"col-lg-10\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Format</div>\n                        <div class=\"col-lg-4\">Vinyl Single Standard 7\" (Double Sided)</div>\n                        <div class=\"col-lg-2 text-right\">Duration</div>\n                        <div class=\"col-lg-4\">00:00:00</div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\"># Tracks</div>\n                        <div class=\"col-lg-4\">0</div>\n                        <div class=\"col-lg-2 text-right\"># Tracks by BMG</div>\n                        <div class=\"col-lg-4\">0</div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Release Date</div>\n                        <div class=\"col-lg-4\">09-Sep-1999</div>\n                        <div class=\"col-lg-2 text-right\">Release date is tentative</div>\n                        <div class=\"col-lg-4\">No</div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Repertoire Owner</div>\n                        <div class=\"col-lg-4\">Mute Records Ltd., a BMG Company</div>\n                        <div class=\"col-lg-2 text-right\">Label</div>\n                        <div class=\"col-lg-4\">Mute, a BMG Company</div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2\"></div>\n                        <div class=\"col-lg-4\"></div>\n                        <div class=\"col-lg-2 text-right\">GVL Label Code</div>\n                        <div class=\"col-lg-4\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Genre</div>\n                        <div class=\"col-lg-4\"></div>\n                        <div class=\"col-lg-2 text-right\">Alt. Genre</div>\n                        <div class=\"col-lg-4\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Advisory Content</div>\n                        <div class=\"col-lg-4\">Clean</div>\n                        <div class=\"col-lg-2 text-right\">Advisory Lyrics</div>\n                        <div class=\"col-lg-4\">Not Applicable</div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Contractual Rights</div>\n                        <div class=\"col-lg-4\"></div>\n                        <div class=\"col-lg-2 text-right\">Release Intent</div>\n                        <div class=\"col-lg-4\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Promo</div>\n                        <div class=\"col-lg-4\">No</div>\n                        <div class=\"col-lg-2 text-right\"># Promo Units</div>\n                        <div class=\"col-lg-4\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Mech. Licenses</div>\n                        <div class=\"col-lg-4\">Show Licenses</div>\n                        <div class=\"col-lg-2 text-right\">Includes Booklet</div>\n                        <div class=\"col-lg-4\">No</div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Compilation</div>\n                        <div class=\"col-lg-4\">No</div>\n                        <div class=\"col-lg-2 text-right\">Partial</div>\n                        <div class=\"col-lg-4\">No</div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Soundtrack</div>\n                        <div class=\"col-lg-4\">No</div>\n                        <div class=\"col-lg-2 text-right\">Metadata Lang.</div>\n                        <div class=\"col-lg-4\">English</div>\n                    </div>\n\n                    <hr>\n                    <h5>Ownership</h5>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Ownership Type</div>\n                        <div class=\"col-lg-4\"></div>\n                        <div class=\"col-lg-2 text-right\">Remaster</div>\n                        <div class=\"col-lg-4\">No</div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Copyright Year</div>\n                        <div class=\"col-lg-4\"></div>\n                        <div class=\"col-lg-2 text-right\">Orig. Copyright Year</div>\n                        <div class=\"col-lg-4\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Copyright Owner</div>\n                        <div class=\"col-lg-10\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Copyright Notice</div>\n                        <div class=\"col-lg-10\">Mute Records Ltd., a BMG Company, under exclusive license to [PIAS] UK\n                            Ltd\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Artwork Year</div>\n                        <div class=\"col-lg-4\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Artwork Owner</div>\n                        <div class=\"col-lg-10\"></div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Artwork Notice</div>\n                        <div class=\"col-lg-10\">Mute Records Ltd., a BMG Company, under exclusive license to [PIAS] UK\n                            Ltd\n                        </div>\n                    </div>\n\n                    <hr>\n                    <h5>Other</h5>\n\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Prod. Manager</div>\n                        <div class=\"col-lg-4\">Unknown at Data Takeon</div>\n                        <div class=\"col-lg-2 text-right\">LC Coordinator</div>\n                        <div class=\"col-lg-4\">Unknown at Data Takeon</div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"col-lg-2 text-right\">Notes &amp; Comments</div>\n                        <div class=\"col-lg-10\">Purchased as part of Mute Catalogue - Not Re-Delivered to market.</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("app/templates/examples/release-list.html","<div class=\"body-header\">\n    <div class=\"container\">\n        <div class=\"row vertical-center\">\n            <div class=\"col-lg-6\">\n                <h1>Products</h1>\n            </div>\n            <div class=\"col-lg-6\">\n                <div class=\"pull-right\" data-ng-controller=\"TableController as tableCtrl\">\n                    <button type=\"button\" class=\"btn btn-primary\">Create</button>\n                    <button type=\"button\" class=\"btn btn-secondary btn-fa\" ng-click=\"tableCtrl.openFilterColAside(\'right\', true)\"><i class=\"fa fa-list\"></i></button>\n                    <button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-times\"></i></button>\n                    <button type=\"button\" class=\"btn btn-secondary btn-fa\"><i class=\"fa fa-file-pdf-o\"></i></button>\n                    <button type=\"button\" class=\"btn btn-secondary btn-fa\" ng-click=\"tableCtrl.openFilterAside(\'right\', true)\"><i class=\"fa fa-filter\"></i></button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"panel\" data-ng-controller=\"TableController as tableCtrl\">\n    <table id=\"table1\" class=\"table table-hover\">\n        <thead>\n            <tr>\n                <th ng-show=\"tableCtrl.filterCol.status\">\n                    Status\n                    <a ng-click=\"tableCtrl.sortType = \'status\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'status\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'status\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n                <th ng-show=\"tableCtrl.filterCol.song\">\n                    Song\n                    <a ng-click=\"tableCtrl.sortType = \'song\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'song\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'song\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n                <th ng-show=\"tableCtrl.filterCol.statusKey\">\n                    Status Key\n                    <a ng-click=\"tableCtrl.sortType = \'statusKey\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'statusKey\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'statusKey\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n                <th ng-show=\"tableCtrl.filterCol.artist\">\n                    Artist\n                    <a ng-click=\"tableCtrl.sortType = \'artist\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'artist\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'artist\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n                <th ng-show=\"tableCtrl.filterCol.title\">\n                    Title\n                    <a ng-click=\"tableCtrl.sortType = \'title\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'title\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'title\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n                <th ng-show=\"tableCtrl.filterCol.versionTitle\">\n                    Version Title\n                    <a ng-click=\"tableCtrl.sortType = \'versionTitle\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'versionTitle\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'versionTitle\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n                <th ng-show=\"tableCtrl.filterCol.publisher\">\n                    Publisher\n                    <a ng-click=\"tableCtrl.sortType = \'publisher\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'publisher\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'publisher\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n                <th ng-show=\"tableCtrl.filterCol.format\">\n                    Format\n                    <a ng-click=\"tableCtrl.sortType = \'format\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'format\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'format\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n                <th ng-show=\"tableCtrl.filterCol.releaseDate\">\n                    Release Date\n                    <a ng-click=\"tableCtrl.sortType = \'releaseDate\'\">\n                        <i ng-if=\"!tableCtrl.sort(\'releaseDate\')\" class=\"fa fa-sort\"></i>\n                        <i ng-if=\"tableCtrl.sort(\'releaseDate\')\" ng-click=\"tableCtrl.tSortDir()\"\n                           class=\"fa\" ng-class=\"tableCtrl.sortReverse ? \'fa-caret-up\' : \'fa-caret-down\'\"></i>\n                    </a>\n                </th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr ng-repeat=\"content in tableCtrl.bigData | orderBy:tableCtrl.sortType:tableCtrl.sortReverse\">\n                <td ng-show=\"tableCtrl.filterCol.status\">\n                    <span ng-if=\"content.status\">\n                        <span class=\"fa-stack fa-lg scale-6\">\n                            <i class=\"fa fa-circle-thin fa-stack-2x color-success\"></i>\n                            <i class=\"fa fa-check fa-stack-1x color-success\"></i>\n                        </span>\n                    </span>\n                    <span ng-if=\"!content.status\">\n                        <span class=\"fa-stack fa-lg scale-6\">\n                            <i class=\"fa fa-circle-thin fa-stack-2x color-error\"></i>\n                            <i class=\"fa fa-exclamation fa-stack-1x color-error\"></i>\n                        </span>\n                    </span>\n                </td>\n                <td ng-show=\"tableCtrl.filterCol.song\">{{content.song}}</td>\n                <td ng-show=\"tableCtrl.filterCol.statusKey\">{{content.statusKey}}</td>\n                <td ng-show=\"tableCtrl.filterCol.artist\">{{content.artist}}</td>\n                <td ng-show=\"tableCtrl.filterCol.title\">{{content.title}}</td>\n                <td ng-show=\"tableCtrl.filterCol.versionTitle\">{{content.versionTitle}}</td>\n                <td ng-show=\"tableCtrl.filterCol.publisher\">{{content.publisher}}</td>\n                <td ng-show=\"tableCtrl.filterCol.format\">{{content.format}}</td>\n                <td ng-show=\"tableCtrl.filterCol.releaseDate\">{{content.releaseDate}}</td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n\n<script>\n    jQuery(document).ready(function() {\n        var $table = $(\'table#table1\');\n        $table.floatThead({\n            scrollingTop: function($table) {\n                return $table.top = 75;\n            }\n        });\n    });\n</script>");}]);
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
                templateUrl: 'app/templates/filter-aside.html',
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
                        $uibModalInstance.dismiss();
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
                templateUrl: 'app/templates/filter-col-aside.html',
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
                        $uibModalInstance.dismiss();
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
(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .controller('XEditableController', XEditableController);

    XEditableController.$inject = ['$filter'];

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

})(angular);
(function(angular) {
    'use strict';

    angular.module('bmg-ui.docs')
        .run(xeditableRun);

    xeditableRun.$inject = ['editableOptions', 'editableThemes'];

    function xeditableRun(editableOptions, editableThemes) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary"><i class="fa fa-check"></i></button>';
        editableThemes['bs3'].cancelTpl = '<button type="button" class="btn btn-secondary" ng-click="$form.$cancel()"><i class="fa fa-times"></i></button>';
    }

})(angular);