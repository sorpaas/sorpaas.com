$(document).ready(function() {
  function type(d) {
    d.count = +d.count;
    return d;
  }
    
  var raw = d3.select("#csvdata").text();
  var data = d3.csv.parse(raw);

  var margin = {top: 20, right: 20, bottom: 30, left: 80},
      width = 960 - margin.left - margin.right,
      height = 30 * data.length - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([width, 0]);

  var y = d3.scale.ordinal()
      .rangeBands([0, height], .1);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");
    
  var topAxis = d3.svg.axis()
      .scale(x)
      .orient("top");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var svg = d3.select("#contents").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain([1617/*d3.max(data, function(d) { return d.count; })*/, 0]);
  y.domain(data.map(function(d) { return d.skill; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    
  svg.append("g")
      .attr("class", "x axis")
      .call(topAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", 0/*function(d) { return x(d.count); }*/)
      .attr("width", function(d) { return x(d.count); })
      .attr("y", function(d) { return y(d.skill); })
      .attr("height", y.rangeBand());
});