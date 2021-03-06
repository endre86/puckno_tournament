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

	controllers.controller('TournamentCtrl', ['$scope', '$stateParams', '$translate', 'Tournament', 'logger',
		function($scope, $stateParams, $translate, Tournament, logger) {
			$scope.selectedTab ? $scope.selectedTab : 'info';

			var tournamentId = $stateParams.tournamentId;

			logger.debug('TournamentCtrl: Getting tournament ' + tournamentId);
			Tournament.get(tournamentId)
				.then(function() {
					logger.debug('Setting language according to tournament data:', Tournament.data.language);
					$translate.use(Tournament.data.language);
					$scope.tournament = Tournament.data;
				});
		}]);

	controllers.controller('TournamentInfoCtrl', ['$scope', '$sce', '$stateParams', 'Tournament', 'logger',
		function($scope, $sce, $stateParams, Tournament, logger) {
			logger.debug('TournamentInfoCtrl: Nothing to do..');

			$scope.trustHtml = function(html) {
				return $sce.trustAsHtml(html);
			}
		}]);

	controllers.controller('TournamentProgramCtrl', ['$scope', '$stateParams', 'Tournament', 'logger',
		function($scope, $stateParams, Tournament, logger) {
			logger.debug('TournamentProgramCtrl: Nothing to do..');
		}]);

	controllers.controller('RegisteredPlayersCtrl', ['$scope', 'Tournament', 'Players', 'Teams', 'SUBTOUR_TYPE', 'logger',
		function($scope, Tournament, Players, Teams, SUBTOUR_TYPE, logger) {
			logger.debug('RegisteredPlayersCtrl: Setting orderOn to "wr"');

			if(Tournament.data.subtournaments) {
				logger.debug('RegisteredPlayersCtrl: Subtournaments loaded, setting to scope.');
				$scope.viewSubTournament = Tournament.data.subtournaments[0];
			}
			else {
				logger.debug('RegisteredPlayersCtrl: Subtournaments not loaded!');
				logger.debug('RegisteredPlayersCtrl: Setting up watch on tournament data.');
				$scope.$watch(Tournament.data.subtournaments, function() {
					if(Tournament.data.subtournaments) {
						logger.debug('RegisteredPlayersCtrl: Tournament loaded: ', Tournament.data);
						$scope.viewSubTournament = Tournament.data.subtournaments[0];
					}
				});
			}

			$scope.$watch('viewSubTournament', function() {
				logger.debug('RegisteredPlayersCtrl: setting viewSubTournament to ', $scope.viewSubTournament);
				
				if(!$scope.viewSubTournament) {
					logger.debug('RegisteredPlayersCtrl: No subtournament selected.');
					return;
				}

				switch($scope.viewSubTournament.type) {
					case SUBTOUR_TYPE.individual:
						logger.log('RegisteredPlayersCtrl: Show individual subtournament.');
						showIndividualSubTournament($scope.viewSubTournament);
						break;
					case SUBTOUR_TYPE.team_3:
						logger.log('RegisteredPlayersCtrl: Show team_3 subtournament.');
						showTeam3SubTournament($scope.viewSubTournament.id);
						break;
					case SUBTOUR_TYPE.team_5:
						logger.log('RegisteredPlayersCtrl: Show team_5 subtournament.');
						showTeam5SubTournament($scope.viewSubTournament.id);
						break;
					default:
						logger.error('RegisteredPlayersCtrl: Unknown tournament type for subtournament: ', $scope.viewSubTournament);
						break;
				}
			});
			
			$scope.sortPlayersBy = function(property) {
				logger.debug('RegisteredPlayersCtrl: Sorting players by ', property);
				Players.sortPlayers(property);
				$scope.orderedOn = property;
			}

			function showIndividualSubTournament(subtournament) {
				logger.debug('RegisteredPlayersCtrl: show individual subtournament: ', subtournament);
				Players.getRegisteredPlayers(subtournament)
				.then(function() {
					$scope.tournamentPlayers = Players.data;
				});
			}

			function showTeam3SubTournament(subtournamentId) {
				Teams.getRegisteredTeam3(subtournamentId)
				.then(function() {
					$scope.tournamentTeams = Teams.data;
				});
			}

			function showTeam5SubTournament(subtournamentId) {
				Teams.getRegisteredTeam5(subtournamentId)
				.then(function() {
					$scope.tournamentTeams = Teams.data;
				});
			}
		}]);

	controllers.controller('LiveCtrl', ['$scope', '$state', 'logger',
		function($scope, $state, logger) {
			logger.info('LiveCtrl: Function not implemented!');
		}]);

	controllers.controller('RegisterCtrl', ['$scope', 'Tournament', 'Players', 'Teams', 'IthfPlayers', 'SUBTOUR_TYPE', 'SERVICE_RESPONSES', 'logger',
		function($scope, Tournament, Players, Teams, IthfPlayers, SUBTOUR_TYPE, SERVICE_RESPONSES, logger) {
			$scope.regform = {};
			$scope.SUBTOUR_TYPE = SUBTOUR_TYPE;

			if(Tournament.data.subtournaments) {
				var defaultTournament = Tournament.data.subtournaments[0];
				logger.debug('RegisterCtrl: setting registration subtournament to ', defaultTournament);
				$scope.regform.subtournament = defaultTournament;
			}

			$scope.$watch('regform.subtournament', function() {
				logger.debug('RegisterCtrl: Setting registration for: ', $scope.regform.subtournament);
				
				if(!$scope.regform.subtournament) {
					logger.debug('RegisterCtrl: No subtournament selected.');
					return;
				}
			});

			$scope.register = function(regform) {
				switch(regform.subtournament.type) {
					case SUBTOUR_TYPE.individual:
						logger.debug('RegisterCtrl: Register for individual tournament: ', $scope.regform.subtournament);
						registerIndividual(regform);
						break;
					case SUBTOUR_TYPE.team_3:
						logger.debug('RegisterCtrl: Register for team_3 tournament: ', $scope.regform.subtournament);
						registerTeam3(regform);
						break;
					case SUBTOUR_TYPE.team_5:
						logger.debug('RegisterCtrl: Register for team_5 tournament: ', $scope.regform.subtournament);
						registerTeam5(regform);
						break;
					default:
						logger.error('RegisterCtrl: Could not register, unknown tournament type for subtournament: ', $scope.regform.subtournament);
						break;
				}
			}

			function registerIndividual(regform) {
				logger.debug('RegisterCtrl.registerIndividual: ', regform);
				
				if(regform.playerType === 'existing') {
					registerIndividualIthf(regform);
				}
				else if(regform.playerType === 'new') {
					registerIndividualNew(regform);
				}
				else {
					logger.error('RegisterCtrl: Could not understand player type for individual registration: ', regform);
					showErrorMessage('Could not understand the player type: ' + regform.playerType);
				}
			}

			function registerIndividualIthf(regform) {
				if(!regform || !regform.subtournament || !regform.player) {
					logger.debug('RegisterCtrl: registerIndividualIthf called but missing required data: ', regform);
					showErrorMessage('Make sure you\'ve selected both a valid tournament and player.');
					return;
				}

				var postdata = {
					playerId: regform.player.id,
					subtournamentId: regform.subtournament.id
				};

				logger.debug('RegisterCtrl: Registering individual ITHF with: ', postdata);

				Players.registerIthfPlayer(postdata)
				.then(
					function(response) {
						logger.info('RegisterCtrl: Callback from registration: ', response);
						showOkMessage(response);
					},
					function(error) {
						logger.error('RegisterCtrl: Registration failed: ', error);
						showErrorMessage(error);
					});
			}

			function registerIndividualNew(regform) {
				if(!regform ||
				   !regform.subtournament || 
				   !regform.name || 
				   !regform.name.length >= 5) {
				   	logger.error('RegisterCtrl: registerIndividualNew called, but missing data: ', regform);
					showErrorMessage('Make sure that you have selected a tournament and supplied a name with at least 5 characters.');
					return;
				}

				var postdata = {
					subtournamentId: regform.subtournament.id,
					player: regform.name,
					club: regform.club || '???',
					nation: (regform.nation.toLowerCase() === 'norway' ? 'NOR' : regform.nation)
				}

				Players.registerLocalPlayer(postdata).then(
					function(response) {
						logger.info('RegisterCtrl: Callback from registration: ', response);
						showOkMessage(response);
					},
					function(error) {
						logger.error('RegisterCtrl: Registration failed: ', error);
						showErrorMessage(error);
					});
			}

			function registerTeam3(regform) {
				logger.debug('RegisterCtrl.registerTeam3: ', regform );

				if(!regform ||
				   !regform.teamName ||
				   regform.teamName.length < 3 ||
				   !regform.player1 ||
				   regform.player1.length < 5 ||
				   !regform.player2 ||
				   regform.player2.length < 5 ||
				   !regform.player3 ||
				   regform.player3.length < 5) {
					logger.error('RegisterCtrl: registerTeam3 called, but missing data: ', regform);
					showErrorMessage('Make sure that you have selected a tournament and supplied a team name at least 3 characters long as well as three player names that are at least 5 characters long.');
					return;
				}

				var postData = {
					subtournamentId: regform.subtournament.id,
					name: regform.teamName,
					player1: regform.player1,
					player2: regform.player2,
					player3: regform.player3
				}

				Teams.registerTeam3(postData).then(
					function(response) {
						logger.info('RegisterCtrl: Callback from registration: ', response);
						showOkMessage(response);
					},
					function(error) {
						logger.error('RegisterCtrl: Registration failed: ', error);
						showErrorMessage(error);
					});
			}

			function registerTeam5(regform) {
				logger.debug('RegisterCtrl.registerTeam5: ', regform );

				if(!regform ||
				   !regform.teamName ||
				   regform.teamName.length < 3 ||
				   !regform.player1 ||
				   regform.player1.length < 5 ||
				   !regform.player2 ||
				   regform.player2.length < 5) {
					logger.error('RegisterCtrl: registerTeam5 called, but missing data: ', regform);
					showErrorMessage('Make sure that you have selected a tournament and supplied a team name at least 3 characters long as well as minimum two player names that are at least 5 characters long.');
					return;
				}

				var postData = {
					subtournamentId: regform.subtournament.id,
					name: regform.teamName,
					player1: regform.player1,
					player2: regform.player2,
					player3: regform.player3,
					player4: regform.player4,
					player5: regform.player5
				}

				Teams.registerTeam5(postData).then(
					function(response) {
						logger.info('RegisterCtrl: Callback from registration: ', response);
						showOkMessage(response);
					},
					function(error) {
						logger.error('RegisterCtrl: Registration failed: ', error);
						showErrorMessage(error);
					});
			}

			$scope.$watch('regform.ithfNamequery', function(data) {
				updateIthfSearch(data);
			});

			function updateIthfSearch(query) {
				logger.debug('RegisterExistingPlayerCtrl: Updating ITHF search: ', query);
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

			function showErrorMessage(errorResponse) {
				$scope.regform.success = false;
				$scope.regform.error = errorResponse;
			}

			function showOkMessage(okResponse) {
				$scope.regform.success = (okResponse.data.status === SERVICE_RESPONSES.status_success);
				$scope.regform.error = okResponse.data.message;
			}
		}]);
})(angular);
