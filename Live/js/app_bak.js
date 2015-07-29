var tl = new TimelineLite();
    tl.set("#logo-wrapper", {visibility:"visible"})
    .from("#logo-1", 0.5, {scale:0.5, autoAlpha:0}) // autoAlpha handles both css properties visibility and opacity.
    .from("#logo-2", 0.5, {scale:0.5, autoAlpha:0}) //add tween 0.25 seconds before previous tween ends
    .from("#logo-3", 0.5, {scale:0.5, autoAlpha:0}); // add feature label at start position of this tween

$(document).ready(function() {
    $('#content-wrapper').css('display','block');

    var controller = $.superscrollorama({triggerAtCenter: false});
    // controller.addTween('#section1', TweenMax.from($('#section1'), .5, {css:{opacity:1}}));

    controller.animate('#boxes',{ duration: 300, property:'top', start: '100' ,end: '1000' });

    //section1
    // set duration, in pixels scrolled, for pinned element
    var pinDur = 500;
    var pinAnimations = new TimelineLite();
    pinAnimations
    .append(TweenMax.from($('#logo-wrapper'), .5, {css:{top:'15%'}}))
    // .append(TweenMax.to($('#boxes'), .5, {css:{top:'800px'}}))
    .append(TweenMax.to($('#logo-2'), .5, {css:{marginLeft:'200px',opacity:0}}))
    .append(TweenMax.to($('#logo-3'), .5, {css:{marginRight:'200px',opacity:0}}))
    .append(TweenMax.to($('#unpin'), .5, {css:{top:'0px'}}));
    // .append(TweenMax.to($('#section2'), .5, {css:{display:'block'}}));
    // .append(TweenMax.to($('#package-wrapper'), .5, {css:{top:'15%',position:'fixed'}, delay:10000}))
    // .append(TweenMax.to($('#box-document'), .5, {css:{marginBottom:'0px'}}));


    // pin element, use onPin and onUnpin to adjust the height of the element
    controller.pin($('#section1'), pinDur, {
        anim:pinAnimations,
        onPin: function() {
            $('#section1').css('height','100%');
            $('#logo-1').removeClass( "logo-fixed" );
        },
        onUnpin: function() {
            $('#section1').css('height','780px');
            $('#logo-1').addClass( "logo-fixed" );
        }
    });
    controller.pin($('#section2'), 500, {
        anim: (new TimelineLite())
            // .append(TweenMax.from($('#package-wrapper'), .5, {css:{top:'15%', position:'fixed'}}))
            // .append(TweenMax.to($('#box-document'), .5, {css:{marginBottom:'0px'}}))
            // .append(TweenMax.to($('#unpin-package'), .5, {css:{top:'0px'}})),
            .append(
                TweenMax.fromTo($('#package-wrapper'), 1,
                    {css:{bottom: '100%', position:'fixed'} , immediateRender:true},
                    {css:{bottom: '0%'}}
                ), -1.5
            )
            // .append(
            //     TweenMax.fromTo($('.box-document'), 1,
            //         {css:{bottom: '400px'} , immediateRender:false},
            //         {css:{bottom: '50px'}}
            //     ), -1.5
            // )
                // TweenMax.fromTo($('#package-wrapper'), 1,
                //     {css:{bottom: '100%', position:'fixed'} , immediateRender:true},
                //     {css:{bottom: '285px'}}
                //     )
                // )
            // .append(
            //     TweenMax.from($('#package-wrapper'), .5,
            //         {css:{bottom: '0%'}})
            // )
            .append(
                TweenMax.to($('.box-document'), .5,
                    {css:{bottom: '50px'}})
            )
        //     ,
        // onPin: function() {
        //     $('#section2').css('height','100%');
        //     // $('#package-wrapper').css( "display", "block" );
        // },
        // onUnpin: function() {
        //     $('#section2').css('height','980px');
        //     // $('#package-wrapper').css("bottom", "205px" );

        // }
    })

    // parallax example, setting duration ties animation to scroll position
    // you can target a scroll position instead of an element (whose position can change)
    // controller.addTween(
    //     '#boxes',
    //     (new TimelineLite())
    //         .append(
    //             TweenMax.fromTo($('#boxes'), .5,
    //                 {css:{top: '-1010px'} , immediateRender:true},
    //                 {css:{top: '0'},useFrames :true}
    //                 )
    //             ),
    //     7000  // scroll duration of tween
    // );

});