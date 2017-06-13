var CONSTANTS = require('../constants');
var MediatorTopicUtility = require('fh-wfm-mediator/lib/topics');
var _ = require('lodash');



/**
 *
 * A mediator service that will publish and subscribe to topics to be able to render user data.
 *
 * @param {Mediator} mediator
 * @param {object}   config
 * @constructor
 */
function UserMediatorService(mediator, config) {
  this.mediator = mediator;
  this.config = config || {};

  this.workordersTopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.WORKORDER_ENTITY_NAME);
  this.usersTopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.USERS_ENTITY_NAME);
  this.groupsTopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.GROUP_ENTITY_NAME);
  this.membershipTopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.MEMBERSHIP_ENTITY_NAME);
  this.filesTopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.FILES_ENTITY_NAME);
  this.resultsTopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.RESULTS_ENTITY_NAME);
}


UserMediatorService.prototype.listFiles = function listFiles() {
  return this.mediator.publish(this.filesTopics.getTopic(CONSTANTS.TOPICS.LIST));
};

/**
 *
 * Listing all workorders
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.listWorkorders = function listWorkorders() {

  return this.mediator.publish(this.workordersTopics.getTopic(CONSTANTS.TOPICS.LIST));
};

/**
 *
 * Getting any group memberships that the user is a member of
 *
 * @param workerId
 */
UserMediatorService.prototype.getUserMembership = function getUserMembership(workerId) {
  return this.mediator.publish(this.membershipTopics.getTopic(CONSTANTS.TOPICS.LIST)).then(function(groupMemberships) {

    return _.find(groupMemberships, function(_membership) {
      return _membership.user === workerId;
    });
  });
};

/**
 *
 * Creating a new user
 *
 * @param {object} userToCreate - The user to be created
 */
UserMediatorService.prototype.createUser = function createUser(userToCreate) {

  return this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.CREATE), {
    userToCreate: userToCreate
  });
};

/**
 *
 * Updating an existing user
 *
 */
UserMediatorService.prototype.updateUser = function updateUser(userToUpdate) {
  return this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.UPDATE), {
    userToUpdate: userToUpdate
  });
};

/**
 *
 * Listing all user groups
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.listGroups = function listGroups() {

  return this.mediator.publish(this.groupsTopics.getTopic(CONSTANTS.TOPICS.LIST));
};

/**
 *
 * Listing all user groups
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.readGroup = function readGroup(id) {
  return this.mediator.publish(this.groupsTopics.getTopic(CONSTANTS.TOPICS.READ), {
    id: id
  });
};

/**
 *
 * Removing a single group
 *
 * @param groupToRemove
 * @returns {Promise}
 */
UserMediatorService.prototype.removeGroup = function removeGroup(groupToRemove) {

  return this.mediator.publish(this.groupsTopics.getTopic(CONSTANTS.TOPICS.REMOVE), {
    groupToRemove: groupToRemove
  });
};

/**
 *
 * Creating a new user group
 *
 * @param groupToCreate
 * @returns {Promise}
 */
UserMediatorService.prototype.createGroup = function createGroup(groupToCreate) {

  return this.mediator.publish(this.groupsTopics.getTopic(CONSTANTS.TOPICS.CREATE), {
    groupToCreate: groupToCreate
  });
};

/**
 *
 * Updating an existing user group
 *
 * @param groupToUpdate
 * @returns {Promise}
 */
UserMediatorService.prototype.updateGroup = function updateGroup(groupToUpdate) {
  return this.mediator.publish(this.groupsTopics.getTopic(CONSTANTS.TOPICS.UPDATE), {
    groupToUpdate: groupToUpdate
  });
};

/**
 *
 * Reading the detail of the user group a worker is a member of
 *
 * @param workerId
 */
UserMediatorService.prototype.readUserGroup = function readUserGroup(workerId) {
  var self = this;

  return self.listGroups().then(function(groups) {
    return self.getUserMembership(workerId).then(function(userMembership) {
      //If the user is a member of a group, we should display the group.
      if (userMembership) {
        return _.find(groups, function(group) {
          return userMembership.group === group.id;
        }) || null;
      }

      return null;
    });
  });
};

/**
 *
 * Listing All Results
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.listResults = function listResults() {
  return this.mediator.publish(this.resultsTopics.getTopic(CONSTANTS.TOPICS.LIST));
};


/**
 *
 * Listing Workorders Associated With This User.
 *
 * @param workerId
 * @returns {Promise}
 */
UserMediatorService.prototype.listUserWorkorders = function listUserWorkorders(workerId) {
  var self = this;
  return this.listWorkorders().then(function(workorders) {
    return self.listResults()
    .then(function(results) {

      workorders = _.filter(workorders, function(workorder) {
        return workorder.assignee === workerId;
      });

      return _.map(workorders, function(workorder) {
        var result = _.find(results, {workorderId: workorder.id}) || {};
        workorder.status = result.status;
        return workorder;
      });
    });
  });

};


/**
 *
 * Reading A Single User
 *
 * @param {string} userId - the ID of the user to read
 * @returns {Promise}
 */
UserMediatorService.prototype.readUser = function readUser(userId) {

  return this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.READ), {id: userId});
};

/**
 *
 * Removing A Single User
 *
 * @param {Object} user - The User To Remove
 * @returns {Promise}
 */
UserMediatorService.prototype.removeUser = function removeUser(user) {
  return this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.REMOVE), {userToRemove: user});
};


/**
 *
 * Listing All Users
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.listUsers = function listUsers() {
  return  this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.LIST));
};

/**
 *
 * Listing All User Group Memberships
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.listMembership = function listMembership() {
  return  this.mediator.publish(this.membershipTopics.getTopic(CONSTANTS.TOPICS.LIST));
};

/**
 *
 * Topic for checking if the currently logged in user has a stored session
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.userHasSession = function userHasSession() {
  return this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.HAS_SESSION));
};

/**
 *
 * Verifying that the currently logged in user has a valid session.
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.verifyUserSession = function verifyUserSession() {
  return  this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.VERIFY_SESSION));
};

/**
 *
 * Topic for authenticating a user
 *
 * @param {string} username - The username to authenticate
 * @param password          - The password to authenticate
 * @returns {Promise}
 */
UserMediatorService.prototype.authenticateUser = function authenticateUser(username, password) {
  return this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.AUTHENTICATE), {
    username: username,
    password: password
  });
};

/**
 *
 * Clearing the current session for a user.
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.clearUserSession = function clearUserSession() {

  return this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.CLEAR_SESSION));
};

/**
 *
 * Reading the current user profile
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.readUserProfile = function readUserProfile() {
  return this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.READ_PROFILE));
};


angular.module(CONSTANTS.USER_SERViCE).service("userMediatorService", ['mediator', 'USER_CONFIG', function(mediator, USER_CONFIG) {
  return new UserMediatorService(mediator, USER_CONFIG);
}]);

module.exports = CONSTANTS.USER_SERViCE;