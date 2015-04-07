angular.module('MarketView.auth', [])
.controller('AuthController', function ($scope, $location, $http, AuthFactory){
	$scope.user = {};
	$scope.signup = function(){
		console.log($scope.user);
		var response = AuthFactory.signup($scope.user);
		response.then(function(response){
			console.log("promisse message", response);
			if(response.status === "SUCCESS"){
				$location.path('/main');
			} else {
				console.log(response.message);
			}
		});
	}
	$scope.login = function(){
		var response = AuthFactory.login($scope.user);
		response.then(function(response){
			if(response.status === "SUCCESS"){
				$location.path('/main');
			} else {
				console.log(response.message);
			}
		})
	}
})
