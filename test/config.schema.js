'use strict';

require('mocha');
var assert = require('assert');
var schema = require('..');
var config = require('base-config');
var Schema = require('map-schema');
var Base = require('base');
var base;

describe('options.omit', function() {
  it('should omit the give key from the result', function(cb) {
    base = new Base();
    base.isApp = true;
    base.use(config());
    base.use(schema({omit: 'toc'}));
    base.config.map('toc', function(val, key, config, next) {
      config[key] = 'foo';
      next();
    });

    base.config.process({toc: true}, function(err, config) {
      if (err) return cb(err);
      assert.equal(typeof config.toc, 'undefined');
      cb();
    });
  });

  it('should omit the give key from the result when defined on options', function(cb) {
    base.option('schema.omit', 'toc');
    base.config.map('toc', function(val, key, config, next) {
      config[key] = 'foo';
      next();
    });

    base.config.process({toc: true}, function(err, config) {
      if (err) return cb(err);
      assert.equal(typeof config.toc, 'undefined');
      cb();
    });
  });
});

describe('.config.schema', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.use(config());
    base.use(schema());
  });

  describe('schema', function() {
    it('should use a custom schema', function(cb) {
      base.config.schema = new Schema();
      base.config.map('toc', function(val, key, config, next) {
        config[key] = 'foo';
        next();
      });

      base.config.process({toc: true}, function(err, config) {
        if (err) return cb(err);
        assert.equal(config.toc, 'foo');
        cb();
      });
    });

    it('should handle errors', function(cb) {
      base.config.map('whatever', function(val, key, config, next) {
        next(new Error('foo'));
      });

      base.config.process({whatever: true}, function(err, config) {
        assert.equal(err.message, 'foo');
        cb();
      });
    });
  });
});
