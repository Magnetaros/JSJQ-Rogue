import { ComponentBase } from "../Entity.js";

export class Player extends ComponentBase {
	#playerCSSClass = "tileP";

	constructor(entity) {
		super(entity);

		this.entity.htmlElement.toggleClass(this.#playerCSSClass, true);
	}

	destroy() {
		this.entity.htmlElement.toggleClass(this.#playerCSSClass, false);
	}
}
