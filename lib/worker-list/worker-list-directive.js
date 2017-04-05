var CONSTANTS = require('../constants');

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).directive('workerList', function($templateCache) {

  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/worker-list.tpl.html')
    , scope: {
      workers : '=',
      selectedModel: '='
    }
    , controller: 'WorkerListController'
    , controllerAs: 'ctrl'
  };
});