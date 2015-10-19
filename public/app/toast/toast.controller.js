(function() {
    'use strict';

    angular
        .module('app.toast')
        .controller('ToastController', ToastController);

    ToastController.$inject = ['ngToast', '$interval', '$timeout'];

    /* @ngInject */
    function ToastController(ngToast, $interval, $timeout) {
        var vm = this;
        vm.title = 'ToastController';

        function toast() {
              ngToast.create("Here I am a-flippin'");
            }
            
            $timeout(function() {
              toast();
            }, 0);

            $interval(function() {
              toast();
            }, 2000);




    }
})();