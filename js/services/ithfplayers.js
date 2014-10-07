'use strict';

(function(ng) {
	ng.module('tournamentServices')
	.factory('IthfPlayers', ['$http', 

		function($http) {
			var resource = 'php/api.php?ithf';

			var service = {};
			service.data = {};

			var allData = {};

			service.loadPlayers = function() {
				return $http({
					method: 'GET',
					url: resource,
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