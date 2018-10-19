import Controller, {ControllerConfig} from "./Controller"
import Router from "./Router"
import Util from "./Util"
import World from "./World"


export interface Config{
	assets:{
		defaultFont: string,
		fonts: {[name:string]: string}
	},
	routes:{
		[route:string]: ControllerConfig
	}
}

export default class HMap{
	static readonly TITLE_ID: string = "map-routeHeader"
	static readonly BACK_ID: string = "map-out"
	static readonly HELPBTN_ID: string = "map-helpbtn"

	static readonly VIEW_CONTAINER_ID : string = "map-view"

	static readonly MODAL_CONTAINER_ID : string = "map-modal"
	static readonly INFO_MODAL_ID: string = "template-info"
	static readonly PC_HELP_MODAL_ID: string = "template-instructions-pc"
	static readonly MOBILE_HELP_MODAL_ID: string = "template-instructions-mobile"

	config: Config
	currentController: Controller
	world: World
	
	constructor(config) {
		this.world = new World()
		this.config = config
		this.loadAssets(config.assets).then(()=>{
			this.initListeners()
			this.handleHashChange()
		}).catch((err)=>{
			console.error(err)
		})
	}

	static showInfo(msg: string){
		const template = <HTMLTemplateElement>document.getElementById(HMap.INFO_MODAL_ID)
		const body = document.getElementById(HMap.MODAL_CONTAINER_ID)
		Util.replaceTemplate(body, template)
		document.getElementById("info").innerHTML = msg
		Util.show("#"+HMap.MODAL_CONTAINER_ID)
	}

	loadAssets(assets:any){
		const p = []
		if(assets.defaultFont){
			p.push(this.world.loadDefaultFont(assets.defaultFont))
		}
		for(const fontName in assets.fonts){
			p.push(this.world.loadFont(fontName, assets.fonts[fontName]))
		}
		return Promise.all(p)
	}

	setView(matching:{config:ControllerConfig, params:any}) {
		const c = this.currentController ? 
			this.currentController.hiding() : Promise.resolve()
			
		// Hide canvas and view (if there is one)
		Promise.all([
			c,
			this.world.fadeCanvas()
		]).then(()=>{
			// Render new scene
			this.world.emtpyScene()
			if (matching.config.controller){
				this.currentController = new (matching.config.controller)(matching)
			} else {
				this.currentController = new Controller(matching)
			}
			return this.currentController.initScene(this.world)
		}).then(()=>{
			//If first time, there will be a loading modal
			//In any case we don't want a modal opened when setting a view
			Util.hide("#"+HMap.MODAL_CONTAINER_ID)
			// Show the new canvas and view
			this.world.showCanvas()
			this.currentController.showing()
			//Update the new linked elements
			const view = document.getElementById(HMap.VIEW_CONTAINER_ID)
			this.activateLinkedElements(view)
		})
	}

	activateLinkedElements(base:HTMLElement) {
		const linked = base.querySelectorAll("[data-link-hash]")
		for(let i = 0; i < linked.length; i++) {
			let elem = <HTMLElement>linked[i]
			let reg = new RegExp(elem.dataset.linkHash)
			if (reg.test(location.hash)) {
				elem.classList.add("active")
			} else {
				elem.classList.remove("active")
			}
		}
	}

	handleHashChange = () => {
		const hash = location.hash.slice(1)
		const matching = Router.matchRoute(this.config.routes, hash)
		if (!matching) {
			location.hash = "/"
		} else {
			this.setView(matching)
		}
		this.activateLinkedElements(document.body)
	}

	handleClickBack = (ev:Event) => {
		const target = <HTMLElement>ev.currentTarget
		const backRoute = target.dataset.backTo
		if (!backRoute) {
			return
		}

		location.hash = backRoute
	}

	handleWindowResize = () => {
		this.world.canvasResize()
	}

	showModal(templateId:string) {
		const template = <HTMLTemplateElement>document.getElementById(templateId)
		const body = document.getElementById(HMap.MODAL_CONTAINER_ID)
		Util.replaceTemplate(body, template)

		Util.show("#"+HMap.MODAL_CONTAINER_ID)
	}

	initListeners() {
		window.addEventListener("resize", this.handleWindowResize)
		window.addEventListener("hashchange", this.handleHashChange)
		Util.addEvent(HMap.BACK_ID, "click", this.handleClickBack)
		Util.addEvent(HMap.HELPBTN_ID, "click", ()=>{
			this.showModal(HMap.PC_HELP_MODAL_ID)
		})
		Util.addEvent(HMap.HELPBTN_ID, "touchstart", ()=>{
			this.showModal(HMap.MOBILE_HELP_MODAL_ID)
		})
		Util.addEvent(HMap.MODAL_CONTAINER_ID, "click", ()=>{
			Util.hide("#"+HMap.MODAL_CONTAINER_ID)
		})
	}

}