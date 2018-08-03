angular.module('file').controller('FileController', ['$scope',
    '$routeParams', '$location', 'Authentication', 'File',
    function ($scope, $routeParams, $location, Authentication, File) {
        $scope.authentication = Authentication;
        $scope.create = function () {
            var file = new File({
                title: this.title,
                content: this.content
            });
            file.$save(function (response) {
                $location.path('file/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        $scope.find = function () {
            $scope.file = File.query();
        };
        $scope.findOne = function () {
            $scope.file = File.get({
                fildId: $routeParams.fileId
            });
        };
        $scope.update = function () {
            $scope.file.$update(function () {
                $location.path('file/' + $scope.file._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        $scope.delete = function (file) {
            if (file) {
                file.$remove(function () {
                    for (var i in $scope.file) {
                        if ($scope.file[i] === file) {
                            $scope.file.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.file.$remove(function () {
                    $location.path('file');
                });
            }
        };
    }
]);