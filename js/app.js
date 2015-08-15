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
		'pascalprecht.translate',

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

	app.config(['$translateProvider', function($translateProvider) {
		$translateProvider.useSanitizeValueStrategy('escape');
		$translateProvider.useStaticFilesLoader({
			files: [{
				prefix: 'i18n/',
				suffix: '.json'
			}]
		});

		$translateProvider.preferredLanguage('no');
		$translateProvider.forceAsyncReload(true);
	}]);

})(angular);