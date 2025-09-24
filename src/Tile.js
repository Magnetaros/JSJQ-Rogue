export class Tile {
	#type;
	#element;

	get element() { return this.#element; }
	get type() { return this.#type; }

	set type(type) {
		this.#type = type;
	}

	set element(element) {
		this.#element = element;
	}

	constructor() {
		this.type = "tileW";
		this.#element = null;
	}
}
