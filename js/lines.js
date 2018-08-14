
var margin = {top: 180, right: 0, bottom: 0, left: 50},
// calculate the width of the chart from the width of the line-wrapper
width = parseInt(d3.select("#lines").style("width")) - margin.left - margin.right,
height = 1720 - margin.top - margin.bottom;

var svg = d3.select("#lines").append("svg")
    .attr("id", "svg-1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data = [{
    name: "Line 2",
    values: [
        {length: "0", across: "50"},
        {length: "150", across: "50"},
        {length: "200", across: "150"},
        {length: "1000", across: "150"}
    ]
},{
    name: "Line 3",
    values: [
        {length: "0", across: "50"},
        {length: "150", across: "50"},
        {length: "200", across: "250"},
        {length: "1000", across: "250"}
    ]
},{
    name: "Line 4",
    values: [
        {length: "0", across: "50"},
        {length: "150", across: "50"},
        {length: "200", across: "350"},
        {length: "1000", across: "350"}
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

// define the line
var lineInitial = d3.line()
    .curve(d3.curveLinear)
    .x(function(d) { return x(0); })
    .y(function(d) { return y(0); });

// from https://bl.ocks.org/mbostock/5649592

function transition(path) {
    path.transition()
        .duration(5000)
        .attrTween("stroke-dasharray", tweenDash);
}
    
function tweenDash() {
    var l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    return function(t) { return i(t); };
}

// function to trigger at particular scroll point

function drawLines () {

    let lines = svg.append('g')
    .attr('class', 'lines');

    lines.selectAll('.line-group')
    .data(data).enter()
    .append('g')
    .attr('class', 'line-group')
    .append('path')
    .attr('class', 'line')  
    .attr("d", function(d) { return line(d.values); })
    .style('stroke', "white")
    .call(transition);

}

setTimeout(function(){ 
    drawLines();
}, 1000);