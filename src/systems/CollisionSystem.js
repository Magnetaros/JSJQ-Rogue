import { Collider } from "../components/Collider.js";
import { SystemBase } from "./SystemBase.js";

export class CollisionSystem extends SystemBase {
	// TODO:
	// remove item only if one of entities are marked as destoyed
	// item: id -> { entity, entity, result - true / false | collide or not }
	#collisions = [];
	#collisionCount = 0;

	constructor() {
		super(typeof Collider);
	}

	/*
	 * Checks for collision component if exists on both adds to collision events
	 * @param {Entity} a
	 * @param {Entity} b
	 * */
	checkForCollision(a, b) {
		if (a === b) return -1;

		if (a.components.some(item => item.constructor == this.componentType.constructor)
			&& b.components.some(item => item.constructor == this.componentType.constructor)) {
			console.log(`Collision between ${a.id} and ${b.id}`);

			const collisionId = this.#collisionCount++;
			this.#collisions.push({ collisionId: [a, b, null] });

			return collisionId;
		}

		return -1;
	}

	update() {
		console.log("Collision system update");
		for (let i = 0; i < this.#collisions.length; i++) {

		}
	}
}
