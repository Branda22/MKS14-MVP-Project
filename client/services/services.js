angular.module('MarketView.services', [])
.factory('ChartAFactory', function ($http){
	console.log("Inside the chart A factory");
	var chart1;
	var container;
	var stockData = [];
	var ohlc = [];
	var volume = [];
	var stockNameA = "";
	var getData = function(stock){
		stockNameA = stock;
		console.log(stock);
		$http({
			method: 'GET',
			url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22'+stock+'%22%20and%20startDate%20%3D%20%222014-09-11%22%20and%20endDate%20%3D%20%222015-03-10%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
		}).then(function(json){
			// console.log(json)
			var data = json.data.query.results.quote;
			OHLCdataParse(data);
		})
	}

	var OHLCdataParse = function(data){
		ohlc = []; //reset the array to prevent mixed stock data.
		for(var i = 0; i < data.length; i++){
			ohlc.unshift([
                data[i]["Date"], // the date
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
		container: container,
		getData: getData,
		OHLCdataParse: OHLCdataParse,
		renderChart: renderChart
	}
})
.factory('ChartBFactory', function ($http){
	console.log("Inside the chart B factory")
	var chart1;
	var container;
	var stockData = [];
	var ohlc = [];
	var volume = [];
	var stockNameA = "";
	var getData = function(stock){
		stockNameA = stock;
		console.log(stock);
		$http({
			method: 'GET',
			url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22'+stock+'%22%20and%20startDate%20%3D%20%222014-09-11%22%20and%20endDate%20%3D%20%222015-03-10%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
		}).then(function(json){
			// console.log(json)
			var data = json.data.query.results.quote;
			OHLCdataParse(data);
		})
	}

	var OHLCdataParse = function(data){
		ohlc = [];
		for(var i = 0; i < data.length; i++){
			ohlc.unshift([
                data[i]["Date"], // the date
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
			series : [{
				type: 'candlestick',
	            name : stockNameA,
	            data : ohlc
			}]
		});	
	}

	return {
		container: container,
		getData: getData,
		OHLCdataParse: OHLCdataParse,
		renderChart: renderChart
	}
})
.factory('CompareFactory', function ($http){
	var names = [];
	var parsedData = [];
	var setNames = function(stockA, stockB){
		console.log("The two stocks are ", stockA, stockB);
		names = [stockA, stockB];
		getDataForNames(names);
	}


	var getDataForNames = function(){
		names.forEach(function(name){
			console.log("Fetching data for ", name);
			$http({
			method: 'GET',
			url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22'+name+'%22%20and%20startDate%20%3D%20%222014-09-11%22%20and%20endDate%20%3D%20%222015-03-10%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
		}).then(function(json){
			// console.log(json)
			var data = json.data.query.results.quote;
			OHLCdataParse(data);
		})
		})
	}

	var OHLCdataParse = function(data){
		console.log("Parsing data for ", data);
		var ohlc = [];
		for(var i = 0; i < data.length; i++){
			ohlc.unshift([
	            data[i]["Date"], // the date
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
		console.log(parsedData);
	}

	return {
		names: names,
		setNames: setNames
	}

});
