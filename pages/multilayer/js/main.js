/**
 * Created by baptistebohelay on 23/10/15.
 */

$( document ).ready(function() {

    var lastPos = 0;



    function init() {
        scrollTo(lastPos);
        $('.page').css({
                'padding-left':0.5 * (window.innerWidth - 800) + 'px',
                'padding-right':0.5 * (window.innerWidth - 800) + 'px'}
        );

    }

    $(document).scroll(function(event) {

        var scrollPos = parseFloat($(event.currentTarget).scrollTop());
        scrollTo(scrollPos);
    });

    $( window ).resize(function() {
        init(lastPos);
    });

    function scrollTo(aPos) {

        var page0 = $('#page_0');
        var page1 = $('#page_1');
        var page2 = $('#page_2');
        var page3 = $('#page_3');
        var page4 = $('#page_4');
        var page5 = $('#page_5');
        var page6 = $('#page_8');

        var scrollPos = aPos;
        lastPos = scrollPos;

        $('#headerImg').css({'top':-scrollPos * 0.5 + 'px'});

        setPosition( $('#backimg1'), page3, page4, scrollPos - 100, 1.5);
        setPosition( $('#backimg2'), page4, page5, scrollPos - 100, 1.5);
        setPosition( $('#backimg3'), page5, page6, scrollPos - 50, 1.5);

        var posP2 = Math.max(-(scrollPos - 914) * 0.25, -10000);
        $('#page_2').css({'transform': 'translateY(' + posP2 + 'px)'});

        posP2 = (scrollPos) * 0.40;
        $('#floatingTitle').css({'transform': 'translateY(' + posP2 + 'px)', 'opacity':Math.max(1.4 - scrollPos / 300, 0)});

        var opacity = Math.min((scrollPos / 150), 1);
        //$('#headerImg').css({'opacity':1-opacity});
        //$('#headerBlur').css({'opacity':1});
        //$('#floatingTitle').css({'opacity':opacity});
    }

    function setPosition(element, top, bottom, scrollPos, aSpeed) {
        var speed = aSpeed || 2;
        var elementHeight = element.height();
        var heightTarget = (getBottom(top) + getTop(bottom) - elementHeight) / 2;
        var height = -(scrollPos -heightTarget) / speed;
        element.css({'top':height + 'px'});
    }

    function getBottom(element) {
        return element.offset().top + element.height();
    }

    function getTop(element) {
        return element.offset().top;
    }

    init();
});