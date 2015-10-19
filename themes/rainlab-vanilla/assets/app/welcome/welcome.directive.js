(function(){
    'use strict';

    angular
        .module('app.welcome')
        .directive('charadesWelcome', charadesWelcome);

    function charadesWelcome(){
        return {
            restrict: 'E',
            templateUrl: 'app/welcome/welcome.directive.html',
            controller: 'WelcomeController'
        }
    }
})();
