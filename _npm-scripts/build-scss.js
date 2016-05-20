var config = require('../package').config;
var autoprefixer = require('autoprefixer');
var postscss = require('postscss');
var cssnano = require('cssnano');

function compile () {
  var prefix = autoprefixer({ browsers: ['> 1%'] });
  var nano = cssnano();

  postscss([prefix, nano]).process({
    from: config.scss.srcDir + config.scss.srcFile,
    to: config.scss.distDir + config.scss.distFile
  });
}

// Provide commandline options to facilitate npm scripts.
if (process) {
  if (process.argv.indexOf('-c')) compile();
}

module.exports = {
  compile: compile
}