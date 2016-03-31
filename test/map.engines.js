'use strict';

require('mocha');
var assert = require('assert');
var fields = require('..');
var config = require('base-config');
var assemble = require('assemble-core');
var base;

describe('.map.engines', function() {
  beforeEach(function() {
    base = assemble();
    base.use(config());
    base.use(fields());
  });

  describe('engines', function() {
    it('should register an engine as a string', function(cb) {
      base.config.process({engines: 'engine-base'}, function(err) {
        assert(base.engines.hasOwnProperty('.base'));
        cb();
      });
    });

    it('should register an engine by object key', function(cb) {
      base.config.process({engines: {'*': 'engine-base'}}, function(err) {
        assert(base.engines.hasOwnProperty('.*'));
        cb();
      });
    });
  });
});
