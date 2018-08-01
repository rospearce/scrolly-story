// Instantiation
$(function(){

    // variables
    var $intro = $('.intro')
    var $sideNav = $('.side-nav')
    var $droplinks = $('.droplinks')
    var windowHeight = $(window).height()

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
            // STICKY INTRO
            $intro.removeClass('moving').addClass('fixed');
            // STICKY SIDE NAV
            $sideNav.removeClass('nav-fixed').addClass('nav-moving');
        } else if (item.index === 1) {
            // do nothing
        } else {
            item.el.css('background-color', '#333333');
        }
    }

    var exitEvents = function (ev, item) {

        if(item.index === 0){
            // STICKY INTRO
            $intro.removeClass('fixed').addClass('moving');
            // STICKY SIDE NAV
            $sideNav.removeClass('nav-moving').addClass('nav-fixed');
        } else if (item.index === 1) {
            // do nothing
        } else {
            item.el.css('background-color', '#333333');
        }
    }

    var focusEvents = function (ev, item) {
        // SIDE NAV STYLING
        // remove previous styling
        $('li', $sideNav).removeClass('nav-active');
        // as don't need any styling on first story
        if(item.index > 0){
            // the .eq() method reduces the set of matched elements to the one at the specified index.
            $('li', $sideNav).eq(item.index - 1).addClass('nav-active');
        }
        // log the founding dates as you go past
        console.log(item.data.name + ", is now active!");
    }

    // pass in the data
    // callbacks triggered on instantiation
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
        itemfocus: focusEvents,
        // containerscroll: handleContainerScroll,
        itementerviewport: enterEvents,
        itemexitviewport: exitEvents,
        complete: function() {

            var that = this;

            // SET UP DROPLINKS
            $droplinks.on('click', 'li', function() {
                // +2 since not counting title and first background
                that.index($('li', $droplinks).index($(this)) + 2);
            });

            // SET UP SIDE NAV
            $sideNav.on('click', 'li', function() {
                // +1 since not counting title
                that.index($('li', $sideNav).index($(this)) + 1);
            });

            // FADE DROPLINKS AS SCROLL

            var range = 200;

            $(window).on('scroll', function () {
            
                var scrollTop = $(this).scrollTop(),
                    // height = windowHeight.outerHeight(),
                    offset = windowHeight / 2,
                    calc = 1 - (scrollTop - offset + range) / range;

                $droplinks.css({ 'opacity': calc });

                if (calc > '1') {
                    $droplinks.css({ 'opacity': 1 });
                } else if ( calc < '0' ) {
                    $droplinks.css({ 'opacity': 0 });
                }
            
            });



        }
    });

    // manipulate the style of items as they gain and lose focus, making it dependent on index

    $("#container").on('itemfocus', function(ev, item){
        if(item.index === 0){
            item.el.css('background-color', '#141414');
        } else {
            item.el.css('background-color', '#333333');
        }
    });
        
    $("#container").on('itemblur', function(ev, item){
        // fired when an item loses 'focus
        // will use to fade text
        // item.el.css('background-color', 'white');
    });



});

// SCROLL WINDOW TO TOP
// so resets on refresh

$(document).ready(function(){
    $('html').animate({scrollTop:0}, 1);
    $('body').animate({scrollTop:0}, 1);
});