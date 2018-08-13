angular.module('moderator').controller('ModController', ['$scope',
    'Authentication',
    function ($scope, Authentication) {
        $scope.authentication = Authentication;
    }
]);