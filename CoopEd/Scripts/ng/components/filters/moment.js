angular.module('coopEd.filters')
    .filter('moment', function () {
        return function (inputDate, formatter) {
            if (!!inputDate)
                if (typeof formatter == 'string')
                    return moment(inputDate).format(formatter);
                else
                    return moment(inputDate, formatter.Input).format(formatter.Output);
        }
    })