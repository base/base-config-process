'use strict';

var path = require('path');

/**
 * Set the current working directory.
 *
 * ```json
 * {
 *   "name": "my-project",
 *   "verb": {
 *     "cwd": "foo/bar"
 *   }
 * }
 * ```
 * @name cwd
 * @api public
 */

module.exports = function(app) {
  var cwds = [app.cwd || process.cwd()];

  return function(val, key, config, next) {
    app.debug('command > %s: "%j"', key, val);
    app.cwd = path.resolve(val);

    if (cwds[cwds.length - 1] !== app.cwd) {
      app.emit('cwd', app.cwd);
      cwds.push(app.cwd);
    }
    next();
  };
};

