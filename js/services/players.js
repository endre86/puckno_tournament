'use strict';

(function(ng) {
	ng.module('tournamentServices')
	.factory('Players', ['$http', 

		function($http){
			var resource = 'php/api.php?players/'

			var service = {};
			service.data = {};

			service.getRegisteredPlayers = function(subtournamentId) {
				return $http({
					method: 'GET',
					url: (resource + subtournamentId),
					cache: false,
					isArray: true
				})
				.success(function(response) {
					service.data = response;
				});
			}

			service.registerIthfPlayer = function(data) {
				data.type = 'ithf';
				return registerPlayer(data);
			}

			service.registerLocalPlayer = function(data) {
				data.type = 'local';
				return registerPlayer(data);
			}

			function registerPlayer(data) {
				return $http({
					method: 'POST',
					url: resource,
					data: data,
					cache: false
				});
			}

			return service;
		}]);
})(angular);