'use strict';

(function(context, ng) {
	ng.module('TournamentServices')
	.factory('Players', ['$http', 'PLAYER', 'logger',

		function($http, PLAYER, logger) {
			var resource = 'php/api.php?players/';

			var service = {};
			service.data = {};

			service.getRegisteredPlayers = function(subtournament) {
				var url = resource + 'getPlayersFor';
				var data = {subtournamentId: subtournament.id};
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
					initializeData(response, subtournament);
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

			service.sortPlayers = function(property) {
				logger.debug('PlayersService: Sorting players by: ', property);
				sortPlayers(service.data, property);
			}

			function initializeData(players, subtournament) {
				setPlayersTournamentRankValue(players, subtournament.level, subtournament.hasBronze);
				setPlayersTournamentRank(players);
				service.data = players;
			}

			function sortPlayers(players, property) {
				if(players.length <= 0) {
					return;
				}

				if(!players[0][property]) {
					return;
				}

				if(property === PLAYER.rank.value) {
					players.sort(function(a, b) {
						var aRank = (a.rank === 'N/A' ? Number.MAX_VALUE : a.rank);
						var bRank = (b.rank === 'N/A' ? Number.MAX_VALUE : b.rank);
						return aRank - bRank;
					});
				}
				else if(PLAYER[property].isNumeric) {
					players.sort(function(a, b) {
						return b[property] - a[property];
					});
				}
				else {
					players.sort(function(a, b) {
						if(a[property] < b[property]) return -1;
						if(a[property] > b[property]) return 1;
						return 0;
					});
				}
			}

			function setPlayersTournamentRank(players) {
				logger.debug('PlayersService: Setting players tournament rank and points.');
				var curentRank = 1;
				players.forEach(function(player) {
					player.tournamentRank = curentRank++;
				});
			}

			function setPlayersTournamentRankValue(players, subtournamentLevel, bronze) {
				var wrPoints = CalculateWRPoints(players, subtournamentLevel, bronze);
				sortPlayers(players, PLAYER.rank.value);
				for(var i = 0; i < players.length; i++) {
					players[i].wrPoints = wrPoints[i];
				}
			}

			function CalculateWRPoints(players, LEVEL, bronze) {
				LEVEL = 4;

				players = players.sort(function(p1, p2) {
					return p1.best - p2.best;
				});

				var scales = [0.96, 0.92, 0.89, 0.83, 0.6, 0.4];
				var maxPoints = [1000, 500, 100, 70, 40, 20];

				if(bronze !== true) {
					bronze = false;
				}

				var numPlayers = players.length;
				var wrPoints = Array.apply(null, {length: numPlayers}).map(function(){ return 0; });

				if(LEVEL < 0 || LEVEL > (scales.length)) {
					logger.error('Subtournament level out of range: ', LEVEL);
					return wrPoints;
				}

				// If less than 4 players, no points are handed out
				if(numPlayers < 4) {
				   	logger.debug('There must be at least four players registered to calculate WR points. # players = ', numPlayers);
					return wrPoints;
				}

				// Run through the best scores and calculate WR-points:
				for(var i = 0; i < numPlayers; ++i) {
					var p1, p2, p3,
						startPos, length, playersSubset, sumPlayersSubsetValue;

					// Players are given a minimum of << 1, 2, ..., numPlayers >> points.
					p1 = i + 1;

					// Players are given a minimum of << maxPoints/2^(numPlayers.1),
					//	maxPoints/2^(numPlayers -2), ..., maxPoints/2^0 >> points
					p2 = Math.floor(maxPoints[LEVEL] / Math.pow(2, (numPlayers - i - 1)));
					
					startPos = Math.max(0, i - 3);
					length = startPos + Math.min(startPos + i + 1, 4);

					playersSubset = players.slice(startPos, length);
					sumPlayersSubsetValue = playersSubset.reduce(function(sum, nextPlayer) { return sum + val(nextPlayer) }, 0);
					p3 = Math.round(scales[LEVEL] * sumPlayersSubsetValue / 4);

					wrPoints[i] = Math.max(p1, p2, p3);
				}

				wrPoints[0] = 1; // last plaze always gets 1 point
				wrPoints.reverse();
				wrPoints[0] += 10; // First place always get a +10 bonus
				writeWR(wrPoints);

				if(!bronze) {
					var pBronze = Math.floor((wrPoints[2] + wrPoints[3]) / 2);
					wrPoints[2] = pBronze;
					wrPoints[3] = pBronze;
				}

				return wrPoints;

				function val(player) {
					if(isNaN(player.best) || player.best < 0) {
						return 0;
					}

					return player.best;
				}
			}

			function writeWR(wr) {
				for(var i = 0; i < wr.length; i++) {
					console.log(i + ' => ' + wr[i]);
				}
			}

			return service;
		}]);
})(this, angular);