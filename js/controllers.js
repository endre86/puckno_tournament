'use strict';

(function(ng) {
	var controllers = ng.module('tournamentControllers');

	controllers.controller('AllTournamentsCtrl', ['$scope', 'Tournament',
		function($scope, Tournament) {
			Tournament.query()
			.then(function() {
				$scope.tournaments = Tournament.data;
			});
		}]);

	controllers.controller('TournamentCtrl', ['$scope', '$stateParams', 'Tournament',
		function($scope, $stateParams, Tournament) {
			$scope.selectedTab = '';

			Tournament.get($stateParams.tournamentId)
				.then(function() {
					$scope.tournament = Tournament.data;
				});
		}]);

	controllers.controller('TournamentInfoCtrl', ['$scope', '$stateParams', 'Tournament',
		function($scope, $stateParams, Tournament) {
			$scope.$parent.selectedTab = 'info';
		}]);

	controllers.controller('RegisteredPlayersCtrl', ['$scope', '$state', 'Players',
		function($scope, $state, Players) {
			$scope.$parent.selectedTab = 'players';
			$scope.orderedOn = 'wr';

			$scope.$watch('viewTournament', function() {
				showPlayersFor($scope.viewTournament.id);
			});
			$scope.viewTournament = $scope.tournament.subtournaments[0];

			function showPlayersFor(subtournamentId) {
				Players.get(subtournamentId)
				.then(function() {
					 $scope.tournamentPlayers = Players.data;
				});
			};

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

	controllers.controller('RegisterExistingPlayerCtrl', ['$scope', '$state', 'IthfPlayers', 'Players',
		function($scope, $state, IthfPlayers, Players) {
			$scope.regform = {};

			$scope.$watch('regform.namequery', function(data) {
				updateIthfSearch(data);
			});

			IthfPlayers.loadPlayers()
			.then(
				function(response) {
					$scope.regform.players = IthfPlayers.data;
				});

			$scope.registerIthfPlayer = function(data) {
				if(!data || !data.tournament || !data.player) {
					return;
				}

				Players.registerIthfPlayer(data.tournament.id, data.player.id)
				.then(
					function(response) {
						$scope.regform.success = (response.data.status === 'success');
						$scope.regform.error = response.data.message;
					},
					function(error) {
						$scope.regform.success = false;
						$scope.regform.error = error;
					});
			}

			function updateIthfSearch(query) {
				if(query && query.trim().length >= 3) {
					IthfPlayers.filterOn(query);
					$scope.regform.players = IthfPlayers.data;
				}
			}
		}]);

	controllers.controller('RegisterNewPlayerCtrl', ['$scope', '$state', 'Players',
		function($scope, $state, Players) {
			$scope.regform = {};

			$scope.registerLocalPlayer = function(data) {
				if(data &&
				   data.tournament && 
				   data.name && 
				   data.name.length >= 5) {

					var club = data.club || '???';
					var nation = (data.nation.toLowerCase() === 'norway' ? 'NOR' : data.nation);
					
					Players.registerLocalPlayer(data.tournament.id, data.name, club, nation).then(
						function(response) {
							$scope.regform.success = (response.data.status === 'success');
							$scope.regform.error = response.data.message;
						},
						function(error) {
							$scope.regform.success = false;
							$scope.regform.error = error.data;
						});
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
