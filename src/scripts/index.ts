import HMap from "./HMap/HMap"
import BuildingController from "./controllers/BuildingController"

document.addEventListener('DOMContentLoaded', () => {
	const bases = {
		hackingRoom: {
			title: "Hacking Room",
			color: "#5F5"
		},
		clickable: {
			color: "green",
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
		assets:{
			defaultFont: "assets/fonts/gotham.json"			
		},
		routes:{
			"/:building/:floor": {
				title: "{building}",
				controller: BuildingController,
				viewId: "map-floors",
				render: "assets/models/{building}-{floor}.fbx",
				props: function(params){
					return buildingProps[params.building][params.floor]
				}
			},
			"/:building": {
				title: "{building}",
				controller: BuildingController,
				viewId: "map-floors",
				render: {
					"0": "assets/models/{building}-0.fbx",
					"1": "assets/models/{building}-1.fbx",
					"2": "assets/models/{building}-2.fbx",
				},
				props: function(params){
					return buildingProps[params.building]
				}
			},
			"/": {
				title: "UPC",
				render: "assets/models/upc.fbx",
				props: {
					"a6": {
						base: bases.clickable,
						title: "A6",
						linkTo: "/A6"
					},
					"vertex": {
						title: "Vèrtex"
					}
				}
			}
		}
	}

	const map = new HMap(conf)
})