import View, {ViewConfig} from "./View"
import Router from "./Router"
import Util from "./Util"
import World from "./World"


export interface Config{
	assets:{
		defaultFont: string,
		fonts: {[name:string]: string}
	},
	routes:{
		[route:string]: ViewConfig
	}
}

export default class HMap{
	readonly LOADING_ID: string = "map-loading"
	config: Config
	view: View
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

	setView(matching:{config:ViewConfig, params:any}) {
		this.world.fadeCanvas().then(()=>{
			this.world.emtpyScene()
			this.view = new (matching.config.view)(matching)
			this.view.init(this.world).then(()=>{
				this.hideLoading()
				this.world.showCanvas()
			})
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