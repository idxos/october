(function() {
    'use strict';
    angular.module('app', [
        'app.core',
        'app.windowWrapper',
        'app.player',
        'app.quiz',
        'app.steps',
        //'app.ponyQuiz'
    ]);
})();

(function() {
    'use strict';
    angular.module('app.core', [
        'ngAnimate',
        'ui.bootstrap'
    ]);
})();



(function() {
    'use strict';
    angular.module('app.core', []);
})();

(function() {
    'use strict';
    angular.module('app.player', []);
})();

(function() {
    'use strict';
    angular.module('app.quiz', []);
})();

(function() {
    'use strict';
    angular.module('app.ponyQuiz', []);
})();


(function() {
    'use strict';
    angular.module('app.steps', []);
})();



(function() {
    'use strict';
    angular.module('app.windowWrapper', []);
})();




(function(){
'use strict';

angular
    .module('app.quiz')
    .controller('QuizController', QuizController);


   
    QuizController.$inject = ['$scope','$timeout', '$http', '$location', '$anchorScroll', 'PlayerService'];
    
    function QuizController($scope, $timeout, $http, $location, $anchorScroll, PlayerService){
        
        var quiz = this;
        




        $scope.gotoBottom = function() {
          // set the location.hash to the id of
          // the element you wish to scroll to.
          $location.hash('bottom');

          // call $anchorScroll()
          $anchorScroll();
        };

        quiz.activeQuestion = -1;
        $scope.activeQuestion = -1;
        $scope.formData = {};
        $scope.quiz.model = {};


        $scope.begin = function() {
            quiz.start();
            $scope.activeQuestion++;
            console.log("begin just returned ");

        };

        $scope.nextStep = function() {
            console.log("Next Step called ... ");
            

            $scope.activeQuestion++;
$( "animated " ).addClass( "bounceOutUp" );
        };

        $scope.lastStep = function() {
            $scope.activeQuestion--;
        };

        $scope.firstStep = function() {
            $scope.activeQuestion = 0;
        };

        $scope.resetForm = function() {
            $scope.activeQuestion = 0;
            $scope.formData = {};
        };
        

        
   

        var q =
        $http.get('api/quiz.json').then(function(quizData){
            quiz.questions = quizData.data;
            quiz.totalQuestions = quiz.questions.length;

        });


        $scope.questions = q;
        //console.log(quiz.questions);



        quiz.init = function () {
            quiz.started = false;
            quiz.over = false;
            quiz.step = 0;
            quiz.player = PlayerService.newPlayer('Ringo', 150);
            quiz.ponyName = "";
            quiz.questions = [];
            quiz.model = {stat: "model init..."};
            quiz.state = "Running quiz.init function";
            console.log("quiz Ran Init");
            $scope.activeQuestion = -1;
        };
 
        quiz.start = function () {
            console.log("quiz.start() was just called..");
            quiz.updateButtons(true, true, true);
            quiz.started = true;
            quiz.over = false;
            //quiz.question = quiz.questions[0];
            quiz.model = {stat: "...started..."};
            quiz.step = 0;
            //return quiz.step;
        }
        
        quiz.selectAnswer = function (a, $scope) {
            quiz.answer = a;

            

            console.log("quiz.selectAnswer() was just called..");
            quiz.updateButtons(true, true, true);
            quiz.started = true;
            quiz.over = false;
            //quiz.question = quiz.questions[0];
            
                
          
                 quiz.model += quiz.answer;
                 
                 console.log(quiz.model);




                 //console.log(this.activeQuestion);
                var addq = this.activeQuestion += 1;
                console.log(addq);

                if (quiz.model.length === quiz.totalQuestions) {
                    alert("The quiz is over!");
                }

            
        }


   

        $scope.formData = {};

        $scope.formData = [];
          
          
          $scope.addFormData = function(formData) {
            
            $scope.formData += formData.target.attributes.data.value;
            //formData.push(formData);
            $scope.activeQuestion += 1;

                if ($scope.activeQuestion === quiz.totalQuestions) {
                    alert("Game Over");

                    console.log();


                }


          };




        $scope.activeStep = quiz.step;







        quiz.begin = function() {
            console.log("game.begin() was just called...");
            return parseInt(quiz.activeQuestion) === 0;
            //tempQuestion = quiz.activeQuestion;
            //tempQuestion === 0;
            //quiz.activeQuestion = tempQuestion;


         
        }


        $scope.master = {};
        
        



  $scope.formResults = [];

  $scope.$watchCollection('formData.answers', function () {
    $scope.formResults = [];
    
    angular.forEach($scope.formData, function (value, key) {
      if (value) {
        $scope.formResults.push(key);
      }
    });

  });



        $scope.reset = function() {
        $scope.a = angular.copy($scope.master);
        };

        $scope.reset();



        quiz.questionSteps = function() {
            quiz.started = true;
            quiz.over = false;
        }
 
        quiz.end = function () {
            quiz.started = true;
            quiz.over = true;
            
            quiz.updateButtons(true, false, true);
            
            quiz.state = "quiz is Over.  quiz.end() was called";
            console.log("quiz Over");
        };

        quiz.share = function() {
            quiz.started = true;
            quiz.over = true;
            quiz.ponyName = "Snowflake";

            quiz.updateButtons(true, false, true);

            quiz.state = "quiz is Over.  quiz.share() was called";
            console.log("Quiz Share function has just been called!");
        }
 
        quiz.reset = function () {
            quiz.player.resetScore();
            quiz.started = false;

            console.log("quiz Reset");
        };

        quiz.restart = function () {
            quiz.player.resetScore();
            quiz.started = false;
            quiz.over = false;
            quiz.init();
            console.log("Restarting...");
        };



        quiz.updateButtons = function(next, prev, restart) {
            quiz.buttonNextEnabled = next;
            quiz.buttonPrevtEnabled = prev;
            quiz.buttonRestartEnabled = restart;
        };




 
        quiz.init();
    }


})();


