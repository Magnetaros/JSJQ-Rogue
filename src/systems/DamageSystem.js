import { Game } from "../../index.js";
import { Damage } from "../components/Damage.js";
import { Health } from "../components/Health.js";
import { SystemBase } from "./SystemBase.js";

export class DamageSystem extends SystemBase {
	constructor() {
		super(Damage);
	}

	update() {
		if (this.components.length == 0) return;
		console.log({
			title: "OnAttack system update",
			attacks: this.components,
			objs: Game.getInstance().systems.ObjectSystem.components
		});
		console.log(JSON.stringify({
			title: "Attacks",
			attacks: this.components
		}));

		const tsfSystem = Game.getInstance().systems.TransformSystem;
		for (let i = 0; i < this.components.length; i++) {
			const item = this.components[i]
			this.removeComponent(item);
			const entity = tsfSystem.getEntityAtPoint(item.pos);
			if (entity == null) continue;

			const health = entity.getComponent(Health);
			if (health == null) continue;

			if (health.hp - item.damage >= 0) {
				health.applyDamage(item.damage);
			}
		}
	}
}
