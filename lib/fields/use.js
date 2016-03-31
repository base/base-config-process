'use strict';

var path = require('path');
var utils = require('../utils');

/**
 * Define plugins to load. Value can be a string or array of module names.
 *
 * _(Modules must be locally installed and listed in `dependencies` or
 * `devDependencies`)_.
 *
 * ```json
 * {"verb":  {"use": ["base-option", "base-data"]}}
 * ```
 * @name use
 * @api public
 */

module.exports = function(app) {
  return function(val, key, config, next) {
    app.debug('command > %s: "%s"', key, val);

    for (var key in val) {
      app.use(val[key].fn);
    }
    next();
  };
};
