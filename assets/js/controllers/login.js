angular.module('mandarinMaster.login', ['ngRoute', 'ngResource', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/index.ejs',
        controller: 'LoginController'
    });
}])
.factory('Sessions', ['$resource', function($resource) {
  return $resource( '/sessions/:_id', null,
    {
        'update': { method:'PUT' }
    });
}])
.controller('LoginController', ['$location', 'Users', 'Sessions', '$rootScope', '$cookieStore', '$http', '$scope', '$resource',
    function($location, Users, Sessions, $rootScope, $cookieStore, $http, $scope, $resource) {
 
        // reset login status
        if($rootScope.globals.currentUser) Sessions.update({ _id: $rootScope.globals.currentUser.tokenid }, { expired: 'Y'});
        $rootScope.globals = {};
        $cookieStore.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic';
 
        $scope.login = function() {
                $scope.users = Users.query(function() {
                    
                    $scope.found = false;
            angular.forEach($scope.users, function(user,key) {
                if(user.email == $scope.email && md5($scope.password) == user.password) {

                var d = new Date() ;
                d.setTime( d.getTime() - new Date().getTimezoneOffset()*60*1000 );
                
                var d1 = moment(user.passwordlastreset);
                var d2 = moment(d);
                var daydiff = Math.floor(moment.duration(d2.diff(d1)).asDays());
                console.log(daydiff);
                if(daydiff > 30 && user.email != 'admin@mandarinmaster.co.uk') {
                    var editData = {
                        password: 'Expired'
                    };
                    $resource( '/users/' + user._id , {}, {
                        'update': { method:'PUT',
                        isArray: false
                    }
                    }).update(editData).$promise.then(function() {
                        $scope.email = 'Invalid Login!';
                        alert('Your password has been in use for 30 days and has now expired. Please contact the system admin for a new one.');
                        $location.path('/login');
                    });
                } else {
                
                $scope.session = {
                    email : $scope.email,
                    logindate: d,
                    expired: 'N'
                };
                
                Sessions.save($scope.session, function(session) {
                    $scope.sessionid = session._id;
                    $rootScope.globals = {
                        currentUser: {
                            email: user.email,
                            tokenid: session._id
                        }
                    };
 
                    $http.defaults.headers.common['Authorization'] = $scope.sessionid; // jshint ignore:line
                    $cookieStore.put('globals', $rootScope.globals);
                    $scope.email = 'Please wait, you will be redirected shortly...';
                    $location.path('/dashboard');
                    $scope.found = true;
                });
                
                }
                }
            });
            
            if(!$scope.found) {
                $scope.email = 'Invalid Login!';
            }
                });
                
        };
    }
 ]);