'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var fields = require('..');
var config = require('base-config');
var assemble = require('assemble-core');
var app;

describe('.map.create', function() {
  beforeEach(function() {
    app = assemble();
    app.use(config());
    app.use(fields());
  });

  describe('create', function() {
    it('should create an array of collections', function(cb) {
      app.config.process({create: ['foo', 'bar', 'baz']}, function(err) {
        if (err) return cb(err);
        assert.equal(app.foos.options.cwd, process.cwd());
        assert.equal(app.bars.options.cwd, process.cwd());
        assert.equal(app.bazs.options.cwd, process.cwd());
        cb();
      });
    });

    it('should create an object of collections', function(cb) {
      app.config.process({
        create: {
          pages: { cwd: 'templates/pages' },
          posts: { cwd: 'templates/posts' }
        }
      }, function(err) {
        if (err) return cb(err);
        assert.equal(app.pages.options.cwd, path.resolve(process.cwd(), 'templates/pages'));
        assert.equal(app.posts.options.cwd, path.resolve(process.cwd(), 'templates/posts'));
        cb();
      });
    });

    it('should add arbitrary options to collections', function(cb) {
      app.config.process({
        create: {
          pages: { foo: 'bar' },
          posts: { foo: 'bar' },
        }
      }, function(err) {
        if (err) return cb(err);
        assert.equal(app.pages.options.foo, 'bar');
        assert.equal(app.posts.options.foo, 'bar');
        cb();
      });
    });
  });
});
