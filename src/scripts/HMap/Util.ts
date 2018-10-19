export default class Util {
	static readonly HIDE_TIME: number = 200
	static readonly HIDE_CLASSNAME: string = "hidden"
	static readonly UNDISPLAY_CLASSNAME: string = "notdisplayed"
	/**
	 * Replaces '{var}' in input string for data.var
	 *
	 * @param {string} input - String to be formatted
	 * @param {Object} data - Object containing the keys
	 */
	static format(string:string, data:object){
		return string.replace(/\{(.+?)\}/g, function(full, label) {
			return data[label]==null ?  "" : data[label];
		});
	}

	static degToRad(deg: number){
		return deg*(Math.PI/180)
	}

	/**
	 * Removes the children of a node
	 *
	 * @arg {Node} n - The node to be emptied
	 */
	static emptyNode(n:Node) {
		while(n.firstChild) {
			n.removeChild(n.firstChild)
		}
	}

	/**
	 * Replaces the content in container for a new
	 * node. The node is assumed to be external to the
	 * document (it's a template)
	 *
	 * @arg {Node} container - Node which content will be replaced
	 * @arg {Node} content - External node to be imported
	 */
	static replaceTemplate(container:Node, content: HTMLTemplateElement){
		Util.emptyNode(container)
		container.appendChild(
			document.importNode(content.content, true)
		)
	}

	/**
	 * Shorthand for adding an event listener
	 *
	 * @arg {string} id - id of the HTMLElement
	 * @arg {string} type - event type (click, hover...)
	 * @arg {(ev:Event)=>void} cb - callback
	 */
	static addEvent(id: string, type: string, cb: (ev:Event)=>void){
		document.getElementById(id).addEventListener(type, cb)
	}

	static fade(selector:string): Promise<void> {
		return new Promise((resolve) => {
			document.querySelectorAll(selector).forEach((elem) => {
				elem.classList.add(this.HIDE_CLASSNAME)
			})

			setTimeout(()=>{
				resolve()
			}, this.HIDE_TIME)
		})
	}

	static unfade(selector:string): Promise<void> {
		return new Promise((resolve) => {
			document.querySelectorAll(selector).forEach((elem) => {
				elem.classList.remove(this.HIDE_CLASSNAME)
			})

			setTimeout(()=>{
				resolve()
			}, this.HIDE_TIME)
		})
	}

	static unundisplay(selector: string){
		document.querySelectorAll(selector).forEach((elem) => {
			elem.classList.remove(this.UNDISPLAY_CLASSNAME)
		})
	}

	static undisplay(selector: string){
		document.querySelectorAll(selector).forEach((elem) => {
			elem.classList.add(this.UNDISPLAY_CLASSNAME)
		})
	}

	static hide(selector:string): Promise<void>{
		return this.fade(selector).then(()=>{
			this.undisplay(selector)
		})
	}
	static show(selector:string): Promise<void>{
		this.unundisplay(selector)
		return this.unfade(selector)
	}
}