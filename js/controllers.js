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
			$scope.ithfSelectBox = [];
		}]);

	controllers.controller('RegisterExistingPlayerCtrl', ['$scope', '$state', 'TournamentPlayers', 'IthfPlayers',
		function($scope, $state, TournamentPlayers, IthfPlayers) {
			$scope.$watch('ithfquery', function() {
				updateIthfSearch($scope.ithfquery);
			});

			if($scope.tournament.subtournaments) {
				$scope.selectedTournament = $scope.tournament.subtournaments[0];
			}

			$scope.registerIthfPlayer = function() {
				if($scope.ithfSelectboxSelected) {
					TournamentPlayers.put({
							subtournamentId: $scope.selectedTournament.id,
							type: 'ithf',
							playerId: $scope.ithfSelectboxSelected.id}, 
							function(data) {
								console.log(data);
							});
				}
			}

			function updateIthfSearch(query) {
				if(query && query.trim().length >= 3) {
					var ithfquery = '%' + query.trim().replace(/ /g, '%') + '%';
					
					IthfPlayers.get({query: ithfquery}, function(data) {
						$scope.ithfSelectBox = data;
						$scope.ithfSelectboxSelected = data[0];
					});
				}
			}
		}]);

	controllers.controller('RegisterNewPlayerCtrl', ['$scope', '$state',
		function($scope, $state) {
		}]);
})(angular);
