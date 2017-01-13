/**
 * Created by baptistebohelay on 30/10/15.
 */

var app = angular.module('myApp', []);

var mainController = app.controller('mainCtrl', ['$scope', function($scope) {
    $scope.animation = gData.animationType;
    switch($scope.animation) {
        case '0':
            $scope.title = 'I am';
            break;
        case '1':
            $scope.title = 'I am';
            break;
        case '2':
            $scope.title = 'interaction with elements';
            break;
    }

    $scope.$watch('animation', function() {
        switch($scope.animation) {
            case '0':
                $scope.title = 'I am';
                break;
            case '1':
                $scope.title = 'I am';
                break;
            case '2':
                $scope.title = 'interaction with elements';
                break;
        }

    });


    $(document).ready(function() {
        var container, stats;
        init();
        animate();
        setupBodyClass();

        function setupBodyClass() {
            $('body').addClass(gData.name);
        }

        function init() {

            container = document.createElement( 'div' );
            document.body.appendChild( container );

            stats = new Stats();
            stats.domElement.style.position = 'fixed';
            stats.domElement.style.top = '20px';
            stats.domElement.style.right = '10%';
            stats.domElement.style.zIndex = '25';
            stats.domElement.style.opacity = '0.5';
            stats.domElement.id = "stats";
            container.appendChild( stats.domElement );
            $( window ).scroll(onScroll);
        }

        function onScroll(event) {
            var scrollPos = parseFloat($(event.currentTarget).scrollTop());
            Tentacles.setScroll(scrollPos);
        }

        function animate() {
            if($scope.animation != gData.animationType)
            {
                $scope.animation = gData.animationType;
                $scope.$digest();
            }
            requestAnimationFrame( animate );
            stats.update();
        }
    })
}]);