var mainModule = angular.module('CoEdAssistSystem', [

   //core
    'ui.router',
    'ui.bootstrap',
    //'ngAnimate',
    //'googlechart',

    //framework
    'CoEdAssistSystem.services',
    //'CoEdAssistSystem.directives',
    //'CoEdAssistSystem.filters',

   //app
    'CoEdAssistSystem.dashboard',
    'CoEdAssistSystem.student',

   //third party
     //'ngFx',

]);

//modules
var appServices = angular.module('CoEdAssistSystem.services', []);
//var appDirectives = angular.module('CoEdAssistSystem.directives', []);
//var appFilters = angular.module('CoEdAssistSystem.filters', []);

var dashboardModule = angular.module('CoEdAssistSystem.dashboard', []);
var studentModule = angular.module('CoEdAssistSystem.student', []);

mainModule.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/dashboard");

    $stateProvider
        .state('Dashboard', {
            url: "/dashboard",
            templateUrl: "Dashboard/dashboard_page.html",
            controller: "dashboardCtrl",
        })
    //.state('Students', {
    //    url: "/students",
    //    templateUrl: "students_page.html",
    //    controller: function ($scope) {
    //        $scope.T = 500;
    //    }
    //})
});

//<script>
//var uri = 'api/products';
//$(document).ready(function () {
//    // Send an AJAX request
//    $.getJSON(uri)
//        .done(function (data) {
//            // On success, 'data' contains a list of products.
//            $.each(data, function (key, item) {
//                // Add a list item for the product.
//                $('<li>', { text: formatItem(item) }).appendTo($('#products'));
//            });
//        });
//});
//</script>