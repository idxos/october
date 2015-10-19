// dataservice factory
angular
    .module('app.core')
    .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', 'logger', '$firebaseObject'];

    function dataservice($http, logger, $firebaseObject) {
        return {
            getCards: getCards
        };


        var myDataRef = new Firebase('https://charades-app.firebaseio.com/cards');
    
        function getCards() {
            return $http.get(myDataRef)
                .then(getCardsComplete)
                .catch(getCardsFailed);

            function getCardsComplete(response) {
                return response.data.results;
                console.log(response.data.results);
            }

            function getCardsFailed(error) {
                logger.error('XHR Failed for getCards.' + error.data);
            }
        }
    }
