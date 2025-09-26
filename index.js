import { Map } from "./src/Map.js"
import { Singleton } from "./src/Singleton.js";
import { DamageSystem } from "./src/systems/DamageSystem.js";
import { ObjectSystem } from "./src/systems/ObjectSystem.js";
import { TransformSystem } from "./src/systems/TransformSystem.js";

export class Game extends Singleton {
	#map;
	#systems = {
		ObjectSystem: new ObjectSystem(),
		DamageSystem: new DamageSystem(),
		TransformSystem: new TransformSystem(),
	};

	constructor() {
		super();
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
