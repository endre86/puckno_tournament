'use strict';

(function(ng) {
	var constants = ng.module('Constants');
	
	constants.constant('SERVICE_RESPONSES', {
		status_success: 'success',
		status_error: 'error'
	});

	constants.constant('PLAYER', {
		rank: {
			value: 'rank',
			isNumeric: true},
		player: {
			value: 'player',
			isNumeric: false},
		club: {
			value: 'club',
			isNumeric: false},
		nation: {
			value: 'nation',
			isNumeric: false},
		points: {
			value: 'points',
			isNumeric: true},
		best: {
			value: 'best',
			isNumeric: true}
	});

	constants.constant('SUBTOUR_TYPE', {
		individual: 'individual',
		team_3: 'team_3',
		team_5: 'team_5'
	});
})(angular);