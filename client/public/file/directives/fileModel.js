angular.module('file').directive('fileModel', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.fileModel);
        element.on('change', function (event) {
            onChange(scope, {
                $file: event.target.file
            });
        });
    };
    return {
        link: fn_link
    }
}])