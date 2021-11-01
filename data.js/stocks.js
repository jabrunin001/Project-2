window.onload = function () {
    var dataPoints = [];
    var stockChart = new CanvasJS.StockChart("stockChartContainer", {
      exportEnabled: true,
      title: {
        text:"Netflix Stock"
      },
      subtitles: [{
        text:"Stock Price from IPO to current"
      }],
      charts: [{
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "MMM YYYY"
          }
        },
        axisY: {
          title: "Stock price in Dollar",
          prefix: "$",
          suffix: "",
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            valueFormatString: "$#,###.00M",
          }
        },
        data: [{
          type: "line",
          xValueFormatString: "MMM YYYY",
          yValueFormatString: "$#,###.##M",
          dataPoints : dataPoints
        }]
      }],
      navigator: {
        slider: {
          minimum: new Date(2002, 04, 23),
          maximum: new Date(2021, 11, 25)
        }
      }
    });
    $.getJSON("netflix_data.json", function(data) {
      for(var i = 0; i < data.length; i++){
        dataPoints.push({x: new Date(data[i].date), y: Number(data[i].sale)});
      }
      stockChart.render();
    });
  }