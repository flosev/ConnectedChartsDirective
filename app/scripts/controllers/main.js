'use strict';

/**
 * @ngdoc function
 * @name pragmasoftAngularTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pragmasoftAngularTestApp
 */
angular.module('pragmasoftAngularTestApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
