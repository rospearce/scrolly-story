// Instantiation
$(function(){

    // variables
    var intro = $('.intro')

    // build DOM from data
    var impacts=[{
        name: "Background-1"
    },{
        name: "Background-2"
    },{
        name: "Species",
        text: "Lorem ipsum dolor sit amet, eligendi scriptorem et nam."
    },{
        name: "Rainfall",
        text: "Lorem ipsum dolor sit amet, eligendi scriptorem et nam."
    },{
        name: "GDP",
        text: "Lorem ipsum dolor sit amet, eligendi scriptorem et nam."
    }];

    var enterEvents = function (ev, item) {
        if(item.index === 0){
            // intro.addClass('fixed');
        } else if (item.index === 1) {
            // do nothing
        } else {
            item.el.css('background-color', '#c6e7fa');
        }
    }

    var exitEvents = function (ev, item) {
        if(item.index === 0){
            intro.removeClass('fixed').addClass('moving');
        } else if (item.index === 1) {
            // do nothing
        } else {
            item.el.css('background-color', '#c6e7fa');
        }
    }

    // pass in the data
    $("#container").scrollStory({
        content: impacts,
        itembuild: function(ev, item){
            // add title from data
            // actually better to build all the items in the same way so that can manipulate the behaviour of all?
            if(item.index === 0) {
                // don't append anything
            } else if (item.index === 1) {
                // don't append anything
            } else {
                item.el.append("<h2>"+item.data.name+"</h2><p>"+item.data.text+"</p>");
            }
        },
        itemfocus: function(ev, item){
            // log the founding dates as you go past
            console.log(item.data.name + ", is now active!");
        },
        // containerscroll: handleContainerScroll,
        itementerviewport: enterEvents,
        itemexitviewport: exitEvents,
        complete: function() {
            var that = this;
            $('#nav').on('click', 'li', function() {
                // +2 since not counting title and first background
                that.index($('li', $('#nav')).index($(this)) + 2);
            });


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



});