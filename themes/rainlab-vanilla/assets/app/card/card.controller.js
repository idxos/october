(function() {
    'use strict';

    angular
        .module('app.card')
        .controller('CardController', CardController);

    CardController.$inject = ['$timeout', '$firebaseArray', 'CardService'];

    /* @ngInject */
    function CardController($timeout, $firebaseArray, CardService) {
        var vm = this;
        vm.title = 'CardController';

        activate();

        ////////////////

        function activate() {

            
        }
    }
})();