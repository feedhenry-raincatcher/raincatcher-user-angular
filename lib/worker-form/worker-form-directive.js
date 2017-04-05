var CONSTANTS = require('../constants');

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).directive('workerForm', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/worker-form.tpl.html')
    , scope: {
      worker : '=value',
      groups : '='
    }
    , controller: 'WorkerFormController'
    , controllerAs: 'ctrl'
  };
});