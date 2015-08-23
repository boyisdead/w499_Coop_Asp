'use strict';

var app = angular.module('coopEd', [

    ////core
    //'ngAnimate',
    //'googlechart',

    ////lib
    //'mgcrea.ngStrap',
    //'angular-loading-bar',
    //'nvd3',
    //'ui.calendar',
    //'angularFileUpload',

    ////framework
    //'coopEd.services',
    //'coopEd.directives',
    //'coopEd.filters',
    //'coopEd.tools',

    //app

])

.config(function ($httpProvider, $sceProvider) {
    $sceProvider.enabled(false);
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $httpProvider.defaults.transformRequest = function(data) {
            if (data === undefined) {
                return data;
            }
            return $.param(data);
    }
})


//modules

//angular.module('coopEd.directives', []);
//angular.module('coopEd.filters', []);
//angular.module('coopEd.services', ['ngResource']);