'use strict';

(function(ng) {
	var constants = ng.module('Constants');
	constants.constant('SERVICE_RESPONSES', {
		status_success: 'success',
		status_error: 'error'
	});
})(angular);