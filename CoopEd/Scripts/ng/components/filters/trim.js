angular.module('coopEd.filters')
    .filter('trim', ['$filter', function ($filter) {
        return function (input) {
            if (!!input) {
                return input.trim();
            }
        };
    }])