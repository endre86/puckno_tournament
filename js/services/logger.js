'use strict';

(function(ng) {
	ng.module('Utilities')
	.factory('logger', [

		function() {
			var logger = {};

			var debug = true;
			var info = true;
			var error = true;
			var log = true;

			logger.debug = function(param) {
				if(debug) {
					console.debug(param);
				}
			};

			logger.info = function(param) {
				if(info) {
					console.info(param);
				}
			};

			logger.error = function(param) {
				if(error) {
					console.error(param);
				}
			};

			logger.log = function(param) {
				if(log) {
					console.log(param);
				}
			};

			return logger;
		}]);
})(angular);