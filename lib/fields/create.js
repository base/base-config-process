'use strict';

var path = require('path');

/**
 * Create the given template collections.
 *
 * ```json
 * {
 *   "name": "my-project",
 *   "verb": {
 *     "create": {
 *       "pages": {
 *         "cwd": "templates/pages"
 *       },
 *       "posts": {
 *         "cwd": "templates/posts"
 *       }
 *     }
 *   }
 * }
 * ```
 * @name cwd
 * @api public
 */

module.exports = function(app) {
  return function(collections, key, config, next) {
    app.debug('command > %s: "%j"', key, collections);

    for (var key in collections) {
      var options = collections[key];
      if (typeof options.cwd === 'string') {
        options.cwd = path.resolve(options.cwd);
      }
      app.create(key, options);
    }

    next();
  };
};
