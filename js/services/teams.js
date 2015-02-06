'use strict';

(function(context, ng) {
	ng.module('TournamentServices')
	.factory('Teams', ['$http', 'logger',

		function($http, logger) {
			var resource = 'php/api.php?teams/'

			var service = {};
			service.data = {};

			service.getRegisteredTeam3 = function(subtournamentId) {
				var url = resource + 'getTeam3For';
				var data = {subtournamentId: subtournamentId};
				logger.debug('TeamService->getRegisteredTeam3 AJAX: ' + url, data);
				return $http({
					method: 'POST',
					url: url,
					data: data,
					cache: false,
					isArray: true
				})
				.success(function(response) {
					logger.info('TeamService->getRegisteredTeam3 returned: ', response);
					service.data = response;
				})
				.error(function(error) {
					logger.error('TeamService->getRegisteredTeam3 failed: ', error);
				});
			}

			service.getRegisteredTeam5 = function(subtournamentId) {
				var url = resource + 'getTeam5For';
				var data = {subtournamentId: subtournamentId};
				logger.debug('TeamService->getRegisteredTeam5 AJAX: ' + url, data);
				return $http({
					method: 'POST',
					url: url,
					data: data,
					cache: false,
					isArray: true
				})
				.success(function(response) {
					logger.info('TeamService->getRegisteredTeam3 returned: ', response);
					service.data = response;
				})
				.error(function(error) {
					logger.error('TeamService->getRegisteredTeam3 failed: ', error);
				});
			}

			service.registerTeam3 = function(data) {
				var url = resource + 'registerTeam3';

				logger.debug('TeamService->registerTeam3 AJAX: ' + url, data);

				return $http({
					method: 'POST',
					url: url,
					data: data,
					cache: false
				})
				.success(function(response) {
					logger.info('TeamService->registerTeam5 returned: ', response);
				})
				.error(function(error) {
					logger.error('TeamService->registerTeam5 failed: ', error);
				});
			}

			service.registerTeam5 = function(data) {
				var url = resource + 'registerTeam5';

				logger.debug('TeamService->registerTeam5 AJAX: ' + url, data);

				return $http({
					method: 'POST',
					url: url,
					data: data,
					cache: false
				})
				.success(function(response) {
					logger.info('TeamService->registerTeam5 returned: ', response);
				})
				.error(function(error) {
					logger.error('TeamService->registerTeam5 failed: ', error);
				});
			}

			return service;
		}]);
})(this, angular);