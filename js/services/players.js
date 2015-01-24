'use strict';

(function(context, ng) {
	ng.module('TournamentServices')
	.factory('Players', ['$http', 'PLAYER', 'logger',

		function($http, PLAYER, logger) {
			var resource = 'php/api.php?players/'

			var service = {};
			service.data = {};

			service.getRegisteredPlayers = function(subtournamentId) {
				var url = resource + 'getPlayersFor';
				var data = {subtournamentId: subtournamentId};
				logger.debug('PlayersService->getRegisteredPlayers AJAX: ' + url, data);
				return $http({
					method: 'POST',
					url: url,
					data: data,
					cache: false,
					isArray: true
				})
				.success(function(response) {
					logger.info('PlayersService->getRegisteredPlayers returned: ', response);
					service.data = response;
				})
				.error(function(error) {
					logger.error('PlayersService->getRegisteredPlayers failed: ', error);
				});
			}

			service.registerIthfPlayer = function(data) {
				var url = resource + 'registerIthfPlayer';

				logger.debug('PlayersService->registerIthfPlayer AJAX: ' + url, data);
				return $http({
					method: 'POST',
					url: url,
					data: data,
					cache: false
				})
				.success(function(response) {
					logger.info('PlayersService->registerIthfPlayer returned: ', response);
					service.data = response;
				})
				.error(function(error) {
					logger.error('PlayersService->registerIthfPlayer failed: ', error);
				});
			}

			service.registerLocalPlayer = function(data) {
				var url = resource + 'registerLocalPlayer';

				logger.debug('PlayersService->registerLocalPlayer AJAX: ' + url, data);
				return $http({
					method: 'POST',
					url: resource + 'registerLocalPlayer',
					data: data,
					cache: false
				})
				.success(function(response) {
					logger.info('PlayersService->registerLocalPlayer returned: ', response);
				})
				.error(function(error) {
					logger.error('PlayersService->registerLocalPlayer failed: ', error);
				});
			}

			service.sortPlayers = function(property) {
				logger.debug('PlayersService: Sorting players by: ', property);
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