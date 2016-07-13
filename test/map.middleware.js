'use strict';

require('mocha');
require('verb-reflinks');
var assert = require('assert');
var Base = require('base');
var pipeline = require('base-pipeline');
var assemble = require('assemble-core');
var fields = require('..');
var app;

describe('.map.middleware', function() {
  beforeEach(function() {
    app = assemble();
    app.use(pipeline());
    app.use(fields());
  });

  describe('middleware', function() {
    it('should not choke on an empty object', function(cb) {
      app.config.process({
        middleware: {}
      }, cb);
    });

    it('should continue when base-middleware is not registered', function(cb) {
      var base = new Base();
      base.isApp = true;
      base.use(fields());
      base.config.process({
        middleware: {
          onLoad: ['verb-reflinks']
        }
      }, cb);
    });

    it('should register an array of plugin objects', function(cb) {
      var config = {
        middleware: {
          onLoad: [
            {
              lower: function(options) {
                return function(file, next) {
                  next();
                }
              }
            },
            {
              upper: function(options) {
                return function(file, next) {
                  next();
                }
              }
            }
          ]
        }
      };

      app.config.process(config, function(err) {
        if (err) return cb(err);
        assert(config.middleware.hasOwnProperty('onLoad'));
        assert(Array.isArray(config.middleware.onLoad));
        cb();
      });
    });

    it('should support options being passed on each object', function(cb) {
      var one = function(options) {
        return function(file, next) {
          next();
        }
      };
      var two = function(options) {
        return function(file, next) {
          next();
        }
      };

      var config = {
        middleware: {
          onLoad: [
            {
              options: {foo: 'bar'},
              one: one
            },
            {
              options: {baz: 'qux'},
              two: two
            }
          ]
        }
      };

      app.config.process(config, function(err) {
        if (err) return cb(err);

        assert.deepEqual(config.middleware.onLoad[0], {
          name: 'one',
          options: {foo: 'bar'},
          fn: one
        });

        assert.deepEqual(config.middleware.onLoad[1], {
          name: 'two',
          options: {baz: 'qux'},
          fn: two
        });

        cb();
      });
    });
  });
});
