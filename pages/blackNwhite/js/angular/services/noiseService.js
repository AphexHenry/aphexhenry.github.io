(function() {
    'use strict';

// Wrapper around camera plugin
    app.factory('noiseService',
        function() {

            var lastUpdate = 0;
            var timer = 0;
            var noise = 0;
            var timerInit = new Date().getTime() / 1000;

            animate();
            function animate() {
                requestAnimationFrame( animate );
                if(gAnimated) {
                    render();
                }
            }

            function render() {
                var lTimer = (new Date().getTime() / 1000) - timerInit;
                var lDelta =(lTimer - lastUpdate);
                lastUpdate = lTimer;
                lDelta = Math.min(lDelta, 0.03);
                lDelta *= 1 - 0.3 * Math.sin(lTimer / 20);

                var opacityPrev = noise;
                var displace = Math.cos(-1 + lTimer / 3.5);
                noise += (displace * 0.25 + 0.5 - Math.random()) * lDelta;
                noise = Math.min(Math.max(0, noise), 1);
            }

            var noiseService = {};

            noiseService.get = function() {
                return noise;
            };

            return noiseService;

        });
})();   // use strict
