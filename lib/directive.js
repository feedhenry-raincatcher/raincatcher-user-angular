'use strict';
var CONSTANTS = require('./constants');

module.exports = function(config) {
  angular.module(CONSTANTS.USER_DIRECTIVE_MODULE, ['wfm.core.mediator']).constant("USER_CONFIG", config);

  require('./filters');
  require('./initialisation');

  require('../dist');

  require('./login');
  require('./worker-list');
  require('./worker');
  require('./worker-form');
  require('./group-list');
  require('./group');
  require('./group-form');
  require('./group-detail');
  require('./worker-detail');

  return CONSTANTS.USER_DIRECTIVE_MODULE;
};


