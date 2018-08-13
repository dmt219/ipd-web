angular.module('moderator').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'moderator/views/moderator.client.view.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);