'use strict';

require('mocha');
var assert = require('assert');
var schema = require('..');
var config = require('base-config');
var Base = require('base');
var base;

describe('.map.cwd', function() {
  beforeEach(function() {
    base = new Base();
    base.use(config());
    base.use(schema());
  });

  describe('cwd', function() {
    it('should set a cwd on app', function(cb) {
      base.on('cwd', function(val) {
        assert.equal(val, process.cwd());
        cb();
      });

      base.config.process({cwd: process.cwd()}, function(err) {
        if (err) return cb(err);
      });
    });
  });
});
