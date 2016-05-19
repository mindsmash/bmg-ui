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
            .state('index.sticky', {
                url: "#sticky"
            })
            .state('index.xedit', {
                url: "#xedit"
            })
            .state('index.css', {
                url: "#css"
            })
    }

})(angular);