var CONSTANTS = require('../constants');

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).directive('workerDetail', function($templateCache) {

  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/worker-detail.tpl.html')
    , scope: {
      workers : '=',
      selectedModel: '='
    }
    , controller: 'WorkerDetailController'
    , controllerAs: 'ctrl'
  };
});