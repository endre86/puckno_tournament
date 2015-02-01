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
					setPlayersTournamentRank();
				})
				.error(function(error) {
					logger.error('PlayersService->getRegisteredPlayers failed: ', error);
				});
			}

			service.getRegisteredTeam3 = function(subtournamentId) {
				var url = resource + 'getTeam3For';
				var data = {subtournamentId: subtournamentId};
				logger.debug('PlayersService->getRegisteredTeam3 AJAX: ' + url, data);
				return $http({
					method: 'POST',
					url: url,
					data: data,
					cache: false,
					isArray: true
				})
				.success(function(response) {
					logger.info('PlayersService->getRegisteredTeam3 returned: ', response);
					service.data = response;
				})
				.error(function(error) {
					logger.error('PlayersService->getRegisteredTeam3 failed: ', error);
				});
			}

			service.getRegisteredTeam5 = function(subtournamentId) {
				var url = resource + 'getTeam5For';
				var data = {subtournamentId: subtournamentId};
				logger.debug('PlayersService->getRegisteredTeam5 AJAX: ' + url, data);
				return $http({
					method: 'POST',
					url: url,
					data: data,
					cache: false,
					isArray: true
				})
				.success(function(response) {
					logger.info('PlayersService->getRegisteredTeam3 returned: ', response);
					service.data = response;
				})
				.error(function(error) {
					logger.error('PlayersService->getRegisteredTeam3 failed: ', error);
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
					url: url,
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

			service.registerTeam3 = function(data) {
				var url = resource + 'registerTeam3';

				logger.debug('PlayersService->registerTeam3 AJAX: ' + url, data);

				return $http({
					method: 'POST',
					url: url,
					data: data,
					cache: false
				})
				.success(function(response) {
					logger.info('PlayersService->registerTeam3 returned: ', response);
				})
				.error(function(error) {
					logger.error('PlayersService->registerTeam3 failed: ', error);
				});
			}

			service.registerTeam5 = function(data) {
				var url = resource + 'registerTeam5';

				logger.debug('PlayersService->registerTeam5 AJAX: ' + url, data);

				return $http({
					method: 'POST',
					url: url,
					data: data,
					cache: false
				})
				.success(function(response) {
					logger.info('PlayersService->registerTeam5 returned: ', response);
				})
				.error(function(error) {
					logger.error('PlayersService->registerTeam5 failed: ', error);
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

			function setPlayersTournamentRank() {
				logger.debug('PlayersService: Setting players tournamentRank.');
				service.sortPlayers(PLAYER.rank.value);
				var curentRank = 1;
				service.data.forEach(function(player) {
					if(isNaN(player.rank)) {
						player.tournamentRank = -1;
					}
					else {
						player.tournamentRank = curentRank++;	
					}
				});
			}

			return service;
		}]);
})(this, angular);