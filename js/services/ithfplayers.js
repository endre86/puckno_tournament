'use strict';

(function(ng) {
	ng.module('TournamentServices')
	.factory('IthfPlayers', ['$http', 'logger',

		function($http, logger) {
			var resource = 'php/api.php?ithf/';

			var service = {};
			service.data = undefined;

			var allData = {};

			service.loadPlayers = function() {
				var url = resource + 'getAll';

				logger.debug('IthfPlayersService: AJAX: ' + url);
				return $http({
					method: 'GET',
					url: url,
					cache: true
				})
				.success(function(response) {
					logger.info('IthfPlayersService: Got players. Count: ' + response.length);
					allData = response;
					service.data = response;
				})
				.error(function(error) {
					logger.error('IthfPlayersService: Failed to get players: ', error);
				});
			}

			service.filterOn = function(query) {
				logger.debug('IthfPlayersService: filtering players on: ' + query);

				var filter_start = Date.now();

				var regex = '.*' + query.trim().replace(' ', '.*') + '.*';
				var regexp = new RegExp(regex, 'ig');

				var tmpData = [];

				allData.forEach(function(ithfPlayer) {
					if(ithfPlayer.player.match(regexp)) {
						tmpData.push(ithfPlayer);
					}
				});

				var filter_time = Date.now() - filter_start;
				logger.debug('Used ' + filter_time + 'MS to filter users');
				logger.debug('Used ' + filter_time / 1000 + 'seconds to filter users');

				service.data = tmpData;
			}

			return service;
		}]);
})(angular);