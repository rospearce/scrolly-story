// Instantiation
$(function(){

    // variables
    var $intro = $('.intro')
    var $sideNav = $('.side-nav')
    var $droplinks = $('.droplinks')
    var $gradient = $('.story-gradient')
    var $lines = $('#lines-wrapper')
    var windowHeight = $(window).height()

    // build DOM from data
    var impacts=[{
        name: "Background-1",
    },{
        name: "Background-2"
    },{
        name: "Species",
        text: "Lorem ipsum dolor sit amet, eligendi scriptorem et nam.",
        background: "https://www.carbonbrief.org/wp-content/uploads/2018/04/Turtle-and-bleached-coral-on-Heron-Island-2.jpeg"
    },{
        name: "Rainfall",
        text: "Lorem ipsum dolor sit amet, eligendi scriptorem et nam.",
        background: "https://www.carbonbrief.org/wp-content/uploads/2018/01/C5T9H7-rainfall.jpg"
    },{
        name: "GDP",
        text: "Lorem ipsum dolor sit amet, eligendi scriptorem et nam.",
        background: "https://www.carbonbrief.org/wp-content/uploads/2015/07/Stock-wall-street-new-york-finance.jpg"
    }];

    var enterEvents = function (ev, item) {
        
        if(item.index === 0){
            // STICKY INTRO
            $intro.removeClass('moving').addClass('fixed');
            $lines.removeClass('lines-moving').addClass('fixed');
            // STICKY SIDE NAV
            $sideNav.removeClass('nav-fixed').addClass('nav-moving');
        } else if (item.index === 1) {
            // do nothing
        } else {
            // item.el.css('background-color', '#333333');
        }
    }

    var exitEvents = function (ev, item) {

        if(item.index === 0){
            // STICKY INTRO
            $intro.removeClass('fixed').addClass('moving');
            // STICKY Lines
            $lines.removeClass('fixed').addClass('lines-moving');
            // STICKY SIDE NAV
            $sideNav.removeClass('nav-moving').addClass('nav-fixed');
        } else if (item.index === 1) {
            // do nothing
        } else {
            // item.el.css('background-color', '#333333');
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
                // build impacts from data
                item.el.append(
                    "<div class='story-mask'><div class='story-content'><h2>"+item.data.name+"</h2><p>"+item.data.text+"</p></div></div>"
                );
                // add their background images
                item.el.css("background-image", "url('" + item.data.background + "')");
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

            // SCROLL ACTIONS

            var range = 200;

            $(window).on('scroll', function () {
            
                // might use usewhere so may want to make these variable global
                var scrollTop = $(this).scrollTop(),
                // height = windowHeight.outerHeight(),
                offset = windowHeight / 1.8,
                // for bringing items in
                calc1 = (scrollTop - offset + range) / range;
                // for fading items away
                calc2 = 1 - calc1;

                // FADE DROPLINKS

                $droplinks.css({ 'opacity': calc2 });

                if (calc2 > '1') {
                    $droplinks.css({ 'opacity': 1 });
                } else if ( calc2 < '0' ) {
                    $droplinks.css({ 'opacity': 0 });
                    // $droplinks.css({ 'visibility': 'hidden' });
                } else if (calc2 > '0') {
                    // $droplinks.css({ 'visibility': 'visible' });
                }

                // BRING IN GRADIENT BACKGROUND
                $gradient.css({ 'opacity': calc1 });
            
            });


        }
    });

    // manipulate the style of items as they gain and lose focus, making it dependent on index

    $("#container").on('itemfocus', function(ev, item){
        if(item.index === 0){
            // item.el.css('background-color', '#141414');
        } else {
            // item.el.css('background-color', '#333333');
        }
    });
        
    $("#container").on('itemblur', function(ev, item){
        // fired when an item loses 'focus
        // will use to fade text
        // item.el.css('background-color', 'white');
        // don't want it to suddenly change so will need to use some kind of function to get it to face
    });



});

// SCROLL WINDOW TO TOP
// so resets on refresh

$(document).ready(function(){
    $('html').animate({scrollTop:0}, 1);
    $('body').animate({scrollTop:0}, 1);
    // $droplinks.css({ 'visibility': 'visible' });
});