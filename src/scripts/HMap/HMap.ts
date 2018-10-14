import View from "./View"
import Router from "./Router"
import Util from "./Util"
import World from "./World"


export default class HMap{
	readonly LOADING_ID: string = "map-loading"
	config: object
	view: View
	world: World
	
	
	constructor(config) {
		this.world = new World()
		this.config = config
		this.initListeners()
	}

	

	hideLoading(): Promise<void> {
		return Util.hide("#"+this.LOADING_ID)
	}

	showLoading(): Promise<void> {
		return Util.show("#"+this.LOADING_ID)
	}

	setView(matching) {
		this.showLoading().then(()=>{
			// Download files
			// Instance view, render
			this.view = new (matching.props.view)(matching)
			this.view.init(this.world).then(()=>{
				console.log("init finished")
				this.hideLoading()	
			})
			
		})
	}

	handleHashChange = () => {
		const hash = location.hash.slice(1)
		const matching = Router.matchRoute(this.config, hash)
		this.setView(matching)
	}

	initListeners() {
		window.addEventListener("hashchange", this.handleHashChange)
	}

}