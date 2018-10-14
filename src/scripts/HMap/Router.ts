import * as pathToRegexp from "path-to-regexp"

export default class Router {
	/**
	 * Tries to match the given hash with the routes
	 * in config. Returns on first match
	 *
	 * @arg {string} config - Route properties {route: props}
	 * @arg {string} hash - Hash to be matched
	 * @returns {{params:Object, props:Object}} result - 
	 * 	Matched route parameters and properties
	 */
	static matchRoute(config:object, hash:string) {
		for(const route in config) {
			let keys: pathToRegexp.Key[] = []
			const re = pathToRegexp(route, keys)
			const matching = re.exec(hash)
			if(matching) {
				const params = {}
				// Matching starts with the complete route
				// followed by the parameters
				for(let i = 1; i < matching.length; i++) {
					params[keys[i-1].name] = matching[i]
				}
				return {
					params: params,
					props: config[route]
				}
			}
		}
	}
}