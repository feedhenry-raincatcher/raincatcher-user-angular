var CONSTANTS = require('../constants');

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).filter('reverse', function() {
  return function(items) {
    return (items || []).slice().reverse();
  };
});