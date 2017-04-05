var CONSTANTS = require('../constants');
var _ = require('lodash');


/**
 *
 * Controller for displaying the detail of a user group.
 *
 * @param $state
 * @param $mdDialog
 * @param userMediatorService
 * @param $stateParams
 * @param $q
 *
 * @constructor
 */
function GroupDetailController($state, $mdDialog, userMediatorService, $stateParams, $q) {
  var self = this;

  var groupId = $stateParams.groupId;
  //Read a single group.
  //Read the users associated with a group.
  $q.all([
    userMediatorService.readGroup(groupId),
    userMediatorService.listMembership(),
    userMediatorService.listUsers()
  ]).then(function(groupAndMembership) {
    self.group = groupAndMembership[0];

    var memberships = groupAndMembership[1];
    var users = groupAndMembership[2];

    //Listing the members of this group
    self.members = _.filter(users, function(user) {
      return _.some(memberships, function(_membership) {
        //This user is a member of this group if the membership has both the user ID and Group ID
        return _membership.user === user.id && _membership.group === self.group.id;
      });
    });
  });

  self.delete = function($event, group) {
    $event.preventDefault();

    if (self.members.length > 0) {
      var alert = $mdDialog.confirm()
        .title('Operation not possible')
        .textContent('Group can not be deleted if it contains members.')
        .ok('Ok')
        .targetEvent($event);
      $mdDialog.show(alert);
    } else {
      var confirm = $mdDialog.confirm()
        .title('Would you like to delete group #'+group.id+'?')
        .textContent(group.name)
        .ariaLabel('Delete Group')
        .targetEvent($event)
        .ok('Proceed')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        userMediatorService.removeGroup(group).then(function() {
          $state.go('app.group', null, {reload: true});
        }, function(err) {
          throw err;
        });
      });
    }
  };
}

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).controller('GroupDetailController', ['$state', '$mdDialog', 'userMediatorService', '$stateParams', '$q', GroupDetailController]);