import { Game } from "../../index.js";
import { ComponentBase } from "../Entity.js";
import { Transform } from "./Transform.js";

export class Player extends ComponentBase {
	#playerCSSClass = "tileP";

	constructor(entity) {
		super(entity);

		this.entity.htmlElement.toggleClass(this.#playerCSSClass, true);
	}

	moveTo(htmlElement) {
		const transfrom = this.entity.getComponent(Transform);
		const [x, y] = transfrom.pos;
		const tsfSystem = Game.getInstance().systems.TransformSystem;

		tsfSystem.setDefaultAtPos([x, y]);

		this.entity.htmlElement.toggleClass(this.#playerCSSClass, false);
		htmlElement.toggleClass(this.#playerCSSClass, true);
	}

	destroy() {
		this.entity.htmlElement.toggleClass(this.#playerCSSClass, false);
	}
}
