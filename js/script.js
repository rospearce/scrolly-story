// Instantiation
$(function(){

    // variables
    var $intro = $('.intro')
    var $sideNav = $('.side-nav')
    var $arrowUp = $('.up')
    var $arrowDown = $('.down')
    var $droplinks = $('.droplinks')
    var $gradient = $('.story-gradient')
    var $map = $('.map')
    var windowHeight = $(window).height()

    var viewportHeight = window.innerHeight
    var halfViewportHeight = Math.floor(viewportHeight / 2)

    // build DOM from data
    var impacts=[{
        name: "background1",
    },{
        name: "background2"
    },{
        name: "SPECIES",
        icon: "fas fa-paw",
        text: "Proportion of species losing >50% of their climatic range.",
        info: "Extra info 1 - Lorem ipsum dolor sit amet",
        background: "https://www.carbonbrief.org/wp-content/uploads/2018/04/Turtle-and-bleached-coral-on-Heron-Island-2.jpeg",
        map: "australia"
    },{
        name: "RAINFALL",
        icon: "fas fa-tint",
        info: "Extra info 2 - Lorem ipsum dolor sit amet",
        text: "Lorem ipsum dolor sit amet, eligendi scriptorem et nam.",
        background: "https://www.carbonbrief.org/wp-content/uploads/2018/01/C5T9H7-rainfall.jpg",
        map: "latin-america"
    },{
        name: "GDP",
        icon: "fas fa-dollar-sign",
        info: "Extra info 3 - Lorem ipsum dolor sit amet",
        text: "Global per capita GDP in 2100 (relative to no additional warming).",
        background: "https://www.carbonbrief.org/wp-content/uploads/2015/07/Stock-wall-street-new-york-finance.jpg",
        map: "global"
    }];

    var enterEvents = function (ev, item) {
        
        if(item.index === 0){

            // STICKY SIDE NAV
            $sideNav.removeClass('nav-fixed').addClass('nav-moving');
            
        } else if (item.index === 1) {
            // play video after the second background enters
            playVid();
            
        } else if (item.index === 3) {
            // do nothing
            
        } else {
            // item.el.css('background-color', '#333333');
            // $map.css( "background-image", "url('img/" + item.data.map + ".svg')");
        }

        // console.log(item);
    }

    var exitEvents = function (ev, item) {

        if(item.index === 0){

            // STICKY SIDE NAV
            $sideNav.removeClass('nav-moving').addClass('nav-fixed');
        } else if (item.index === 1) {

            // pause video after the second background exits
            pauseVid();
            
        } else {
            // item.el.css('background-color', '#333333');
        }
    }

    var focusEvents = function (ev, item) {

        // SIDE NAV STYLING
        // remove previous styling
        $('li', $sideNav).removeClass('nav-active');

        // as don't need any styling on first story
        if(item.index > 1){
            // the .eq() method reduces the set of matched elements to the one at the specified index.
            $('li', $sideNav).eq(item.index - 2).addClass('nav-active');
        }

        // hide top arrow when at top
        if (item.index < 2) {
            $arrowUp.css("visibility", "hidden");
        } else {
            $arrowUp.css("visibility", "visible");
        }

        // hide down arrow when at bottom
        if (item.index > 3) {
            $arrowDown.css("visibility", "hidden");
        } else {
            $arrowDown.css("visibility", "visible");
        }
        
        console.log(item.data.name + ", is now active!");

        // change css of map
        $map.css( "background-image", "url('img/" + item.data.map + ".svg')");
        // console.log(item.data.map);

        // UPDATE TABLE

        function triggerTableUpdate() {

            dataName = (item.data.name).toLowerCase();

            // change string into variable name
            newData = window[dataName];

            updateTable(newData, dataName);

        }

        if(item.index > 0){

            triggerTableUpdate();

        }

        // SHOW EXTRA INFO ON MOUSEOVER

        $(".fa-info-circle").on("mouseover", function(event) {

            var x = event.pageX - 105;
            var y = event.pageY + 30;
            var info = item.data.info;

            $(".tooltip").html("<p>" + info + "</p>");
            $(".tooltip-wrapper").css({
                "top": y,
                "left": x,
                "visibility": "visible"
            });
        })

        $(".fa-info-circle").on("mouseout", function() {
            $(".tooltip-wrapper").css("visibility", "hidden");
        })

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
                item.el.height("500").css("min-height", "300px");
            } else if (item.index === 1) {
                // don't append anything
                item.el.height("300").css("min-height", "300px");
            } else {
 
                // build impacts from data
                item.el.append(
                    "<div class='story-mask'><div class='story-content'><h2><span class='title-span'><i class='"
                    + item.data.icon +
                    "'></i>   " 
                    + item.data.name 
                    + "</span></h2><p>" 
                    + item.data.text 
                    + " <i class='fas fa-info-circle'></i></p></div></div>"
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
                that.index($('li', $sideNav).index($(this)) + 2);
            });


            $arrowUp.on('click', function() {

                // find which nav circle is active
                var active = $('li.nav-active').index();

                // move the scrolly up one
                // don't need to subtract since not counting title
                that.index(active);

            });

            $arrowDown.on('click', function() {

                // find which nav circle is active
                var active = $('li.nav-active').index();

                // move the scrolly down one
                that.index(active + 2);

            });



            // SCROLL ACTIONS

            var range = 200;
            var range2 = 400;

            $(window).on('scroll', function () {
            
                // might use usewhere so may want to make these variable global
                var scrollTop = $(this).scrollTop(),
                // height = windowHeight.outerHeight(),
                offset = windowHeight / 1.8,
                // for bringing items in
                calc1 = (scrollTop - offset + range2) / range2;
                // for fading items away
                calc2 = 1 - calc1;

                // FADE DROPLINKS

                $droplinks.css({ 'opacity': calc2 });

                if (calc2 > '1') {
                    $droplinks.css({ 'opacity': 1 });
                } else if ( calc2 < '0' ) {
                    $droplinks.css({ 'opacity': 0 });
                } else if (calc2 > '0') {
                    // do nothing
                }

                // BRING IN GRADIENT BACKGROUND
                $gradient.css({ 'opacity': calc1 });

                // so doesn't continue increasing once move down page
                if (calc2 > '1') {
                    $gradient.css({ 'opacity': 0 });
                } else if ( calc2 < '0' ) {
                    $gradient.css({ 'opacity': 1 });
                } else if (calc2 > '0') {
                    // do nothing
                }

                // FADE STORY CONTENT AT BOTTOM OF PAGE

                var windowBottom = scrollTop + $(this).innerHeight();

                // console.log(windowBottom);

                $('.story-content').each(function() {

                    var objectBottom = $(this).offset().top + $(this).outerHeight();

                    if (objectBottom < windowBottom) { //object comes into view (scrolling down)


                        var calc3 = (windowBottom - objectBottom) / range;


                        $(this).css({ 'opacity': calc3 });

                        if (calc3 > '1') {
                            $(this).css({ 'opacity': 1 });
                        } else if ( calc3 < '0' ) {
                            $(this).css({ 'opacity': 0 });
                        } else if (calc3 > '0') {
                            // do nothing
                        }

                    }

                })


            
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

// functions to pause and play the top video - can't use JQuery

var vid = document.getElementById("intro-vid"); 

function playVid() { 
    vid.play(); 
} 

function pauseVid() { 
    vid.pause(); 
}