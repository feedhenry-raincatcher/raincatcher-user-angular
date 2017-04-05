var CONSTANTS = require('../constants');

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).config(function($stateProvider) {
  $stateProvider
    .state('app.group.edit', {
      url: '/group/:groupId/edit',
      views: {
        'content@app': {
          template: '<group-form></group-form>'
        }
      }
    })
    .state('app.group.new', {
      url: '/new',
      views: {
        'content@app': {
          template: '<group-form></group-form>'
        }
      }
    });
});