'use strict';

/**
 * Load views onto the given collections.
 *
 * ```json
 * {"verb": {"plugins": {"eslint": {"name": "gulp-eslint"}}}}
 * ```
 * @name plugins
 * @api public
 */

module.exports = function(app) {
  return function(collections, key, config, next) {
    if (typeof app.create !== 'function') {
      next(new Error('expected app.create to be a function'));
      return;
    }

    for (var prop in collections) {
      if (typeof this[prop] !== 'function') {
        app.create(prop);
      }

      app.debug('loading collection "%s"', prop);
      this[prop].addView(collections[prop]);
    }
    next();
  };
};
