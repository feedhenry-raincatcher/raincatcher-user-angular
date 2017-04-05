var CONSTANTS = require('../constants');

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).directive('login', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/login.tpl.html')
    , controller: 'LoginCtrl'
    , controllerAs: 'ctrl'
    , replace: true
  };
});