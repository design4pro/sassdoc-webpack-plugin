var sassdoc= require('sassdoc');

function SassDocPlugin(options) {
  if (!options) {
    throw 'sassdoc webpack plugin: options is not defined. should be an object with at least "source"';
  }
  if (!options.source) {
    throw 'sassdoc webpack plugin: source is not defined';
  }

  this.options = options;
}

SassDocPlugin.prototype.apply = function (compiler) {
  var self = this;

  compiler.plugin('emit', function () {
    sassdoc(self.options.source, self.options.config)
      .then(function () {
        console.log('Your documentation has been generated!');
      }).then(function (error) {
        if (error) throw error;
      });
  });
};

module.exports = SassDocPlugin;
