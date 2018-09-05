// headers

var getSpeciesHeader = {
    "name": "",
    "1.5C": "1.5C",
    "2C": "2C",
    "3C": "3.2C"
}

var getRainfallHeader = {
    "name": "",
    "1.5C": "1.5C",
    "2C": "2C",
    "3C": ""
}

var getGDPHeader = {
    "name": "",
    "1.5C": "1.5C",
    "2C": "2C",
    "3C": "3C"
}

// objects

// placeholder text to stop bug where from adding species data twice when scrolling up and down
var background2 = [
    { "name": "", "1.5C": "", "2C": "", "3C": ""},
    { "name": "", "1.5C": "", "2C": "", "3C": ""},
    { "name": "", "1.5C": "", "2C": "", "3C": ""}
];

var species = [
    { "name": "Insects", "1.5C": "6%", "2C": "18%", "3C": "49%"},
    { "name": "Plants", "1.5C": "8%", "2C": "16%", "3C": "44%"},
    { "name": "Vertebrates", "1.5C": "4%", "2C": "8%", "3C": "26%"}
];

var rainfall = [
    { "name": "Extreme precipitation events", "1.5C": "<span class='arrow-up one'>&#9650;</span> 20%", "2C": "<span class='arrow-up two'>&#9650;</span> 26%", "3C": ""},
    { "name": "Maximum 5-day rainfall total", "1.5C": "<span class='arrow-up one'>&#9650;</span> 11%", "2C": "<span class='arrow-up two'>&#9650;</span> 12%", "3C": ""},
    { "name": "Consecutive dry days", "1.5C": "0%", "2C": "<span class='arrow-down two'>&#9660;</span> -5%", "3C": ""}
];

var gdp = [
    { "name": "Global per capita GDP in 2100", "1.5C": "<span class='arrow-down one'>&#9660;</span> -8%", "2C": "<span class='arrow-down two'>&#9660;</span> -13%", "3C": ""},
];

var newData;
var dataName;

var t = d3.transition()
    .delay(1000)
    .duration(3000)
    .ease(d3.easeLinear);

var columns = ["name", "1.5C", "2C", "3C"];

var table = d3.select(".table").append("table"),
    thead = table.append("thead"),
    tbody = table.append("tbody");

function tabulate(data, columns) {

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
        .text(function(column) { 
            return getSpeciesHeader[column];
        });

    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append("td")
        .html(function(d) { return d.value; });
    
    return table;
}

// render the table
var myTable = tabulate(background2, columns);

// bold the text of the first column
myTable.selectAll('td:nth-child(1)')
.style("font-weight", "bold");

function updateTable () {
    
    var rows = tbody.selectAll("tr")
    .data(newData, function (d) {return d.name;});
    
    rows.enter()
    .append("tr")
    .selectAll("td")
    .data(function (d) {return [d.name, d["1.5C"], d["2C"], d["3C"] ];})
    .enter()
    .append("td")
    .style("opacity", 0)
    .html(function(d) { return d; })
    .transition(t)
    .style("opacity", 1);
    
    rows.exit()
    .remove();
    
    var cells = rows.selectAll('td')
    .data(function (d) {return d.name, d["1.5C"], d["2C"], d["3C"];})
    .html(function (d) {return d;});
    
    cells.enter()
    .append("td")
    .style("opacity", 0)
    .html(function(d) { return d; })
    .transition(t)
    .style("opacity", 1);;
    
    cells.exit()
    .remove();

    // update the column headers
    myTable.selectAll("thead th")
    .text(function(column) {
        if (dataName =="rainfall") {
            return getRainfallHeader[column];
        } else if (dataName =="species")  {
            return getSpeciesHeader[column];
        } else if (dataName =="gdp")  {
            return getGDPHeader[column];
        } else if (dataName =="background2")  {
            return getSpeciesHeader[column];
        }
    });

    // bold the text of the first column
    myTable.selectAll('td:nth-child(1)')
    .attr("class", "row-header");

    // change colour of column headers
    myTable.selectAll('th:nth-child(2)')
    .style("color", "#B4C7D1");
    myTable.selectAll('th:nth-child(3)')
    .style("color", "#BCABC6");
    myTable.selectAll('th:nth-child(4)')
    .style("color", "#C6A1AE");

}