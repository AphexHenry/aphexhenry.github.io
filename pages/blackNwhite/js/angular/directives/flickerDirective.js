app.directive('flicker', ['noiseService', function(noiseService) {
    return {
        restrict: 'A',
        link:function(scope, element, attrs) {

            var layerIndex = parseInt(attrs.frontLayer);
            var flickerType = attrs.flickerType == 'opacity' ? 0 : 1;
            var lastUpdate = 0;
            var timer = 0;
            var opacity = 0;

            animate();

            function animate() {
                requestAnimationFrame( animate );
                if(gAnimated) {
                    render();
                }
            }

            function render() {
                //var lTimer = new Date().getTime() / 1000;
                //var lDelta =(lTimer - lastUpdate);
                //lastUpdate = lTimer;
                //lDelta = Math.min(lDelta, 0.03);
                //
                //var opacityPrev = opacity;
                //var displace = Math.cos(new Date().getTime() / 4000);
                //opacity += (displace * 0.25 + 0.5 - Math.random()) * lDelta * 1;
                //opacity = Math.min(Math.max(0, opacity), 1);
                ////opacity = 0.5 * (opacity + opacityPrev);
                var opacity = noiseService.get();
                opacity *= opacity;
                element.css({'opacity':1 - opacity});

            }
        }
    };
}]);

app.directive('textLayer', ['noiseService', function(noiseService) {
    return {
        restrict: 'A',
        link:function(scope, element, attrs) {

            var lastUpdate = 0;
            var timer = 0;
            var height = 0;
            var width = 0;

            animate();

            function animate() {
                requestAnimationFrame( animate );
                if(gAnimated) {
                    render();
                }
            }

            function render() {
                var noise = noiseService.get();
                var shadow = 2;//Math.round(noise * 3);
                var intensity = Math.round(noise * noise * noise * 215);
                var color = 'rgb(' + intensity + ',' + intensity + ',' + intensity + ')';

                // color of the black in the text.
                var intensity2 = Math.round(noise * noise * noise * 50);
                var colorText = 'rgb(' + intensity2 + ',' + intensity2 + ',' + intensity2 + ')';
                element.css({color:colorText, 'text-shadow':shadow + 'px -' + shadow + 'px ' + color});
            }
        }
    };
}]);

