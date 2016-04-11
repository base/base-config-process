'use strict';

require('mocha');
var assert = require('assert');
var config = require('..');
var data = require('base-data');
var Base = require('base');
var base;

describe('.map.data', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.use(config());
  });

  describe('data', function() {
    it('should merge data onto app.cache.data using app.data()', function(cb) {
      base.use(data());
      base.config.process({data: {a: 'b'}}, function(err) {
        if (err) return cb(err);
        assert.equal(base.cache.data.a, 'b');
        cb();
      });
    });

    it('should merge data onto app.cache.data', function(cb) {
      base.config.process({data: {a: 'b'}}, function(err) {
        if (err) return cb(err);
        assert.equal(base.cache.data.a, 'b');
        cb();
      });
    });

    it('should emit `data`', function(cb) {
      base.on('data', function(key, val) {
        assert.equal(key, 'a');
        assert.equal(val, 'b');
        cb();
      });

      base.config.process({data: {a: 'b'}}, function(err) {
        if (err) return cb(err);
      });
    });
  });
});
