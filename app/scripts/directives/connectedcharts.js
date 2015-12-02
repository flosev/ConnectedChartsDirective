angular.module('pragmasoftAngularTestApp').directive('connectedCharts', [ function() {
  'use strict';

  return {
    templateUrl: 'views/charts.html',
    restrict: 'A',
    link: function(scope) {
      // Chart parameters
      scope.events = [
        {value: 'markdown'},
        {value: 'revenues'},
        {value: 'margin'}
      ];
      scope.selectedEvent = scope.events[0];
      var
        pieChart = dc.pieChart("#pie"),
        timeChart = dc.seriesChart("#time"),
        file = "/data/data.csv",
        ndx;

      d3.csv(file, function(error, experiments) {
        ndx  = crossfilter(experiments);
        // Chart parameter section
        var
          pieDimension  = ndx.dimension(function(d) {return "category-"+ d.category_desc;}),
          speedSumGroup = pieDimension.group().reduceSum(function(d) {return d[scope.selectedEvent.value] * d.week_ref;}),
          categories = [],
          timeDimension = ndx.dimension(function(d) {
            if (categories.indexOf(d.category_desc) === -1) {categories.push(d.category_desc)};
            return [+categories.indexOf(d.category_desc), +d.week_ref];
          }),
          timeGroup = timeDimension.group().reduceSum(function(d) {return +d[scope.selectedEvent.value]; });
        // Pie chart rendering
        pieChart
          .width(500)
          .height(780)
          .slicesCap(14)
          .innerRadius(50)
          .dimension(pieDimension)
          .group(speedSumGroup)
          .legend(dc.legend().x(100).y(20).itemHeight(13).gap(5).horizontal(1).legendWidth(240).itemWidth(170));

        // Time series line chart rendering
        timeChart
          .width(768)
          .height(700)
          .chart(function(c) { return dc.lineChart(c).interpolate('basis'); })
          .x(d3.scale.linear().domain([0,1]))
          .y(d3.scale.linear().domain([0,1]))
          .brushOn(true)
          .yAxisLabel([scope.selectedEvent.value])
          .xAxisLabel("Time, weeks")
          .clipPadding(10)
          .elasticY(true)
          .elasticX(true)
          .dimension(timeDimension)
          .group(timeGroup)
          .mouseZoomable(true)
          .seriesAccessor(function(d) {return "Category: " + categories[d.key[0]];})
          .keyAccessor(function(d) {return +d.key[1];})
          .legend(dc.legend().x(150).y(20).itemHeight(13).gap(5).horizontal(1).legendWidth(240).itemWidth(170))
          .yAxis().tickFormat(function(d) {return d3.format(',d')(d);});
        timeChart.margins().left += 40;

        dc.renderAll();
      });
      //  Reset function
      scope.clearAll = function () {
        scope.selectedEvent = scope.events[0];
        d3.csv(file, function(error, experiments) {
        ndx.remove();
        timeChart.yAxisLabel(scope.selectedEvent.value);
        ndx.add(experiments);
        pieChart.filterAll();
        timeChart.filterAll();
        dc.redrawAll();
        });
      };
      // Change category function
       scope.changeCategory = function () {
        d3.csv(file, function(error, experiments) {
          ndx.remove();
          timeChart.yAxisLabel(scope.selectedEvent.value);
          ndx.add(experiments);
          dc.redrawAll();
        });
      };
    }
  }
}]);
