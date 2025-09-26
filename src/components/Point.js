import { ComponentBase } from "../Entity.js";

export class Point extends ComponentBase {
	#pos = [0, 0];

	get pos() { return this.#pos; }
	set pos(val) {
		this.#pos = val;
	}

	constructor(entity, startPos) {
		super(entity);
		this.#pos = startPos;
	}
}
