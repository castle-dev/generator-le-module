'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

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
      message : 'Give me a high-level summary of what this module will do.',
      default : 'Awesome stuff'
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
  }
});
 
module.exports = CastleModuleGenerator;
