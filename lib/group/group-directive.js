var CONSTANTS = require('../constants');

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).directive('group', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/group.tpl.html')
    , scope: {
      group : '=',
      members : '='
    }
    , controller: 'GroupController'
    , controllerAs: 'ctrl'
  };
});