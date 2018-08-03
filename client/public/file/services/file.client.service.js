angular.module('file').factory('File', ['$resource',
    function ($resource) {
        return $resource('api/file/:fileId', {
            fileId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);