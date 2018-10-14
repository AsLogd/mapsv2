import HMap from "./HMap/HMap"
import RootView from "./views/RootView"
import BuildingView from "./views/BuildingView"

document.addEventListener('DOMContentLoaded', () => {
	const bases = {
		hackingRoom: {
			title: "Hacking Room",
			color: "#5F5"
		},
		clickable: {
			color: "#0F0",
			cursor: "pointer"
		},
		closed: {
			title: "Closed",
			subtitle: "AX-XXX",
			color: "#333"
		},
		talks: {
			title: "Talks",
			color: "#00F"
		}
	}
	//Properties of the objects inside each floor
	const buildingProps = {
		"a6": {
			"0": {
				"a6001": {
					base: bases.talks,
					subtitle: "A6-001"
				}
			},
			"1": {
				"a6101": {
					base: bases.hackingRoom,
					subtitle: "A6-101"
				}
			}
		},
		"a5": {
			"0": {
				"a6001": {
					base: bases.talks,
					subtitle: "A5-001"
				}
			},
			"1": {
				"a6101": {
					base: bases.hackingRoom,
					subtitle: "A5-101"
				}
			}
		}
	}
	const conf = {
		"/:building/:floor?": {
			title: "{building}",
			view: BuildingView,
			render: {
				f1: "assets/models/{building}-0.fbx",
				f2: "assets/models/{building}-1.fbx",
				f3: "assets/models/{building}-2.fbx",
			},
			props: function(params){
				if(params.floor) {
					return buildingProps[params.building][params.floor]
				}
				else {
					return buildingProps[params.building]
				}
			}
		},
		"/": {
			title: "UPC",
			view: RootView,
			render: "upc.fbx",
			props: {
				"a6": {
					base: bases.clickable,
					linkTo: "/A6"
				},
				"vertex": {
					title: "Vèrtex"
				}
			}
		}
	}

	const map = new HMap(conf)
})