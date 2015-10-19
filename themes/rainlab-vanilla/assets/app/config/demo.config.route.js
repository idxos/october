// route-config.js
angular
    .module('app')
    .config(config);

function config($routeProvider, ngToastProvider) {
    
    ngToastProvider.configure({
        additionalClasses: 'my-animation'
      });


    $routeProvider
        .when('/', {
            controller: 'formController'
        })
        .when('/demo', {
            templateUrl: 'app/demo/demo.directive.html',
            controller: 'DemoController'
        })
        .when('/game', {
            templateUrl: 'app/demo/game.directive.html',
            controller: 'GameController'
        });

        //.when('/game', {
            //templateUrl: 'app/game/game.directive.html',
            //controller: 'GameController'
       // });
}


