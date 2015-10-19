(function() {
    'use strict';

    angular
        .module('app.game')
        .controller('GameController', GameController);

    GameController.$inject = ['$timeout', 'window', PlayerService];

    /* @ngInject */
    function GameController($timeout, window, PlayerService) {
        var game = this;
        game.title = 'GameController';
        game.hasStarted = false;


        

        ////////////////

        game.init = function() {

            var resetScoreBoard = function() {
                var getTeam1Points = document.getElementById(team1Points);
                var getTeam2Points = document.getElementById(team2Points);

                innerHTML.team1Points(function() {
                    alert("Reset Scoreboard Function");
                });
            }

        }


        game.startGame = function() {
            game.hasStarted = true;
            alert("game.startGame function just ran!");

            
        }

        vm.init();
    }
})();