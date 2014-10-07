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
			$scope.regform = {};

			if($scope.tournament.subtournaments) {
				$scope.regform.tournament = $scope.tournament.subtournaments[0];
			}
		}]);

	controllers.controller('RegisterExistingPlayerCtrl', ['$scope', '$state', 'TournamentPlayers', 'IthfPlayers',
		function($scope, $state, TournamentPlayers, IthfPlayers) {
			$scope.regform = {};

			$scope.$watch('regform.namequery', function(data) {
				// console.log(data + "!");
				updateIthfSearch(data);
				// console.log($scope.ithfplayer);
			});

			$scope.registerIthfPlayer = function(data) {
				if(data && data.tournament && data.player) {
					TournamentPlayers.put({
						subtournamentId: data.tournament.id,
						type: 'ithf',
						playerId: data.player.id})
						.$promise.then(
							function(response) {
								$scope.regform.success = (response.status === 'success');
								$scope.regform.error = response.error;
							},
							function(error) {
								$scope.regform.success = false;
								$scope.regform.error = error;
							});
				}
			}

			function updateIthfSearch(query) {
				if(query && query.trim().length >= 3) {
					var ithfquery = '%' + query.trim().replace(/ /g, '%') + '%';
					
					IthfPlayers.get({query: ithfquery}, function(data) {
						$scope.regform.players = data;
						$scope.regform.player = data[0];
					});
				}
			}
		}]);

	controllers.controller('RegisterNewPlayerCtrl', ['$scope', '$state', 'TournamentPlayers',
		function($scope, $state, TournamentPlayers) {
			$scope.regform = {};

			$scope.registerLocalPlayer = function(data) {
				if(data &&
				   data.tournament && 
				   data.name && 
				   data.name.length >= 5) {

					var club = data.club || '???';
					var nation = (data.nation.toLowerCase() === 'norway' ? 'NOR' : data.nation);
					TournamentPlayers.put({
						subtournamentId: data.tournament.id,
						type: 'local',
						player: data.name,
						club: club,
						nation: nation})
					.$promise.then(
						function(response) {
							$scope.regform.success = (response.status === 'success');
							$scope.regform.error = response.error;
						},
						function(error) {
							$scope.regform.success = false;
							$scope.regform.error = error;
						});;
				}
			}
		}]);

	controllers.controller('AdminCtrl', ['$scope', '$state', 
		function($scope, $state) {
			
		}]);

	controllers.controller('AdminLoginCtrl', ['$scope', '$state', 
		function($scope, $state) {
			
		}]);

	controllers.controller('AdminTournamentCtrl', ['$scope', '$state', 
		function($scope, $state) {
			
		}]);

	controllers.controller('AdminPlayersCtrl', ['$scope', '$state', 
		function($scope, $state) {
			
		}]);
})(angular);
