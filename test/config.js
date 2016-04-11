'use strict';

require('mocha');
var assert = require('assert');
var config = require('..');
var Base = require('base');
var base;

describe('.config', function() {
  describe('plugin', function() {
    it('should only register the plugin once', function(cb) {
      base = new Base();
      base.registered = {};

      var count = 0;
      base.on('plugin', function(name) {
        if (name === 'base-config-process') {
          count++;
        }
      });

      base.use(config());
      base.use(config());
      base.use(config());
      base.use(config());
      base.use(config());
      assert.equal(count, 1);
      cb();
    });
  });
});
