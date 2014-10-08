'use strict';

(function(ng) {
	ng.module('Constants', []);
	ng.module('TournamentServices', []);
	ng.module('TournamentControllers', []);
	ng.module('AdminControllers', []);

	var app = ng.module('PucknoTournament', [
		'ui.router',

		// 'localization',
		'Constants'
		'TournamentControllers',
		'AdminControllers',
		'TournamentServices',
		'TournamentFilters'
	]);


	app
})(angular);