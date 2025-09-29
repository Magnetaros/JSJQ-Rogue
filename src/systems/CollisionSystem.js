import { Game } from "../../index.js";
import { Collider } from "../components/Collider.js";
import { Transform } from "../components/Transform.js";
import { SystemBase } from "./SystemBase.js";

export class CollisionSystem extends SystemBase {
	// TODO:
	// remove item only if one of entities are marked as destoyed
	// item: id -> { entity, entity, result - true / false | collide or not }
	// #collisions = [];
	// #collisionCount = 0;

	constructor() {
		super(Collider);
		console.log(
			{
				title: "Type check",
				system: "Collision system",
				type: this.componentType
			}
		);
	}

	/*
	 * Checks for collision component if exists on both adds to collision events
	 * @param {Collider or type from component array passed to CollisionSystem} a
	 * @param {Collider or type from component array passed to CollisionSystem} b
	 * */
	checkForCollision(a, b) {
		console.log(
			{
				title: "checking for collision",
				first: a,
				second: b
			}
		);

		if (a === b) return false;

		if (a instanceof this.componentType && b instanceof this.componentType) {
			console.log(`Collision between ${a.id} and ${b.id}`);

			const components = [...a.entity.components, ...b.entity.components];
			for (const type of [...a.mask, ...b.mask]) {
				for (const component of components) {
					if (component instanceof type)
						return true;
				}
			}
		}

		return false;
	}

	update() {
		const entities = Game.getInstance().systems.ObjectSystem.components;
		const transformSystem = Game.getInstance().systems.TransformSystem;

		const checked = [];

		for (const entity of entities) {
			if (checked.indexOf(entity) != -1) continue;

			const tsf = entity.getComponent(Transform);
			const [dx, dy] = tsf.move();

			if (transformSystem.isPointFree([dx, dy]))
				continue;

			const entityInNextPoint = transformSystem.getEntityAtPoint([dx, dy]);
			if (entityInNextPoint == entity)
				continue;

			// WARN: set dir to zero vector -> position is blocked on map
			if (entityInNextPoint == null) {
				tsf.dir = Transform.DefaultDir;
				continue;
			}

			if (!this.checkForCollision(entity.getComponent(Collider),
				entityInNextPoint.getComponent(Collider)))
				continue;

			const entities = [entity, entityInNextPoint];
			for (let i = 0; i < entities.length; i++) {
				const entity = entities[i];
				const otherEntity = entities[i + 1 % entities.length];

				for (const component of entity.components) {
					if (typeof component.onCollision == "function")
						component.onCollision(otherEntity);
				}
			}

			tsf.dir = Transform.DefaultDir;

			console.log(
				{
					title: "Got collision",
					first: entity,
					second: entityInNextPoint
				}
			);

			checked.push(entity);
		}
	}
}
