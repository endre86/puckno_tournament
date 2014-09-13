'use strict';

(function(ng) {
	var controllers = ng.module('tournamentControllers', []);

	controllers.controller('ListAllCtrl', ['$scope', 'Tournament',
		function($scope, Tournament) {
			$scope.tournaments = Tournament.query();
		}]);

	controllers.controller('TournamentInfoCtrl', ['$scope', '$routeParams', 'Tournament', 
		function($scope, $routeParams, Tournament) {
			$scope.tournament = Tournament.get({tournamentId: $routeParams.tournamentId});
		}]);

	controllers.controller('RegisteredPlayersCtrl', ['$scope', '$routeParams', 'TournamentPlayers',
		function($scope, $routeParams, TournamentPlayers) {
			$scope.registeredPlayers = TournamentPlayers.get();
		}]);
})(angular);
