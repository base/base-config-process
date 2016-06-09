'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var Base = require('base');
var fields = require('..');
var assemble = require('assemble-core');
var app;

describe('.map.views (errors)', function() {
  beforeEach(function() {
    app = new Base();
    app.isApp = true;
    app.use(fields());
  });

  it('should error when app.create is not a function', function(cb) {
    app.config.process({
      views: {
        foos: './test/fixtures/templates/*',
        bars: './test/fixtures/templates/*'
      }
    }, function(err) {
      assert.equal(err.message, 'expected app.create to be a function');
      cb();
    });
  });
});

describe('.map.templates', function() {
  beforeEach(function() {
    app = assemble();
    app.use(fields());
  });

  describe('templates', function() {
    it('should move config.templates to config.views', function(cb) {
      app.config.process({
        templates: {
          posts: './test/fixtures/templates/*',
          pages: './test/fixtures/templates/*'
        }
      }, function(err, config) {
        if (err) return cb(err);
        assert(config.views.posts.hasOwnProperty('foo.md'));
        assert(config.views.posts.hasOwnProperty('bar.hbs'));
        assert(config.views.pages.hasOwnProperty('foo.md'));
        assert(config.views.pages.hasOwnProperty('bar.hbs'));
        cb();
      });
    });

    it('should delete config.templates after moving to config.views', function(cb) {
      app.config.process({
        templates: {
          posts: './test/fixtures/templates/*',
          pages: './test/fixtures/templates/*'
        }
      }, function(err, config) {
        if (err) return cb(err);
        assert(!config.hasOwnProperty('templates'));
        cb();
      });
    });

    it('should add templates to a new collection from a glob', function(cb) {
      app.config.process({
        templates: {
          posts: './test/fixtures/templates/*',
          pages: './test/fixtures/templates/*'
        }
      }, function(err, config) {
        if (err) return cb(err);
        assert(app.views.posts.hasOwnProperty('foo.md'));
        assert(app.views.posts.hasOwnProperty('bar.hbs'));
        assert(app.views.pages.hasOwnProperty('foo.md'));
        assert(app.views.pages.hasOwnProperty('bar.hbs'));
        cb();
      });
    });

    it('should add templates to a new collection from an array of globs', function(cb) {
      app.config.process({
        templates: {
          posts: ['./test/fixtures/templates/*'],
          pages: ['./test/fixtures/templates/*']
        }
      }, function(err, config) {
        if (err) return cb(err);
        assert(app.views.posts.hasOwnProperty('foo.md'));
        assert(app.views.posts.hasOwnProperty('bar.hbs'));
        assert(app.views.pages.hasOwnProperty('foo.md'));
        assert(app.views.pages.hasOwnProperty('bar.hbs'));
        cb();
      });
    });

    it('should add templates to an existing collection from a glob', function(cb) {
      app.create('foo');
      app.create('bar');

      app.foo('one', {content: 'this is content'});
      app.bar('two', {content: 'this is content'});

      app.config.process({
        templates: {
          foos: './test/fixtures/templates/*',
          bars: './test/fixtures/templates/*'
        }
      }, function(err, config) {
        if (err) return cb(err);
        assert(app.views.foos.hasOwnProperty('one'));
        assert(app.views.foos.hasOwnProperty('foo.md'));
        assert(app.views.foos.hasOwnProperty('bar.hbs'));

        assert(app.views.bars.hasOwnProperty('two'));
        assert(app.views.bars.hasOwnProperty('foo.md'));
        assert(app.views.bars.hasOwnProperty('bar.hbs'));
        cb();
      });
    });

    it('should add templates to an existing collection from an array of globs', function(cb) {
      app.create('foo');
      app.create('bar');

      app.foo('one', {content: 'this is content'});
      app.bar('two', {content: 'this is content'});

      app.config.process({
        templates: {
          foos: ['./test/fixtures/templates/*'],
          bars: ['./test/fixtures/templates/*']
        }
      }, function(err, config) {
        if (err) return cb(err);
        assert(app.views.foos.hasOwnProperty('one'));
        assert(app.views.foos.hasOwnProperty('foo.md'));
        assert(app.views.foos.hasOwnProperty('bar.hbs'));

        assert(app.views.bars.hasOwnProperty('two'));
        assert(app.views.bars.hasOwnProperty('foo.md'));
        assert(app.views.bars.hasOwnProperty('bar.hbs'));
        cb();
      });
    });

    it('should add an object of templates to an existing collection', function(cb) {
      app.create('pages');
      app.create('posts');

      app.pages('one', {content: 'this is content'});
      app.posts('two', {content: 'this is content'});

      app.config.process({
        templates: {
          posts: {
            home: {content: 'this is home'},
            other: {content: 'this is another post'}
          },
          pages: {
            home: {content: 'this is home'},
            other: {content: 'this is another page'}
          }
        }
      }, function(err, config) {
        if (err) return cb(err);
        assert(app.views.pages.hasOwnProperty('one'));
        assert(app.views.pages.hasOwnProperty('home'));
        assert(app.views.pages.hasOwnProperty('other'));

        assert(app.views.posts.hasOwnProperty('two'));
        assert(app.views.posts.hasOwnProperty('home'));
        assert(app.views.posts.hasOwnProperty('other'));
        cb();
      });
    });
  });

  it('should add views to an existing collection', function(cb) {
    app.create('pages');

    var config = {
      views: {
        pages: {
          foo: {content: 'this is foo'},
          bar: {content: 'this is bar'},
          baz: {content: 'this is baz'}
        }
      }
    };

    app.config.process(config, function(err, config) {
      if (err) return cb(err);

      assert(app.views.hasOwnProperty('pages'));
      assert(app.views.pages.hasOwnProperty('foo'));
      assert(app.views.pages.hasOwnProperty('bar'));
      assert(app.views.pages.hasOwnProperty('baz'));
      cb();
    });
  });

  it('should add views to a new collection', function(cb) {
    var config = {
      views: {
        posts: {
          foo: {content: 'this is foo'},
          bar: {content: 'this is bar'},
          baz: {content: 'this is baz'}
        }
      }
    };

    app.config.process(config, function(err, config) {
      if (err) return cb(err);

      assert(app.views.hasOwnProperty('posts'));
      assert(app.views.posts.hasOwnProperty('foo'));
      assert(app.views.posts.hasOwnProperty('bar'));
      assert(app.views.posts.hasOwnProperty('baz'));
      cb();
    });
  });

  it('should add views from a glob', function(cb) {
    var config = {
      views: {
        posts: 'test/fixtures/templates/*'
      }
    };

    app.option('renameKey', function(key, view) {
      return view ? view.basename : path.basename(key);
    });

    app.config.process(config, function(err, config) {
      if (err) return cb(err);

      assert(app.views.hasOwnProperty('posts'));
      assert(app.views.posts.hasOwnProperty('bar.hbs'));
      assert(app.views.posts.hasOwnProperty('foo.md'));
      cb();
    });
  });

  it('should add views from an array of globs', function(cb) {
    var config = {
      views: {
        posts: ['test/fixtures/templates/*']
      }
    };

    app.option('renameKey', function(key, view) {
      return view ? view.stem : path.basename(key, path.extname(key));
    });

    app.config.process(config, function(err, config) {
      if (err) return cb(err);

      assert(app.views.hasOwnProperty('posts'));
      assert(app.views.posts.hasOwnProperty('bar'));
      assert(app.views.posts.hasOwnProperty('foo'));
      cb();
    });
  });
});
