'use strict';

(function(ng) {
	var services = ng.module('tournamentServices', ['ngResource']);

	services.factory('Tournament', ['$resource', '$http', 
		function($resource, $http) {
			return $resource('php/api.php?tournament/:tournamentId', {}, {
				query: {method: 'GET', isArray: true},
				get: {method: 'GET', params: {tournamentId:'false'}, isArray: false}
			});
		}]);

	services.factory('TournamentPlayers', ['$resource', 
		function($resource) {
			// return $resource('tournaments/registeredplayers.json', {}, {});
			return $resource('php/api.php?players/:subtournamentId', {}, {
				get: {method: 'GET', params: {subtournamentId:true}, isArray: true}
			});
		}]);

	services.factory('IthfPlayers', ['$resource', 
		function($resource) {
			return $resource('php/api.php?ithf/:query', {}, {
				get: {method: 'GET', params: {query:true}, isArray: true}
			});
		}]);
})(angular);
