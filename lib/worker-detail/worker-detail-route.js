var CONSTANTS = require('../constants');

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).config(function($stateProvider) {
  $stateProvider
    .state('app.worker.detail', {
      url: '/worker/:workerId',
      views: {
        'content@app': {
          template: '<worker-detail></worker-detail>'
        }
      }
    });
});