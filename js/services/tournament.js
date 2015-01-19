'use strict';

(function(ng) {
	ng.module('TournamentServices')
	.factory('Tournament', ['$http', 'logger',
		
		function($http, logger) {
			var resource = 'php/api.php?tournament/'

			var service = {};
			service.data = {};

			service.query = function() {
				logger.debug('TournamentService: Ajax call for all tournaments.');
				return $http({
					method: 'GET',
					url: resource + 'getList',
					cache: true
				})
				.success(function(response) {
					service.data = response;
					logger.info('TournamentService: Got tournaments list: ', response);
				})
				.error(function(error) {
					logger.error(error);
				});
			}

			service.get = function(tournamentId) {
				var url = resource + 'get';
				var data = {id: tournamentId};
				logger.debug('TournamentService: Ajax call: ' + url + '; data:', data);

				return $http({
					method: 'POST',
					url: url,
					data: data,
					cache: true,
					//headers: {'Content-Type': 'application/json; charset=utf-8'}
				})
				.success(function(response) {
					service.data = response;
					logger.info('TournamentService: Got tournament ', response);
				})
				.error(function(error) {
					logger.error(error);
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
