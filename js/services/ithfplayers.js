'use strict';

(function(ng) {
	ng.module('TournamentServices')
	.factory('IthfPlayers', ['$http', 

		function($http) {
			var resource = 'php/api.php?ithf';

			var service = {};
			service.data = undefined;

			var allData = {};

			service.loadPlayers = function() {
				return $http({
					method: 'GET',
					url: resource + 'getAll',
					cache: true
				})
				.success(function(response) {
					allData = response;
					service.data = response;
				});
			}

			service.filterOn = function(query) {
				var regex = '.*' + query.trim().replace(' ', '.*') + '.*';
				var regexp = new RegExp(regex, 'ig');

				var tmpData = [];

				allData.forEach(function(ithfPlayer) {
					if(ithfPlayer.player.match(regexp)) {
						tmpData.push(ithfPlayer);
					}
				});

				service.data = tmpData;
			}

			return service;
		}]);
})(angular);