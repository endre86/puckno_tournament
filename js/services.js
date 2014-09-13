'use strict';

(function(ng) {
	var services = ng.module('tournamentServices', ['ngResource']);

	services.factory('Tournament', ['$resource', 
		function($resource) {
			return $resource('tournaments/:tournamentId.json', {}, {
				query: {method: 'GET', params:{tournamentId:'all'}, isArray:true}
			});
		}]);
})(angular);
