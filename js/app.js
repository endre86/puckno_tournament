'use strict';

(function(ng) {
	ng.module('TournamentRoutes', ['ui.router']);
	ng.module('Constants', []);
	ng.module('TournamentServices', []);
	ng.module('TournamentControllers', []);
	ng.module('AdminControllers', []);

	var app = ng.module('PucknoTournament', [
		// 'ui.router',

		// 'localization',
		'TournamentRoutes',
		'Constants',
		'TournamentControllers',
		'AdminControllers',
		'TournamentServices',
		'TournamentFilters'
	]);

})(angular);