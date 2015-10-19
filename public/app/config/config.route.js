// route-config.js
angular
    .module('app')
    .config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/game/game.directive.html',
            controller: 'GameController',
        })
        .when('/welcome', {
            templateUrl: 'app/welcome/welcome.directive.html',
            controller: 'WelcomeController'
        })
        .when('/game', {
            templateUrl: 'app/game/game.directive.html',
            controller: 'GameController'
        });
}