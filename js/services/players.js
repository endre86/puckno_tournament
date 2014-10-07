'use strict';

(function(ng) {
	ng.module('tournamentServices')
	.factory('Players', ['$http', 

		function($http){
			var resource = 'php/api.php?players/'

			var service = {};
			service.data = {};

			service.get = function(subtournamentId) {
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

			service.registerIthfPlayer = function(subtournamentId, playerId) {
				return $http({
					method: 'POST',
					url: resource,
					data: {
						subtournamentId: subtournamentId,
						playerId: playerId,
						type: 'ithf'
					},
					cache: false
				});
			}

			service.registerLocalPlayer = function(subtournamentId, name, club, nation) {
				return $http({
					method: 'POST',
					url: resource,
					data: {
						subtournamentId: subtournamentId,
						player: name,
						club: club,
						nation: nation,
						type: 'local'
					},
					cache: false
				});
			}

			return service;
		}]);
})(angular);