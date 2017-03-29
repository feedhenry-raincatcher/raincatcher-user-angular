var CONSTANTS = require('../constants');

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).directive('worker', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/worker.tpl.html')
    , scope: {
      worker : '=',
      group : '='
    }
    , controller: 'WorkerController'
    , controllerAs: 'ctrl'
  };
});