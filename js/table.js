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
    "3C": ""
}

var newData;
var dataName;

var t1 = d3.transition()
    .delay(1000)
    .duration(3000)
    .ease(d3.easeLinear);

function tabulate(data, columns) {

    var table = d3.select(".table").append("table"),
        thead = table.append("thead"),
        tbody = table.append("tbody");

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
        .text(function(column) { 
            return getSpeciesHeader[column];
        });

    // console.log(columns);

    // var headers = d3.selectAll('table').selectAll('th');

    // console.log(headers);

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
            .text(function(d) { return d.value; });
    
    return table;
}


var species = [
    { name: "Insects", "1.5C": "6%", "2C": "18%", "3C": "49%"},
    { name: "Plants", "1.5C": "8%", "2C": "16%", "3C": "44%"},
    { name: "Vertebrates", "1.5C": "4%", "2C": "8%", "3C": "26%"}
];

var rainfall = [
    { name: "Extreme precipitation events", "1.5C": "20%", "2C": "26%", "3C": ""},
    { name: "Maximum 5-day rainfall total", "1.5C": "11%", "2C": "12%", "3C": ""},
    { name: "Consecutive dry days", "1.5C": "0%", "2C": "-5%", "3C": ""}
];

var gdp = [
    { name: "Global per capita GDP in 2100", "1.5C": "20%", "2C": "26%", "3C": ""},
];

// render the table
var myTable = tabulate(species, ["name", "1.5C", "2C", "3C"]);

// uppercase the column headers
// myTable.selectAll("thead th")
//     .text(function(column) {
//         return column.charAt(0).toUpperCase() + column.substr(1);
//     });

// bold the text of the first column
myTable.selectAll('td:nth-child(1)')
.style("font-weight", "bold");

function updateTable () {
    
    var rows = myTable.selectAll("tbody tr")
    .data(newData, function (d) {return d.name;});
    
    rows.enter()
    .append('tr')
    .selectAll("td")
    .data(function (d) {return [d.name, d["1.5C"], d["2C"], d["3C"] ];})
    .enter()
    .append("td")
    .style("opacity", 0)
    .text(function(d) { return d; })
    .transition(t1)
    .style("opacity", 1);
    
    rows.exit()
    .remove();
    
    var cells = rows.selectAll('td')
    .data(function (d) {return d.name, d["1.5C"], d["2C"], d["3C"];})
    .text(function (d) {return d;});
    
    cells.enter()
    .append("td")
    .style("opacity", 0)
    .text(function(d) { return d; })
    .transition(t1)
    .style("opacity", 1);;
    
    cells.exit()
    .remove();

    // update the column headers

    var dataName = "rainfall";

    var getHeader = "get" + dataName.charAt(0).toUpperCase() + dataName.substr(1) + "Header";

    console.log(getHeader);
    
    // change column headers
    myTable.selectAll("thead th")
    .text(function(column) {
        if (dataName =="rainfall") {
            return getRainfallHeader[column];
        } else if (dataName =="species")  {
            return getSpeciesHeader[column];
        } else if (dataName =="gdp")  {
            return getGDPHeader[column];
        }
    });

    // bold the text of the first column
    myTable.selectAll('td:nth-child(1)')
    .style("font-weight", "bold");
}

setTimeout(function(){

// working but trying to trigger from scrolly now

    newData = rainfall;

    updateTable(newData);

    console.log(newData);

}, 3000);

// sort by age
// myTable.selectAll("tbody tr")
//     .sort(function(a, b) {
//         return d3.descending(a.age, b.age);
//     });