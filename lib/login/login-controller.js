var CONSTANTS = require('../constants');

/**
 *
 * Controller for user login / logout
 *
 * @param $timeout
 * @param {UserMediatorService} userMediatorService
 *
 * @constructor
 */
function LoginCtrl($timeout, userMediatorService) {
  var self = this;
  self.loginErrorMessage = "";
  self.loginMessages = {success: false, error: false};

  userMediatorService.userHasSession().then(function(hasSession) {
    $timeout(function() {
      self.hasSession = hasSession;
    });
  });

  self.login = function(valid) {
    if (valid) {
      self.loginErrorMessage = "";
      self.loginMessages.error = false;
      userMediatorService.authenticateUser(self.username, self.password)
        .then(function() {
          $timeout(function() {
            self.loginMessages.success = true;
          });
        }, function(err) {
          $timeout(function() {
            self.loginMessages.error = true;
            self.loginErrorMessage = err;
          });
        });
    }
  };

  self.logout = function() {
    userMediatorService.clearUserSession();
  };
}

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).controller('LoginCtrl', ['$timeout', 'userMediatorService', LoginCtrl]);