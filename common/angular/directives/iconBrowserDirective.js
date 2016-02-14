'use strict';
app.directive('browserIcon', function() {
    return {
        restrict: 'A',
        link:function(scope, element, attrs) {
            if(!attrs.browserIcon) {
                return;
            }

            var width = attrs.iconSize || Math.floor(element.height() * 0.8);
            var browsers = attrs.browserIcon.split(' ');
            var template = '';
            for (var i = 0; i < browsers.length; i++) {
                var path = "resources/browserIcons/" + browsers[i] + "_64x64.png";
                template += '<img class="iconBrowser" title=' + browsers[i] + ' width=' + width + 'px src="' + path + '">'
            }

            element.append(template);
            return template;
        }
    };

});