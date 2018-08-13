angular.module('file')
.config(['$routeProvider',function ($routeProvider) {
        $routeProvider.
        when('/file', {
            templateUrl: 'file/views/list-file.client.view.html',
            controller:'FileController'
        }).
        when('/file/create', {
            templateUrl: 'file/views/create-file.client.view.html',
            controller:'FileController'
        }).
        when('/file/:fileId', {
            templateUrl: 'file/views/view-file.client.view.html',
            controller:'FileController'
        }).
        when('/file/:fileId/edit', {
            templateUrl: 'file/views/edit-file.client.view.html',
            controller:'FileController'
        });
        
}]);