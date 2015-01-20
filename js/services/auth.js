'use strict';

(function(ng) {
	ng.module('AdminServices')
	.factory('Auth', ['$http', 'SERVICE_RESPONSES', 'logger',
		function($http, SERVICE_RESPONSES, logger) {
			var resource = 'php/api.php?authentication';

			var service = {};
			service.data = {
				isAuthenticated: false
			};

			service.login = function(credentials) {
				var url = resource + 'login';
				var data = credentials;

				logger.debug('AuthService AJAX: ' + url, data);
				return $http({
					method: 'POST',
					url: url,
					data: data,
					isArray: false,
					cached: false
				})
				.then(function(response) {
					logger.info('AuthService: Got login response: ', response);
					if(response.data.status === SERVICE_RESPONSES.status_success) {
						service.data.isAuthenticated = true;
					}
				});
			}

			service.logout = function() {
				var url = resource + 'logout';

				logger.debug('AuthService: AJAX: ' + url)
				return $http({
					method: 'POST',
					url: url,
					isArray: false,
					cached: false
				})
				.then(function(response) {
					logger.info('AuthService: Got logout response: ', response);
					if(response.data.status === SERVICE_RESPONSES.status_success) {
						service.data.isAuthenticated = false;
					}
				})
			}

			service.isLoggedIn = function() {
				logger.debug('Checking if user is logged in: ' + service.data.isAuthenticated);
				return service.data.isAuthenticated;
			}

			return service;
		}]);
})(angular);