import View from "../HMap/View"

export default class BuildingView extends View{
	constructor(matching){
		super(matching)
		if(matching.params.floor) {
			this.setTitle(
				`${matching.params.building}-${matching.params.floor}`
			)
		}
	}
}