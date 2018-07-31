// Instantiation
$(function(){
    // build DOM from data
    var impacts=[{
        name: "Species",
        text: "Lorem ipsum dolor sit amet, eligendi scriptorem et nam."
    },{
        name: "Rainfall",
        text: "Lorem ipsum dolor sit amet, eligendi scriptorem et nam."
    },{
        name: "GDP",
        text: "Lorem ipsum dolor sit amet, eligendi scriptorem et nam."
    }];

    // pass in the data
    $("#container").scrollStory({
        content: impacts,
        itembuild: function(ev, item){
            // add title from data
            item.el.append("<h2>"+item.data.name+"</h2><p>"+item.data.text+"</p>");
        },
        itemfocus: function(ev, item){
            // log the founding dates as you go past
            console.log(item.data.name + ", is now active!");
        }
    });

    // manipulate the style of items as they gain and lose focus, making it dependent on index

    $("#container").on('itemfocus', function(ev, item){
        if(item.index === 0){
            item.el.css('background-color', '#f3f3f3');
        } else {
            item.el.css('background-color', '#c6e7fa');
        }
    });
        
    $("#container").on('itemblur', function(ev, item){
        item.el.css('background-color', 'white');
    });

    // console.log(newspapers);




});