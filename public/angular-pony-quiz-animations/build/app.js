(function() {
    'use strict';
    angular.module('app', [
        'ngAnimate',
        'app.quiz',
        'app.player',
        'app.dealer',
        'app.card'
    ]);
})();
(function() {
    'use strict';

    angular.module('app.card', []);
})();
(function() {
    'use strict';

    angular.module('app.quiz', []);

})();

(function() {
    'use strict';

    angular.module('app.player', []);

})();
(function() {
    'use strict';

    angular.module('app.dealer', []);

})();
(function() {
    'use strict';

    angular.module('app.hand', []);

})();


(function(){
'use strict';

angular
    .module('app.quiz')
    .controller('QuizController', QuizController);

   
    QuizController.$inject = ['PlayerService', 'DealerService', 'CardService', '$timeout', 'QuizService'];
    
    function QuizController(PlayerService, DealerService, CardService, $timeout, QuizService){
        var quiz = this;
 
        quiz.init = function () {
            quiz.started = false;
            quiz.over = false;
            quiz.player = PlayerService.newPlayer('Ringo', 150);
            //quiz.dealer = DealerService.newDealer('Dan', 150);
            quiz.showResults = false;
            quiz.deck = CardService.newDeck();
            quiz.dealer = DealerService.newDealer(quiz.deck);
            quiz.maxValue = 299999;
            
            quiz.betValue = 5;
            quiz.playerCards = [];
            quiz.handValue = 0;
            quiz.state = "Running quiz.init function";


            console.log("quiz Ran Init");
        };
 
        quiz.start = function () {
            quiz.updateButtons(true, false, false);
            quiz.started = true;
            quiz.over = false;
            quiz.player.changeScore(0);
            quiz.dealer.changeScore(0);


            console.log(quiz.deck);
            console.log(Object.keys(quiz.deck.cards).length);
            console.log(Object.keys(quiz.deck.cards));
            console.log(Object.keys(quiz.deck.dealt));
        };





        quiz.deal = function() {
            quiz.started = true;
            quiz.over = false;
            quiz.updateButtons(true, true, true);
           // quiz.dealing = CardService.deal();

           quiz.deck.reset();

           quiz.playerCards.length = 0;

           quiz.hit(false);
           

           quiz.dealer.deal();

        
        };

       quiz.hit = function (animate) {
            quiz.started = true;
            quiz.updateButtons(false, true, false);

            var card = quiz.deck.deal();
            
            quiz.dealCardToPlayer(card, animate, function(){
                
                quiz.getHandValue();
            });


        };

        quiz.dealCardToPlayer = function(card, animate, callback){
            
            if(animate) {
                
                card.hideValue = true;
                
                quiz.playerCards.push(card);
                
                $timeout(function () {
                    card.hideValue = false;
                    callback();
                }, 250);
            }
            else{
                quiz.playerCards.push(card);
                console.log(quiz.playerCards);
                console.log(quiz.playerCards[0]);

                //var playerCards = quiz.playerCards[0];
                //$scope.playerCards = quiz.playerCards[0];

                callback();
            }
        };


        quiz.getHandValue = function () {
            
            quiz.handValue += quizService.handValue(quiz.playerCards);
            
                quiz.busted = quiz.handValue > quiz.maxValue;
            
            if (quiz.handValue >= quiz.maxValue){
                
                quiz.end();
            }
            else{
                quiz.updateButtons(true, true, true);
            }
        };


 
        quiz.end = function () {
            quiz.started = true;
            quiz.over = true;
            quiz.state = "quiz is Over.  quiz.end() was called";
            quiz.updateButtons(true, false, true);
            quiz.player.changeScore(5); // pass in amt to update
            console.log("quiz Over");
        };
 
        quiz.reset = function () {
            quiz.player.resetScore();
            quiz.dealer.resetScore();
            quiz.started = false;

            console.log("quiz Reset");
        };

        quiz.restart = function () {
            quiz.player.resetScore();
            quiz.dealer.resetScore();
            quiz.started = false;
            quiz.over = false;
            quiz.init();
            console.log("Restarting...");
        };
        quiz.updateButtons = function(bet, hit, stay) {
            quiz.buttonBetEnabled = bet;
            quiz.buttonHitEnabled = hit;
            quiz.buttonStayEnabled = stay;
        };

 
        quiz.init();
    }


})();

