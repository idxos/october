(function() {
    'use strict';

    angular
        .module('app.cookie')
        .controller('CookieController', CookieController);

    CookieController.$inject = ['$cookies'];

    /* @ngInject */
    function CookieController($cookies) {
         var favoriteCookie = $cookies.get('myFavorite');
         alert(favoriteCookie);
          // Setting a cookie
          $cookies.put('myFavorite', 'oatmeal');

    }//CookieController
})();