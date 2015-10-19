(function() {
    'use strict';

    angular
        .module('app.timer')
        .controller('TimerController', TimerController);

    TimerController.$inject = ['$scope', '$interval'];

    /* @ngInject */
    function TimerController($scope, $interval) {
        var vm = this;
        vm.title = 'TimerController';

        .controller('ExampleController', ['$scope', '$interval',
      function($scope, $interval) {
        $scope.format = 'M/d/yy h:mm:ss a';
        $scope.blood_1 = 100;
        $scope.blood_2 = 120;

        var stop;
        $scope.fight = function() {
          // Don't start a new fight if we are already fighting
          if ( angular.isDefined(stop) ) return;

          stop = $interval(function() {
            if ($scope.blood_1 > 0 && $scope.blood_2 > 0) {
              $scope.blood_1 = $scope.blood_1 - 3;
              $scope.blood_2 = $scope.blood_2 - 4;
            } else {
              $scope.stopFight();
            }
          }, 100);
        };

        $scope.stopFight = function() {
          if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
          }
        };

        $scope.resetFight = function() {
          $scope.blood_1 = 100;
          $scope.blood_2 = 120;
        };

        $scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $scope.stopFight();
        });
      }])


    }
})();