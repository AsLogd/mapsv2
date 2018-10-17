import * as pathToRegexp from "path-to-regexp"
import {ControllerConfig} from "./Controller"

export interface MatchedRoute {
	params: {[parameter: string]: string},
	config: ControllerConfig
}

type RouteConf = {[route:string]: ControllerConfig}

export default class Router {
	/**
	 * Tries to match the given hash with the routes
	 * in config. Returns on first match
	 *
	 * @arg {RouteConf} routes - Routes config
	 * @arg {string} hash - Hash to be matched
	 * @returns {MatchedRoute} result - 
	 * 	Matched route parameters and properties
	 */
	static matchRoute(routes:RouteConf, hash:string): MatchedRoute {
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