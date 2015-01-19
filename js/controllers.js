'use strict';

(function(ng) {
	var controllers = ng.module('TournamentControllers');

	controllers.controller('AllTournamentsCtrl', ['$scope', 'Tournament', 'logger',
		function($scope, Tournament, logger) {
			logger.debug('AllTournamentsCtrl: Getting all tournaments.');
			Tournament.query()
			.then(function() {
				$scope.tournaments = Tournament.data;
			});
		}]);

	controllers.controller('TournamentCtrl', ['$scope', '$stateParams', 'Tournament', 'logger',
		function($scope, $stateParams, Tournament, logger) {
			$scope.selectedTab = '';

			var tournamentId = $stateParams.tournamentId;

			logger.debug('TournamentCtrl: Getting tournament ' + tournamentId);
			Tournament.get(tournamentId)
				.then(function() {
					$scope.tournament = Tournament.data;
				});
		}]);

	controllers.controller('TournamentInfoCtrl', ['$scope', '$stateParams', 'Tournament', 'logger',
		function($scope, $stateParams, Tournament, logger) {
			logger.debug('TournamentInfoCtrl: setting selected tab to "info"');
			$scope.$parent.selectedTab = 'info';
		}]);

	controllers.controller('TournamentProgramCtrl', ['$scope', '$stateParams', 'Tournament', 'logger',
		function($scope, $stateParams, Tournament, logger) {
			logger.debug('TournamentProgramCtrl: setting selected tab to "program"');
			$scope.$parent.selectedTab = 'program';
		}]);

	controllers.controller('RegisteredPlayersCtrl', ['$scope', '$state', 'Tournament', 'Players',
		function($scope, $state, Tournament, Players) {
			$scope.$parent.selectedTab = 'players';
			$scope.orderedOn = 'wr';

			if(Tournament.data.subtournaments) {
				$scope.viewTournament = Tournament.data.subtournaments[0];
			}

			$scope.$watch('viewTournament', function() {
				showPlayersFor($scope.viewTournament.id);
			});
			
			$scope.sortPlayersBy = function(property) {
				Players.sortPlayers(property);
				$scope.orderedOn = property;
			}

			function showPlayersFor(subtournamentId) {
				Players.getRegisteredPlayers(subtournamentId)
				.then(function() {
					Players.sortPlayers('rank');
					$scope.tournamentPlayers = Players.data;
				});
			}
		}]);

	controllers.controller('LiveCtrl', ['$scope', '$state',
		function($scope, $state) {
		}]);

	controllers.controller('RegisterCtrl', ['$scope', '$state', 'Tournament',
		function($scope, $state, Tournament) {
			$scope.$parent.selectedTab = 'register';
			$scope.regform = {};

			if(Tournament.data.subtournaments) {
				$scope.regform.subtournament = Tournament.data.subtournaments[0];
			}
		}]);

	controllers.controller('RegisterExistingPlayerCtrl', ['$scope', '$state', 'SERVICE_RESPONSES', 'IthfPlayers', 'Players',
		function($scope, $state, SERVICE_RESPONSES, IthfPlayers, Players) {
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
						$scope.regform.success = (response.data.status === SERVICE_RESPONSES.status_success);
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
						.then(function(response) {
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

	controllers.controller('RegisterNewPlayerCtrl', ['$scope', '$state', 'SERVICE_RESPONSES', 'Players',
		function($scope, $state, SERVICE_RESPONSES, Players) {
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
				
				Players.registerLocalPlayer(postdata).then(
					function(response) {
						$scope.regform.success = (response.data.status === SERVICE_RESPONSES.status_success);
						$scope.regform.error = response.data.message;
					},
					function(error) {
						$scope.regform.success = false;
						$scope.regform.error = error;
					});
			}
		}]);
})(angular);
