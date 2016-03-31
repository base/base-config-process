'use strict';

require('mocha');
var assert = require('assert');
var schema = require('..');
var config = require('base-config');
var Base = require('base');
var base;

describe('.map.related', function() {
  beforeEach(function() {
    base = new Base();
    base.use(config());
    base.use(schema());
  });

  describe('related', function() {
    it('should move related value to related.list', function(cb) {
      base.config.process({related: 'foo'}, function(err, config) {
        if (err) return cb(err);
        assert(Array.isArray(config.related.list));
        assert.equal(config.related.list[0], 'foo');
        cb();
      });
    });

    it('should arrayify related links', function(cb) {
      base.config.process({related: 'foo'}, function(err, config) {
        if (err) return cb(err);
        assert(Array.isArray(config.related.list));
        assert.equal(config.related.list[0], 'foo');
        cb();
      });
    });

    it('should uniquify related links', function(cb) {
      base.config.process({related: ['foo', 'bar', 'foo']}, function(err, config) {
        if (err) return cb(err);
        assert(Array.isArray(config.related.list));
        assert.equal(config.related.list.length, 2);
        cb();
      });
    });
  });
});
