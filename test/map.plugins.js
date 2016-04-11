'use strict';

require('mocha');
var assert = require('assert');
var Base = require('base');
var pipeline = require('base-pipeline');
var assemble = require('assemble-core');
var fields = require('..');
var app;

describe('.map.plugins', function() {
  beforeEach(function() {
    app = assemble();
    app.use(pipeline());
    app.use(fields());
  });

  describe('plugins', function() {
    it('should not choke on an empty object', function(cb) {
      app.config.process({plugins: {}}, cb);
    });

    it('should continue when base-plugins is not registered', function(cb) {
      var base = new Base();
      base.isApp = true;
      base.use(fields());
      base.config.process({plugins: ['gulp-format-md']}, cb);
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
        if (err) return cb(err);
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
        if (err) return cb(err);
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
        if (err) return cb(err);
        assert(app.plugins.hasOwnProperty('formatMd'));
        cb();
      });
    });

    it('should register a glob of plugins', function(cb) {
      var config = {
        plugins: ['./test/fixtures/plugins/*.js']
      };

      app.config.process(config, function(err) {
        if (err) return cb(err);
        assert(app.plugins.hasOwnProperty('lower'));
        assert(app.plugins.hasOwnProperty('upper'));
        cb();
      });
    });
  });
});
