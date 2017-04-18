var CONSTANTS = require('../constants');
var _ = require('lodash');

/**
 *
 * A controller for viewing form details.
 *
 * @param $scope
 * @param mediator
 * @param {UserMediatorService} userMediatorService
 * @param $stateParams
 * @param $q
 *
 * @constructor
 */
function WorkerFormController($state, userMediatorService, $stateParams, $q) {
  var self = this;
  self.submitted = false;
  var membership;

  //Need Groups, Membership, User
  $q.all([
    userMediatorService.listGroups(),
    //If there is a workerId in the URI, then we are editing a user, otherwise, we are creating a new one.
    $stateParams.workerId ? userMediatorService.readUser($stateParams.workerId) : $q.when({}),
    userMediatorService.listMembership()
  ]).then(function(userGroupDetails) {
    self.groups = userGroupDetails[0];
    self.model = userGroupDetails[1];
    membership = userGroupDetails[2];

    //If we are editing an existing user, then check to see if the user is a member of a group already.
    if (self.model && self.model.id) {
      var userMembership = _.find(membership, function(_membership) {
        return _membership.user === self.model.id;
      });

      //If there is no membership entry, then the user is not a member of any groups.
      if (userMembership) {
        self.model.group = _.find(self.groups, function(group) {
          return userMembership.group === group.id;
        }).id;
      }
    }
  });

  self.done = function(isValid) {
    self.submitted = true;

    if (isValid) {
      var userOperation;
      if (!self.model.id && self.model.id !== 0) {
        userOperation = userMediatorService.createUser(self.model);
      } else {
        userOperation = userMediatorService.updateUser(self.model);
      }

      userOperation.then(function(createdUpdatedUser) {
        $state.go('app.worker.detail', {workerId: createdUpdatedUser.id}, {reload: true});
      });
    }
  };
}


angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).controller("WorkerFormController", ['$state', 'userMediatorService', '$stateParams', '$q', WorkerFormController]);