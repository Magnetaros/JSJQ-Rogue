export class Tile {

	static types = {
		empty: "tile",
		wall: "tileW"
	}

	#type;
	#element;

	get element() { return this.#element; }
	get type() { return this.#type; }

	set type(type) {
		// console.log(`Tile tipe changed from ${this.#type} to ${type}`);
		this.#type = type;
	}

	set element(element) {
		// console.log(`Tile element reference changed from ${this.#element} to ${element}`);
		this.#element = element;
	}

	constructor() {
		this.#type = Tile.types.wall;
		this.#element = null;
	}

	isWall() {
		return this.#type === Tile.types.wall;
	}
}
