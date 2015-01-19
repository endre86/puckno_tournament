'use strict';

(function(ng) {
	ng.module('TournamentServices')
	.factory('Tournament', ['$http', 'logger',
		
		function($http, logger) {
			var resource = 'php/api.php?tournament/'

			var service = {};
			service.data = {};

			service.query = function() {
				logger.debug('TournamentServices: Ajax call for all tournaments.');
				return $http({
					method: 'GET',
					url: resource + 'getList',
					cache: true
				})
				.success(function(response) {
					service.data = response;
					logger.info('TournamentServices: Got tournaments list: ' + response);
				});
			}

			service.get = function(tournamentId) {
				return $http({
					method: 'POST',
					url: (resource + 'get'),
					data: {id: tournamentId},
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
