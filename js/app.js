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
				templateUrl: 'templates/list-all.html',
				controller: 'ListAllCtrl'
			})
			.when('/tournament/:tournamentId', {
				templateUrl: 'templates/tournament-info.html',
				controller: 'TournamentInfoCtrl'
			})
			.when('/tournament/:tournamentId/players', {
				templateUrl: 'templates/registered-players.html',
				controller: 'RegisteredPlayersCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
		}]);
})(angular);