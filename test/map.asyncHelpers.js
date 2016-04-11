'use strict';

require('mocha');
var assert = require('assert');
var fields = require('..');
var Base = require('base');
var assemble = require('assemble-core');
var app;

describe('.map.asyncHelpers (errors)', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(fields());
  });

  it('should error when app.asyncHelpers is not a function', function(cb) {
    app.config.process({
      asyncHelpers: {
        lower: function() {},
        upper: function() {}
      }
    }, function(err) {
      assert.equal(err.message, 'expected app.asyncHelper to be a function');
      cb();
    });
  });
});

describe('.map.asyncHelpers', function() {
  beforeEach(function() {
    app = assemble();
    app.use(fields());
  });

  describe('async helpers', function() {
    it('should not choke on an empty object', function(cb) {
      var config = {asyncHelpers: {}};
      app.config.process(config, cb);
    });

    it('should register an object of helper functions', function(cb) {
      app.config.process({
        asyncHelpers: {
          lower: function() {},
          upper: function() {}
        }
      }, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.async.hasOwnProperty('lower'));
        assert(app._.helpers.async.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an object of helpers by filepaths', function(cb) {
      var config = {
        asyncHelpers: {
          lower: './test/fixtures/helpers/lower.js',
          upper: './test/fixtures/helpers/upper.js'
        }
      };

      app.config.process(config, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.async.hasOwnProperty('lower'));
        assert(app._.helpers.async.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an array of helpers by filepaths', function(cb) {
      var config = {
        asyncHelpers: ['./test/fixtures/helpers/lower.js', './test/fixtures/helpers/upper.js']
      };

      app.config.process(config, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.async.hasOwnProperty('lower'));
        assert(app._.helpers.async.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an array of helper modules', function(cb) {
      var config = {
        asyncHelpers: ['helper-coverage', 'helper-example']
      };

      app.config.process(config, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.async.hasOwnProperty('example'));
        assert(app._.helpers.async.hasOwnProperty('coverage'));
        cb();
      });
    });

    it('should register a glob of helpers', function(cb) {
      var config = {
        asyncHelpers: ['./test/fixtures/helpers/*.js']
      };

      app.config.process(config, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.async.hasOwnProperty('lower'));
        assert(app._.helpers.async.hasOwnProperty('upper'));
        cb();
      });
    });
  });
});
