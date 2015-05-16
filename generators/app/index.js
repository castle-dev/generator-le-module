'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var asciiArt = require('le-ascii-art');
var path = require('path');
var q = require('q');

var answers;

var CastleModuleGenerator = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();
    var dir = process.cwd().split(path.sep).pop();
    this.prompt([{
      type    : 'input',
      name    : 'moduleName',
      message : 'What is your module\'s name?',
      default : dir // Default to current folder name
    }, {
      type    : 'input',
      name    : 'moduleDescription',
      message : 'Describe what it will do.'
    }, {
      type    : 'input',
      name    : 'repoName',
      message : 'Where will the repo live?',
      default : 'castle-dev/' + dir
    }], function (responses) {
      answers = responses;
      done();
    }.bind(this));
  },
  writing: function () {
    var writer = this;
    answers.currentYear = new Date().getFullYear();
    answers.travisVar = '${GH_TOKEN}';
    answers.travisEncryptedData = 'mUXdkL/tp2b9Yx78TL5/abmQ7PgiOG4BgOKDifhu0K0rY0UBgD5Jl0eTX3aFxUfRLpgA3/H07D7LBPE3ArsWu6H1ad166SfAMoLvqxaywShoW2cguf+A9BhO7wzwcHJ/Ocboz+kPeIaHKwvFCSbatQHyD2CdAkUdCS+83uiGE9U=';
    function copyTemplate (from, to) {
      writer.fs.copyTpl(
        writer.templatePath(from),
        writer.destinationPath(to),
        answers
      );
    };
    copyTemplate('_README.md', 'README.md');
    copyTemplate('_CONTRIBUTING.md', 'CONTRIBUTING.md');
    copyTemplate('_LICENSE-MIT', 'LICENSE-MIT');
    copyTemplate('_package.json', 'package.json');
    copyTemplate('_.gitignore', '.gitignore');
    copyTemplate('_.travis.yml', '.travis.yml');
    copyTemplate('_gulpfile.js', 'gulpfile.js');
    copyTemplate('src/_index.js', 'src/index.js');
    copyTemplate('test/unit/_index.js', 'test/unit/index.js');
    copyTemplate('test/e2e/_scenario.js', 'test/e2e/scenario.js');
  },
  install: function () {
    var installer = this;
    installer.run = function (command, args) {
      // promisify yeoman's spawnCommand to make chaining easier
      var deferred = q.defer();

      installer.spawnCommand(command, args).on('close', function () {
        deferred.resolve();
      });
      return deferred.promise;
    }
    installer.run('npm', ['install'])
    .then(function () { return installer.run('git', ['init']); })
    .then(function () { return installer.run('git', ['add', '.']); })
    .then(function () { return installer.run('git', ['checkout', '-b', 'develop']); })
    .then(function () { return installer.run('git', ['commit', '-m', 'chore(init): generated with `yo le-module`']); })
  }
});

asciiArt.printLogo();

module.exports = CastleModuleGenerator;
