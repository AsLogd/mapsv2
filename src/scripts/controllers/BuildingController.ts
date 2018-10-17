import Controller from "../HMap/Controller"

export default class BuildingController extends Controller {
	constructor(matching){
		super(matching)
		if(matching.params.floor) {
			this.setTitle(
				`${matching.params.building}-${matching.params.floor}`
			)
		}
	}
}