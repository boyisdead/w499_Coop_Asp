angular.module('coopEd.filters')
    .filter('periodToDate', function () {
        return function (data) {
            return moment(data, 'YYYYMM').format('MMM YYYY');
        };
    })