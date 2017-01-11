/**
 * Created by baptistebohelay on 30/10/15.
 */
'use strict';
var app = angular.module('myApp', []);

var mainController = app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.pages = [];

    $(document).ready(function() {
        var container, stats;
        init();
        animate();

        getPages();

        function getPages() {
            $scope.pages.push({name:"pages/backgroundTentacles"});
            $scope.pages.push({name:"pages/blackNwhite"});
            $scope.pages.push({name:"pages/multilayer/index.html"});
            $scope.pages.push({name:"pages/realistic/index.html"});
            $scope.pages.push({name:"pages/soundMonster/index.html"});
            $scope.pages.push({name:"pages/soundVisu3D/index.html"});
            $scope.$apply();
        }

        function init() {
            $( window ).scroll(onScroll);
        }

        function onScroll(event) {
            var scrollPos = parseFloat($(event.currentTarget).scrollTop());
        }

        function animate() {
            requestAnimationFrame( animate );
        }
    })
}]);