'use strict';

var path = require('path');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('base-config', 'config');
require('base-config-schema', 'schema');
require('base-option', 'option');
require('mixin-deep', 'merge');
require('union-value', 'union');

/**
 * Cast `val` to an array
 */

utils.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

/**
 * Expose `utils`
 */

module.exports = utils;
