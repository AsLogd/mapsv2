import * as Three from "three"
const FBXLoader = require("three-fbx-loader")
const OrbitControls = require("orbit-controls-es6")

import Util from "./Util"

export enum EventType {
	CLICK
}

export default class World {
	// Time in ms to discern between click and hold
	readonly CLICK_MAX_TIME = 200
	readonly CANVAS_ID = "map-canvas"

	assets: any

	clickEvents: Function[]
	hoverOutEvents: Function[]
	hoverInEvents: Function[]

	mouseDownTmstp: number
	mousePos: Three.Vector2
	lastHover: string

	scene: Three.Scene
	camera: Three.Camera
	controls: Three.OrbitControls
	renderer: Three.WebGLRenderer
	raycaster: Three.Raycaster
	loader: any
	fontLoader: any

	constructor(){
		this.assets = {
			fonts: {}
		}
		this.clickEvents = []
		this.hoverOutEvents = []
		this.hoverInEvents = []
		this.mouseDownTmstp = 0
		this.mousePos = new Three.Vector2()
		this.lastHover = ""
		this.raycaster = new Three.Raycaster()
		this.fontLoader = new Three.FontLoader()
		this.loader = new FBXLoader()
		this.scene = new Three.Scene()
		this.initLight()
		this.debugCube()
		this.initCamera()
		this.initRenderer()
		this.tick()
	}

	handleMouseMove = (e) => {
		// calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
        this.mousePos.x = ( e.clientX / window.innerWidth ) * 2 - 1;
		this.mousePos.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
		this.checkMouseHover()
	}

	getFirstRayHit(): Three.Object3D | null {
		// update the picking ray with the camera and the mouse position
		this.raycaster.setFromCamera(this.mousePos, this.camera)
		// intersect with all scene objects
		let intersect = this.raycaster.intersectObjects(this.scene.children, true)
		//return first hit
		if(intersect[0])
			return intersect[0].object
		else
			return null
	}

	checkMouseHover() {
		let hovered: Three.Object3D | null = this.getFirstRayHit()
		// If we are hovering an object
		if (hovered) {
			// And its different from last tick
			if(this.lastHover != hovered.name){
				// Call the hover out event of the previous object
				if(this.hoverOutEvents[this.lastHover]){
					this.hoverOutEvents[this.lastHover]()
				}
				
				this.lastHover = hovered.name
				
				// Then, call the hover in of the new one
				if(this.hoverInEvents[hovered.name]){
					this.hoverInEvents[hovered.name]()
				}
				
			}
		} else {
			if(!this.lastHover)
				return

			if(this.hoverOutEvents[this.lastHover]){
				this.hoverOutEvents[this.lastHover]()
				this.lastHover = ""
			}
		}
	}

	handleMouseClick = (e) => {
		if (this.mouseDownTmstp - Date.now() > this.CLICK_MAX_TIME) 
			return

		let selected = this.getFirstRayHit()
		// If we have a hit
		if (selected) {
			// and we have a registered click event
			if (this.clickEvents[selected.name]) {
				// execute the callback
				this.clickEvents[selected.name]()
			}
		}
	}

	tick = () => {
		requestAnimationFrame( this.tick )
		this.controls.update()
		this.renderer.render( this.scene, this.camera )
	}

	loadDefaultFont = (path:string) => {
		return this.loadFont("default", path)
	}

	loadFont = (name:string, path:string):Promise<string> => {
		return new Promise((resolve, reject) => {
			this.fontLoader.load(path, (font) => {
				this.assets.fonts[name] = font
				resolve("")
			}, 
			()=>{},
			(error:string)=>{
				reject(error)
			})
		})
	}

	registerEvent(type:EventType, name:string, callback: Function) {
		if (typeof callback !== "function") {
			console.error("The callback is not a function")
			return
		}
		switch(type){
			case EventType.CLICK:
				this.clickEvents[name] = callback
				break
			default:
				console.error("Unknown event type")
		}
	}

	changeCursor = (cursor:string) => () => {
		document.querySelector("canvas").style.cursor=cursor
	}

	applyProperties(object, props){
		const p = {...props.base, ...props}
		if (p.color) {
			object.material.color = new Three.Color(p.color)
		}
		if (p.title) {
			const titleGeom = new Three.TextGeometry(p.title,{
				font: this.assets.fonts["default"],
				size: 70,
				height: 1,
				curveSegments: 12
			})
			const material = new Three.MeshBasicMaterial({
				color: 0xffffff
			})
			const titleMesh = new Three.Mesh(titleGeom, material)
			this.scene.add(titleMesh)
			const bbox = new Three.Box3().setFromObject(object)

			const rot = object.rotation
			const rad = 90*(Math.PI/180)
			titleMesh.rotation.set(rot.x, rot.y, rot.z+rad)
			titleMesh.position.copy(object.position)
			titleMesh.position.y = bbox.max.y+5
		}
		if (p.linkTo) {
			this.registerEvent(EventType.CLICK, object.name, ()=>{
				location.hash = p.linkTo
			})
		}
		if(p.cursor) {
			this.hoverInEvents[object.name] = this.changeCursor(p.cursor)
			this.hoverOutEvents[object.name] = this.changeCursor("default")
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
		this.camera = new Three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 10000 )
		this.camera.position.set(0, 200, 200)
		this.camera.up.set(0, 1, 0)
		this.camera.lookAt(new Three.Vector3(0, 0, 0))
		this.controls = new OrbitControls(this.camera)
	}
	initRenderer(){
		this.renderer = new Three.WebGLRenderer({antialias: true})
		this.renderer.setSize( window.innerWidth, window.innerHeight )
		this.renderer.setClearColor(0x666666)
		this.renderer.domElement.id=this.CANVAS_ID
		document.body.appendChild( this.renderer.domElement )
		this.initEvents()
	}

	initEvents(){
		let de = this.renderer.domElement
		de.addEventListener("mousedown", ()=>{
			this.mouseDownTmstp = Date.now()
		})
		de.addEventListener("click", this.handleMouseClick)
		de.addEventListener("mousemove", this.handleMouseMove)
	}

	fadeCanvas(): Promise<any>{
		return Util.fade("#"+this.CANVAS_ID)
	}

	showCanvas(): Promise<any>{
		return Util.show("#"+this.CANVAS_ID)
	}
}