'use strict';

(function(ng) {
	ng.module('TournamentServices')
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

			service.addNewMiscItem = function() {
				if(!service.data.misc) {
					 service.data.misc = [];
				}

				service.data.misc.push({item: '', value: ''});
			}

			return service;
		}]);
})(angular);
