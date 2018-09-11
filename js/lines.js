
var margin = {top: 210, right: 0, bottom: 0, left: 0},
// calculate the width of the chart from the width of the line-wrapper
width = parseInt(d3.select("#lines").style("width")) - margin.left - margin.right,
height = parseInt(d3.select("#lines").style("height")) - margin.top - margin.bottom;

var screenWidth = $(window).width();

var svg = d3.select("#lines").append("svg")
    .attr("id", "svg-1")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data = [{
    name: "Line 2",
    values: [
        {length: "80", across: "100"},
        {length: "230", across: "100"},
        {length: "280", across: "300"},
        {length: "1690", across: "300"},
        {length: "1740", across: "100"},
        {length: "1820", across: "100"}
    ]
},{
    name: "Line 3",
    values: [
        {length: "80", across: "100"},
        {length: "230", across: "100"},
        {length: "280", across: "400"},
        {length: "1690", across: "400"},
        {length: "1740", across: "100"},
        {length: "1820", across: "100"}
    ]
},{
    name: "Line 4",
    values: [
        {length: "80", across: "100"},
        {length: "230", across: "100"},
        {length: "280", across: "500"},
        {length: "1690", across: "500"},
        {length: "1740", across: "100"},
        {length: "1820", across: "100"}
    ]
}]

// alterntive layout for smaller screens

var data2 = [{
    name: "Line 2",
    values: [
        {length: "80", across: "100"},
        {length: "230", across: "100"},
        {length: "280", across: "200"},
        {length: "1690", across: "200"},
        {length: "1740", across: "100"},
        {length: "1820", across: "100"}
    ]
},{
    name: "Line 3",
    values: [
        {length: "80", across: "100"},
        {length: "230", across: "100"},
        {length: "280", across: "300"},
        {length: "1690", across: "300"},
        {length: "1740", across: "100"},
        {length: "1820", across: "100"}
    ]
},{
    name: "Line 4",
    values: [
        {length: "80", across: "100"},
        {length: "230", across: "100"},
        {length: "280", across: "400"},
        {length: "1690", across: "400"},
        {length: "1740", across: "100"},
        {length: "1820", across: "100"}
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

x.domain([0, 600]);
y.domain([0, 2000]);

// second scale for smaller screen

var x2 = d3.scaleLinear()
    .range([0, width]);

var y2 = d3.scaleLinear()
    .range([0, height]);

x2.domain([0, 500]);
y2.domain([0, 2000]);

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

// second lines for smaller screens

var line2 = d3.line()
    .curve(d3.curveLinear)
    .x(function(d) { return x2(d.across); })
    .y(function(d) { return y2(d.length); });

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
    .style('stroke', "#f3f3f3")
    .call(transition);

}

function drawLines2 () {

    let lines = svg.append('g')
    .attr('class', 'lines');

    lines.selectAll('.line-group')
    .data(data2).enter()
    .append('g')
    .attr('class', 'line-group')
    .append('path')
    .attr('class', 'line')  
    .attr("d", function(d) { return line2(d.values); })
    .style('stroke', "#f3f3f3")
    .call(transition);

}

setTimeout(function(){
    
    if (screenWidth > 440) {
        drawLines();
    } else {
        drawLines2();
    }
    
}, 1000);