'use strict';

(function(ng) {
	var controllers = ng.module('AdminControllers');

	controllers.controller('AdminCtrl', ['$scope', '$state', 'Auth', 
		function($scope, $state, Auth) {
			if(!Auth.isLoggedIn()) {
				// $state.go('admin.login'); // TODO: DEBUG => UNCOMMENT
			}
		}]);

	controllers.controller('AdminLoginCtrl', ['$scope', '$state', '$location', 'Auth',
		function($scope, $state, $location, Auth) {
			if(Auth.isLoggedIn()) {
				$state.go('admin.tournaments');
			}

			$scope.login = function(credentials) {
				Auth.login(credentials)
				.then(function(response) {
					if(Auth.isLoggedIn()) {
						$state.go('admin.tournaments');
					}
					else {
						$scope.loginform.success = false;
						$scope.loginform.error = 'Bad username / password combination.';
					}
				});
			}
		}]);

	controllers.controller('AdminTournamentsCtrl', ['$scope', '$state', 'Tournament',
		function($scope, $state, Tournament) {
			Tournament.query()
			.then(function() {
				$scope.tournaments = Tournament.data;
			});
		}]);

	controllers.controller('AdminTournamentCtrl', ['$scope', '$state', 
		function($scope, $state) {
			
		}]);

	controllers.controller('AdminPlayersCtrl', ['$scope', '$state', 
		function($scope, $state) {
			
		}]);
})(angular);
