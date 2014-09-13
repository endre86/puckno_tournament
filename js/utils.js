(function(window) {
	window.App = window.App || {};
	var Utils = window.App.Utils = window.App.Utils || {};

	Utils.getNoMonthName = function(month) {
		if(parseInt(month) && 
		   parseInt(month) <= 11 && 
		   parseInt(month) >= 0) {
			return noMonths[parseInt(month)];
		}

		return 'Invalid month index: ' + month;
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

})(this);