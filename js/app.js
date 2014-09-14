'use strict';

(function(ng) {
	var app = ng.module('PucknoTournament', [
		'ngRoute',
		'tournamentControllers',
		'tournamentServices',
		'tournamentFilters'
	]);

	app.config(['$routeProvider',  
		function($routeProvider) {
			$routeProvider
			.when('/', {
				templateUrl: 'templates/all-tournaments.html',
				controller: 'AllTournamentsCtrl'
			})
			.when('/tournament/:tournamentId', {
				templateUrl: 'templates/tournament-info.html',
				controller: 'TournamentInfoCtrl'
			})
			.when('/tournament/:tournamentId/players', {
				templateUrl: 'templates/tournament-players.html',
				controller: 'RegisteredPlayersCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
		}]);
})(angular);