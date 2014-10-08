'use strict';

(function(ng) {
	var controllers = ng.module('TournamentControllers');

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
				Players.getRegisteredPlayers(subtournamentId)
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

	controllers.controller('RegisterCtrl', ['$scope', '$state', 'Tournament',
		function($scope, $state, Tournament) {
			$scope.$parent.selectedTab = 'register';
			$scope.regform = {};

			if(Tournament.data.subtournaments) {
				console.log('ere');
				$scope.regform.subtournament = Tournament.data.subtournaments[0];
			}
		}]);

	controllers.controller('RegisterExistingPlayerCtrl', ['$scope', '$state', 'IthfPlayers', 'Players',
		function($scope, $state, IthfPlayers, Players) {
			$scope.$watch('regform.namequery', function(data) {
				updateIthfSearch(data);
			});

			$scope.registerIthfPlayer = function(data) {
				if(!data || !data.subtournament || !data.player) {
					$scope.regform.success = false;
					$scope.regform.error = 'Make sure you\'ve selected both a valid tournament and player.';
					return;
				}

				var postdata = {
					playerId: data.player.id,
					subtournamentId: data.subtournament.id
				};

				Players.registerIthfPlayer(postdata)
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
					if(!IthfPlayers.data) {
						IthfPlayers.loadPlayers()
						.then(
							function(response) {
								updateUI(query);
							});

						return;
					}

					updateUI(query);
				}

				function updateUI(query) {
					IthfPlayers.filterOn(query);
					$scope.regform.players = IthfPlayers.data;
					$scope.regform.player = IthfPlayers.data[0];
				}
			}
		}]);

	controllers.controller('RegisterNewPlayerCtrl', ['$scope', '$state', 'Players',
		function($scope, $state, Players) {
			$scope.regform = {};

			$scope.registerLocalPlayer = function(data) {
				if(!data ||
				   !data.subtournament || 
				   !data.name || 
				   !data.name.length >= 5) {
					$scope.regform.success = false;
					$scope.regform.error = 'Make sure that you have selected a tournament and supplied a name with at least 5 characters.';
					return;
				}

				var postdata = {
					subtournamentId: data.subtournament.id,
					player: data.name,
					club: data.club || '???',
					nation: (data.nation.toLowerCase() === 'norway' ? 'NOR' : data.nation)
				}

				console.log(postdata);
				
				Players.registerLocalPlayer(postdata).then(
					function(response) {
						$scope.regform.success = (response.data.status === 'success');
						$scope.regform.error = response.data.message;
					},
					function(error) {
						$scope.regform.success = false;
						$scope.regform.error = error;
					});
			}
		}]);
})(angular);
