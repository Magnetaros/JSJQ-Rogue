import { Map } from "./src/Map.js"

export class Game {
	#map;

	constructor() {
		this.#map = new Map();
		this.#map.print()
	}

	init() {
		console.log("Game init")
	}

	Update() {
		// TODO: read input
		// TODO: check for progress
	}
}
