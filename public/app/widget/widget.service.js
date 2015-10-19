(function() {
    'use strict';

    angular
        .module('app.widget')
        .factory('WidgetService', WidgetService);

    WidgetService.$inject = ['$timeout', '$firebaseObject'];

    /* @ngInject */
    function WidgetService($timeout, $firebaseObject) {
        var service = {
            test: test
        };
        return service;

        ////////////////

        function test() {
        }
    }
})();