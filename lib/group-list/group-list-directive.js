var CONSTANTS = require('../constants');

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).directive('groupList', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/group-list.tpl.html')
    , controller: 'GroupListController'
    , controllerAs: 'ctrl'
  };
});