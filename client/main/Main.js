angular.module('MarketView.main', [])
.controller('MainController', function ($scope, ChartAFactory, ChartBFactory, CompareFactory){
	
	$scope.click = function(){
		ChartAFactory.getData($scope.stockA);
		ChartBFactory.getData($scope.stockB);
		CompareFactory.setNames($scope.stockA, $scope.stockB);
		console.log("factory stock data ", ChartAFactory.stockData);
		$scope.stockAdata = ChartAFactory.stockData;
		$scope.stockBdata = ChartBFactory.stockData;
	}
})