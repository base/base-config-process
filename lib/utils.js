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

/**
 * Expose `utils`
 */

module.exports = utils;
