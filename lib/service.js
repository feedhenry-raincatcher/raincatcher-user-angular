'use strict';

var ngModule = angular.module('wfm.user.services', ['wfm.core.mediator']);
module.exports = 'wfm.user.services';


require('./mediator-service');

/**
 *
 * Angular User Client
 *
 * (Only used for backward compatibility. Will be removed after other refactors are complete)
 *
 * @param {UserMediatorService} userMediatorService
 * @constructor
 */


ngModule.factory('userClient', function(userMediatorService, $q) {

  function UserClient() {
  }

  UserClient.prototype.list = function listUsers() {
    return userMediatorService.listUsers();
  };

  UserClient.prototype.hasSession = function userHasSession() {
    return $q.when(userMediatorService.userHasSession());
  };

  UserClient.prototype.verifySession = function verifySession() {
    return userMediatorService.verifyUserSession();
  };

  UserClient.prototype.auth = function auth(username, password) {
    return userMediatorService.authenticateUser(username, password);
  };

  UserClient.prototype.clearSession = function clearUserSession() {
    return userMediatorService.clearUserSession();
  };

  UserClient.prototype.getProfile = function readUserProfile() {
    return userMediatorService.readUserProfile();
  };

  return new UserClient(userMediatorService);
});
