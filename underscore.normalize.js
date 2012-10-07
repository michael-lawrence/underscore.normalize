'use strict';

(function () {
	if (_) { // Underscore.js
		var normalize = function (original, scaled) {
			var originalArray, originalMin, originalMax, scaledArray, scaledMin, scaledMax;

			if (_.isArray(original)) {
				originalArray = original;
			} else if(_.isObject(original) && !_.isFunction(original)) {
				originalArray = _.values(original);
			} else {
				throw 'Invalid parameter: original.';
			}

			if (_.isArray(scaled)) {
				scaledArray = scaled;
			} else if(_.isObject(scaled) && !_.isFunction(scaled)) {
				scaledArray = _.values(scaled);
			} else {
				throw 'Invalid parameter: scaled.';
			}

			originalMin = _.min(originalArray);
			originalMax = _.max(originalArray);
			scaledMin = _.min(scaledArray);
			scaledMax = _.max(scaledArray);

			return _.map(originalArray, function (value, key) {
				return scaledMin + (((value - originalMin) * (scaledMax - scaledMin)) / (originalMax - originalMin));
			});
		};

		if (typeof exports !== 'undefined') { // CommonJS
			if (typeof module !== 'undefined' && module.exports) {
				module.exports = normalize;
			}
			exports.normalize = normalize;
		} else if (typeof define === 'function' && define.amd) { // AMD
			define('underscore.normalize', [], function() {
				return normalize;
			});
		}

		_.mixin({'normalize' : normalize}); // Underscore.js
	} else {
		throw 'Underscore.js not defined.';
	}
})();