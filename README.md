# Raincatcher User Angular User Interface

This module is an AngularJS implementation of User functionality for the Raincatcher project.s

## Setup

```javascript
angular.module('app', [
...
, require('fh-wfm-user-angular')({
  templates: {
    //Optional template for the login screen
    //Note: This will be loaded from the angular template cache.
    login: 'mycustomlogintempalateid'
  }
})
...
])
```

## Templates

### Login

A custom html template can be passed in when rendering the `login` directive.

This template has access to the Controller as `ctrl`.

#### Login Controller Properties

The Login Controller is assigned the following properties that are accessible to the custom template if required.

| Property | Type | Description | Example |
| ---- | ----------- | -------- | ------- |
| login | function | Authenticates the user with a `username` and `password` parameters | `ctrl.login("someusername", "somepassowrd")` |
| logout | function | Logs out the currently logged out user | `ctrl.logout()` |
| hasSession | boolean | Identifies if the currently logged in user has a valid session | `ctrl.hasSession` |
| loginErrorMessage | string | A message to display to the user if there is an error message | `ctrl.loginErrorMessage = "Invalid Credentials"` |

## Topics

As part of rendering Users, this module publishes and subscribes to several topics. These topics can be implemented in your application or you can use the fh-wfm-user module that already has implementations for these topics.

### Published Topics

Each of the following topics subscribes to the `error` and `done` topics. If the parameter includes a `topicUid`, the error topic should have the `topicUid` appended to the `done` or `error` topic.

| Topic | Parameters |
| ---- | ----------- |
| *wfm:workorders:list* | NONE |
| *wfm:membership:list* | NONE |
| *wfm:users:list* | NONE |
| *wfm:users:create* | `{userToCreate: userToCreate}` |
| *wfm:users:update* |  `{userToUpdate: userToUpdate}` |
| *wfm:users:read* | `{id: "USERID"}` |
| *wfm:users:remove* | `{userToRemove: {id: "USERID"}}` |
| *wfm:users:has_session* | NONE |
| *wfm:users:clear_session* | NONE |
| *wfm:users:read_profile* | NONE |
| *wfm:users:authenticate* | `{username: "user1234", password: "pass1234"}` |
| *wfm:groups:list* | NONE |
| *wfm:groups:create* | `{groupToCreate: groupToCreate}` |
| *wfm:groups:update* | `{groupToUpdate: groupToUpdate}` |
| *wfm:groups:read* | `{id: "GROUPID"}` |
| *wfm:groups:remove* | `{groupToRemove: {id: "GROUPID"}}` |