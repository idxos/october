(function() {
    angular
        .module('app.service')
        .factory('PlayerService', PlayerService);

    function PlayerService(){
        var service = {
            newPlayer: newPlayer
        };
        function Player(initialScore, playerName){
            this.initialScore = initialScorel
            this.name = playerName;
            this.score = initialScore;
        }



        Player.prototype.changeScore = function(amountToChange){

        }



        function newPlayer(playerName, initialScore) {
            var player = new Player(playerName, initialScore);
            return player;
        }
    return service;
    }

})();