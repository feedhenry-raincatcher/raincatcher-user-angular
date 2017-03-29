var CONSTANTS = require('../constants');

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).config(function($stateProvider) {
  $stateProvider
    .state('app.worker', {
      url: '/workers',
      views: {
        column2: {
          template: '<worker-list></worker-list>'
        },
        'content': {
          templateProvider: function($templateCache) {
            return $templateCache.get('wfm-template/empty.tpl.html');
          }
        }
      }
    });
});