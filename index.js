"use strict";

const sassdoc= require('sassdoc');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

function SassDocPlugin(options) {
  if (!options) {
    try {
      // Load .sassdocrc configuration
      options = yaml.safeLoad(fs.readFileSync(path.join(process.cwd(), '.sassdocrc'), 'utf-8'));
    } catch (err) {
      throw 'Invalid or no .sassdocrc found in: ' + process.cwd();
    }

    throw 'sassdoc webpack plugin: options is not defined. should be an object with at least "src"';
  }

  if (!options.src) {
    throw 'sassdoc webpack plugin: src is not defined';
  }

  this.options = options;
}

SassDocPlugin.prototype.apply = (compiler) => {
  let self = this;

  compiler.plugin('emit', (compilation, callback) => {
    sassdoc(self.options.src, self.options)
      .then(() => {
        console.log('Your documentation has been generated!');
        callback();
      }).then((error) => {
        if (error) throw error;
      });
  });
};

module.exports = SassDocPlugin;
