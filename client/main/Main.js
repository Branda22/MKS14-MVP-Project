angular.module('MarketView.main', [])
.controller('MainController', function ($scope, ChartAFactory, ChartBFactory, CompareFactory){
	
	$scope.click = function(){
		var stockAInfo = ChartAFactory.getData($scope.stockA);
		stockAInfo.currentData.then(function(data){
			console.log("Stock data", data);
			$scope.stockAdata = data;
		})
		var stockBInfo = ChartBFactory.getData($scope.stockB);
		stockBInfo.currentData.then(function(data){
			$scope.stockBdata = data;
		})
		CompareFactory.setNames($scope.stockA, $scope.stockB);
	}
})