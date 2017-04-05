var CONSTANTS = require('../constants');

function WorkerController($scope) {
  var self = this;
  self.worker = $scope.worker;
  self.group = $scope.group;
  var bannerUrl = self.worker.banner || self.worker.avatar;
  self.style = {
    'background-image': 'url(' + bannerUrl + ')',
    'background-position': self.worker.banner ? 'center center' : 'top center',
    'background-size': self.worker.banner ? 'auto' : 'contain',
    'background-repeat': 'no-repeat'
  };
}

angular.module(CONSTANTS.USER_DIRECTIVE_MODULE).controller("WorkerController", ['$scope', WorkerController]);