'use strict';

(function(ng) {
	var controllers = ng.module('tournamentControllers', []);

	controllers.controller('AllTournamentsCtrl', ['$scope', 'Tournament',
		function($scope, Tournament) {
			$scope.tournaments = Tournament.query();
		}]);

	controllers.controller('TournamentInfoCtrl', ['$scope', '$routeParams', 'Tournament', 
		function($scope, $routeParams, Tournament) {
			$scope.tournament = Tournament.get({tournamentId: $routeParams.tournamentId});
		}]);

	controllers.controller('RegisteredPlayersCtrl', ['$scope', '$routeParams', 'TournamentPlayers',
		function($scope, $routeParams, TournamentPlayers) {
			$scope.tournamentPlayers = TournamentPlayers.get(function() {
				$scope.viewTournament = $scope.tournamentPlayers.subtournaments[0];
			});

			$scope.viewTournament;
			$scope.order = 'wr';

			$scope.setOrder = function(order) {
				if(order === $scope.order) {
				   $scope.order = '-' + order;
				}
				else {
					$scope.order = order;
				}
			};
		}]);
})(angular);
