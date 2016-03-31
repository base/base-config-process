'use strict';

require('mocha');
var assert = require('assert');
var fields = require('..');
var Base = require('base');
var config = require('base-config');
var pipeline = require('base-pipeline');
var assemble = require('assemble-core');
var app;

describe('.map.plugins (errors)', function() {
  beforeEach(function() {
    app = new Base();
    app.use(config());
    app.use(fields());
  });

  it('should error when base-pipeline is not registered', function(cb) {
    app.config.process({
      plugins: {
        lower: function() {},
        upper: function() {}
      }
    }, function(err) {
      assert.equal(err.message, 'expected base-pipeline to be registered');
      cb();
    });
  });
});

describe('.map.plugins', function() {
  beforeEach(function() {
    app = assemble();
    app.use(pipeline());
    app.use(config());
    app.use(fields());
  });

  describe('plugins', function() {
    it('should not choke on an empty object', function(cb) {
      app.config.process({plugins: {}}, cb);
    });

    it('should register an object of plugin functions', function(cb) {
      var config = {
        plugins: {
          lower: function() {},
          upper: function() {}
        }
      };

      app.config.process(config, function(err) {
        if (err) return cb(err);
        assert(app.plugins.hasOwnProperty('lower'));
        assert(app.plugins.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an object of plugins by filepaths', function(cb) {
      var config = {
        plugins: {
          lower: './test/fixtures/plugins/lower.js',
          upper: './test/fixtures/plugins/upper.js'
        }
      };

      app.config.process(config, function(err) {
        assert(app.plugins.hasOwnProperty('lower'));
        assert(app.plugins.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an array of plugins by filepaths', function(cb) {
      var config = {
        plugins: ['./test/fixtures/plugins/lower.js', './test/fixtures/plugins/upper.js']
      };

      app.config.process(config, function(err) {
        assert(app.plugins.hasOwnProperty('lower'));
        assert(app.plugins.hasOwnProperty('upper'));
        cb();
      });
    });

    it('should register an array of plugin modules', function(cb) {
      var config = {
        plugins: ['gulp-format-md']
      };

      app.config.process(config, function(err) {
        assert(app.plugins.hasOwnProperty('formatMd'));
        cb();
      });
    });

    it('should register a glob of plugins', function(cb) {
      var config = {
        plugins: ['./test/fixtures/plugins/*.js']
      };

      app.config.process(config, function(err) {
        assert(app.plugins.hasOwnProperty('lower'));
        assert(app.plugins.hasOwnProperty('upper'));
        cb();
      });
    });
  });
});
