var CONSTANTS = require('../constants');

/**
 *
 * Controller for listing user groups.
 *
 * @param mediator
 * @param userMediatorService
 * @param $timeout
 *
 * @constructor
 */
function GroupListController(mediator, userMediatorService, $timeout) {
  var self = this;
  var allGroups;


  userMediatorService.listGroups().then(function(groups) {
    $timeout(function() {
      self.groups = groups;
      allGroups = groups;
    });
  });

  self.selectGroup = function(event, group) {
    mediator.publish('wfm:group:selected', group);
    event.preventDefault();
    event.stopPropagation();
  };

  self.isGroupShown = function(group) {
    return self.shownGroup === group;
  };

  self.applyFilter = function(term) {
    term = term.toLowerCase();
    self.groups = allGroups.filter(function(group) {
      return String(group.id).indexOf(term) !== -1
        || String(group.name).toLowerCase().indexOf(term) !== -1;
    });
  };
}


angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).controller("GroupListController", ['mediator', 'userMediatorService', '$timeout', GroupListController]);