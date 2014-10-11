'use strict';

(function(ng) {
	var routes = ng.module('TournamentRoutes');
	routes.config(['$stateProvider', '$urlRouterProvider',
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
					})
					.state('tournament.live', {
						url: '/live',
						templateUrl: 'templates/tournament.live.html',
						controller: 'LiveCtrl'
					})
					.state('tournament.register', {
						abstract: true,
						url: '/register',
						templateUrl: 'templates/tournament.register.html',
						controller: 'RegisterCtrl'
					})
					.state('tournament.register.existing-player', {
						url: '/existing-player',
						templateUrl: 'templates/tournament.register.existing-player.html',
						controller: 'RegisterExistingPlayerCtrl'
					})
					.state('tournament.register.new-player', {
						url: '/new-player',
						templateUrl: 'templates/tournament.register.new-player.html',
						controller: 'RegisterNewPlayerCtrl'
					})
					.state('admin', {
						abstract: true,
						url: '/admin',
						templateUrl: 'templates/admin/admin.html',
						controller: 'AdminCtrl'
					})
					.state('admin.login', {
						url: '/login',
						templateUrl: 'templates/admin/admin.login.html',
						controller: 'AdminLoginCtrl'
					})
					.state('admin.tournaments', {
						url: '/tournaments',
						templateUrl: 'templates/admin/admin.tournaments.html',
						controller: 'AdminTournamentsCtrl'
					})
					.state('admin.edit', {
						url: 'edit/{tournamentId}',
						templateUrl: 'templates/admin/admin.edit.html',
						controller: 'AdminTournamentCtrl'
					})

				$urlRouterProvider.otherwise('/');
			}]);
})(angular);