(function() {
    'use strict';

    angular
        .module('app.quiz')
        .controller('ParentController', ParentController);

    ParentController.$inject = ['$scope'];

    /* @ngInject */
    function ParentController($scope) {
        $scope.logThisAndScope = function() {
            console.log(this, $scope)
        }
    }

})();





(function(){
    'use strict';

    angular
        .module('app.quiz')
        .directive('appQuiz', appQuiz);

    function appQuiz(){
        return {
            restrict: 'E',
            templateUrl: 'app/quiz/quiz.directive.html',
            controller: 'QuizController',
            controllerAs: 'quiz'
        }
    }
})();



(function() {
    'use strict';

    angular
        .module('app.windowWrapper')
        .controller('WindowWrapperController', WindowWrapperController);

    WindowWrapperController.$inject = ['$scope'];

    /* @ngInject */
    function WindowWrapperController($scope) {
        var vm = this;
        vm.title = 'WindowWrapperController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();


(function(){
    'use strict';

    angular
        .module('app.windowWrapper')
        .directive('windowWrapper', windowWrapper);

    function windowWrapper($window){
        return {
            restrict: 'E',
            templateUrl: 'app/layout/window-wrapper.html',
            controller: 'WindowWrapperController',
            controllerAs: 'WindowWrapperController'

        }
            return function ($scope) {
                    $scope.initializeWindowSize = function () {
                            $scope.maxHeight = Math.max(
                            document.body.scrollHeight, document.documentElement.scrollHeight,
                            document.body.offsetHeight, document.documentElement.offsetHeight,
                            document.body.clientHeight, document.documentElement.clientHeight,
                            window.innerHeight
                        );
                        $scope.windowHeight = $window.innerHeight;
                        return $scope.windowWidth = $window.innerWidth;
                       
                    };
                    $scope.initializeWindowSize();


                    $scope.$watch('__height', function(newHeight, oldHeight) {
                        $scope.initializeWindowSize();


                    }); 

                    return angular.element($window).bind('resize', function () {
                     
                        $scope.initializeWindowSize();

                        return $scope.$apply();
                     
                    });
                
          
        };
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


(function() {
    'use strict';

    angular
        .module('app.steps')
        .controller('StepsController', StepsController);

    StepsController.$inject = ['$scope', '$location'];

    /* @ngInject */
    function StepsController($scope, $location) {
        var vm = this;
        vm.title = 'StepsController';


        $http.get('api/quiz.json').then(function(quizData){
            quiz.questions = quizData.data;
            quiz.totalQuestions = quiz.questions.length;
        });

        $scope.steps = quiz.questions;

         $scope.selection = $scope.steps[0];

         $scope.getCurrentStepIndex = function() {
             // Get the index of the current step given selection
             return _.indexOf($scope.steps, $scope.selection);
         };

         // Go to a defined step index
         $scope.goToStep = function(index) {
             if (!_.isUndefined($scope.steps[index])) {
                 $scope.selection = $scope.steps[index];
             }
         };

         $scope.hasNextStep = function() {
             var stepIndex = $scope.getCurrentStepIndex();
             var nextStep = stepIndex + 1;
             // Return true if there is a next step, false if not
             return !_.isUndefined($scope.steps[nextStep]);
         };

         $scope.hasPreviousStep = function() {
             var stepIndex = $scope.getCurrentStepIndex();
             var previousStep = stepIndex - 1;
             // Return true if there is a next step, false if not
             return !_.isUndefined($scope.steps[previousStep]);
         };

         $scope.incrementStep = function() {
             if ($scope.hasNextStep()) {
                 var stepIndex = $scope.getCurrentStepIndex();
                 var nextStep = stepIndex + 1;
                 $scope.selection = $scope.steps[nextStep];
             }
         };

         $scope.decrementStep = function() {
             if ($scope.hasPreviousStep()) {
                 var stepIndex = $scope.getCurrentStepIndex();
                 var previousStep = stepIndex - 1;
                 $scope.selection = $scope.steps[previousStep];
             }
         };


    }
})();
