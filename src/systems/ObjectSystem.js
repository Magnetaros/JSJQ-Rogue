import { Entity } from "../Entity.js";
import { SystemBase } from "./SystemBase.js"

export class ObjectSystem extends SystemBase {
	constructor() {
		super(Entity.name);
	}

	update() {
	}
}
