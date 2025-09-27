import { ComponentBase } from "../Entity.js";

export class Transform extends ComponentBase {
	static #defaltDir = [0, 0];
	#pos = [0, 0];

	static get DefaultDir() { return Object.freeze(Transform.#defaltDir); }

	get pos() { return this.#pos; }
	set pos(val) {
		console.log(val, this.#pos);
		this.#pos = val;
	}

	constructor(entity, startPos) {
		super(entity);
		this.#pos = startPos;
		this.dir = [0, 0];
	}

	move() {
		let [x, y] = this.#pos;
		let [dx, dy] = this.dir;
		return [x + dx, y + dy];
	}

	moveTo(htmlElement) {
		if (this.entity.htmlElement === htmlElement) return;

		for (const component of this.entity.components) {
			if (component === this) continue;

			if (typeof component.moveTo === "function")
				component?.moveTo(htmlElement);
		}

		console.log("moving to", htmlElement);
		this.entity.htmlElement = htmlElement;
	}
}
