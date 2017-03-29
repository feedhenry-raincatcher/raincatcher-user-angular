var ngModule;
try {
  ngModule = angular.module('wfm.user.directives');
} catch (e) {
  ngModule = angular.module('wfm.user.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/worker-detail.tpl.html',
    '<md-toolbar class="content-toolbar">\n' +
    '  <div class="md-toolbar-tools">\n' +
    '    <h3>\n' +
    '      Worker : {{ctrl.worker.name}}\n' +
    '    </h3>\n' +
    '\n' +
    '    <span flex></span>\n' +
    '    <md-button class="md-icon-button" aria-label="Edit" ui-sref="app.worker.edit({workerId: ctrl.worker.id})">\n' +
    '      <md-icon md-font-set="material-icons">edit</md-icon>\n' +
    '    </md-button>\n' +
    '    <md-button class="md-icon-button" aria-label="Delete" ng-click="ctrl.delete($event, ctrl.worker)">\n' +
    '      <md-icon md-font-set="material-icons">delete</md-icon>\n' +
    '    </md-button>\n' +
    '  </div>\n' +
    '</md-toolbar>\n' +
    '<md-button class="md-fab" aria-label="New Worker" ui-sref="app.worker.new">\n' +
    '  <md-icon md-font-set="material-icons">add</md-icon>\n' +
    '</md-button>\n' +
    '\n' +
    ' <md-tabs md-dynamic-height md-border-bottom>\n' +
    '    <md-tab label="Information" ng-if="ctrl.worker">\n' +
    '      <worker worker="ctrl.worker" group="ctrl.group"></worker>\n' +
    '    </md-tab>\n' +
    '\n' +
    '    <md-tab label="Workorders" ng-if="ctrl.workorders">\n' +
    '      <md-content class="wfm-maincol-scroll wfm-maincol-scroll_with-menu">\n' +
    '\n' +
    '        <md-list>\n' +
    '          <md-list-item\n' +
    '            ng-repeat="workorder in ctrl.workorders"\n' +
    '            ng-click="ctrl.selectWorkorder(workorder)"\n' +
    '            ng-class="{active: ctrl.selected.id === workorder.id}"\n' +
    '            class="md-3-line workorder-item"\n' +
    '          >\n' +
    '          <workorder-status class="" status="ctrl.resultMap[workorder.id].status"></workorder-status>\n' +
    '\n' +
    '            <div class="md-list-item-text">\n' +
    '              <h3>\n' +
    '                {{workorder.type}} -\n' +
    '                <span ng-if="workorder.id">{{workorder.id}}</span>\n' +
    '                <span ng-if="! workorder.id" style="font-style: italic;">&lt;local&gt;</span>\n' +
    '              </h3>\n' +
    '              <h4>{{workorder.title}}</h4>\n' +
    '              <p>{{workorder.address}}</p>\n' +
    '            </div>\n' +
    '            <md-divider></md-divider>\n' +
    '          </md-list-item>\n' +
    '        </md-list>\n' +
    '      </md-content>\n' +
    '    </md-tab>\n' +
    '\n' +
    '    <md-tab label="Messages" ng-if="ctrl.messages">\n' +
    '      <md-content class="messages wfm-maincol-scroll wfm-maincol-scroll_with-menu">\n' +
    '        <md-list-item class="md-3-line" ng-repeat="message in ctrl.messages | reverse" ng-click="ctrl.selectMessage(message)" class="md-3-line workorder-item"\n' +
    '         ng-class="{active: ctrl.selected.id === message.id, new: message.status === \'unread\'}">\n' +
    '          <img ng-src="{{message.sender.avatar}}" class="md-avatar" alt="{{message.sender.name}}" />\n' +
    '          <div class="md-list-item-text" layout="column">\n' +
    '            <!--<span class="md-caption time-stamp">13 mins ago</span>-->\n' +
    '            <h3>{{message.sender.name}}</h3>\n' +
    '            <h4>{{message.subject}}</h4>\n' +
    '            <p>{{message.content}}</p>\n' +
    '          </div>\n' +
    '          <md-divider md-inset></md-divider>\n' +
    '        </md-list-item>\n' +
    '      </md-content>\n' +
    '    </md-tab>\n' +
    '\n' +
    '    <md-tab label="Files" ng-if="ctrl.files">\n' +
    '      <md-content class="messages wfm-maincol-scroll wfm-maincol-scroll_with-menu">\n' +
    '        <md-list class="wfm-file-list">\n' +
    '          <md-list-item class="md-2-line" ng-click="navigateTo(\'app.file.detail\', {fileUid: file.uid})" ng-repeat="file in ctrl.files" ng-class="{active: selected.id === file.id}">\n' +
    '            <div class="md-list-item-text">\n' +
    '              <img wfm-img uid="file.uid">\n' +
    '              <div class="wfm-file-list-desc">\n' +
    '                <h3>{{file.name}}</h3>\n' +
    '                <p>{{ctrl.workerMap[file.owner].name}}</p>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '            <md-icon class="md-secondary" md-font-set="material-icons">delete</md-icon>\n' +
    '            <md-divider></md-divider>\n' +
    '          </md-list-item>\n' +
    '        </md-list>\n' +
    '      </md-content>\n' +
    '    </md-tab>\n' +
    '  </md-tabs>\n' +
    '');
}]);
