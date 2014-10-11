'use strict';

(function(ng) {
	var constants = ng.module('Constants');
	
	constants.constant('SERVICE_RESPONSES', {
		status_success: 'success',
		status_error: 'error'
	});

	constants.constant('PLAYER', {
		rank: {isNumeric: true},
		player: {isNumeric: false},
		club: {isNumeric: false},
		nation: {isNumeric: false},
		points: {isNumeric: true},
		best: {isNumeric: true}
	});
})(angular);