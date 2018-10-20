import HMap from "./HMap/HMap"
import BuildingController from "./controllers/BuildingController"

document.addEventListener('DOMContentLoaded', () => {
	const bases = {
		default: {
			color: "#555"
		},
		hackingRoom: {
			title: "Hacking Room",
			fontSize:15,
			titleOffset:{
				x:-14*6
			},
			color: "#5F5"
		},
		clickable: {
			color: "green",
			cursor: "pointer"
		},
		closed: {
			title: "Closed",
			fontSize: 25,
			titleOffset:{
				x: -25*2.5
			},
			color: "#333"
		},
		talks: {
			title: "Talks",
			titleOffset:{
				x:-125
			},
			color: "#00F"
		},
		street: {
			fontSize:20,
		},
		metro: {
			color:"red",
			title: "Metro",
			fontSize: 20,
			titleOffset:{
				z: 23
			}
		},
		hq:{
			color:"#111",
			fontSize: 60,
			title: "HQ",
			titleOffset:{
				x: -60
			}
		},
		sleeping:{
			color:"#225",
			title: "Sleeping Room",
			fontSize:15,
			titleOffset:{
				x: -14*6
			}
		},
		abuilding: {}
	}
	bases.abuilding = {
		...bases.clickable,
		fontSize: 50,
		titleOffset: {
			x: -50,
			z: 15
		},
		titleRotation: {
			x: 90
		}
	}
	//Properties of the objects inside each floor
	const buildingProps = {
		"a3":{
			"0": {
				"*":{
					base:bases.default
				},
				"001": {
					base:bases.closed
				},
				"002": {
					base:bases.closed
				}
			},
			"1": {
				"*":{
					base:bases.default
				},
				"e01":{
					base: bases.closed
				},
				"e02":{
					base: bases.closed
				}
			},
			"2": {
				"*":{
					base:bases.default
				},
				"101":{
					base: bases.sleeping
				},
				"102":{
					base: bases.sleeping
				},
				"103":{
					base: bases.sleeping
				},
				"104":{
					base: bases.sleeping
				},
				"105":{
					base: bases.sleeping
				},
				"106":{
					base: bases.sleeping
				}
			},
			"3": {
				"*":{
					base:bases.default
				},
				"201":{
					base: bases.sleeping
				},
				"202":{
					base: bases.sleeping
				},
				"203":{
					base: bases.sleeping
				},
				"204":{
					base: bases.sleeping
				},
				"205":{
					base: bases.sleeping
				},
				"206":{
					base: bases.sleeping
				}
			}
		},
		"a4":{
			"0": {
				"*":{
					base:bases.default
				},
				"001": {
					base:bases.closed
				},
				"002": {
					color:"red",
					title: "Team Building",
					titleOffset: {
						x: -25*5
					},
					fontSize: 25
				}
			},
			"1": {
				"*":{
					base:bases.default
				},
				"e01": {
					base:bases.closed
				},
				"e02": {
					base:bases.closed
				}
			},
			"2": {
				"*":{
					base:bases.default
				},
				"101": {
					color:"brown",
					title:"Nerf Gun Battle",
					titleOffset:{
						x: -25*7
					},
					fontSize: 25
				},
				"102": {
					base:bases.hackingRoom
				},
				"103": {
					base:bases.hackingRoom
				},
				"104": {
					base:bases.hackingRoom
				},
				"105": {
					base:bases.hackingRoom
				},
				"106": {
					base:bases.hackingRoom
				}
			},
			"3": {
				"*":{
					base:bases.default
				},
				"201": {
					base: bases.sleeping
				},
				"202": {
					base: bases.sleeping
				},
				"203": {
					base:bases.sleeping
				},
				"204": {
					base:bases.sleeping
				},
				"205": {
					base:bases.sleeping
				},
				"206": {
					base:bases.sleeping
				}
			}
		},
		"a5": {
			"0": {
				"floor":{
					"*":{
						base:bases.default
					},
					"001": {
						base: bases.talks,
						subtitle: "A5-001"
					},
					"002": {
						base: bases.talks,
						subtitle: "A5-002"
					}
				},
				"info": {
					"entresol":{
						title: "Infodesk",
						color: "rgb(125,125,255)",
						fontSize: 20,
						titleOffset:{
							x:-20*3,
							z: 25
						}
					}
				}
			},
			"1": {
				"*":{
					base:bases.default
				},
				"e01": {
					base: bases.closed
				},
				"e02": {
					base: bases.closed
				}
			},
			"2": {
				"*":{
					base:bases.default
				},
				"101": {
					base:bases.hackingRoom
				},
				"103": {
					base:bases.hackingRoom
				},
				"104": {
					base:bases.hackingRoom
				},
				"105": {
					base:bases.hackingRoom
				},
				"106": {
					base:bases.hackingRoom
				}
			},
			"3": {
				"*":{
					base:bases.default
				},
				"201": {
					base: bases.hackingRoom
				},
				"203": {
					base:bases.hackingRoom
				},
				"204": {
					base:bases.hackingRoom
				},
				"205": {
					base:bases.hackingRoom
				},
				"206": {
					base:bases.hackingRoom
				}
			}
		},
		"a6": {
			"0": {
				"*":{
					base:bases.default
				},
				"001": {
					base: bases.closed
				},
				"002": {
					base: bases.closed
				}
			},
			"1": {
				"*":{
					base:bases.default
				},
				"e01": {
					base: bases.hq
				},
				"e02": {
					base: bases.hq
				}
			},
			"2": {
				"*":{
					base:bases.default
				},
				"101": {
					base:bases.hackingRoom
				},
				"103": {
					base:bases.hackingRoom
				},
				"104": {
					base:bases.hackingRoom
				},
				"105": {
					base:bases.hackingRoom
				},
				"106": {
					color: "brown",
					title: "Cafeteria",
					fontSize:20,
					titleOffset:{
						x: -60
					}
				}
			},
			"3": {
				"*":{
					base:bases.default
				},
				"201": {
					base: bases.hackingRoom
				},
				"203": {
					base:bases.hackingRoom
				},
				"204": {
					base:bases.hackingRoom
				},
				"205": {
					base:bases.hackingRoom
				},
				"206": {
					base:bases.hackingRoom
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
				backTo: "/",
				viewId: "template-map-floors",
				render: (params) => {
					if (params.building === "A5" && parseInt(params.floor) == 0) {
						return {
							"floor": "assets/models/AX0.fbx",
							"info": "assets/models/entresol.fbx"
						}
					}

					if(parseInt(params.floor) > 1)
					{
						if(params.building === "A5" || params.building === "A6")
						{
							return "assets/models/A6{floor}.fbx"
						}
					}

					return "assets/models/AX{floor}.fbx"
				},
				props: function(params){
					return buildingProps[params.building.toLowerCase()][params.floor]
				}
			},
			"/:building": {
				title: "{building}",
				controller: BuildingController,
				backTo: "/",
				viewId: "template-map-floors",
				render: (params)=>{
					const files = {
						"0": "assets/models/AX0.fbx",
						"1": "assets/models/AX1.fbx",
						"2": "assets/models/AX2.fbx",
						"3": "assets/models/AX3.fbx"
					}
					if(params.building === "A5" || params.building === "A6")
					{
						files["2"] = "assets/models/A62.fbx"
						files["3"] = "assets/models/A63.fbx"
					}

					return files
				},
				props: function(params){
					return buildingProps[params.building.toLowerCase()]
				}
			},
			"/": {
				title: "UPC",
				render: "assets/models/upc.fbx",
				props: {
					"*":{
						base: bases.default
					},
					"palaureial":{
						base: bases.metro,
						titleRotation:{
							z: 180
						},
						title: "Metro - Palau Reial"
					},
					"zonauniversitaria":{
						base: bases.metro,
						title: "Metro - Zona Universitària"
					},
					"base":{
						title: "HACKUPC",
						fontSize:110,
						titleRotation:{
							x:90
						},
						titleOffset:{
							y:300,
							z:-500
						}
					},
					"dulcet":{
						base: bases.street,
						titleOffset:{
							y:-15
						},
						title: "Carrer de Dulcet"
					},
					"diagonal-b":{
						base: bases.street,
						title: "Avinguda Diagonal"
					},
					"diagonal-a":{
						base: bases.street,
						fontSize: 50,
						title: "Avinguda Diagonal"
					},
					"exercit":{
						base: bases.street,
						title: "Avinguda de l'exercit"
					},
					"trias":{
						base: bases.street,
						title: "Carrer de Trias i Giró"
					},
					"john":{
						base: bases.street,
						titleOffset:{
							y:-170
						},
						titleRotation:{
							z: 90
						},
						title: "Carrer de John Maynard Keynes"
					},
					"joan":{
						base: bases.street,
						titleOffset:{
							z:130,
							x:-50
						},
						title: "Carrer de Joan Oblols"
					},
					"jordi":{
						base: bases.street,
						title: "Carrer de Jordi Girona"
					},
					"checkin":{
						base: bases.abuilding,
						title: "Checkin",
						fontSize: 25,
						titleOffset:{
							x: -25*3,
							z: 15,
							y: -3
						},
						info: "Cross the door to get your wristband and swag. Welcome to HackUPC!"
					},
					"showers":{
						base: bases.clickable,
						title: "Showers",
						fontSize: 10,
						titleOffset:{
							x: -10*2.5,
							y: -10,
							z: 25
						},
						titleRotation:{
							x: 90
						},
						info: "You can take a shower inside the sports center"
					},
					"a3": {
						base: bases.abuilding,
						title: "A3",
						linkTo: "/A3"
					},
					"a4": {
						base: bases.abuilding,
						title: "A4",
						linkTo: "/A4"
					},
					"a5": {
						base: bases.abuilding,
						title: "A5",
						linkTo: "/A5"
					},
					"a6": {
						base: bases.abuilding,
						title: "A6",
						linkTo: "/A6"
					},
					"vertex": {
						base: bases.clickable,
						title: "Vèrtex",
						titleOffset: {
							x: -150
						},
						titleRotation:{
							x:90
						},
						info: "This building will hold the open and end ceremonies"
					},
					"meals": {
						title: "Meal zone",
						color: "#733",
						fontSize: 20,
						titleOffset:{
							x: -4*20,
							z: 6
						}
					}
				}
			}
		}
	}

	const map = new HMap(conf)
})
