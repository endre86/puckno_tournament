'use strict';

(function(context, ng) {
	ng.module('TournamentServices')
	.factory('Players', ['$http', 'PLAYER',

		function($http, PLAYER) {
			var resource = 'php/api.php?players/'

			var service = {};
			service.data = {};

			service.getRegisteredPlayers = function(subtournamentId) {
				return $http({
					method: 'POST',
					url: (resource + 'getPlayersFor'),
					data: {subtournamentId: subtournamentId},
					cache: false,
					isArray: true
				})
				.success(function(response) {
					service.data = response;
				});
			}

			service.registerIthfPlayer = function(data) {
				data.type = 'ithf';
				return $http({
					method: 'POST',
					url: resource + 'registerIthfPlayer',
					data: data,
					cache: false
				});
			}

			service.registerLocalPlayer = function(data) {
				data.type = 'local';
				return $http({
					method: 'POST',
					url: resource + 'registerLocalPlayer',
					data: data,
					cache: false
				});
			}

			service.sortPlayers = function(property) {
				if(service.data.length <= 0) {
					return;
				}

				if(!service.data[0][property]) {
					return;
				}

				if(property === PLAYER.rank.value) {
					service.data.sort(function(a, b) {
						var aRank = (a.rank === 'N/A' ? Number.MAX_VALUE : a.rank);
						var bRank = (b.rank === 'N/A' ? Number.MAX_VALUE : b.rank);
						return aRank - bRank;
					});
				}
				else if(PLAYER[property].isNumeric) {
					service.data.sort(function(a, b) {
						return b[property] - a[property];
					});
				}
				else {
					service.data.sort(function(a, b) {
						if(a[property] < b[property]) return -1;
						if(a[property] > b[property]) return 1;
						return 0;
					});
				}
			}

			return service;
		}]);
})(this, angular);