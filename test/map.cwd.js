'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var config = require('..');
var Base = require('base');
var base;

describe('.map.cwd', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.use(config());
  });

  describe('cwd', function() {
    it('should set a cwd on app', function(cb) {
      base.config.process({cwd: 'test'}, function(err) {
        if (err) return cb(err);

        assert.equal(base.cwd, path.join(process.cwd(), 'test'));
        cb();
      });
    });

    it('should set a cwd on app', function(cb) {
      var count = 0;

      base.on('cwd', function(val) {
        assert.equal(val, process.cwd() + '/foo');
        count++;
      });

      base.config.process({cwd: 'foo'}, function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });

    it('should not take action when give cwd is the same as existing', function(cb) {
      var count = 0;

      base.on('cwd', function(val) {
        count++;
      });

      base.config.process({cwd: process.cwd()}, function(err) {
        if (err) return cb(err);
        assert.equal(count, 0);
        cb();
      });
    });
  });
});
