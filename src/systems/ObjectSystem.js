import { Entity } from "../Entity.js";
import { SystemBase } from "./SystemBase.js"

export class ObjectSystem extends SystemBase {
	constructor() {
		super(Entity.name);
	}

	update() {
		for (let i = 0; i < this.components.length; i++) {
			const entity = this.components[i];
		}
	}
}
