angular.module('MarketView.services', [])
.factory('ChartAFactory', function ($http){
	console.log("Inside the chart A factory");
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
				url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22'+stock+'%22%20and%20startDate%20%3D%20%222014-09-11%22%20and%20endDate%20%3D%20%222015-03-10%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
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
		stockData: stockData,
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
	var stockData = null;
	var ohlc = [];
	var volume = [];
	var stockNameA = "";
	var getData = function(stock){
		stockNameA = stock;
		$http({
			method: 'GET',
			url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22'+stock+'%22%20and%20startDate%20%3D%20%222014-09-11%22%20and%20endDate%20%3D%20%222015-03-10%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
		}).then(function(json){
			// console.log(json)
			var data = json.data.query.results.quote;
			OHLCdataParse(data);
		})

		$http({
			method: 'GET',
			url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'+stock+'%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
		}).then(function(json){
			stockData = json.data.query.results.quote
			console.log(stockData);
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
.factory('CompareFactory', function ($http){
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
			url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22'+name+'%22%20and%20startDate%20%3D%20%222014-09-11%22%20and%20endDate%20%3D%20%222015-03-10%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='
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

});
