angular.module('coopEd.tools')
    .directive('smartFloat', function ($filter) {
        var FLOAT_REGEXP = /^(\d{1})(\.\d{4})?$/;

        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (FLOAT_REGEXP.test(viewValue)) {
                        ctrl.$setValidity('float', true);
                        return $filter('number')(parseFloat(viewValue.replace(',', '')), 4);
                    } else {
                        ctrl.$setValidity('float', false);
                        return parseFloat(viewValue.replace(',', ''));
                    }
                });

                ctrl.$formatters.unshift(
                   function (modelValue) {
                       return $filter('number')(parseFloat(modelValue), 4);
                   }
               );
            }
        };
    });