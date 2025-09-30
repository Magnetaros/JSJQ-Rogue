import { ComponentBase } from "../Entity.js";

export class Health extends ComponentBase {
	#hpElement;
	#maxHP;
	#current;

	get hp() { return this.#current; }

	constructor(entity, startHP, maxHP) {
		super(entity);
		this.#maxHP = this.#current = maxHP;

		if (entity.htmlElement != null || entity.htmlElement != undefined) {
			const percent = (startHP / maxHP) * 100;
			const el = this.#hpElement = $(`<div class="health" style="width:` + percent + `%"></div>`);

			entity.htmlElement.append(el);
		}
	}

	applyDamage(damage) {
		const ui = this.#hpElement;
		if (ui == null || ui == undefined) return;

		this.#current -= damage;
		const percent = (this.#current / this.#maxHP) * 100;
		ui.css("width", `${percent}%`);
	}

	moveTo(htmlElement) {
		htmlElement.append(this.#hpElement);
	}

	destroy() {

	}
}
