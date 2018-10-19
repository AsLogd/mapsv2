import Controller from "../HMap/Controller"

export default class BuildingController extends Controller {
	constructor(matching){
		super(matching)
		if(matching.params.floor) {
			let floor = matching.params.floor
			if(floor === "1"){
				floor = "E"
			}
			this.setTitle(
				`${matching.params.building}-${floor}`
			)
		}
	}

	showing(): Promise<void>{
		return super.showing().then(()=>{
			const elems = document.querySelectorAll("[data-change-floor]")
			for(let i = 0; i < elems.length; i++) {
				((elem) => {
					elem.addEventListener("click", (ev:Event) => {
						const btn = <HTMLElement>ev.currentTarget
						const floor = btn.dataset.changeFloor
						location.hash = `/${this.params.building}/${floor}`
					})
				})(elems[i])
			}
		})
	}
}