var CONSTANTS = require('../constants');

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).directive('groupForm', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/group-form.tpl.html')
    , scope: {
      group : '=value'
    }
    , controller: 'GroupFormController'
    , controllerAs: 'ctrl'
  };
});