angular.module('MarketView.main', [])
.controller('MainController', function ($scope, ChartAFactory, ChartBFactory, CompareFactory){
	
	$scope.click = function(){
		var stockInfo = ChartAFactory.getData($scope.stockA);
		stockInfo.currentData.then(function(data){
			console.log("Stock data", data);
			$scope.stockAdata = data;
		})
		ChartBFactory.getData($scope.stockB);
		CompareFactory.setNames($scope.stockA, $scope.stockB);
	}
})