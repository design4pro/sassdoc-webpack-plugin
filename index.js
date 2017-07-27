var sassdoc= require('sassdoc');

function SassDocPlugin(options) {
  if (!options) {
    throw 'sassdoc webpack plugin: options is not defined. should be an object with at least "src"';
  }
  if (!options.src) {
    throw 'sassdoc webpack plugin: src is not defined';
  }

  this.options = options;
}

SassDocPlugin.prototype.apply = function (compiler) {
  var self = this;

  compiler.plugin('done', function () {
    sassdoc(self.options)
      .then(function () {
        console.log('Your documentation has been generated!');
      }).then(function (error) {
        if (error) throw error;
      });
  });
};

module.exports = SassDocPlugin;
