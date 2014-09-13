'use strict';

(function(ng) {
	var tournamentFilters = ng.module('tournamentFilters', []);

	tournamentFilters.filter('prettyPrintDatestamp', function() {
		return function(datestamp) {
			if(datestamp) {
				var date = datestamp.split('-');
				return App.Utils.removeLeadingZero(date[2]) + ". " + 
					   App.Utils.getNoMonthName(date[1] - 1) + " " + 
					   date[0];
			}

			return datestamp;
		};
	});
})(angular);