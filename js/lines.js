
var margin = {top: 10, right: 25, bottom: 20, left: 35},
// calculate the width of the chart from the width of the line-wrapper
width = parseInt(d3.select("#lines-wrapper").style("width")) - margin.left - margin.right,
height = 1600 - margin.top - margin.bottom;

var svg = d3.select("#lines-wrapper").append("svg")
    .attr("id", "svg-1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data = [{
    name: "Line 1",
    values: [
        {length: "0", across: "100"},
        {length: "50", across: "100"},
        {length: "100", across: "100"},
        {length: "1000", across: "100"}
    ]
},{
    name: "Line 2",
    values: [
        {length: "0", across: "100"},
        {length: "50", across: "100"},
        {length: "100", across: "200"},
        {length: "1000", across: "200"}
    ]
},{
    name: "Line 3",
    values: [
        {length: "0", across: "100"},
        {length: "50", across: "100"},
        {length: "100", across: "300"},
        {length: "1000", across: "300"}
    ]
},{
    name: "Line 4",
    values: [
        {length: "0", across: "100"},
        {length: "50", across: "100"},
        {length: "100", across: "400"},
        {length: "1000", across: "400"}
    ]
}]

// format data

data.forEach(function(d) { 
    d.values.forEach(function(d) {
      d.length = d.length;
      d.across = +d.across;    
    });
});

// set scales

var x = d3.scaleLinear()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([0, height]);

x.domain([0, 500]);
y.domain([0, 1000]);

// define the line
var line = d3.line()
    .curve(d3.curveLinear)
    .x(function(d) { return x(d.across); })
    .y(function(d) { return y(d.length); });

let lines = svg.append('g')
.attr('class', 'lines');

lines.selectAll('.line-group')
.data(data).enter()
.append('g')
.attr('class', 'line-group')
.append('path')
.attr('class', 'line')  
.attr("d", function(d) { return line(d.values); })
.style('stroke', "white");



// function to trigger at particular scroll point

// function drawLines () {



// }

// drawLines(data);