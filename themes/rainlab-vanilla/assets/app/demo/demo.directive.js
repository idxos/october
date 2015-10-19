(function () {
    'use strict';

    angular
        .module('app.demo')
        .directive('demoDirective', DemoDirective)
        .controller('DemoCardController', DemoCardController);

    DemoCard.$inject = ['$window'];

    DemoCardController.$inject = ['$scope'];
    /* @ngInject */
    function DemoCard($window)
    {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            template:   '<div class="card" ng-class="{{vm.name}}}">' +
                        '<p>Replace this with js</p>' +
                        '</div>' +
                        '<div class="card" ng-class="[vm.cardIndexClass]"></div>',
            scope: {
                card: '=',
                cardIndex: '@'
            },
            controller: 'DemoCardController',
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

    }

    /* @ngInject */
    function DemoCardController($scope){
        var vm = this;

        vm.rank;
        vm.suit;

        function makeCards() {
            
        }

        function Cards = new Card(rank, suit)[

        ];

    }
})();
