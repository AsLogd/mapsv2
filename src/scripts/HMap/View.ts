import * as Three from "three"
import Util from "./Util"
import World from "./World"

export interface ViewConfig{
	title: string,
	render: string | object | Function,
	view?: View,
	props?: object | Function
}

export default class View{
	private readonly TITLE_ID: string = "map-routeHeader"
	config:ViewConfig
	params:any
	constructor(matching){
		this.config = matching.props
		this.params = matching.params
		const formattedTitle = Util.format(
			matching.props.title,
			matching.params
		)
		this.setTitle(formattedTitle)
	}

	setTitle(title:string){
		document.getElementById(this.TITLE_ID).innerHTML = title
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