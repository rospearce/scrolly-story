// Instantiation
$(function(){

    // // variables to select key elements
    // var interactive = $('.example');
    // var background = interactive.find('.graphic-background');

    // // viewport height
    // var viewportHeight = window.innerHeight;
    // var halfViewportHeight = Math.floor(viewportHeight / 2)

    // // handle the fixed/static position of graphic
    // // currently immediately switches between the two because of way numbers are set up
    // var toggle = function(fixed, bottom) {
    //     if (fixed) background.addClass('is-fixed')
    //     else background.removeClass('is-fixed')

    //     if (bottom) background.addClass('is-bottom')
    //     else background.removeClass('is-bottom')
    // }


    var handleContainerScroll = function(event) {
        // var bottom = false
        // var fixed = false
    
        // var bb = background[0].getBoundingClientRect()

        // var bottomFromTop = bb.bottom - viewportHeight

        // console.log(bottomFromTop);
        // console.log(bb.top);
        // console.log(bb);
    
        // if (bb.top < 0 && bottomFromTop > 0) {
        //     bottom = false
        //     fixed = true
        //     console.log('fixed');
            
        // } else if (bb.top < 0 && bottomFromTop < 0) {
        //     bottom = true
        //     fixed = false
        //     console.log('bottom');
        // }
    
        // toggle(fixed, bottom)
    }    


    // build DOM from data
    var impacts=[{
        name: "1.5C vs 2C example",
        text: "<li><i class='fas fa-paw'></i> Species</li><li><i class='fas fa-tint'></i> Rainfall</li><li><i class='fas fa-dollar-sign'></i> GDP</li></div>"
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

    // pass in the data
    $("#container").scrollStory({
        content: impacts,
        itembuild: function(ev, item){
            // add title from data
            // actually better to build all the items in the same way so that can manipulate the behaviour of all?
            if(item.index === 0) {
                item.el.append("<h1>"+item.data.name+"</h1><div id='nav'>"+item.data.text+"</div>");
            } else {
                item.el.append("<h2>"+item.data.name+"</h2><p>"+item.data.text+"</p>");
            }
        },
        itemfocus: function(ev, item){
            // log the founding dates as you go past
            console.log(item.data.name + ", is now active!");
        },
        containerscroll: handleContainerScroll,
        complete: function() {
            var that = this;
            $('#nav').on('click', 'li', function() {
                // +1 since not counting title slide
                that.index($('li', $('#nav')).index($(this)) + 1);
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