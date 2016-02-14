app.directive('frontLayer', function() {
    return {
        restrict: 'A',
        link:function(scope, element, attrs) {

            var layerIndex = parseInt(attrs.frontLayer);
            var speed = 30 / layerIndex;
            var lastUpdate = 0;
            var timer = 0;
            var height = 0;
            var width = 0;
            element.css({'background-repeat':'repeat'})

            animate();

            function animate() {
                requestAnimationFrame( animate );
                if(gAnimated) {
                    render();
                }
            }

            function render() {
                var lTimer = new Date().getTime() / 1000;
                var lDelta =(lTimer - lastUpdate);
                lastUpdate = lTimer;
                lDelta = Math.min(lDelta, 0.03);
                timer += lDelta;
                width += lDelta * 60 / layerIndex;

                if(layerIndex == 1) {
                    height = -element.height() + Math.cos(lTimer / 40) * window.innerHeight;
                    var lOpacity = 0.5 + 0.5 * Math.cos(lTimer / 20);
                    element.css({opacity:lOpacity})
                }

                    if(width >= window.innerWidth) {
                    width = -element.width();
                    if(layerIndex == 1) {
                        height = -element.height() + Math.random() * window.innerHeight;
                        lTimer += Math.random() * 100;
                        //element.css({'-webkit-transform':'translateY(' + -height + 'px)'});
                    }
                }
                element.css({'-webkit-transform':'translateX(' + -width + 'px) ' +  'translateY(' + -height + 'px)'});
            }
        }
    };
});




