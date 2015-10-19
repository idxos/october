(function(){
    'use strict';

    angular
        .module('app.game')
        .directive('charadesGame', charadesGame);

    function charadesGame(){
        return {
            restrict: 'E',
            templateUrl: 'app/game/game.directive.html',
            controller: 'game'
        }
    }
})();
