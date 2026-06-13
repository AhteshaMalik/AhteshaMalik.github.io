var $ = jQuery;
var dataSR;

$(window).on('load', function() {
    dataSR = ScrollReveal({
    duration: 800,
    distance: "70px",
    debug: true,
    easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    viewOffset: {
        bottom: 150, // reveal items X pixels from bottom
    },
    afterReveal: function (el) {
        $(el).css({ transform: '' });
        $(el).addClass('revealed');
    }

    });

    window.initScrollRevealItem = function (elements, obj, stagger = null) {

        var counter = 0;
    
        // only init scroll reveal if parent doesn't have '.no-dataSR' class
        $(elements).each(function (i, el) {
            var $el = jQuery(el);
    
            if (!$el.parents('.no-sr').length && !$el.hasClass('no-sr-self') && !$el.data('sr-id')) {
                if(stagger) {
                    dataSR.reveal(el, obj, stagger);
                } else {
                    dataSR.reveal(el, obj);
                }
                counter++;
            } else {
                $el.css('visibility', 'visible');
            }
        });
    
        // console.log('total', counter);
    
    }

    window.initScrollReveal = function () {
    initScrollRevealItem("[data-sr=''], .rich-text .wp-block-group, .sr-down, .rich-text:not(.no-sr)", { distance: '70px' })
    initScrollRevealItem("[data-sr='fade'], .sr-fade", { distance: 0 })
    initScrollRevealItem("[data-sr='left'], .sr-left", { origin: "left" })
    initScrollRevealItem("[data-sr='right'], .sr-right", { origin: "right" })
    initScrollRevealItem("[data-sr='scale']", { scale: 0.5, distance: "50px" })

    // scroll to anchor tags on page load
    if (location.hash) {
        setTimeout(function () {
        window.scrollTo(0, 0);
        }, 1);
        setTimeout(function () {
        // console.log('hash');
        scrollFunction(location.hash);
        }, 500);
    }
    }

    window.initScrollReveal();

    // Call a function  (e.g. data-sr="function|functionNameHere")
    $("[data-sr*='function']").each(function (i, el) {
    var dataAttribute = $(el).attr("data-sr");
    var functionName = dataAttribute.substr(9);
    //console.log(functionName)
    dataSR.reveal(el, {
        distance: 0,
        duration: 0,
        // opacity:1,
        beforeReveal: window[functionName],
    });
    });

    // Custom (e.g. data-sr='custom{ "origin": "right", "delay": 670, "distance": "40px" }')
    $("[data-sr*='custom']").each(function (i, el) {
    var str = $(el).data("sr").substring(6);
    dataSR.reveal(el, JSON.parse(str));
    });
});