'use strict';

(function(ng) {
	var tournamentFilters = ng.module('tournamentFilters', []);

	tournamentFilters.filter('prettyprintDatestamp', function() {
		return function(datestamp) {
			if(datestamp) {
				var dateArr = datestamp.split('-');
				var date = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
				return App.Utils.getNoDayName(date.getDay()) + ' ' +
					   date.getDate() + '. ' + 
					   App.Utils.getNoMonthName(date.getMonth()) + ' ' + 
					   dateArr[0];
			}

			return datestamp;
		};
	});

	tournamentFilters.filter('daysUntil', function() {
		return function (datestamp) {
			if(datestamp) {
				var dateArr = datestamp.split('-');

				var now = new Date();
				var then = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
				console.log(now);
				console.log(then);

				var oneDay = 24 * 60 * 60 * 1000;

				var days = Math.round((then.getTime() - now.getTime()) / oneDay);

				return days + 1; // correct for < 24 hours
			}
		}
	});
})(angular);