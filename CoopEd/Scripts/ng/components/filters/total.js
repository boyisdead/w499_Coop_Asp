﻿angular.module('coopEd.filters')
    .filter('total', function () {
        return function (data, key) {
            if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
                return 0;
            }

            var sum = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                if (data[i][key] != null)
                    sum += parseFloat(data[i][key]);
            }

            return sum;
        };
    })