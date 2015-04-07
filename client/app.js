angular.module('MarketView', ['MarketView.main',
							  'MarketView.services',
							  'MarketView.auth',
							  'ngRoute'])
.config(function ($routeProvider, $httpProvider){
	$routeProvider
		.when('/' , {
			templateUrl: "auth/auth.html",
			controller: "AuthController"
		})
		.when('/main', {
			templateUrl: "main/main.html",
			controller: "MainController",
		})
})