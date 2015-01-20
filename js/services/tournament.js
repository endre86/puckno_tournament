'use strict';

(function(ng) {
	ng.module('TournamentServices')
	.factory('Tournament', ['$http', 'logger',
		
		function($http, logger) {
			var resource = 'php/api.php?tournament/'

			var service = {};
			service.data = {};

			service.query = function() {
				var url = resource + 'getList';

				logger.debug('TournamentService->query AJAX: ' + url);
				return $http({
					method: 'GET',
					url: url,
					cache: true
				})
				.success(function(response) {
					service.data = response;
					logger.info('TournamentService->query returned: ', response);
				})
				.error(function(error) {
					logger.error('TournamentService->query failed: 'error);
				});
			}

			service.get = function(tournamentId) {
				var url = resource + 'get';
				var data = {id: tournamentId};
				logger.debug('TournamentService->get AJAX: ' + url, data);

				return $http({
					method: 'POST',
					url: url,
					data: data,
					cache: true,
					//headers: {'Content-Type': 'application/json; charset=utf-8'}
				})
				.success(function(response) {
					service.data = response;
					logger.info('TournamentService->get returned: ', response);
				})
				.error(function(error) {
					logger.error('TournamentService->get failed: ', error);
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
