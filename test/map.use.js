'use strict';

require('mocha');
var assert = require('assert');
var fields = require('..');
var config = require('base-config');
var assemble = require('assemble-core');
var app;

describe('.map.use', function() {
  beforeEach(function() {
    app = assemble();
    app.use(config());
    app.use(fields());
  });

  describe('use', function() {
    it('should use a plugin', function(cb) {
      app.once('use', function() {
        cb();
      });

      app.config.process({use: 'test/fixtures/use/aaa'}, function(err) {
        if (err) return cb(err);
      });
    });

    it('should use a plugin from a cwd', function(cb) {
      app.once('use', function(key, val) {
        cb();
      });

      app.config.process({
        cwd: 'test/fixtures/use',
        use: ['aaa', 'bbb']
      }, function(err) {
        if (err) return cb(err);
      });
    });

    it('should use an array of plugins from a cwd', function(cb) {
      var arr = [];
      // test plugins emit `test`
      app.on('test', function(key) {
        arr.push(key);
      });

      app.config.process({
        cwd: 'test/fixtures/use',
        use: 'aaa,bbb'
      }, function(err) {
        if (err) return cb(err);
        assert.equal(arr.length, 2);
        assert.deepEqual(arr, ['AAA', 'BBB']);
        cb();
      });
    });
  });
});
