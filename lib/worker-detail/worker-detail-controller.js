var CONSTANTS = require('../constants');
var _ = require('lodash');


/**
 *
 * Controller for showing worker details
 *
 * @param $state
 * @param $mdDialog
 * @param $stateParams
 * @param {UserMediatorService} userMediatorService
 * @param $q
 * @param $timeout

 * @constructor
 */
function WorkerDetailController($state, $mdDialog, $stateParams, userMediatorService, $q, $timeout) {
  var self = this;
  var workerId = $stateParams.workerId;

  function readUserFiles() {
    return userMediatorService.listFiles().then(function(files) {
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

  self.delete = function(event, worker) {
    event.preventDefault();
    var confirm = $mdDialog.confirm()
      .title('Would you like to delete worker '+worker.name+'?')
      .textContent("ID: " + worker.id)
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




angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).controller('WorkerDetailController', ['$state', '$mdDialog', '$stateParams', 'userMediatorService', '$q', '$timeout', WorkerDetailController]);