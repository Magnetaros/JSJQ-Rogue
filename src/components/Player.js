import { Game } from "../../index.js";
import { ComponentBase } from "../Entity.js";
import { Damage } from "./Damage.js";
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

	attack() {
		const gameInstance = Game.getInstance();

		const [x, y] = this.entity.getComponent(Transform).pos;
		console.log({
			title: "attacking",
			playerPos: [x, y]
		});
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				if (i == 0 && j == 0)
					continue;

				const pos = [x + i, y + j];
				const damage = 2;

				gameInstance.systems.DamageSystem.addComponent(new Damage(pos, damage));
			}
		}
	}
}
