import * as Three from "three"
import Util from "./Util"
import World from "./World"
import {MatchedRoute} from "./Router"

/**
 * A function that receives an object with the route params
 * and returns the properties of the objects for that route
 */
type PropsCallback = (params:{[param: string]: string}) => object
type RenderCallback = (world:World) => Promise<any>

export interface ControllerConfig{
	title: string,
	render: string | object | RenderCallback,
	controller?: typeof Controller,
	viewId?: string,
	props?: object | PropsCallback
}

export default class Controller{
	private readonly TITLE_ID: string = "map-routeHeader"
	config: ControllerConfig
	params: any

	constructor(matching: MatchedRoute){
		this.config = matching.config
		this.params = matching.params
		const formattedTitle = Util.format(
			matching.config.title,
			matching.params
		)
		this.setTitle(formattedTitle)
	}

	setTitle(title:string){
		document.getElementById(this.TITLE_ID).innerHTML = title
	}

	hiding(): Promise<any> {
		if (!this.config.viewId) 
			return Promise.resolve()

		return Util.hide("#"+this.config.viewId)
	}

	showing(): Promise<any> {
		if (!this.config.viewId) 
			return Promise.resolve()

		return Util.show("#"+this.config.viewId)
	}

	init(world:World): Promise<any>{
		if(typeof this.config.render === "object") {
			const ps = []
			for(const key in this.config.render) {
				//Path may contains parameters
				const formatted = Util.format(
					this.config.render[key],
					this.params
				)
				ps.push(formatted)
			}
			
			const addFromFileWithProps = (path) => 
				world.addFromFile(path, this.config.props)

			return Promise.all(
				ps.map(addFromFileWithProps)
			)
		}
		else if(typeof this.config.render === "string") {
			//Path may contains parameters
			const formatted = Util.format(
				this.config.render,
				this.params
			)
			return world.addFromFile(formatted, this.config.props)
		}
		else {
			console.error("Render value not compatible:" + this.config.render)
			return Promise.reject()
		}
	}
}