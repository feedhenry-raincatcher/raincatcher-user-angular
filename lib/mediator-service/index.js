var CONSTANTS = require('../constants');
var shortid = require('shortid');
var q = require('q');
var MediatorTopicUtility = require('fh-wfm-mediator/lib/topics');
var _ = require('lodash');

/**
 *
 * Getting Promises for done and error topics.
 * This will resolve or reject the reuturned promise depending on the topic published.
 *
 * @param doneTopicPromise  - A promise for the done topic.
 * @param errorTopicPromise - A promise for the error topic.
 * @returns {Promise}
 */
function getTopicPromises(doneTopicPromise, errorTopicPromise) {
  var deferred = q.defer();

  doneTopicPromise.then(function(createdWorkorder) {
    deferred.resolve(createdWorkorder);
  });

  errorTopicPromise.then(function(error) {
    deferred.reject(error);
  });

  return deferred.promise;
}



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
}


UserMediatorService.prototype.listFiles = function listFiles() {
  var promise = this.getErrorAndDoneTopicPromises(this.filesTopics, CONSTANTS.TOPICS.LIST);

  this.mediator.publish(this.filesTopics.getTopic(CONSTANTS.TOPICS.LIST));

  return promise;
};

/**
 *
 * Getting Promises for the done and error topics.
 *
 * @param {MediatorTopicUtility} topicGenerator
 * @param {string} topicName   - The name of the topic to generate
 * @param {string} [topicUid]  - A topic UID if required.
 * @returns {Promise} - A promise for the topic.
 */
UserMediatorService.prototype.getErrorAndDoneTopicPromises = function getErrorAndDoneTopicPromises(topicGenerator, topicName, topicUid) {
  var doneTopic = topicGenerator.getTopic(topicName, CONSTANTS.DONE_PREFIX, topicUid);
  var errorTopic = topicGenerator.getTopic(topicName, CONSTANTS.ERROR_PREFIX, topicUid);

  var doneTopicPromise = topicGenerator.mediator.promise(doneTopic);
  var errorTopicPromise = topicGenerator.mediator.promise(errorTopic);

  var timeoutDefer = q.defer();

  setTimeout(function() {
    timeoutDefer.reject(new Error("Timeout For Topic: " + doneTopic));
  }, this.config.topicTimeout || CONSTANTS.TOPIC_TIMEOUT);

  //Either one of these promises resolves/rejects or it will time out.
  return q.race([getTopicPromises(doneTopicPromise, errorTopicPromise), timeoutDefer.promise]);
};

/**
 *
 * Listing all workorders
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.listWorkorders = function listWorkorders() {
  var promise = this.getErrorAndDoneTopicPromises(this.workordersTopics, CONSTANTS.TOPICS.LIST);

  this.mediator.publish(this.workordersTopics.getTopic(CONSTANTS.TOPICS.LIST));

  return promise;
};

/**
 *
 * Getting any group memberships that the user is a member of
 *
 * @param workerId
 */
UserMediatorService.prototype.getUserMembership = function getUserMembership(workerId) {
  var promise = this.getErrorAndDoneTopicPromises(this.membershipTopics, CONSTANTS.TOPICS.LIST);

  this.mediator.publish(this.membershipTopics.getTopic(CONSTANTS.TOPICS.LIST));

  return promise.then(function(groupMemberships) {

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
  //When creating a new user, we need to create a new membership entry
  var topicUid = shortid.generate();

  var promise = this.getErrorAndDoneTopicPromises(this.usersTopics, CONSTANTS.TOPICS.CREATE, topicUid);

  this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.CREATE), {
    userToCreate: userToCreate,
    topicUid: topicUid
  });

  return promise;
};

/**
 *
 * Updating an existing user
 *
 */
UserMediatorService.prototype.updateUser = function updateUser(userToUpdate) {
  var topicUid = shortid.generate();

  var promise = this.getErrorAndDoneTopicPromises(this.usersTopics, CONSTANTS.TOPICS.UPDATE, topicUid);

  this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.UPDATE), {
    userToUpdate: userToUpdate,
    topicUid: topicUid
  });

  return promise;
};

/**
 *
 * Listing all user groups
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.listGroups = function listGroups() {
  var promise = this.getErrorAndDoneTopicPromises(this.groupsTopics, CONSTANTS.TOPICS.LIST);

  this.mediator.publish(this.groupsTopics.getTopic(CONSTANTS.TOPICS.LIST));

  return promise;
};

/**
 *
 * Listing all user groups
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.readGroup = function readGroup(id) {
  var promise = this.getErrorAndDoneTopicPromises(this.groupsTopics, CONSTANTS.TOPICS.READ, id);

  this.mediator.publish(this.groupsTopics.getTopic(CONSTANTS.TOPICS.READ), {
    id: id,
    topicUid: id
  });

  return promise;
};

/**
 *
 * Removing a single group
 *
 * @param groupToRemove
 * @returns {Promise}
 */
