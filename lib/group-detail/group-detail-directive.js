var CONSTANTS = require('../constants');

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).directive('groupDetail', function($templateCache) {

  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/group-detail.tpl.html')
    , controller: 'GroupDetailController'
    , controllerAs: 'ctrl'
  };
});