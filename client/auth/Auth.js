angular.module('MarketView.auth', [])
.controller('AuthController', function ($scope, $http, AuthFactory){
	$scope.user = {};
	$scope.click = function(){
		console.log($scope.user);
		AuthFactory.signup($scope.user);
	}
})
