'use strict';

var config = require('../package').config;
var scss = require('./build-scss');
var gaze = require('gaze');

gaze(config.scss.srcDir + '*', function (err, watcher) {
  
  // Compile Scss when anything is changed/added/deleted within the scss dir
  this.on('all', function (event, filepath) {
    console.log(filepath + ' was ' + event);
    scss.compile();
  });
});