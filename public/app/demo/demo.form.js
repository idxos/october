(function(){
    
    'use-strict';

    // define angular module/app
    angular
        .module('app.form', [])
        .controller('formController', formController);        

        formController.$inject = ['$scope', '$http', "ngToast"];

    /* @ngInject */
    function formController($scope, $http, ngToast) {
        $scope.formData = {};

        // process the form
        $scope.processForm = function() {
            $scope.loading = true;
            $http({
                method  : 'POST',
                url     : './api/process.php',
                data    : $.param($scope.formData),  // pass in data as strings
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })


            .success(function(data) {
                console.log(data);

                if (!data.success) {
                  // if not successful, bind errors to error variables
                  $scope.errorName = data.errors.name;
                  $scope.errorSuperhero = data.errors.superheroAlias;
                } else {
                  // if successful, bind success message to message
                  //$scope.message = data.message;
                  
                  //var myToastMsg = 

                  $scope.message = data.superheroAlias;

                }
            });// success
            $scope.loading = false;
        } // process-form
        

    }


})()

