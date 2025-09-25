import { Map } from "./src/Map.js"

export class Game {
	#map;

	constructor() {
		this.#map = new Map();
		this.#map.print()
	}

	init() {
		console.log("Game init");
	}

	Update() {
		if (this.#map.isUpdating) return;
		// TODO: read input
		// TODO: check for progress
		// TODO: add player entity

		this.#map.render();
		this.#readInput();
	}

	#readInput() {

	}
}
