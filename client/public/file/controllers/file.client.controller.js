angular.module('file').controller('FileController', ['$scope',
    '$routeParams', 'Upload', '$timeout', '$location', 'Authentication', 'File',
    function ($scope, $routeParams, Upload, $timeout, $location, Authentication, File) {
        $scope.authentication = Authentication;
        var _id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        $scope.uploadFile = function (file) {
            file.upload = Upload.upload({
                url: '/api/file/' + _id,
                data: {
                    _id: _id,
                    title: $scope.title,
                    content: $scope.content,
                    file: file
                }
            });
            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }

        $scope.find = function () {
            $scope.file = File.query();
        };
        $scope.findOne = function () {
            File.get({
                fileId: $routeParams.fileId
            }).$promise.then(function(file){
                $scope.file=file;
                $scope.download=function(){
                    var anchor = angular.element('<a></a>');
                    var blob = new Blob([file.file]);
                    anchor.attr({
                    href: window.URL.createObjectURL(blob),
                    download: file.originalName  +'.js'
                    })[0].click();
                }
            })
        }
        $scope.update = function () {
            $scope.file.$update(function () {
                $location.path('/api!#/file/' + $scope.file._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        $scope.delete = function(){
            var file = $scope.file;
            console.log($scope.file);
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