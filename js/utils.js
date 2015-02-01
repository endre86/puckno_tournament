(function(window) {
	window.App = window.App || {};
	var Utils = window.App.Utils = window.App.Utils || {};

	Utils.getNoMonthName = function(month) {
		if(parseInt(month) <= 11 && 
		   parseInt(month) >= 0) {
			return noMonths[parseInt(month)];
		}

		return 'Invalid month index: ' + month;
	};

	Utils.getNoDayName = function(day) {
		if(parseInt(day) <= 6 && 
		   parseInt(day) >= 0) {
			return noDays[parseInt(day)];
		}

		return 'Invalid day index: ' + day;
	};

	Utils.removeLeadingZero = function(integerString) {
		return integerString.replace(/^(-?)0+/,'$1');
	};

	var noMonths = [
		'Januar',
		'Februar',
		'Mars',
		'April',
		'Mai',
		'Juni',
		'Juli',
		'August', 
		'September',
		'Oktober',
		'November',
		'Desember'
	];

	var noDays = [
		'Søn',
		'Man',
		'Tirs',
		'Ons',
		'Tors',
		'Fre',
		'Lør'
	];

})(this);