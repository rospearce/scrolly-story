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
            .text(function(column) { return column; });

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
    { name: "Insects", onepointfive: "6%", two: "18%", threepointtwo: "49%"},
    { name: "Plants", onepointfive: "8%", two: "16%", threepointtwo: "44%"},
    { name: "Vertebrates", onepointfive: "4%", two: "8%", threepointtwo: "26%"}
];

// render the table
var myTable = tabulate(species, ["name", "onepointfive", "two", "threepointtwo"]);

// uppercase the column headers
myTable.selectAll("thead th")
    .text(function(column) {
        return column.charAt(0).toUpperCase() + column.substr(1);
    });
    
// sort by age
// myTable.selectAll("tbody tr")
//     .sort(function(a, b) {
//         return d3.descending(a.age, b.age);
//     });