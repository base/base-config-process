'use strict';

var debug = require('debug')('base:config:process');
var fields = require('./lib/fields/');
var utils = require('./lib/utils');

/**
 * Custom mappings for the base-config plugin.
 */

module.exports = function(options) {
  return function(app, base) {
    if (this.isRegistered('base-config-process')) return;
    var opts = utils.merge({}, options, this.options);
    var schema;

    if (typeof this.config === 'undefined') {
      this.use(utils.config(opts));
    }

    if (typeof this.option === 'undefined') {
      this.use(utils.option(opts));
    }

    Object.defineProperty(this.config, 'schema', {
      configurable: true,
      enumerable: true,
      set: function(val) {
        schema = val;
      },
      get: function() {
        return schema || utils.schema(app, opts);
      }
    });

    // add commands
    for (var key in fields) {
      debug('mapping field "%s"', key);
      app.config.map(key, fields[key](app, base, opts));
    }

    var fn = this.config.process;

    this.config.process = function(val, cb) {
      var obj = this.schema.normalize(val, opts);
      fn.call(this, obj, function(err) {
        if (err) return cb(err);
        cb(null, obj);
      });
    };
  };
};
