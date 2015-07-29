    var tl = new TimelineLite();
    tl.set("#logo-wrapper", {visibility:"visible"})
    .from("#logo-1", 1, {scale:0.5, autoAlpha:0}) // autoAlpha handles both css properties visibility and opacity.
    .from("#logo-2", 1, {scale:0.5, autoAlpha:0}) //add tween 0.25 seconds before previous tween ends
    .from("#logo-3", 1, {scale:0.5, autoAlpha:0}); // add feature label at start position of this tween

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("bottom", Math.max(0, (($(window).height() - $(this).outerHeight()) / 3) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;
}

$(document).ready(function() {

    $(".mobilenav").toggleClass("extended");

    console.clear();
    console.log("ScrollMagic v%s loaded", ScrollMagic.version);

    var winHeight = $(window).height();
    var winWidth = $(window).width();
    console.log("height:" + winHeight + "width:" + winWidth);

    // init
    var ctrl = new ScrollMagic.Controller();

    var tweenLogo = new TimelineLite();
    tweenLogo
    .append(
        TweenMax.to("#logo-wrapper", 1, {css:{marginTop: 0}})
    )
    .append(
        TweenMax.to("#logo-2", 1, {css:{marginLeft: '200px',opacity:0}}), 0.25
    )
    .append(
        TweenMax.to("#logo-3", 1, {css:{marginRight: '200px',opacity:0}}), 0.25
    );

    //////////////////////////////////////////////////////////////////
    //
    // create scene 1
    //
    //////////////////////////////////////////////////////////////////
    var scene = new ScrollMagic.Scene({
        triggerElement: "#section1",
        triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
        reverse:true,
        // duration: $(window).height() - 100,
        duration: 500,
        offset: -100
    })
    .setTween(tweenLogo)
    .addTo(ctrl);
    //////////////////////////////////////////////////////////////////
    // create scene 1
    //////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////
    //
    // create scene 2
    //
    //////////////////////////////////////////////////////////////////
    var scene2 = new ScrollMagic.Scene({
        triggerElement: "#section2",
        // triggerHook: "onLeave",
        offset: 550,
        reverse:true,
        duration: 2080
    })
    .setPin('#section2')
    .addTo(ctrl)
    .triggerHook("onCenter")
    .setTween(new TimelineMax()
        .add(TweenMax.to("#package-wrapper", 15 , {bottom: 214}))
        .add([
            TweenMax.from(".box-document", 1 , {bottom: 0}),
            TweenMax.to(".box-document", 50 , {bottom: 90})
        ])
        .add(
            TweenMax.to(".box-document", 50 , {bottom: 0})
        )
    );

    //////////////////////////////////////////////////////////////////
    // create scene 2
    //////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////
    //
    // create scene 3
    //
    //////////////////////////////////////////////////////////////////
    var scene3 = new ScrollMagic.Scene({
        triggerElement: "#section3",
        offset: 560,
        reverse:true,
        duration: 2080
    })
    .setPin('#section3')
    .addTo(ctrl)
    .triggerHook("onCenter")
    .setTween(new TimelineMax()

        .add([
            TweenMax.from("#package-wrapper-section-3", 10 , {css:{bottom: 210}} ),
            TweenMax.to("#package-wrapper-section-3", 5 , {css:{position: "fixed",bottom:210}} )
        ])
        .add(TweenMax.set("#package-wrapper-section-3",{css:{bottom:210}  , ease:Quad.easeOut}))
        .add([
            TweenMax.from(".box-bag", 20,{css:{bottom: 14}} ),
            TweenMax.to(".box-bag", 30,{css:{bottom: 140}} )
        ])
        .add(
            TweenMax.to("#package-wrapper-section-3", 200, {left:winWidth + 180, ease:Quad.easeOut })
        )
    );
    //////////////////////////////////////////////////////////////////
    // create scene 3
    //////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////
    //
    // create scene 4
    //
    //////////////////////////////////////////////////////////////////
    var scene4 = new ScrollMagic.Scene({
        triggerElement: "#section4",
        offset: 550,
        reverse:true,
        duration: 2080
    })
    .setPin('#section4')
    .addTo(ctrl)
    .triggerHook("onCenter")
    .setTween(new TimelineMax()
        .add(TweenMax.set("#package-wrapper-section-4",{css:{bottom:40, left:-160 , marginBottom:0}  , ease:Quad.easeOut}))
        .add(TweenMax.to("#package-wrapper-section-4", 50 , {css:{left: "50%"} , ease:Quad.easeOut }))
        .add(TweenMax.to(".box-cloth", 30,{css:{bottom: 140}} ))
        .add(TweenMax.to("#package-wrapper-section-4", 1,{css:{position: "fixed"} , immediateRender:true } ))
    );
    //////////////////////////////////////////////////////////////////
    // create scene 4
    //////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////
    //
    // create scene 5
    //
    //////////////////////////////////////////////////////////////////
    var scene5 = new ScrollMagic.Scene({
        triggerElement: "#section5",
        triggerHook: 0,
        offset: 0,
        reverse:true,
        duration: 1080
    })
    .setPin('#section5')
    .addTo(ctrl)
    //////////////////////////////////////////////////////////////////
    // create scene 5
    //////////////////////////////////////////////////////////////////

});

$(document).ready(function() {

    var ctrlOrama = $.superscrollorama({
    playoutAnimations: true,
    triggerAtCenter: true
    });

    // controller.removePin('#examples-2', false);
    // parallax example, setting duration ties animation to scroll position
    // you can target a scroll position instead of an element (whose position can change)
    ctrlOrama.pin($('#section1'), 200, {
        anim: (new TimelineLite()),
        onPin: function() {
            $('#section1').css('height','100%');
            // var tweenA = new TweenMax.to("#logo-wrapper", 1, {marginTop: 0});

        },
        onUnpin: function() {
            // alert("hide box");
            var hideTheBox = new TweenMax.set([$('#boxes-close'), $('#boxes-far')], {css:{top: -1210}});
            hideTheBox.play(0 , false);
            $('#section1').css('height','780px');
        }
    });
    // pin section 1

    ctrlOrama.pin($('#logo-wrapper'), 900, {
        anim: (new TimelineLite()),
        onPin: function() {
            $('#logo-wrapper').css('top','0');
        },
        onUnpin: function() {
            // alert("on un pin");

        }
    })
    ctrlOrama.addTween(
        '#section1',
        (new TimelineLite())
            .append([
                TweenMax.fromTo($('#boxes-close'), 1,
                    {css:{top: -100}, immediateRender:true},
                    {css:{top: 300}}),
                TweenMax.fromTo($('#boxes-far'), 1,
                    {css:{top: -650}, immediateRender:true},
                    {css:{top: 1000}})
            ]),
        3500 // scroll duration of tween
    );

    // tagline Tween
    ctrlOrama.addTween('#section2-tagline',TweenMax.to($('#section2-tagline'), 1, {css:{opacity: 1} , immediateRender:true }));
    ctrlOrama.addTween('#section3-tagline',TweenMax.to($('#section3-tagline'), 1, {css:{opacity: 1} , immediateRender:true }));
    ctrlOrama.addTween('#section4-tagline',TweenMax.to($('#section4-tagline'), 1, {css:{opacity: 1} , immediateRender:true }));
    ctrlOrama.addTween('#section5-tagline', TweenMax.to( $('#section5-tagline'), 1, {css:{opacity:1}, ease:Quad.easeOut}));
    // end of tagline tween
    ctrlOrama.addTween('#section5-tagline', TweenMax.to( $('#section5-tagline'), 1, {css:{opacity:1}, ease:Quad.easeOut}));
    $('#showcase .gallery figure').css('position','relative').each(function() {
        ctrlOrama.addTween('#showcase .gallery', TweenMax.from( $(this), 1, {delay:Math.random()*.2,css:{left:Math.random()*200-80,top:Math.random()*200-50,opacity:0}, ease:Back.easeOut}));
    });

    if (Modernizr.touch) {
        var scrollPos = 0;
        // using iScroll but deacting -webkit-transform because pin wouldn't work becasue of a webkit bug: https://code.google.com/p/chromium/issues/detail?id=20574
        var myScroll = new iScroll('viewport-wrapper', {vScrollbar: true, hScroll: false, vScroll: true, bounce: false, useTransform: false, useTransition: false});
        function animationLoop () {
            // make sure to have the requestAnimationFrame polyfill by Paul Irish: https://gist.github.com/paulirish/1579671
            window.requestAnimationFrame(animationLoop);
            if (myScroll.y != scrollPos) { // if position has changed
                scrollPos = myScroll.y;
                // udate scrollcontainer position
                controller.setScrollContainerOffset(0, -myScroll.y);
                // force an immediate update
                controller.triggerCheckAnim(true);
            }
        }
        // when deactivating transform in iScroll (useTransform:false) requestAnimationFrame is not triggered during touchmove
        $("#viewport-wrapper").get(0).addEventListener("touchmove", function() {
            animationLoop ();
        });

        animationLoop ();
    }

});
