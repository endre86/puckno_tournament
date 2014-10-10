'use strict';

(function(ng) {
	var controllers = ng.module('AdminControllers');

	controllers.controller('AdminCtrl', ['$scope', '$state', 'Auth', 
		function($scope, $state) {
			if(Auth.data.isAuthenticated) {
				$scope.loggedin = true;
			}
		}]);

	controllers.controller('AdminLoginCtrl', ['$scope', '$state', '$urlRouterProvider', 'Auth',
		function($scope, $state, Auth) {

			$scope.login = function(credentials) {
				Auth.login(credentials)
				.then(function(response) {
					console.log(response);
				});
			}
		}]);

	controllers.controller('AdminTournamentCtrl', ['$scope', '$state', 
		function($scope, $state) {
			
		}]);

	controllers.controller('AdminPlayersCtrl', ['$scope', '$state', 
		function($scope, $state) {
			
		}]);
})(angular);
