(function(){
    'use strict';
 
    angular
        .module('app.player')
        .factory('PlayerService', PlayerService);
 
    function PlayerService(){
        var service = {
            newPlayer: newPlayer
        };
 
        /////////////
 
        function Player(playerName, initialScore) {
            this.score = initialScore;
            this.initialScore = initialScore;
            this.name = playerName;
        }
 


 
        Player.prototype.changeScore = function(amountToChange){
            if(!angular.isDefined(this.score)){
                this.score = this.initialScore;
            }
 
            this.score += amountToChange;
        };
 
        Player.prototype.resetScore = function () {
            this.score = this.initialScore;
        };
 


        function newPlayer(playerName, initialScore) {
            var player = new Player(playerName, initialScore);
            return player;
        }
 
        return service;
    }
})();