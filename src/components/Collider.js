import { ComponentBase } from "../Entity.js";

export class Collider extends ComponentBase {
	#layerMask = [];

	get mask() { return Object.freeze([...this.#layerMask]); }

	constructor(entity, collidsWith) {
		super(entity);
		this.#layerMask = [...collidsWith];
	}

	onCollision(otherEntity) {
		for (const component of this.entity.components)
			if (component != this && typeof component.onCollision == "function")
				component.onCollision(otherEntity);
	}
}
