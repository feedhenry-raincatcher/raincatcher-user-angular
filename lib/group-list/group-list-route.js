var CONSTANTS = require('../constants');

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).config(function($stateProvider) {
  $stateProvider
    .state('app.group', {
      url: '/groups',
      views: {
        column2: {
          template: '<group-list></group-list>'
        },
        'content': {
          templateProvider: function($templateCache) {
            return $templateCache.get('wfm-template/group-empty.tpl.html');
          }
        }
      }
    });
});