app.controller('appController',
    ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        $rootScope.request = {};

        $rootScope.api = api;

        $rootScope.$on('cfpLoadingBar:started', function (event, data) {

        })
        $rootScope.$on('cfpLoadingBar:loading', function(event, data) {
            $rootScope.request[data.request.method + ':' + data.request.url] = {
                path: data.request.url,
                status: 'pending',
                method: data.request.method
            };
        });
        $rootScope.$on('cfpLoadingBar:loaded', function(event, data) {
            if (!!$rootScope.request[data.result.config.method + ':' + data.result.config.url]) {
                $rootScope.request[data.result.config.method + ':' + data.result.config.url].status = (data.result.status >= 200 && data.result.status < 300 ? 'success' : 'error');
            }
        });
        $rootScope.$on('cfpLoadingBar:completed', function(event, data) {
            $rootScope.request = {};
        });

        $scope.testtest = "Hello";

    }]);