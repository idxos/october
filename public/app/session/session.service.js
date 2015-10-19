(function(){
    'use strict';
 
    angular
        .module('app.session')
        .factory('SessionService', SessionService);
 
    function SessionService(){
        var service = {
            newService: newService
        };
 
        /////////////
 
        function Session(sessionName, initialScore) {
            this.score = initialScore;
            this.initialScore = initialScore;
            this.name = sessionName;
        }
 
        Session.prototype.changeScore = function(amountToChange){
            if(!angular.isDefined(this.score)){
                this.score = this.initialScore;
            }
 
            this.score += amountToChange;
        };
 
        Session.prototype.resetScore = function () {
            this.score = this.initialScore;
        };
 
        function newSession(sessionName, initialScore) {
            var session = new Session(sessionName, initialScore);
            return session;
        }
 
        return service;
    }
})();