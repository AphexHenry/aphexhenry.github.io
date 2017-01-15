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
            $scope.pages.push({path:"pages/backgroundTentacles", options:{animationType:"0"}, name:"Moving Lines"});
            $scope.pages.push({path:"pages/grass", options:{animationType:"1"}, name:"Grass"});
            $scope.pages.push({path:"pages/multilayer", name:"Scrolling Layers"});
            $scope.pages.push({path:"pages/realistic", name:"Hidden Sun"});
            $scope.pages.push({path:"pages/soundMonster", name:"Music Monster"});
            $scope.pages.push({path:"pages/soundVisu3D", name:"Appearance"});
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