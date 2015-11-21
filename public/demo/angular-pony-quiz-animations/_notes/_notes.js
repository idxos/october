

{{formData}}
    <form name="myFormNg" ng-submit="myForm.submitTheForm()" novalidate>
    
        <input type="text" ng-class="myForm.getFormFieldCssClass(myFormNg.name)"
               id="name" name="name" ng-model="myForm.name" ng-minlength="2"> Name <br/>


    <input type="text"  ng-model="formData.q1" name="firstName">
    <input type="radio" ng-model="formData.q1" value="The First Answer">  
    <input type="radio" ng-model="formData.q1" value="The Second Answer">  
    <input type="radio" ng-model="formData.q1" value="The Third Answer">  

    <input type="radio" ng-model="formData.q2" value="myAnswer 1">
    <input type="radio" ng-model="formData.q2" value="myAnswer 2">
    <input type="radio" ng-model="formData.q2" value="myAnswer 3">  



        <div ng-show="myFormNg.name.$invalid">
            You must enter a valid name.
        </div>
(function() {
    'use strict';

    angular
        .module('app.quiz')
        .factory('quizService', quizService);

    quizService.$inject = ['$http', 'q'];

    /* @ngInject */
    function quizService($http, 'q') {
        var service = {
            questions: [],
            getQuestion: getQuestion
        };
        return service;

        ////////////////

        function func() {


        }
        // implementation
        function getQuestions() {

            var def = $q.defer();



$http({
  method: 'GET',
  url: 'api/quiz.json'
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

            $http.get('api/quiz.json')

                .then(function(data) {
                    
                    vm.questions = data;

                    //vm.questions = questions;
                    //console.log('questions returned to controller.', vm.questions);

                    def.resolve(data);
                })

                .error(function() {
                    def.reject("Failed to get albums");
                });

            return def.promise;
        }
    }
})();


    <button ng-disabled="myFormNg.$invalid">Submit Form</button>


  </form>  




(function(){
'use strict';

angular
    .module('app.quiz')
    .controller('QuizController', QuizController);
    

   
    QuizController.$inject = ['$scope','$timeout', '$http', '$location', '$anchorScroll', 'PlayerService'];
    
    function QuizController($scope, $timeout, $http, $location, $anchorScroll, PlayerService) {
        
        var quiz = this;
        
     
            $scope.myFormNg.firstName
            $scope.myFormNg.q1
            $scope.myFormNg.q2


 





    }
})();



angular
