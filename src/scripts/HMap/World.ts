import * as Three from "three"
const FBXLoader = require("three-fbx-loader")

export default class World {
	scene: Three.Scene
	camera: Three.Camera
	renderer: Three.WebGLRenderer

	constructor(){
		this.scene = new Three.Scene()
		this.scene.add(new Three.AmbientLight(0xffffff));
		var geometry = new Three.BoxGeometry( 1, 1, 1 );
		var material = new Three.MeshPhongMaterial( {color: 0x00ff00} );
		var cube = new Three.Mesh( geometry, material );
		cube.position.x = 5
		this.scene.add( cube );
		this.camera = new Three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 10000 );
		this.camera.position.set(0, 10, 10);
		this.camera.up.set(0, 1, 0);
		this.camera.lookAt(new Three.Vector3(0, 0, 0));
		this.renderer = new Three.WebGLRenderer({antialias: true});
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.setClearColor(0x666666);

		document.body.appendChild( this.renderer.domElement );
		this.tick()
	}

	tick = () => {
		requestAnimationFrame( this.tick );
		this.renderer.render( this.scene, this.camera );
	}

	addFromFile(path:string):Promise<string>{
		return new Promise((resolve, reject) => {
			const loader = new FBXLoader()
			loader.load(path, (object) => {
				/*
				object.traverse(function(child) {
					if ( child.isMesh ) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				*/
				this.scene.add( object );
				resolve("")
			}, function(){},
			function(error){
					reject(error)
			});

		})
	}
}