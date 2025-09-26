import { Enemy } from "./src/components/Enemy.js";
import { Health } from "./src/components/Health.js";
import { Player } from "./src/components/Player.js";
import { Point } from "./src/components/Point.js";
import { Potion } from "./src/components/Potion.js";
import { Sword } from "./src/components/Sword.js";
import { Entity } from "./src/Entity.js";
import { Map } from "./src/Map.js"
import { Singleton } from "./src/Singleton.js";
import { DamageSystem } from "./src/systems/DamageSystem.js";
import { ObjectSystem } from "./src/systems/ObjectSystem.js";
import { SystemBase } from "./src/systems/SystemBase.js";
import { TransformSystem } from "./src/systems/TransformSystem.js";

export class Game extends Singleton {
	#map;
	#systems = {
		ObjectSystem: new ObjectSystem(),
		DamageSystem: new DamageSystem(),
		TransformSystem: new TransformSystem(),
	};

	constructor() {
		super();
		this.#map = new Map();
		this.#map.print()

		this.changeLevel();
	}

	createEntity(pos) {
		let element = null;

		if (pos != null || pos != undefined) {
			const [x, y] = pos;
			let id = x * this.#map.map.length + y;
			element = $(`#${id}`);
		}

		const entity = new Entity(element);
		this.#systems.ObjectSystem.addComponent(entity);

		return entity;
	}

	changeLevel() {
		console.log("Game init");
		this.#map.redraw();
		this.#systems.TransformSystem.setMap(this.#map.map);

		const freePoints = this.#systems.TransformSystem.getFreePoints()
			.sort(() => this.#map.randomizer() - 0.5);
		console.log(freePoints);

		const enemyPositions = freePoints.splice(0, 10);

		for (const [x, y] of enemyPositions) {
			const enemy = this.createEntity([x, y]);

			this.#systems.TransformSystem.addComponent(new Point(enemy, [x, y]));
			new Health(enemy, 10, 10);
			new Enemy(enemy);
		}

		const swords = freePoints.splice(0, 2);
		for (const [x, y] of swords) {
			const sword = this.createEntity([x, y]);

			this.#systems.TransformSystem.addComponent(new Point(sword, [x, y]));
			new Sword(sword);
		}

		const potions = freePoints.splice(0, 10);
		for (const [x, y] of potions) {
			const potion = this.createEntity([x, y]);

			this.#systems.TransformSystem.addComponent(new Point(potion, [x, y]));
			new Potion(potion);
		}

		const playerPos = freePoints.splice(0, 1)[0];
		const player = this.createEntity(playerPos);
		const [x, y] = playerPos;
		this.#systems.TransformSystem.addComponent(new Point(player, [x, y]));
		new Health(player, 10, 10);
		new Player(player);

		/*
		 * TODO: 
		 *  place/load player (1) ~
		 *  place/load items (2 swords / 10 potion) ~
		 * */
	}

	Update() {
		if (this.#map.isUpdating) return;
		// TODO: read input
		// TODO: check for progress
		// TODO: add player entity

		this.#readInput();
	}

	#readInput() {

	}
}
