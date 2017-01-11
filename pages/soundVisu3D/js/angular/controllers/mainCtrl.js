/**
 * Created by baptistebohelay on 30/10/15.
 */

var app = angular.module('myApp', []);

var mainController = app.controller('mainCtrl', ['$scope', 'blurService', 'audioMovementService', 'cameraService', 'stateManagerService','particleManagerService', function($scope, blurService, audioMovementService, cameraService, stateManagerService, particleManagerService) {
    (function() {

        var cubeCamera, scene, renderer;
        var particleManager = particleManagerService;
        var cameraManager = cameraService;

        var texture = THREE.ImageUtils.loadTexture( gRoot + '/textures/2294472375_24a3b8ef46_o.jpg', THREE.UVMapping, function () {
            init();
            animate();
        });

        function init() {

            scene = new THREE.Scene();

            var mesh = new THREE.Mesh( new THREE.SphereGeometry( 500, 60, 40 ), new THREE.MeshBasicMaterial( { map: texture } ) );
            mesh.scale.x = -1;
            scene.add( mesh );

            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );

            cubeCamera = new THREE.CubeCamera( 1, 1000, 256 );
            cubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
            scene.add( cubeCamera );

            document.body.appendChild( renderer.domElement );

            //var material = new THREE.MeshBasicMaterial( { envMap: cubeCamera.renderTarget } );

            var r = "../../common/resources/images/cube/MilkyWay/dark-s_";
            var urls = [ r + "px.jpg", r + "nx.jpg",
                r + "py.jpg", r + "ny.jpg",
                r + "pz.jpg", r + "nz.jpg" ];

            var textureCube = THREE.ImageUtils.loadTextureCube( urls, THREE.CubeReflectionMapping, function() {

                textureCube.format = THREE.RGBFormat;
                var material = new THREE.MeshPhongMaterial( {
                    color: 0xffffff,
                    shininess: 0.9,
                    specular: 0xffffff ,
                    envMap: textureCube
                });

                scene.add( new THREE.AmbientLight( 0x552222 ) );

                directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
                directionalLight.position.set( 2, 1.2, 10 ).normalize();
                scene.add( directionalLight );

                directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
                directionalLight.position.set( -2, 1.2, -10 ).normalize();
                scene.add( directionalLight );

                particleManager.init(scene, material);
                cameraManager.init(scene);

                window.addEventListener( 'resize', onWindowResized, false );

                onWindowResized( null );

                renderer.autoClear = false;

                audioMovementService.setup();

                blurService.init(scene, cameraManager.getCamera(), renderer);
            });

        }

        function onWindowResized( event ) {

            renderer.setSize( window.innerWidth, window.innerHeight );
        }

        function animate() {

            requestAnimationFrame( animate );
            if(gAnimated) {
                render();
            }

        }

        function render() {
            cameraManager.update();

            //renderer.render( scene, camera );
            blurService.render(scene, renderer, cameraManager.getCamera());

        }

    })();
}]);