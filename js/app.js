'use strict';

(function(ng) {
	ng.module('TournamentRoutes', ['ui.router']);
	ng.module('Utilities', []);
	ng.module('Constants', []);
	ng.module('TournamentServices', []);
	ng.module('TournamentControllers', []);
	ng.module('AdminControllers', []);
	ng.module('AdminServices', []);

	var app = ng.module('PucknoTournament', [
		// 'ui.router',

		// 'localization',
		'TournamentRoutes',
		'Utilities',
		'Constants',

		'TournamentControllers',
		'TournamentServices',
		'TournamentFilters',

		'AdminControllers',
		'AdminServices'
	]);

})(angular);