var CONSTANTS = require('../constants');

/**
 *
 * A Controller For Editing Group Data.
 *
 * @param userMediatorService
 * @param $stateParams
 * @param $q
 * @param $timeout
 * @param $state
 *
 * @constructor
 */
function GroupFormController(userMediatorService, $stateParams, $q, $timeout, $state) {
  var self = this;
  self.submitted = false;

  var groupId = $stateParams.groupId;

  //If there his no group ID in the URL, we are creating a new group.
  var readGroupPromise = groupId ? userMediatorService.readGroup(groupId) : $q.when({});

  readGroupPromise.then(function(group) {
    $timeout(function() {
      self.model = group;
    });
  });

  self.done = function(isValid) {
    self.submitted = true;
    if (isValid) {
      var createUpdatePromise = groupId ? userMediatorService.updateGroup(self.model) : userMediatorService.createGroup(self.model);

      createUpdatePromise.then(function() {
        $state.go('app.group', {}, {reload: true});
      });
    }
  };
}

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).controller("GroupFormController", ['userMediatorService', '$stateParams', '$q', '$timeout', '$state', GroupFormController]);