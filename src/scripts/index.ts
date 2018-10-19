import HMap from "./HMap/HMap"
import BuildingController from "./controllers/BuildingController"

document.addEventListener('DOMContentLoaded', () => {
	const bases = {
		default: {
			color: "#555"
		},
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
			}
		},
		"a5": {
			"0": {
				"*":{
					base:bases.default
				},
				"entresol":{
					title: "Infodesk",
					color: "rgb(125,125,255)",
					fontSize: 20,
					titleOffset:{
						x:-20*3,
						z: 25
					}
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
			}
		}
	}
	const conf = {
		assets:{
			defaultFont: "assets/fonts/gotham.json"
		},
		routes:{
			"/A5/0": {
				title: "A5",
				controller: BuildingController,
				backTo: "/",
				viewId: "template-map-floors",
				render: {
					"floor": "assets/models/AX0.fbx",
					"info": "assets/models/entresol.fbx"
				},
				props: function(params){
					return buildingProps["a5"]["0"]
				}
			},
			"/:building/:floor": {
				title: "{building}",
				controller: BuildingController,
				backTo: "/",
				viewId: "template-map-floors",
				render: "assets/models/AX{floor}.fbx",
				props: function(params){
					return buildingProps[params.building.toLowerCase()][params.floor]
				}
			},
			"/:building": {
				title: "{building}",
				controller: BuildingController,
				backTo: "/",
				viewId: "template-map-floors",
				render: {
					"0": "assets/models/{building}-0.fbx",
					"1": "assets/models/{building}-1.fbx",
					"2": "assets/models/{building}-2.fbx",
					"3": "assets/models/{building}-3.fbx"
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
						//linkTo: "/A3"
						info: "Coming soon"
					},
					"a4": {
						base: bases.abuilding,
						title: "A4",
						//linkTo: "/A4"
						info: "Coming soon"
					},
					"a5": {
						base: bases.abuilding,
						title: "A5",
						//linkTo: "/A5"
						info: "Coming soon"
					},
					"a6": {
						base: bases.abuilding,
						title: "A6",
						//linkTo: "/A6"
						info: "Coming soon"
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
					}
				}
			}
		}
	}

	const map = new HMap(conf)
})