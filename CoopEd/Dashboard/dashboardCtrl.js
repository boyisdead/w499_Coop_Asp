dashboardModule.controller('dashboardCtrl', ['$scope', 'Students', function ($scope, Students) {

    //$scope.testtest = 'Dashboard';
    $scope.T = 4545;
    Students.GetAllStudentsNameTH(function (studentResult) {
        console.log(studentResult);
        $scope.studentList = studentResult;
    });

}]);