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

			logger.debug = function(param, obj) {
				if(debug) {
					obj ? console.debug(param, obj) : console.debug(param);
				}
			};

			logger.info = function(param, obj) {
				if(info) {
					obj ? console.info(param, obj) : console.info(param);
				}
			};

			logger.error = function(param, obj) {
				if(error) {
					obj ? console.error(param, obj) : console.error(param);
				}
			};

			logger.log = function(param, obj) {
				if(log) {
					obj ? console.log(param, obj) : console.log(param);
				}
			};

			return logger;
		}]);
})(angular);