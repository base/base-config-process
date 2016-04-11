'use strict';

require('mocha');
require('helper-example');
require('helper-coverage');
var assert = require('assert');
var fields = require('..');
var Base = require('base');
var assemble = require('assemble-core');
var app;

describe('.map.helpers (errors)', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(fields());
  });

  it('should error when app.helpers is not a function', function(cb) {
    app.config.process({
      helpers: {
        lower: function() {},
        upper: function() {}
      }
    }, function(err) {
      assert.equal(err.message, 'expected app.helper to be a function');
      cb();
    });
  });
});

describe('.map.helpers', function() {
  beforeEach(function() {
    app = assemble();
    app.use(fields());
  });

  describe('helpers', function() {
    it('should not choke on an empty object', function(cb) {
      app.config.process({helpers: {}}, cb);
    });

    it('should register an object of helper functions', function(cb) {
      var config = {
        helpers: {
          lower: function() {},
          upper: function() {}
        }
      };

      app.config.process(config, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.sync.hasOwnProperty('lower'));
        assert(app._.helpers.sync.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an object of helpers by filepaths', function(cb) {
      var config = {
        helpers: {
          lower: './test/fixtures/helpers/lower.js',
          upper: './test/fixtures/helpers/upper.js'
        }
      };

      app.config.process(config, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.sync.hasOwnProperty('lower'));
        assert(app._.helpers.sync.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an array of helpers by filepaths', function(cb) {
      var config = {
        helpers: ['./test/fixtures/helpers/lower.js', './test/fixtures/helpers/upper.js']
      };

      app.config.process(config, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.sync.hasOwnProperty('lower'));
        assert(app._.helpers.sync.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an array of helper modules', function(cb) {
      var config = {
        helpers: ['helper-coverage', 'helper-example']
      };

      app.config.process(config, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.sync.hasOwnProperty('example'));
        assert(app._.helpers.sync.hasOwnProperty('coverage'));
        cb();
      });
    });

    it('should register a glob of helpers', function(cb) {
      var config = {
        helpers: ['./test/fixtures/helpers/*.js']
      };

      app.config.process(config, function(err) {
        if (err) return cb(err);
        assert(app._.helpers.sync.hasOwnProperty('lower'));
        assert(app._.helpers.sync.hasOwnProperty('upper'));
        cb();
      });
    });
  });
});
