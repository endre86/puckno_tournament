'use strict';

(function(ng) {
	ng.module('AdminServices')
	.factory('Auth', ['$http', 'SERVICE_RESPONSES',
		function($http, SERVICE_RESPONSES) {
			var resource = 'php/api.php?authentication';

			var service = {};
			service.data = {
				isAuthenticated: false
			};

			service.login = function(credentials) {
				return $http({
					method: 'POST',
					url: resource,
					data: credentials,
					isArray: false,
					cached: false
				})
				.then(function(response) {
					if(response.data.status === SERVICE_RESPONSES.status_success) {
						service.data.isAuthenticated = true;
					}
				});
			}

			service.logout = function() {
				return $http({
					method: 'POST',
					url: resource,
					isArray: false,
					cached: false
				})
				.then(function(response) {
					if(response.data.status === SERVICE_RESPONSES.status_success) {
						service.data.isAuthenticated = false;
					}
				})
			}

			service.isLoggedIn = function() {
				return service.data.isAuthenticated;
			}

			return service;
		}]);
})(angular);