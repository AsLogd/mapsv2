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