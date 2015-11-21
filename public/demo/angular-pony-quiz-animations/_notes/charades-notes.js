



charades function() {
    
    var players = {};

    var deck = {};
    var _maxTimeCountdown = 59;

    $scope.state = inactive;

    $scope.startGame = function(){
        $scope.state = inactive;

        init();
        console.log($scope.state);
    }


     $scope.init = function(){
        $scope.state = active;
        $scope.started = false;
        $scope.gameOver = false;
        $scope.stepCount = -2;
        $scope.deck = deck;
        $scope.maxTimeCountdown = maxTimeCountdown;
        console.log("Deck: " + $scope.state + "State: " + $scope.deck + "MaxCountdownTime: : " +  $scope.maxTimeCountdown);

        showMainMenu();
    };



    $scope.showMainMenu = function() {
        if (startGame === true) {

            $scope.stepCount = 0;
        } else {
            $scope.stepCount = -1;
        }
    };


    $scope.startNewGame = function(){
        $scope.state = active;
        $scope.started = true;
        $scope.gameOver = false;
        $scope.stepCount = -1;


        // demo data ///  $scope.player = PlayerService.newPlayer('Ringo', 150);
        getPlayers();
    
    };

    $scope.getPlayers = function(){
        $scope.players = players;
        $scope.playersModel = {"Get some players yo..."};

        var newPlayer = PlayerService.newPlayer();

        function showNewAddPlayerForm() {
            $scope.players = players;

            $scope.addNewPlayerForm = true;

            if (players.length < 0) {
                $scope.stepCount = 0;
                $scope.showNextStepButton = false;
            } else {
                $scope.showNextStepButton = true;

            }
        }
    };

    $scope.addNewPlayer = function(p, is){
        this.playerName = p;
        this.initialScore = is;
        this.score = s;

        var newPlayer = PlayerService.newPlayer(playerName, 0);

        function() {

            $scope.players.push(newPlayer);
        }
        $scope.addNewPlayerForm = false;
    };


    $scope.nextStep = function() {
        $scope.stepCount += 1;
        console.log("The current stepCount: "+$scope.stepCount);
    };


    $scope.addFormData = function(formData) {
        $scope.formData += formData.target.attributes.data.value;
        //formData.push(formData);
        $scope.activeQuestion += 1;

    };
    
    $scope.removeFormData = function(index) {
        formData.splice(index, 1);
    };




    $scope.gameOver = function(){
        $scope.state = inactive;
        $scope.started = true;
        $scope.gameOver = true;
        
        alert("Game Over!");
    };


}







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
            this.name = playerName;
        }
 
        Player.prototype.changeScore = function(amountToChange){
            if(!angular.isDefined(this.score)){
                this.score = 0;
            }
 
            this.score += amountToChange;
        };
 
        Player.prototype.resetScore = function () {
            this.score = 0;
        };
 
        function newPlayer(playerName, initialScore) {
            var player = new Player(playerName, initialScore);
            return player;
        }
 
        return service;
    }
})();






<html>
    


    <div class="{{ (activeQuestion === -1) ? 'hidden' : 'active' }}">
        <button type="button" ng-click="startNewGame()" class="btn btn-success btn-lg text-center center-block">Start New Game</button>
    </div>

    <div class="{{ (activeQuestion === 0) ? 'hidden' : 'active' }}">
        <form name="newPlayerForm" ng-controller="FormController" class="my-form {{showAddNewPlayerForm === true) : 'hidden' ? 'active'}}" 
            ng-submit="addNewPlayer(formData);">
            
            playerName: <input name="input" ng-model="formData.playerName" required>
            
            initialScore: <input name="input" class="hidden" ng-model="formData.initialScore" required>


            <button type="submit" class="btn btn-default">Add new player</div>
            <button type="button" class="btn btn-default btn-next-step hidden" ng-click="nextStep()">Next Step</div>
        </form>    
    </div>

    <div class="{{ (gameOver === true) ? 'hidden' : 'active' }}">
        <h1>Game Over</h1>
        <button type="button" class="btn btn-default btn-restart hidden" ng-click="newGame()">Play Again</div>
    </div>


</html>