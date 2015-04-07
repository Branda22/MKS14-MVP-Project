angular.module('MarketView.helpers', [])
.factory('Helpers', function(){
	var parseDate = function(){
		var today = new Date();
		return today.toISOString().substring(0, 10);
	}

	return {
		parseDate: parseDate
	}
});