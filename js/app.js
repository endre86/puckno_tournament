'use strict';

(function(ng) {
	var app = ng.module('PucknoTournament', [
		'ngRoute',
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

	// app.config(['$routeProvider',  
	// 	function($routeProvider) {
	// 		$routeProvider
	// 		.when('/', {
	// 			templateUrl: 'templates/all-tournaments.html',
	// 			controller: 'AllTournamentsCtrl'
	// 		})
	// 		.when('/tournament/:tournamentId', {
	// 			templateUrl: 'templates/tournament-info.html',
	// 			controller: 'TournamentInfoCtrl'
	// 		})
	// 		.when('/tournament/:tournamentId/players', {
	// 			templateUrl: 'templates/tournament-players.html',
	// 			controller: 'RegisteredPlayersCtrl'
	// 		})
	// 		.otherwise({
	// 			redirectTo: '/'
	// 		});
	// 	}]);
})(angular);