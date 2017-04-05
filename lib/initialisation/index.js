var CONSTANTS = require('../constants');

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).run(function($state, mediator) {

  mediator.subscribe('wfm:worker:selected', function(worker) {
    $state.go('app.worker.detail', {
      workerId: worker.id
    });
  });

  mediator.subscribe('wfm:group:selected', function(group) {
    $state.go('app.group.detail', {
      groupId: group.id
    });
  });
});