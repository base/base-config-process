'use strict';

require('mocha');
require('engine-base');
var assert = require('assert');
var Base = require('base');
var config = require('base-config');
var assemble = require('assemble-core');
var fields = require('..');
var app;

describe('.map.engine (errors)', function() {
  beforeEach(function() {
    app = new Base();
    app.use(config());
    app.use(fields());
  });

  it('should error when app.engine is not a function', function(cb) {
    app.config.process({
      engine: {
        '*': 'engine-base'
      }
    }, function(err) {
      assert.equal(err.message, 'expected app.engine to be a function');
      cb();
    });
  });
});

describe('.map.engine', function() {
  beforeEach(function() {
    app = assemble();
    app.use(config());
    app.use(fields());
  });

  describe('engine', function() {
    it('should register an engine string', function(cb) {
      app.config.process({engines: 'engine-base'}, function(err, obj) {
        if (err) return cb(err);
        assert(app.engines.hasOwnProperty('.base'));
        cb();
      });
    });

    it('should register an engine by object key', function(cb) {
      app.config.process({engines: {'*': 'engine-base'}}, function(err) {
        if (err) return cb(err);
        assert(app.engines.hasOwnProperty('.*'));
        cb();
      });
    });
  });
});
