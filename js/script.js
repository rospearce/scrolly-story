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
    $("#container").scrollStory({content: newspapers});

    
});