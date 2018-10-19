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
			subtitle: "AX-XXX",
			color: "#333"
		},
		talks: {
			title: "Talks",
			color: "#00F"
		},
		street: {
			fontSize:20,
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
				backTo: "/",
				viewId: "template-map-floors",
				render: "assets/models/{building}-{floor}.fbx",
				props: function(params){
					return buildingProps[params.building][params.floor]
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
					return buildingProps[params.building]
				}
			},
			"/": {
				title: "UPC",
				render: "assets/models/upc.fbx",
				props: {
					"*":{
						base: bases.default
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
							y:-10
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
						base: bases.clickable,
						title: "Checkin",
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
					}
				}
			}
		}
	}

	const map = new HMap(conf)
})