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
			$scope.selectedTab = '';
		}]);

	controllers.controller('TournamentInfoCtrl', ['$scope', '$stateParams', 'Tournament',
		function($scope, $stateParams, Tournament) {
			$scope.$parent.selectedTab = 'info';
		}]);

	controllers.controller('RegisteredPlayersCtrl', ['$scope', '$state', 'TournamentPlayers',
		function($scope, $state, TournamentPlayers) {
			$scope.$parent.selectedTab = 'players';

			$scope.$watch('viewTournament', function() {
				showPlayersFor($scope.viewTournament);
			});
			$scope.viewTournament = $scope.tournament.subtournaments[0];

			function showPlayersFor(subtournamentId) {
				TournamentPlayers.get({subtournamentId: $scope.viewTournament.id}, function(data) {
						$scope.tournamentPlayers = data;
						console.log(data);
					}
				);
			}

			$scope.viewTournament;
			$scope.orderedOn = 'wr';

			$scope.setOrder = function(order) {
				if(order === $scope.orderedOn) {
				   $scope.orderedOn = '-' + order;
				}
				else {
					$scope.orderedOn = order;
				}

				$scope.orderedOn = order;
			};
		}]);

	controllers.controller('LiveCtrl', ['$scope', '$state',
		function($scope, $state) {
		}]);

	controllers.controller('RegisterCtrl', ['$scope', '$state',
		function($scope, $state) {
			$scope.$parent.selectedTab = 'register';
			$scope.ithfSelectBox = [{name: "Player1", value: 0}, {name: "Player2", value: 1}, {name: "Player3", value: 2}];
		}]);

	controllers.controller('RegisterExistingPlayerCtrl', ['$scope', '$state',
		function($scope, $state) {
		}]);

	controllers.controller('RegisterNewPlayerCtrl', ['$scope', '$state',
		function($scope, $state) {
		}]);
})(angular);
