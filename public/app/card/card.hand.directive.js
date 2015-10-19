(function () {
    'use strict';

    angular
        .module('app.card')
        .directive('charadesHand', CharadesHand);

    /* @ngInject */
    function CharadesHand()
    {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            restrict: 'E',
            template:   '<div class="playingCards">' +
                        '<charades-card ng-repeat="card in cards track by $index" card="card" card-index="{{$index}}"></charades-card>' +
                        '</div>',
            scope: {
                cards: '='
            }
        };
        return directive;

    }
})();
