import { ComponentBase } from "../Entity.js";

export class Collider extends ComponentBase {
	constructor(entity, collidsWith) {
		super(entity);
	}

	onCollision(otherEntity) {
		for (const component of this.entity.cocmponents)
			component?.onCollision(otherEntity);
	}
}
