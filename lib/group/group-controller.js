var CONSTANTS = require('../constants');

/**
 *
 * Controller for viewing group details.
 *
 * @param $scope
 * @param mediator
 * @constructor
 */
function GroupController($scope, mediator) {
  var self = this;
  self.group = $scope.group;
  self.members = $scope.members;
  self.selectMember = function(event, member) {
    mediator.publish('wfm:worker:selected', member);
    event.preventDefault();
    event.stopPropagation();
  };
}


angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).controller("GroupController", ['$scope', 'mediator', GroupController]);