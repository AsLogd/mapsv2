import * as Three from "three"
import Util from "./Util"
import World from "./World"
import HMap from "./HMap"
import {MatchedRoute} from "./Router"

/**
 * A function that receives an object with the route params
 * and returns the properties of the objects for that route
 */
export type PropsCallback = (params:{[param: string]: string}) => object
type RenderCallback = (world:World) => Promise<any>

export interface ControllerConfig{
	title: string,
	titleOffset?: {x:number, y:number},
	render: string | object | RenderCallback,
	controller?: typeof Controller,
	backTo?: string,
	viewId?: string,
	props?: object | PropsCallback
}

export default class Controller{
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
		if (this.config.backTo) {
			const btn = document.getElementById(HMap.BACK_ID)
			btn.dataset.backTo = this.config.backTo
			Util.show("#"+HMap.BACK_ID)
		}
	}

	/**
	 * Sets the view title
	 *
	 * @arg {string} title - The new title
	 */
	setTitle(title:string){
		document.getElementById(HMap.TITLE_ID).innerHTML = title
	}

	/**
	 * Clones the template into the view container
	 *
	 * @arg {string} templateId - The id of the template to be imported
	 */
	importTemplate(templateId:string): void {
		const view = document.getElementById(HMap.VIEW_CONTAINER_ID)
		const template = <HTMLTemplateElement>document.getElementById(templateId)
		Util.replaceTemplate(view, template)
	}

	/**
	 * Hides the view and empties the view container
	 * Also hides the back button
	 */
	hiding(): Promise<void> {
		Util.hide("#"+HMap.BACK_ID)
		if (!this.config.viewId) 
			return Promise.resolve()

		return Util.hide("#"+HMap.VIEW_CONTAINER_ID).then(()=>{
			Util.emptyNode(
				document.getElementById(HMap.VIEW_CONTAINER_ID)
			)
		})
	}

	/**
	 * Imports and shows the template specified in the config
	 */
	showing(): Promise<void> {
		if (!this.config.viewId) 
			return Promise.resolve()

		this.importTemplate(this.config.viewId)
		return Util.show("#"+HMap.VIEW_CONTAINER_ID)
	}

	/**
	 * Renders the scene specified by the config into the world
	 *
	 * @arg {World} world - The world where the scene will be rendered
	 */
	initScene(world:World): Promise<any>{
		let props: object
		if(typeof this.config.props === "function"){
			props = (<PropsCallback>this.config.props)(this.params)
		} else {
			props = this.config.props
		}

		let render = this.config.render
		if(typeof this.config.render === "function"){
			render = (<Function>this.config.render)(this.params)
		}

		if(typeof render === "object") {
			const ps = []
			for(const key in render) {
				//Path may contains parameters
				const formatted = Util.format(
					render[key],
					this.params
				)
				ps.push(world.addFromFile(formatted, props[key]))
			}

			return Promise.all(ps)
		}
		else if(typeof render === "string") {
			//Path may contains parameters
			const formatted = Util.format(
				render,
				this.params
			)
			return world.addFromFile(formatted, props)
		}
		else {
			console.error("Render value not compatible:" + render)
			return Promise.reject()
		}
	}
}