(function(){
    'use strict';

    angular
        .module('app.quiz')
        .directive('appQuiz', appQuiz);

    function appquiz(){
        return {
            restrict: 'E',
            templateUrl: 'app/quiz/quiz.directive.html',
            controller: 'QuizController',
            controllerAs: 'quiz'
        }
    }
})();

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


(function(){
    'use strict';
 
    angular
        .module('app.dealer')
        .factory('DealerService', DealerService);
 
    function DealerService(){
        var service = {
            newDealer: newDealer
        };
 
        /////////////
 
        function Dealer(dealerName, initialScore) {
            this.score = initialScore;
            this.name = dealerName;
        }
 
        Dealer.prototype.changeScore = function(amountToChange){
            if(!angular.isDefined(this.score)){
                this.score = 0;
            }
 
            this.score += amountToChange;
        };
 
        Dealer.prototype.resetScore = function () {
            this.score = 0;
        };

        Dealer.prototype.deal = function () {
            console.log("Dealer deal was justa called");



        };


 
        function newDealer(dealerName, initialScore) {
            var dealer = new Dealer(dealerName, initialScore);
            return dealer;
        }
        console.log(newDealer);
        return service;
    }
})();


(function () {
    'use strict';

    angular
        .module('app.card')
        .factory('CardService', CardService);


    function CardService(){
        var service = {
            newDeck: newDeck,
            Deck: Deck,
            Card: Card
        };

        function newDeck(){
            var deck = new Deck();
            return deck;
        }

        function Deck(){
            var deck = this;
            this.cards = [];
            this.dealt = [];

            deck.suits.forEach(function (suit) {
                deck.ranks.forEach(function(rank){
                    var card = new Card(rank, suit);
                        deck.cards.push(card);
                })
            });

            deck.shuffle();
        }

        Deck.prototype.suits = ['C', 'D', 'S', 'H'];

        Deck.prototype.ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

        Deck.prototype.deal = function(){
            
            var card = this.cards.shift();
           
            if(angular.isDefined(card)){
           
                this.dealt.push(card);
                return card;
            }
            else{
                return false;
            }

        };

        Deck.prototype.shuffle = function () {
            /**
             * Knuth Shuffle Implementation
             * https://github.com/coolaj86/knuth-shuffle
             */
            var currentIndex = this.cards.length;
            var temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = this.cards[currentIndex];
                this.cards[currentIndex] = this.cards[randomIndex];
                this.cards[randomIndex] = temporaryValue;
            }
        };

        Deck.prototype.reset = function () {
            this.cards = this.cards.concat(this.dealt);
            this.dealt = [];
            this.shuffle();
        };

        function Card(rank, suit){
            this.rank = rank;
            this.suit = suit;
        }

        Card.prototype.name = function () {
            return this.rank + ' ' + this.suit;
        };

        return service;

        ////////////////

    }

})();


(function(){
    'use strict';

    angular
        .module('app.quiz')
        .factory('QuizService', QuizService);

    function quizService(){
        var service = {
            handValue: handValue,
            maxValue: maxValue
        };

        ////////////////////

        var _maxValue = 21;

        /**
         * Returns the numeric maximum hand value before busting
         * @returns {number}
         */
        function maxValue(){
            return _maxValue;
        }


        function handValue(hand){
            var aces = 0;
            var totalValue = 0;
            var faceRanks = ['J','Q','K'];

            //Get the values of each card (counting 1 for each ace)
            hand.forEach(function(card){
                //Face Cards
                if(faceRanks.indexOf(card.rank) !== -1){
                    totalValue += 10;
                }
                //Aces
                else if(card.rank === 'A'){
                    totalValue += 1;
                    aces++;
                }
                //Number Cards
                else {
                    totalValue += Number(card.rank);
                }
            });

            //Loop through aces and try to add 10 to get highest value of hand
            // We are adding 10 here because we already added 1 for the ace above
            for(var i=0; i<aces; i++){
                if(totalValue <= 11){
                    totalValue += 10;
                }
            }

            return totalValue;
        }

        return service;
    }
})();

