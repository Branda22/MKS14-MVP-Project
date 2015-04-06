angular.module('MarketView', ['MarketView.main',
							  'MarketView.services',
							  'ngRoute'])
.config(function ($routeProvider, $httpProvider){
	$routeProvider
		.when('/main', {
			templateUrl: "main/main.html",
			controller: "MainController"
		})
})