'use strict';
app.directive('sample', [function() {

    return {
        restrict: 'E',
        scope:'@',
        link:function(scope, element, attrs) {

            function setZoom(value) {
                //var height = 200 * value;
                //var width = 350 * value;
                //var scale = 1 / value;
                //frame.css({
                //    height: height + 'px',
                //    width: width + 'px',
                //    '-moz-transform': 'scale(' + scale + ')',
                //    '-o-transform': 'scale(' + scale + ')',
                //    '-webkit-transform': 'scale(' + scale + ')'
                //});
                //
                //var heightMargin = (1 - value) * height * 0.5;
                //var rightMargin = (1 - value) * (width) * 0.5;
                //elementBottom.css({'margin-top': heightMargin + 'px'});
                //element.css({'margin-right': rightMargin + 'px'})
            }

            scope.redirect = function() {
                window.open(scope.linkUrl, '_blank');
            };

            scope.linkUrl = window.location + scope.page.path;

            var frame = element.find('iframe');
            var elementBottom = element.find('.bottomSample');

            frame.load(function() {
                setTimeout(function() {
                    if(frame[0].contentWindow.stopAnimation)
                        frame[0].contentWindow.stopAnimation();

                    if(frame[0].contentWindow.stopAnimation && scope.page.options)
                        frame[0].contentWindow.setData(scope.page.options);
                }, 500);
            });

            scope.getPreview = function()
            {
                return scope.page.path + "/preview.jpg";
            };


            setZoom(scope.page.scale || 1.3);

            frame.hover(function() {
                if(frame[0].contentWindow.startAnimation) {
                    frame[0].contentWindow.startAnimation();
                }
            }, function() {
                if(frame[0].contentWindow.stopAnimation) {
                    frame[0].contentWindow.stopAnimation();
                }
            });
        }
    };

}]);

app.directive('imageFit', [function() {

    return {
        restrict: 'C',
        scope:'@',
        link:function(scope, element, attrs) {

            if(element.height() > element.width()) {
                element.height('100%');
                //element.width('auto');
            }
        }
    };

}]);