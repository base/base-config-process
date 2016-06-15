# base-config-process [![NPM version](https://img.shields.io/npm/v/base-config-process.svg?style=flat)](https://www.npmjs.com/package/base-config-process) [![NPM downloads](https://img.shields.io/npm/dm/base-config-process.svg?style=flat)](https://npmjs.org/package/base-config-process) [![Build Status](https://img.shields.io/travis/jonschlinkert/base-config-process.svg?style=flat)](https://travis-ci.org/jonschlinkert/base-config-process)

Commonly used config mappings for the base-config plugin. Also pre-processes the given object with base-config-schema before calling `.process()`

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save base-config-process
```

## Usage

Normalizes the given object with [base-config-schema](https://github.com/jonschlinkert/base-config-schema) before calling the `.process` method from [base-config](https://github.com/node-base/base-config).

```js
var Base = require('base');
var config = require('base-config-process');

var app = new Base();
app.use(config());

var pkg = require('./package');

app.config.process(pkg, function(err) {
  if (err) throw err;
});
```

## Related projects

You might also be interested in these projects:

* [base-cli](https://www.npmjs.com/package/base-cli): Plugin for base-methods that maps built-in methods to CLI args (also supports methods from a… [more](https://github.com/node-base/base-cli) | [homepage](https://github.com/node-base/base-cli "Plugin for base-methods that maps built-in methods to CLI args (also supports methods from a few plugins, like 'base-store', 'base-options' and 'base-data'.")
* [base-config](https://www.npmjs.com/package/base-config): base-methods plugin that adds a `config` method for mapping declarative configuration values to other 'base… [more](https://github.com/node-base/base-config) | [homepage](https://github.com/node-base/base-config "base-methods plugin that adds a `config` method for mapping declarative configuration values to other 'base' methods or custom functions.")
* [base-config-schema](https://www.npmjs.com/package/base-config-schema): Schema for the base-config plugin, used for normalizing config values before passing them to config.process(). | [homepage](https://github.com/jonschlinkert/base-config-schema "Schema for the base-config plugin, used for normalizing config values before passing them to config.process().")

## Contributing

This document was generated by [verb-readme-generator](https://github.com/verbose/verb-readme-generator) (a [verb](https://github.com/verbose/verb) generator), please don't edit directly. Any changes to the readme must be made in [.verb.md](.verb.md). See [Building Docs](#building-docs).

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new). Or visit the [verb-readme-generator](https://github.com/verbose/verb-readme-generator) project to submit bug reports or pull requests for the readme layout template.

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-readme-generator && verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the MIT license.

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on June 15, 2016._