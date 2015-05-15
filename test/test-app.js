'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('le-module:app', function () {
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
});
