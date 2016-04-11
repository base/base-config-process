'use strict';

require('mocha');
var assert = require('assert');
var fields = require('..');
var assemble = require('assemble-core');
var app;

describe('.map.options', function() {
  beforeEach(function() {
    app = assemble();
    app.use(fields());
  });

  describe('options', function() {
    it('should merge options onto app.options', function(cb) {
      app.config.process({options: {a: 'b'}}, function(err) {
        if (err) return cb(err);
        assert.equal(app.options.a, 'b');
        cb();
      });
    });

    it('should emit `options`', function(cb) {
      var count = 0;
      app.on('option', function(key, val) {
        assert.equal(key, 'a');
        assert.equal(val, 'b');
        count++;
      });

      app.config.process({options: {a: 'b'}}, function(err) {
        if (err) return cb(err);
        assert.equal(count, 1);
        cb();
      });
    });
  });
});
