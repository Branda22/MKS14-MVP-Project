angular.module('MarketView.services', ['MarketView.helpers'])
.factory('ChartAFactory', function ($http, Helpers){
	console.log("Inside the chart A factory");
	console.log("The current date is ", Helpers.parseDate());
	var chart1;
	var container;
	var stockData = null;
	var ohlc = [];
	var volume = [];
	var stockNameA = "";
	var getData = function(stock){
		stockNameA = stock;
		//GET HISTORICAL DATA INFORMATION
		return {
			historicalData: $http({
				method: 'GET',
				url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22'+stock+'%22%20and%20startDate%20%3D%20%222014-01-01%22%20and%20endDate%20%3D%20%22'+ Helpers.parseDate() +'%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
			}).then(function(json){
				// console.log(json)
				var data = json.data.query.results.quote;
				OHLCdataParse(data);
			}),
		//GET CURRENT QUOTE INFORMATION
			currentData: $http({
				method: 'GET',
				url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'+stock+'%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
			}).then(function(json){
				//console.log("Stock data", json);
				return stockData = json.data.query.results.quote;
			})
		}
	}

	var OHLCdataParse = function(data){
		ohlc = []; //reset the array to prevent mixed stock data.
		for(var i = 0; i < data.length; i++){
			var date = data[i]["Date"];
			date = date.replace(/[-]/g, '.');
			date = new Date(date).getTime();

			ohlc.unshift([
                date, // the date
                parseFloat(data[i]["Open"]), // open
                parseFloat(data[i]["High"]), // high
                parseFloat(data[i]["Low"]), // low
                parseFloat(data[i]["Close"]) // close
    		]);
    		volume.unshift([
    			data[i]["Date"],
    			parseFloat(data[i]["Volume"])
    		])
		}
		renderChart();
	}

	var renderChart = function(){
		chart1 = new Highcharts.StockChart({
			chart: {
				renderTo: "containerA"
			},
			title: {
				text: stockNameA + " Historical"
			},
			rangeSelector: {
				selected: 1
			},
			data: {
				dateFormat: "YYYY-mm-dd"
			},
			series : [{
				type: 'candlestick',
	            name : stockNameA,
	            data : ohlc
			}]
		});	
	}

	return {
		stockData: stockData,
		container: container,
		getData: getData,
		OHLCdataParse: OHLCdataParse,
		renderChart: renderChart
	}
})
.factory('ChartBFactory', function ($http, Helpers){
	console.log("Inside the chart B factory")
	var chart1;
	var container;
	var stockData = null;
	var ohlc = [];
	var volume = [];
	var stockNameA = "";
	var getData = function(stock){
		stockNameA = stock;
		return {
			//GETS HISTORIAL DATA
			historicalData: $http({
				method: 'GET',
				url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22'+stock+'%22%20and%20startDate%20%3D%20%222014-01-01%22%20and%20endDate%20%3D%20%22'+Helpers.parseDate()+'%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
			}).then(function(json){
				// console.log(json)
				var data = json.data.query.results.quote;
				OHLCdataParse(data);
			}),
			//GETS CURRENT DATA
			currentData: $http({
				method: 'GET',
				url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'+stock+'%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
			}).then(function(json){
				return stockData = json.data.query.results.quote
				console.log(stockData);
			})
		}
	}

	var OHLCdataParse = function(data){
		ohlc = [];
		for(var i = 0; i < data.length; i++){
			//MAKE STRING DATA INTO UNIX TIME.
			var date = data[i]["Date"];
			date = date.replace(/[-]/g, '.');
			date = new Date(date).getTime();

			ohlc.unshift([
                date, // the date
                parseFloat(data[i]["Open"]), // open
                parseFloat(data[i]["High"]), // high
                parseFloat(data[i]["Low"]), // low
                parseFloat(data[i]["Close"]) // close
    		]);
    		volume.unshift([
    			data[i]["Date"],
    			parseFloat(data[i]["Volume"])
    		])
		}
		renderChart();
	}

	var renderChart = function(){
		chart1 = new Highcharts.StockChart({
			chart: {
				renderTo: "containerB"
			},
			title: {
				text: stockNameA + " Historical"
			},
			rangeSelector: {
				selected: 1
			},
			data: {
				dateFormat: "YYYY-mm-dd"
			},
			candlestick: {
				animation: true
			},
			series : [{
				type: 'candlestick',
	            name : stockNameA,
	            data : ohlc
			}]
		});	
	}

	return {
		stockData: stockData,
		container: container,
		getData: getData,
		OHLCdataParse: OHLCdataParse,
		renderChart: renderChart
	}
})
.factory('CompareFactory', function ($http, Helpers){
	var names = [];
	var parsedData = [];
	var seriesData = [];
	var setNames = function(stockA, stockB){
		names = [stockA, stockB];
		getDataForNames(names);
	}


	var getDataForNames = function(){
		seriesData = [];
		parsedData = [];
		names.forEach(function(name){
			$http({
			method: 'GET',
			url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22'+name+'%22%20and%20startDate%20%3D%20%222014-01-01%22%20and%20endDate%20%3D%20%22'+Helpers.parseDate()+'%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
		}).then(function(json){
			// console.log(json)
			var data = json.data.query.results.quote;
			OHLCdataParse(data);
		})
		})
	}

	var OHLCdataParse = function(data){
		var ohlc = [];
		for(var i = 0; i < data.length; i++){
			var date = data[i]["Date"];
			date = date.replace(/[-]/g, '.');
			date = new Date(date).getTime();
			ohlc.unshift([
	            date, // the date
	            parseFloat(data[i]["Open"]), // open
	            parseFloat(data[i]["High"]), // high
	            parseFloat(data[i]["Low"]), // low
	            parseFloat(data[i]["Close"]) // close
			]);
			// volume.unshift([
			// 	data[i]["Date"],
			// 	parseFloat(data[i]["Volume"])
			// ])
		}
		parsedData.push(ohlc);
		for(var i = 0; i < parsedData.length; i++){
			seriesData[i] = {
				name: names[i],
				data: parsedData[i]
			}
		}
		renderChart();
	}

	var renderChart = function(){
		chart1 = new Highcharts.StockChart({
			chart: {
				renderTo: "containerC"
			},
			title: {
				text: names[0] + " VS " + names[1]
			},
			rangeSelector: {
				selected: 1
			},
			yAxis: {
	            labels: {
	                formatter: function () {
	                    return (this.value > 0 ? ' + ' : '') + this.value + '%';
	                }
	            },
	            plotLines: [{
	                value: 0,
	                width: 2,
	                color: 'silver'
	            }]
             },
			data: {
				dateFormat: "YYYY-mm-dd"
			},
			plotOptions: {
				series:{
					compare: "percent"
				}
			},
			series: seriesData
		});	
	}

	return {
		names: names,
		setNames: setNames
	}
})
.factory('AuthFactory', function ($http){
	var signup = function(user){
		return $http({
			method: 'POST',
			url: 'http://127.0.0.1:3000/signup',
			data: { 'message': user } ,
			headers: {'Content-Type': 'application/json'}
		}).then(function(resp){
			console.log(resp.data);
			return resp.data;
		})
	}

	var login = function(user){
		return $http({
			method: 'POST',
			url: 'http://127.0.0.1:3000/login',
			data: { 'message': user },
			headers: { 'Content-Type' : 'application/json' }
		}).then(function(resp){
			return resp.data;
		})
	}
	return {
		signup: signup,
		login: login
	}
});
