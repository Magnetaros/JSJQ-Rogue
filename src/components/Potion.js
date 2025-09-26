
import { ComponentBase } from "../Entity.js";

export class Potion extends ComponentBase {
	#enemyCSSClass = "tileHP";

	constructor(entity) {
		super(entity);

		this.entity.htmlElement.toggleClass(this.#enemyCSSClass, true);
	}

	destroy() {
		this.entity.htmlElement.toggleClass(this.#enemyCSSClass, false);
	}
}
