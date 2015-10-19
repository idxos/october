(function() {
    'use strict';

    angular
        .module('app.player')
        .controller('PlayerController', PlayerController);

    PlayerController.$inject = [];

    /* @ngInject */
    function PlayerController() {

        var vm = this;
        vm.title = 'PlayerController';


        //  Player Factory
        function Player(name, score, teamName, activePlayer) {
          this.name = name;
          this.score = score;
          this.teamName = teamName;
          this.activePlayer = activePlayer;
        }


        var al = new Player("Allen Thornton", 0, "team1", false);
        var bb = new Player("Bob Barker", 0, "team1", false);
        var dp = new Player("Dolly Parton", 0, "team1", false);
        var rj = new Player("Rick James", 0, "team2", false);
        var gn = new Player("Gary Newman", 0, "team2", false);

        //console.log(al.name + al.score);

        // make a teamPlayer factory.  
        function teamPlayer(teamName, playerName, playerScore) {
          this.teamName = teamName;
          this.playerName = playerName;
          this.playerScore = playerScore;
        }
        // now run our custom data through our Car Factory

        var t1p1 = new teamPlayer("team1", al, 0);
        var t1p2 = new teamPlayer("team1", bb, 0);
        var t1p3 = new teamPlayer("team1", dp, 0);

        var t2p1 = new teamPlayer("team2", rj, 0);
        var t2p2 = new teamPlayer("team2", gn, 0);

        //console.log(t1p1.playerName);





        function Team1(player) {
          this.player = player;
        }

        Team1.prototype.addPoint = function() {
            this.player.playerScore++;
            console.log("Score:" , this.score);
        }

        var team1 = new Team1(t1p1, t1p2, t1p3);
        
       
            
            team1.addPoint();
        //console.log(team1.player.playerName);
        //console.log(team1.player.playerScore);


        function Team2(player) {
          this.player = player;
        }

        Team2.prototype.addPoint = function() {
            this.player.playerScore++;
            console.log("Score:" , this.score);
        }

        var team2 = new Team2(t2p1, t2p2);
            team2.addPoint();
            team2.addPoint();
            team2.addPoint();
        //console.log(team2.player.playerScore);








        function newGame(teamPlayers, Deck) {

        }




        





    }
})();