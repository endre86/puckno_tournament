'use strict';

(function(ng) {
	var tournamentFilters = ng.module('tournamentFilters', []);

	tournamentFilters.filter('prettyprintDatestamp', function() {
		return function(datestamp) {
			if(datestamp) {
				var dateArr = datestamp.split('-');
				var date = new Date(dateArr[0], dateArr[1], dateArr[2]);
				return App.Utils.getNoDayName(date.getDay()) + ' ' +
					   date.getDate() + '. ' + 
					   App.Utils.getNoMonthName(date.getMonth()) + ' ' + 
					   dateArr[0];
			}

			return datestamp;
		};
	});
})(angular);