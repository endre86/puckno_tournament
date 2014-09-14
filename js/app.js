'use strict';

(function(ng) {
	var app = ng.module('PucknoTournament', [
		'ui.router',

		'tournamentControllers',
		'tournamentServices',
		'tournamentFilters'
	]);


	app.config(['$stateProvider', '$urlRouterProvider', 
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('all-tournaments', {
					url: '/',
					templateUrl: 'templates/all-tournaments.html',
					controller: 'AllTournamentsCtrl'
				})
				.state('tournament', {
					abstract: true,
					url: '/tournament/{tournamentId}',
					templateUrl: 'templates/tournament.html',
					controller: 'TournamentCtrl'
				})
				.state('tournament.info', {
					url: '/info',
					templateUrl: 'templates/tournament.info.html',
					controller: 'TournamentInfoCtrl'
				})
				.state('tournament.players', {
					url: '/players',
					templateUrl: 'templates/tournament.players.html',
					controller: 'RegisteredPlayersCtrl'
				});

			$urlRouterProvider.otherwise('/');
		}]);
})(angular);