'use strict';
var CONSTANTS = require('./constants');


module.exports = function(config) {


  angular.module(CONSTANTS.USER_MODULE_ID, [
    require('./directive')(config)
    , require('./service.js')
  ]);

  return CONSTANTS.USER_MODULE_ID;
};


