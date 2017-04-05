var ngModule;
try {
  ngModule = angular.module('wfm.user.directives');
} catch (e) {
  ngModule = angular.module('wfm.user.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/empty.tpl.html',
    '<div class="empty-state" layout-padding layout-margin>\n' +
    '  <h2 class="md-title">No worker selected.</h2>\n' +
    '  <p class="md-body-1">Select a worker from the menu, or create a new worker:</p>\n' +
    '  <md-button class="md-raised md-accent" ui-sref="app.worker.new">New worker</md-button>\n' +
    '</div>\n' +
    '');
}]);
