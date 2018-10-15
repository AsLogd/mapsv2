import * as pathToRegexp from "path-to-regexp"
import {ViewConfig} from "./View"

export default class Router {
	/**
	 * Tries to match the given hash with the routes
	 * in config. Returns on first match
	 *
	 * @arg {{[route:string]: ViewConfig}} routes - Routes config
	 * @arg {string} hash - Hash to be matched
	 * @returns {{params:Object, config:ViewConfig}} result - 
	 * 	Matched route parameters and properties
	 */
	static matchRoute(routes:{[route:string]: ViewConfig}, hash:string) {
		for(const route in routes) {
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
					config: routes[route]
				}
			}
		}
	}
}