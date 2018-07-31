// Instantiation
$(function(){
    // build DOM from data
    var newspapers=[{
        organization: "The New York Times",
        founded: "1851"
    },{
        organization: "The Washington Post",
        founded: "1877"
    }];

    // pass in the data
    $("#container").scrollStory({
        content: newspapers,
        itembuild: function(ev, item){
            // add title from data
            item.el.append("<h2>"+item.data.organization+"</h2>");
        },
        itemfocus: function(ev, item){
            // log the founding dates as you go past
            console.log(item.data.organization + ", founded in " + item.data.founded + ", is now active!");
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

    console.log(newspapers);




});