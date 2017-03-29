var ngModule;
try {
  ngModule = angular.module('wfm.user.directives');
} catch (e) {
  ngModule = angular.module('wfm.user.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/group-detail.tpl.html',
    '<md-toolbar class="content-toolbar">\n' +
    '  <div class="md-toolbar-tools">\n' +
    '    <h3>\n' +
    '      {{ctrl.group.name}} Group\n' +
    '    </h3>\n' +
    '\n' +
    '    <span flex></span>\n' +
    '    <md-button class="md-icon-button" aria-label="Edit" ui-sref="app.group.edit({groupId: ctrl.group.id})">\n' +
    '      <md-icon md-font-set="material-icons">edit</md-icon>\n' +
    '    </md-button>\n' +
    '    <md-button class="md-icon-button" aria-label="Delete" ng-click="ctrl.delete($event, ctrl.group)">\n' +
    '      <md-icon md-font-set="material-icons">delete</md-icon>\n' +
    '    </md-button>\n' +
    '  </div>\n' +
    '</md-toolbar>\n' +
    '<md-button class="md-fab" aria-label="New group" ui-sref="app.group.new">\n' +
    '  <md-icon md-font-set="material-icons">add</md-icon>\n' +
    '</md-button>\n' +
    '\n' +
    '<div class="wfm-maincol-scroll" ng-if="ctrl.group && ctrl.members">\n' +
    '  <group group="ctrl.group" members="ctrl.members"></group>\n' +
    '</div><!-- wfm-maincol-scroll -->\n' +
    '');
}]);
