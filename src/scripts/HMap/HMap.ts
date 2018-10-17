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
	readonly LOADING_ID: string = "map-loading"
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

	hideLoading(): Promise<void> {
		return Util.hide("#"+this.LOADING_ID)
	}

	showLoading(): Promise<void> {
		return Util.show("#"+this.LOADING_ID)
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
			return this.currentController.init(this.world)
		}).then(()=>{
			// Show the new canvas and view
			this.hideLoading()
			this.world.showCanvas()
			this.currentController.showing()
		})
	}

	handleHashChange = () => {
		const hash = location.hash.slice(1)
		const matching = Router.matchRoute(this.config.routes, hash)
		if (!matching) {
			location.hash = "/"
		} else {
			this.setView(matching)
			
		}
	}

	initListeners() {
		window.addEventListener("hashchange", this.handleHashChange)
	}

}