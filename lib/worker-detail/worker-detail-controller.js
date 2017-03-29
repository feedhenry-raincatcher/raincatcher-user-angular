var CONSTANTS = require('../constants');
var _ = require('lodash');


/**
 *
 * Controller for showing worker details
 *
 * @param $scope
 * @param $state
 * @param $mdDialog
 * @param $stateParams
 * @param {UserMediatorService} userMediatorService
 * @param $q
 * @param $timeout
 * @param fileClient - The client for accessing files (TODO: This will be removed when the fh-wfm-file refactor is complete)
 *
 * @constructor
 */
function WorkerDetailController($scope, $state, $mdDialog, $stateParams, userMediatorService, $q, $timeout, fileClient) {
  var self = this;
  var workerId = $stateParams.workerId;

  //TODO: This will switch to the userMediatorService when the fh-wfm-file refactor is complete.
  function readUserFiles() {
    return fileClient.list().then(function(files) {
      return _.filter(files || [], function(file) {
        return String(file.owner) === String($stateParams.workerId);
      });
    });
  }

  //Need to read the worker, workorders, messages, files, worker, membership, groups
  $q.all([userMediatorService.readUser(workerId), userMediatorService.listUserWorkorders(workerId), readUserFiles(), userMediatorService.readUserGroup(workerId)]).then(function(allUserData) {
    $timeout(function() {
      self.worker = allUserData[0];
      self.workorders = allUserData[1];
      self.files = allUserData[2];
      self.group = allUserData[3];
    });
  });


  //TODO: This will switch to the userMediatorService when the fh-wfm-messages refactor is complete.
  //self.messages =  messageManager.list().then(function(messages) {
  //  return _.filter(messages || [], function(message) {
  //    return String(message.receiverId) === String(workerId);
  //  });
  //});

  //TODO: Check this
  self.delete = function(event, worker) {
    event.preventDefault();
    var confirm = $mdDialog.confirm()
      .title('Would you like to delete worker #'+worker.id+'?')
      .textContent(worker.name)
      .ariaLabel('Delete Worker')
      .targetEvent(event)
      .ok('Proceed')
      .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      userMediatorService.removeUser(worker)
        .then(function() {
          $state.go('app.worker', null, {reload: true});
        }, function(err) {
          throw err;
        });
    });
  };

  self.selectWorkorder = function(workorder) {
    $state.go(
      'app.workorder.detail',
      { workorderId: workorder.id || workorder._localuid },
      { reload: true }
    );
  };

  self.selectMessage =  function(message) {
    $state.go('app.message.detail', {
      messageId: message.id || message._localuid },
      { reload: true }
    );
  };

}




angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).controller('WorkerDetailController', ['$scope', '$state', '$mdDialog', '$stateParams', 'userMediatorService', '$q', '$timeout', 'fileClient', WorkerDetailController]);