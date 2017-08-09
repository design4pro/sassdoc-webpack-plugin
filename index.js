"use strict";

var sassdoc= require('sassdoc');
var yaml = require('js-yaml');
var path = require('path');
var fs = require('fs');

function SassDocPlugin(options) {
  if (!options) {
    try {
      // Load .sassdocrc configuration
      options = yaml.safeLoad(fs.readFileSync(path.join(process.cwd(), '.sassdocrc'), 'utf-8'));
    } catch (err) {
      console.warn(err);
      throw 'Invalid or no .sassdocrc found in: ' + process.cwd();
    }
  }

  if (!options.src) {
    throw 'sassdoc webpack plugin: src is not defined';
  }

  this.options = options;
}

SassDocPlugin.prototype.apply = function (compiler) {
  var self = this;

  compiler.plugin('after-emit', function (compilation, callback) {
    sassdoc(self.options.src, self.options)
      .then(function () {
        console.log('Your documentation has been generated!');
        callback();
      }).then(function (error) {
        if (error) throw error;
      });
  });
};

module.exports = SassDocPlugin;
