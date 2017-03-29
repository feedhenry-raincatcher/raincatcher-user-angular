var CONSTANTS = require('../constants');

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).config(function($stateProvider) {
  $stateProvider
    .state('app.group.detail', {
      url: '/group/:groupId',
      views: {
        'content@app': {
          template: '<group-detail></group-detail>'
        }
      }
    });
});