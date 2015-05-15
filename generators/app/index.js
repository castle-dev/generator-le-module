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
      name    : 'repoName',
      message : 'Where will the repo live?',
      default : 'castle-dev/' + dir
    }], function (responses) {
      answers = responses;
      done();
    }.bind(this));
  },
  writing: function () {
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),
      answers
    );
  }
});
 
module.exports = CastleModuleGenerator;