UserMediatorService.prototype.removeGroup = function removeGroup(groupToRemove) {
  var promise = this.getErrorAndDoneTopicPromises(this.groupsTopics, CONSTANTS.TOPICS.REMOVE, groupToRemove.id);

  this.mediator.publish(this.groupsTopics.getTopic(CONSTANTS.TOPICS.REMOVE), {
    groupToRemove: groupToRemove,
    topicUid: groupToRemove.id
  });

  return promise;
};

/**
 *
 * Creating a new user group
 *
 * @param groupToCreate
 * @returns {Promise}
 */
UserMediatorService.prototype.createGroup = function createGroup(groupToCreate) {
  var topicUid = shortid.generate();

  var promise = this.getErrorAndDoneTopicPromises(this.groupsTopics, CONSTANTS.TOPICS.CREATE, topicUid);

  this.mediator.publish(this.groupsTopics.getTopic(CONSTANTS.TOPICS.CREATE), {
    groupToCreate: groupToCreate,
    topicUid: topicUid
  });

  return promise;
};

/**
 *
 * Updating an existing user group
 *
 * @param groupToUpdate
 * @returns {Promise}
 */
UserMediatorService.prototype.updateGroup = function updateGroup(groupToUpdate) {
  var topicUid = shortid.generate();

  var promise = this.getErrorAndDoneTopicPromises(this.groupsTopics, CONSTANTS.TOPICS.UPDATE, topicUid);

  this.mediator.publish(this.groupsTopics.getTopic(CONSTANTS.TOPICS.UPDATE), {
    groupToUpdate: groupToUpdate,
    topicUid: topicUid
  });

  return promise;
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
 * Listing Workorders Associated With This User.
 *
 * @param workerId
 * @returns {Promise}
 */
UserMediatorService.prototype.listUserWorkorders = function listUserWorkorders(workerId) {
  return this.listWorkorders().then(function(workorders) {
    return _.filter(workorders || [], function(workorder) {
      return String(workorder.assignee) === String(workerId);
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
  var promise = this.getErrorAndDoneTopicPromises(this.usersTopics, CONSTANTS.TOPICS.READ, userId);

  this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.READ), {id: userId, topicUid: userId});

  return promise;
};

/**
 *
 * Removing A Single User
 *
 * @param {Object} user - The User To Remove
 * @returns {Promise}
 */
UserMediatorService.prototype.removeUser = function removeUser(user) {
  var promise = this.getErrorAndDoneTopicPromises(this.usersTopics, CONSTANTS.TOPICS.REMOVE, user.id);

  this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.REMOVE), {userToRemove: user, topicUid: user.id});

  return promise;
};


/**
 *
 * Listing All Users
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.listUsers = function listUsers() {
  var promise = this.getErrorAndDoneTopicPromises(this.usersTopics, CONSTANTS.TOPICS.LIST);

  this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.LIST));

  return promise;
};

/**
 *
 * Listing All User Group Memberships
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.listMembership = function listMembership() {
  var promise = this.getErrorAndDoneTopicPromises(this.membershipTopics, CONSTANTS.TOPICS.LIST);

  this.mediator.publish(this.membershipTopics.getTopic(CONSTANTS.TOPICS.LIST));

  return promise;
};

/**
 *
 * Topic for checking if the currently logged in user has a stored session
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.userHasSession = function userHasSession() {
  var promise = this.getErrorAndDoneTopicPromises(this.usersTopics, CONSTANTS.TOPICS.HAS_SESSION);

  this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.HAS_SESSION));

  return promise;
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
  var promise = this.getErrorAndDoneTopicPromises(this.usersTopics, CONSTANTS.TOPICS.AUTHENTICATE);

  this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.AUTHENTICATE), {
    username: username,
    password: password
  });

  return promise;
};

/**
 *
 * Clearing the current session for a user.
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.clearUserSession = function clearUserSession() {
  var promise = this.getErrorAndDoneTopicPromises(this.usersTopics, CONSTANTS.TOPICS.CLEAR_SESSION);

  this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.CLEAR_SESSION));

  return promise;
};

/**
 *
 * Reading the current user profile
 *
 * @returns {Promise}
 */
UserMediatorService.prototype.readUserProfile = function readUserProfile() {
  var promise = this.getErrorAndDoneTopicPromises(this.usersTopics, CONSTANTS.TOPICS.READ_PROFILE);

  this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.READ_PROFILE));

  return promise;
};


angular.module(CONSTANTS.USER_SERViCE).service("userMediatorService", ['mediator', 'USER_CONFIG', function(mediator, USER_CONFIG) {
  return new UserMediatorService(mediator, USER_CONFIG);
}]);

module.exports = CONSTANTS.USER_SERViCE;