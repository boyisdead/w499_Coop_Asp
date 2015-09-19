'use strict';

var mainModule = angular.module('CoEdAssistSystem', [

   //core
    'ui.router',
    //'ngAnimate',
    //'googlechart',

    //framework
    'CoEdAssistSystem.services',
    'CoEdAssistSystem.directives',
    'CoEdAssistSystem.filters',

   //app
    'CoEdAssistSystem.dashboard',

   //third party
     //'ngFx',

])

//modules
angular.module('CoEdAssistSystem.services', []);
angular.module('CoEdAssistSystem.directives', []);
angular.module('CoEdAssistSystem.filters', []);

var dashboardModule = angular.module('CoEdAssistSystem.dashboard', []);

mainModule.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("dashboard");

    $stateProvider
        .state('Dashboard', {
            url: "/dashboard",
            templateUrl: "Dashboard/dashboard_page.html",
            controller: function ($scope) {
                $scope.T = 499;
            }
        })
    //.state('Students', {
    //    url: "/students",
    //    templateUrl: "students_page.html",
    //    controller: function ($scope) {
    //        $scope.T = 500;
    //    }
    //})
});
