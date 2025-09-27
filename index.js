import { Enemy } from "./src/components/Enemy.js";
import { Health } from "./src/components/Health.js";
import { Player } from "./src/components/Player.js";
import { Transform } from "./src/components/Transform.js";
import { Potion } from "./src/components/Potion.js";
import { Sword } from "./src/components/Sword.js";
import { Entity } from "./src/Entity.js";
import { Map } from "./src/Map.js"
import { Singleton } from "./src/Singleton.js";
import { CollisionSystem } from "./src/systems/CollisionSystem.js";
import { DamageSystem } from "./src/systems/DamageSystem.js";
import { ObjectSystem } from "./src/systems/ObjectSystem.js";
import { TransformSystem } from "./src/systems/TransformSystem.js";

export class Game extends Singleton {
	#map;
	#systems = {
		ObjectSystem: new ObjectSystem(),
		DamageSystem: new DamageSystem(),
		CollisionSystem: new CollisionSystem(), // gets Point and checks before transform system/ if can't pass set dir to [0, 0]
		TransformSystem: new TransformSystem(),
	};

	get systems() { return this.#systems; }

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

	getPlayer() {
		for (const entity of this.#systems.ObjectSystem.components) {
			if (entity.components.some(item => item instanceof Player))
				return entity;
		}

		return null;
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

			this.#systems.TransformSystem.addComponent(new Transform(enemy, [x, y]));
			new Health(enemy, 10, 10);
			new Enemy(enemy);
		}

		const swords = freePoints.splice(0, 2);
		for (const [x, y] of swords) {
			const sword = this.createEntity([x, y]);

			this.#systems.TransformSystem.addComponent(new Transform(sword, [x, y]));
			new Sword(sword);
		}

		const potions = freePoints.splice(0, 10);
		for (const [x, y] of potions) {
			const potion = this.createEntity([x, y]);

			this.#systems.TransformSystem.addComponent(new Transform(potion, [x, y]));
			new Potion(potion);
		}

		const playerPos = freePoints.splice(0, 1)[0];
		const player = this.createEntity(playerPos);
		const [x, y] = playerPos;
		this.#systems.TransformSystem.addComponent(new Transform(player, [x, y]));
		new Health(player, 10, 10);
		new Player(player);
	}

	Update() {
		if (this.#map.isUpdating) return;

		for (const key in this.#systems)
			this.#systems[key]?.update();
	}

	ReadInput(event) {
		const player = this.getPlayer();
		const transform = player.getComponent(Transform);
		console.log(`Got player object = ${player}`);

		let [x, y] = [0, 0];
		let attack = null;
		switch (event.code) {
			case 'KeyW':
				y = -1;
				break;
			case 'KeyA':
				x = -1;
				break;
			case 'KeyS':
				y = 1;
				break;
			case 'KeyD':
				x = 1;
				break;
			case 'Space':
				attack = transform.move();
				break;
		}

		console.log(transform, x, y, attack);
		const [dx, dy] = Transform.DefaultDir;
		if (transform != null && (x != dx || y != dy))
			transform.dir = [x, y];

		if (attack != null) {

		}
	}
}
