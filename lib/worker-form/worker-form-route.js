var CONSTANTS = require('../constants');

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).config(function($stateProvider) {

  $stateProvider.state('app.worker.edit', {
    url: '/worker/:workerId/edit',
    views: {
      'content@app': {
        template: '<worker-form></worker-form>',
        controller: 'WorkerFormController as ctrl'
      }
    }
  });

  $stateProvider
    .state('app.worker.new', {
      url: '/new',
      views: {
        'content@app': {
          template: '<worker-form></worker-form>',
          controller: 'WorkerFormController as ctrl'
        }
      }
    });

});