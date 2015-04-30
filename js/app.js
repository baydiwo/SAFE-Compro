    var tl = new TimelineLite();
    tl.set("#logo-wrapper", {visibility:"visible"})
    .from("#logo-1", 1, {scale:0.5, autoAlpha:0}) // autoAlpha handles both css properties visibility and opacity.
    .from("#logo-2", 1, {scale:0.5, autoAlpha:0}) //add tween 0.25 seconds before previous tween ends
    .from("#logo-3", 1, {scale:0.5, autoAlpha:0});// add feature label at start position of this tween

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("bottom", Math.max(0, (($(window).height() - $(this).outerHeight()) / 3) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;
}

$(document).ready(function() {

    TweenMax.to("#search-form", 1, {css:{top:20, opacity:1},delay:2 });
    TweenMax.to("#main-menu", 1, {css:{top:30, opacity:1},delay:2 });

    $(".mobilenav").toggleClass("extended");

    console.clear();
    console.log("ScrollMagic v%s loaded", ScrollMagic.version);

    var winHeight = $(window).height();
    var winWidth = $(window).width();
    console.log("height:" + winHeight + "width:" + winWidth);

    // init
    var ctrl = new ScrollMagic.Controller();
    var ctrlOrama = $.superscrollorama({
    playoutAnimations: true,
    triggerAtCenter: true
    });

    var tweenLogo = new TimelineLite();
    tweenLogo
    .append(
        TweenMax.from("#logo-wrapper", 1, {css:{top: 0}}),
        TweenMax.to("#logo-wrapper", 1, {css:{top: 70}})
    )
    .append(TweenMax.to("#logo-2", 1, {css:{marginLeft: '200px',opacity:0}}), 0.25 )
    .append(TweenMax.to("#logo-3", 1, {css:{marginRight: '200px',opacity:0}}), 0.25 );

    //////////////////////////////////////////////////////////////////
    // create scene 1
    //////////////////////////////////////////////////////////////////
    var scene = new ScrollMagic.Scene({
        triggerElement: "#section1",
        triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
        reverse:true,
        duration: 500,
        offset: 0
    })
    .setPin('#section1')
    .setTween(tweenLogo)
    .addTo(ctrl);

    ctrlOrama.pin($('#logo-wrapper'), 1200, {
        anim: (new TimelineLite()),
        onPin: function() {
            $('#logo-wrapper').css('margin-top','70px');
        },
        onUnpin: function() {
            // alert("on un pin");

        }
    });

    ctrlOrama.addTween(
        '#section1',
        (new TimelineLite())
            .append([
                TweenMax.fromTo($('#boxes-close'), 1,
                    {css:{top: -1372}, immediateRender:true},
                    {css:{top: 3000}}),
                TweenMax.fromTo($('#boxes-far'), 1,
                    {css:{top: -1372}, immediateRender:true},
                    {css:{top: 4000}})
            ]),
        3500, // scroll duration of tween
        300
    );

    /////////////////////////////////////////////////////////////////////
    // create scene 2
    //////////////////////////////////////////////////////////////////
    var scene2 = new ScrollMagic.Scene({
        triggerElement: "#section2",
        // triggerHook: "onLeave",
        offset: 480,
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
    // create scene 3
    //////////////////////////////////////////////////////////////////
    var scene3 = new ScrollMagic.Scene({
        triggerElement: "#section3",
        offset: 700,
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
    // create scene 4
    //////////////////////////////////////////////////////////////////
    var scene4 = new ScrollMagic.Scene({
        triggerElement: "#section4",
        offset: 530,
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
    // create scene 5
    //////////////////////////////////////////////////////////////////
    var scene5 = new ScrollMagic.Scene({
        triggerElement: "#section5",
        triggerHook: 0,
        offset: 0,
        reverse:true,
        duration: 1080
    })
    .setPin('#section5')
    .addTo(ctrl);




    // tagline Tween
    ctrlOrama.addTween('#section2-tagline',TweenMax.to($('#section2-tagline'), 1, {css:{opacity: 1} , immediateRender:true }));
    ctrlOrama.addTween('#section3-tagline',TweenMax.to($('#section3-tagline'), 1, {css:{opacity: 1} , immediateRender:true }));
    ctrlOrama.addTween('#section4-tagline',TweenMax.to($('#section4-tagline'), 1, {css:{opacity: 1} , immediateRender:true }));
    ctrlOrama.addTween('#section5-tagline', TweenMax.to( $('#section5-tagline'), 1, {css:{opacity:1}, ease:Quad.easeOut}));
    // end of tagline tween
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


    //mobile setting
    // init tween
    var ctrlMobile = new ScrollMagic.Controller();
    // var tween = TweenMax.to("#mobileadvanced", 1, {backgroundColor: "black", scale: 0.4, borderRadius: 75});

    // init scene
    // var sceneMob1 = new ScrollMagic.Scene({triggerElement: "#section1", duration: 500, offset: 75})
    //                 .setTween(tween)
    //                 .setPin("#content-wrapper")
    //                 .addTo(ctrlMobile);

    // detect if mobile browser. regex -> http://detectmobilebrowsers.com
    var isMobile = (function(a){return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

    // we'd only like to use iScroll for mobile...
    if (isMobile) {
        // configure iScroll
        var myScroll = new IScroll('#content-wrapper',
                    {
                        // don't scroll horizontal
                        scrollX: false,
                        // but do scroll vertical
                        scrollY: true,
                        // show scrollbars
                        scrollbars: true,
                        // deactivating -webkit-transform because pin wouldn't work because of a webkit bug: https://code.google.com/p/chromium/issues/detail?id=20574
                        // if you dont use pinning, keep "useTransform" set to true, as it is far better in terms of performance.
                        useTransform: false,
                        // deativate css-transition to force requestAnimationFrame (implicit with probeType 3)
                        useTransition: false,
                        // set to highest probing level to get scroll events even during momentum and bounce
                        // requires inclusion of iscroll-probe.js
                        probeType: 3,
                        // pass through clicks inside scroll container
                        click: true
                    }
                );

        // overwrite scroll position calculation to use child's offset instead of container's scrollTop();
        ctrlMobile.scrollPos(function () {
            return -myScroll.y;
        });

        // thanks to iScroll 5 we now have a real onScroll event (with some performance drawbacks)
        myScroll.on("scroll", function () {
            ctrlMobile.update();
        });

        // add indicators to scrollcontent so they will be moved with it.
        // scene.addIndicators({parent: ".scrollContent"});
    } else {
        // add indicators (requires plugin)
        // scene.addIndicators();
    }

});