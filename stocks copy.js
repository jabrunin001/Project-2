window.onload = function () {
  var dps1 = [], dps2= [];
  var stockChart = new CanvasJS.StockChart("chartContainer",{
    theme: "light2",
    exportEnabled: true,
    title:{
      text:"Netflix Stock"
    },
    subtitles: [{
      text: "Stock Price from IPO to current"
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
        yValueFormatString: "$#,###.##",
        dataPoints : dps1
      }]
    }],
    navigator: {
      data: [{
        dataPoints: dps2
      }],
      slider: {
        minimum: new Date(2002, 04, 23),
        maximum: new Date(2021, 11, 25)
      }
    }
  });
  $.getJSON("netflix_data.json", function(data) {
    for(var i = 0; i < data.length; i++){
      dps1.push({x: new Date(data[i].Date), y: [Number(data[i].Open), Number(data[i].High), Number(data[i].Low), Number(data[i].Close)]});
      dps2.push({x: new Date(data[i].Date), y: Number(data[i].Close)});
    }
    stockChart.render();
  });
}