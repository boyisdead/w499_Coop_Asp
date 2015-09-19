angular.module('CoEdAssistSystem.services')
    .service('requestService', function ($http, $alert, $rootScope) {
        return function (params) {
            var request = {};
            request.http = $http({
                method: params.verb,
                url: api + '/api/' + params.controller + (params.endpoint ? '/' + params.endpoint : ''),
                params: params.query,
                data: params.body
            }).success(function(data) {
                if (!!params.alerts ? params.alerts : true) {
                    $alert(alerts[params.verb].success);
                }

                console.log(params.endpoint);

                if (!!params.callback) {
                    params.callback(data);
                }
            }).error(function() {
                $alert(alerts[params.verb].error);
            });

            request.hashIndex = params.verb + ':' + api + '/api/' + params.controller + (params.endpoint ? '/' + params.endpoint : '');

            return request;
        }
    })
