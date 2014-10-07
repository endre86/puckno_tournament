'use strict';

(function(ng) {
	ng.module('tournamentServices')
	.factory('Tournament', ['$http',
		
		function($http) {
			var resource = 'php/api.php?tournament/'

			var service = {};
			service.data = {};

			service.query = function() {
				return $http({
					method: 'GET',
					url: resource,
					cache: true
				})
				.success(function(response) {
					service.data = response;
				});
			}

			service.get = function(tournamentId) {
				return $http({
					method: 'GET',
					url: (resource + tournamentId),
					cache: true
				})
				.success(function(response) {
					service.data = response;
				});
			}

			return service;
		}]);
})(angular);
