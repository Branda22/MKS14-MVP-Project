angular.module('MarketView.main', [])
.controller('MainController', function ($scope, ChartAFactory, ChartBFactory, CompareFactory){
	$scope.stockA = "Pick a Stock";
	$scope.stockB = "Pick a Stock";
	$scope.click = function(){
		ChartAFactory.getData($scope.stockA);
		ChartBFactory.getData($scope.stockB);
		CompareFactory.setNames($scope.stockA, $scope.stockB);
	}
})