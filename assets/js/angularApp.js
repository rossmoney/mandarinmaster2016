var app = angular.module('mandarinMaster', ['ui.router']);

app.factory('users', [function(){
  var o = {
    users: []
  };
  return o;
}]);

app.controller('mandarinMaster', [
'$scope',
'users',
function($scope, users){
  $scope.users = users.users;
  $scope.test = 'Hello world!';

    $scope.login = function(){
       
    };
}]);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '/login.html',
      controller: 'login'
    });

  $urlRouterProvider.otherwise('home');
}]);