'use strict';

(function (_, plugin) {
	var _private = {
		'registerMixin' : function (_) {
			plugin.mixin[plugin.name] = plugin.fn;
			_.mixin(plugin.mixin);
		}
	};

	if (_) { // Global underscore.js
		plugin.fn = plugin.factory(_);
		plugin.mixin = {};
	}

	if (typeof exports !== 'undefined' && plugin.fn) { // CommonJS
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = plugin.fn;
		}

		exports[plugin.name] = plugin.fn;
	} else if (typeof define === 'function' && define.amd) { // AMD
		define(['underscore'], function (_) {
			plugin.fn = plugin.factory(_);

			_private.registerMixin(_);

			return plugin.fn;
		});
	} else if (!_) {
		/*
			underscore.js isn't defined and user is
			trying to use mixin directly without
			CommonJS or AMD support
		*/
		throw 'underscore.js not defined.';
	} else {
		_private.registerMixin(_);
	}
})(window._, {
	'name' : 'normalize',
	'factory' : function (_) {
		return function (original, scaled) {
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
	}
});