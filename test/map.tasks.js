'use strict';

require('mocha');
var assert = require('assert');
var schema = require('..');
var Base = require('base');
var base;

describe('.map.tasks', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.use(schema());
  });

  describe('tasks', function() {
    it('should remove empty tasks array', function(cb) {
      base.config.process({tasks: []}, function(err, config) {
        if (err) return cb(err);
        assert.equal(typeof config.tasks, 'undefined');
        cb();
      });
    });

    it('should arrayify tasks', function(cb) {
      base.config.process({tasks: 'foo'}, function(err, config) {
        if (err) return cb(err);
        assert(Array.isArray(config.tasks));
        assert.equal(config.tasks[0], 'foo');
        cb();
      });
    });

    it('should uniquify tasks', function(cb) {
      base.config.process({tasks: ['foo', 'bar', 'foo']}, function(err, config) {
        if (err) return cb(err);
        assert(Array.isArray(config.tasks));
        assert.equal(config.tasks.length, 2);
        cb();
      });
    });
  });
});
