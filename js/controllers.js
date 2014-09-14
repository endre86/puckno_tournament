'use strict';

(function(ng) {
	var controllers = ng.module('tournamentControllers', []);

	controllers.controller('AllTournamentsCtrl', ['$scope', 'Tournament',
		function($scope, Tournament) {
			$scope.tournaments = Tournament.query();
		}]);

	controllers.controller('TournamentCtrl', ['$scope', '$stateParams', 'Tournament',
		function($scope, $stateParams, Tournament) {
			$scope.tournament = Tournament.get({tournamentId: $stateParams.tournamentId});
		}]);

	controllers.controller('TournamentInfoCtrl', ['$scope', '$stateParams', 'Tournament',
		function($scope, $stateParams, Tournament) {

		}]);

	controllers.controller('RegisteredPlayersCtrl', ['$scope', '$state', 'TournamentPlayers',
		function($scope, $state, TournamentPlayers) {
			$scope.tournamentPlayers = TournamentPlayers.get(function() {
				$scope.viewTournament = $scope.tournamentPlayers.subtournaments[0];
			});

			$scope.viewTournament;
			$scope.order = 'wr';
			$scope.orderedOn = 'wr';

			$scope.setOrder = function(order) {
				if(order === $scope.order) {
				   $scope.order = '-' + order;
				}
				else {
					$scope.order = order;
				}

				$scope.orderedOn = order;
			};
		}]);
})(angular);
