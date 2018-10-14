import * as Three from "three"
const FBXLoader = require("three-fbx-loader")
import Util from "./Util"

export default class World {
	scene: Three.Scene
	camera: Three.Camera
	renderer: Three.WebGLRenderer
	loader: any

	constructor(){
		this.loader = new FBXLoader()
		this.scene = new Three.Scene()
		this.initLight()
		this.debugCube()
		this.initCamera()
		this.initRenderer()
		this.tick()
	}

	tick = () => {
		requestAnimationFrame( this.tick );
		this.renderer.render( this.scene, this.camera );
	}

	applyProperties(object, props){
		const p = {...props.base, ...props}
		if(p.color){
			object.material.color = new Three.Color(p.color)
		}

	}

	addFromFile = (path:string, props):Promise<string> => {
		return new Promise((resolve, reject) => {
			this.loader.load(path, (object) => {
				
				for(const child of object.children) {
					//For some reason all names have 'Model' appended
					const name = child.name.slice(0,-5)
					if(props[name])
						this.applyProperties(child, props[name])
				}

				this.scene.add( object );
				resolve("")
			}, function(){},
			function(error){
				reject(error)
			});

		})
	}

	emtpyScene(){
		const to_remove = [];

		this.scene.traverse((child) => {
			if (child.type === "Mesh" || child.type === "Group") {
				to_remove.push( child );
			}
		});
		for (const elem of to_remove) {
			this.scene.remove( elem );
		}
	}

	debugCube(){
		var geometry = new Three.BoxGeometry( 1, 1, 1 )
		var material = new Three.MeshPhongMaterial( {color: 0x00ff00} )
		var cube = new Three.Mesh( geometry, material )
		cube.position.x = 5
		this.scene.add(cube)
	}

	initLight(){
		const light = new Three.DirectionalLight( 0xffffff, 0.7 )
		light.position.y = 10
		light.position.x = 2
		this.scene.add(light)

		const ambient = new Three.AmbientLight( 0xffffff, 0.3 )
		this.scene.add(ambient)
	}
	initCamera(){
		this.camera = new Three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 10000 );
		this.camera.position.set(0, 20, 20);
		this.camera.up.set(0, 1, 0);
		this.camera.lookAt(new Three.Vector3(0, 0, 0));
	}
	initRenderer(){
		this.renderer = new Three.WebGLRenderer({antialias: true});
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.setClearColor(0x666666);
		this.renderer.domElement.id="map-canvas"
		document.body.appendChild( this.renderer.domElement );
	}

	fadeCanvas(): Promise<any>{
		return Util.fade("#map-canvas")
	}

	showCanvas(): Promise<any>{
		return Util.show("#map-canvas")
	}
}