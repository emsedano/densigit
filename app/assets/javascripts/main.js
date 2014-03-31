$(document).ready(function(){



var charData = [];
var chart;

$('#myTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

$('#analyze').click(function (e) {
  var gituser = $("input[name=gituser]").val();
  var repo = $("input[name=repository]").val();

  if(gituser && repo){
  	
  	$.getJSON( Density.url(gituser, repo), function(data) {
		  charData = [];
		  //var charData = Density.getCharData("day", data);
		  var d = Density.extractTopic("day", data);
      
      for( k in d){
        charData.push({
          date : k,
          commits : d[k]
        })
      }

      charData.reverse();
      
    // SERIAL CHART
      chart = new AmCharts.AmSerialChart();
      chart.pathToImages = "http://www.amcharts.com/lib/images/";
      chart.autoMarginOffset = 3;
      chart.marginRight = 50;
      chart.zoomOutButton = {
          backgroundColor: '#dadada',
          backgroundAlpha: 0.15
      };
      chart.dataProvider = charData;
      chart.categoryField = "date";

      // data updated event will be fired when chart is displayed,
      // also when data will be updated. We'll use it to set some
      // initial zoom
      chart.addListener("dataUpdated", zoomChart);

      // AXES
      // Category
      var categoryAxis = chart.categoryAxis;
      categoryAxis.parseDates = true; // in order char to understand dates, we should set parseDates to true
      categoryAxis.minPeriod = "mm"; // as we have data with minute interval, we have to set "mm" here.             
      categoryAxis.gridAlpha = 0.07;
      categoryAxis.showLastLabel = false;
      categoryAxis.axisColor = "#DADADA";

      // Value
      var valueAxis = new AmCharts.ValueAxis();
      valueAxis.gridAlpha = 0.07;
      valueAxis.title = "Commits";
      chart.addValueAxis(valueAxis);

      // GRAPH
      var graph = new AmCharts.AmGraph();
      graph.type = "line"; // try to change it to "column"
      graph.title = "Desity of commits per day";
      graph.valueField = "commits";
      graph.lineAlpha = 1;
      graph.lineColor = "#d1cf2a";
      graph.fillAlphas = 0.3; // setting fillAlphas to > 0 value makes it area graph
      chart.addGraph(graph);

      // CURSOR
      var chartCursor = new AmCharts.ChartCursor();
      chartCursor.cursorPosition = "mouse";
      chartCursor.categoryBalloonDateFormat = "DD MMMM";
      chart.addChartCursor(chartCursor);

      // SCROLLBAR
      var chartScrollbar = new AmCharts.ChartScrollbar();

      chart.addChartScrollbar(chartScrollbar);

      // WRITE
      chart.write("chartdiv");
      
		  
		});

  }else{
  	alert("please fill github user and repository name");
  }
});


// this method is called when chart is inited as we listen for "dataUpdated" event
function zoomChart() {
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    chart.zoomToIndexes(0, charData.length -1  );

}

});

