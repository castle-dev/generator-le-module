'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('le-module:generator', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ someOption: true })
      .on('end', done);
  });
  it('creates README.md', function () {
    assert.file(['README.md']);
  });
  it('creates CONTRIBUTING.md', function () {
    assert.file(['README.md']);
  });
  it('creates LICENSE-MIT', function () {
    assert.file(['LICENSE-MIT']);
  });
  it('creates package.json', function () {
    assert.file(['package.json']);
  });
  it('creates .gitignore', function () {
    assert.file(['.gitignore']);
  });
  it('creates .travis.yml', function () {
    assert.file(['.travis.yml']);
  });
  it('creates gulpfile.js', function () {
    assert.file(['gulpfile.js']);
  });
  it('creates src/index.js', function () {
    assert.file(['src/index.js']);
  });
  it('creates test/unit/index.js', function () {
    assert.file(['test/unit/index.js']);
  });
  it('creates test/e2e/scenario.js', function () {
    assert.file(['test/e2e/scenario.js']);
  });
});
