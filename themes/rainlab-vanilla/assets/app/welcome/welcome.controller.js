(function() {
    'use strict';

    angular
        .module('app.welcome')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['$timeout', '$firebaseArray', 'CardService'];

    /* @ngInject */
    function WelcomeController($timeout, $firebaseArray, CardService) {
        var vm = this;
        vm.title = 'WelcomeController';

        activate();

        ////////////////

        function activate() {

            vm.init = function () {};

            vm.start = function () {};

            vm.deal = function () {};

            vm.end = function () {};

            vm.reset = function () {};
        }
    }
})();