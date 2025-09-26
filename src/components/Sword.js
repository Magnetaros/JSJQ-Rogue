
import { ComponentBase } from "../Entity.js";

export class Sword extends ComponentBase {
	#enemyCSSClass = "tileSW";

	constructor(entity) {
		super(entity);

		this.entity.htmlElement.toggleClass(this.#enemyCSSClass, true);
	}

	destroy() {
		this.entity.htmlElement.toggleClass(this.#enemyCSSClass, false);
	}
}
