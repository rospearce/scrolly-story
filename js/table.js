var getName = {
    "name": "",
    "1.5C": "1.5C",
    "2C": "2C",
    "3C": "3C",
    "3.2C": "3.2C"
}

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
            return getName[column];
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
    { name: "Insects", "1.5C": "6%", "2C": "18%", "3.2C": "49%"},
    { name: "Plants", "1.5C": "8%", "2C": "16%", "3.2C": "44%"},
    { name: "Vertebrates", "1.5C": "4%", "2C": "8%", "3.2C": "26%"}
];

var rainfall = [
    { name: "Extreme precipitation events (R99p)", "1.5C": "20%", "2C": "26%"},
    { name: "Maximum 5-day rainfall total (RX5D)", "1.5C": "11%", "2C": "12%"},
    { name: "Consecutive dry days (CDD)", "1.5C": "0%", "2C": "-5%"}
];

// render the table
var myTable = tabulate(species, ["name", "1.5C", "2C", "3.2C"]);

// uppercase the column headers
// myTable.selectAll("thead th")
//     .text(function(column) {
//         return column.charAt(0).toUpperCase() + column.substr(1);
//     });

// bold the text of the first column
myTable.selectAll('td:nth-child(1)')
.style("font-weight", "bold");

function updateTable () {};

// sort by age
// myTable.selectAll("tbody tr")
//     .sort(function(a, b) {
//         return d3.descending(a.age, b.age);
//     });