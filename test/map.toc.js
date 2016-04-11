'use strict';

require('mocha');
var assert = require('assert');
var schema = require('..');
var Base = require('base');
var base;

describe('.map.toc', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.use(schema());
  });

  describe('toc', function() {
    it('should convert toc boolean to an object', function(cb) {
      base.config.process({toc: true}, function(err, config) {
        if (err) return cb(err);
        assert.equal(config.toc.render, true);
        cb();
      });
    });
  });
});
