angular.module('coopEd.filters')
    .filter('jsonDate', function ($filter) {
        return function (input, format) {

            if (input == 'N/A') {
                return 'N/A';
            }

            return $filter('date')(parseInt(input.substr(6)), format);
        };
    })
    .filter("jsDate", function () {
        return function (x) {
            return new Date(parseInt(x.substr(6)));
        };
    });