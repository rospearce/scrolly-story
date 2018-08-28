// Instantiation
$(function(){

    // variables
    var $intro = $('.intro')
    var $sideNav = $('.side-nav')
    var $droplinks = $('.droplinks')
    var $gradient = $('.story-gradient')
    var $map = $('.map')
    var $linesWrapper = $('#lines-wrapper')
    var windowHeight = $(window).height()

    var viewportHeight = window.innerHeight
    var halfViewportHeight = Math.floor(viewportHeight / 2)

    // build DOM from data
    var impacts=[{
        name: "Background-1",
    },{
        name: "Background-2"
    },{
        name: "SPECIES",
        text: "Lorem ipsum dolor sit amet, eligendi scriptorem et nam.",
        background: "https://www.carbonbrief.org/wp-content/uploads/2018/04/Turtle-and-bleached-coral-on-Heron-Island-2.jpeg",
        map: "global"
    },{
        name: "RAINFALL",
        text: "Lorem ipsum dolor sit amet, eligendi scriptorem et nam.",
        background: "https://www.carbonbrief.org/wp-content/uploads/2018/01/C5T9H7-rainfall.jpg",
        map: "latin-america"
    },{
        name: "GDP",
        text: "Lorem ipsum dolor sit amet, eligendi scriptorem et nam.",
        background: "https://www.carbonbrief.org/wp-content/uploads/2015/07/Stock-wall-street-new-york-finance.jpg",
        map: "global"
    }];

    var enterEvents = function (ev, item) {
        
        if(item.index === 0){
            // STICKY INTRO
            $intro.removeClass('moving').addClass('fixed');
            // $lines.removeClass('lines-moving').addClass('fixed');
            // STICKY SIDE NAV
            $sideNav.removeClass('nav-fixed').addClass('nav-moving');
            // $linesWrapper.removeClass('lines-fixed').addClass('lines-moving');
        } else if (item.index === 1) {
            // do nothing
            $linesWrapper.removeClass('lines-fixed').addClass('lines-moving');
        } else if (item.index === 3) {
            // do nothing
            $linesWrapper.removeClass('lines-moving').addClass('lines-fixed');
        } else {
            // item.el.css('background-color', '#333333');
            // $map.css( "background-image", "url('img/" + item.data.map + ".svg')");
        }

        // console.log(item);
    }

    var exitEvents = function (ev, item) {

        if(item.index === 0){
            // STICKY INTRO
            $intro.removeClass('fixed').addClass('moving');
            // STICKY Lines
            // $lines.removeClass('fixed').addClass('lines-moving');
            // STICKY SIDE NAV
            $sideNav.removeClass('nav-moving').addClass('nav-fixed');
        } else if (item.index === 1) {
            // $linesWrapper.removeClass('lines-moving').addClass('lines-fixed');
        } else {
            // item.el.css('background-color', '#333333');
        }
    }

    var focusEvents = function (ev, item) {

        // change css of map
        // $map.css( "background-image", "url('img/" + item.data.map + ".svg')");

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

        // change css of map
        $map.css( "background-image", "url('img/" + item.data.map + ".svg')");
        // console.log(item.data.map);

        //update table

        function triggerTableUpdate() {

            var getData = (item.data.name).toLowerCase();

            console.log(getData);

            // to change string into variable name
            newData = window[getData];

            console.log(newData);

            updateTable(newData);

        }

        if(item.index > 1){

            triggerTableUpdate();

            console.log("table update");

        }

        // item.el.removeClass('blur');

    }

    var blurEvents = function (ev, item) {

        // better instead to make opacity of picture (or actually the mask) dependent on scroll?
        
        // don't apply to first two as have separate scroll based fade events for them
        // if(item.index > 1){
        //     item.el.addClass('blur');
        // }

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
                    "<div class='story-mask'><div class='story-content'><h2>" 
                    + item.data.name 
                    + "</h2><p>" 
                    + item.data.text 
                    + "</p></div></div>"
                );

                // add their background images
                // might be better to do as a div so a mask can be added
                item.el.css({
                    "background-image": "url('" + item.data.background + "')",
                    "background-repeat": "no-repeat",
                    "background-size": "cover"
                });
            }
        },
        itemfocus: focusEvents,
        itemblur: blurEvents,
        // containerscroll: handleContainerScroll,
        // throttleType: 'debounce',
        triggerOffset: halfViewportHeight, // seems to set the active story at a more sensible position
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

                // so doesn't continue increasing once move down page
                if (calc2 > '1') {
                    $gradient.css({ 'opacity': 0 });
                } else if ( calc2 < '0' ) {
                    $gradient.css({ 'opacity': 1 });
                    // $droplinks.css({ 'visibility': 'hidden' });
                } else if (calc2 > '0') {
                    // $droplinks.css({ 'visibility': 'visible' });
                }

                // FADE ELEMENTS IN AND OUT
            
            });


        }
    });



});

// SCROLL WINDOW TO TOP
// so resets on refresh

$(document).ready(function(){
    $('html').animate({scrollTop:0}, 1);
    $('body').animate({scrollTop:0}, 1);
    // $droplinks.css({ 'visibility': 'visible' });
});