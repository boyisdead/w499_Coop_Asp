studentModule.service('Students', function (requestService) {

        var apiController = 'students';

        return {
            GetAllStudentsNameTH: function (callback) {

                return requestService({
                    verb: 'GET',
                    controller: apiController,
                    endpoint: 'GetAllStudentsNameTH',
                    callback: callback
                })
            },
        };
    })