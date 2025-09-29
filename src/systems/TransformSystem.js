import { Transform } from "../components/Transform.js";
import { Tile } from "../Tile.js";
import { SystemBase } from "./SystemBase.js";

export class TransformSystem extends SystemBase {
	#logicMap;
	#mapRef;

	get logicMap() { return this.#logicMap; }

	constructor() {
		super(Transform.name);
	}

	setMap(map) {
		this.#mapRef = map;
		const width = map.length;
		const height = map[0].length;

		this.#logicMap = Array.from({ length: width }, () => Array(height).fill(0));

		this.#loopMap((i, j) => {
			this.#logicMap[i][j] = (map[i][j].type === Tile.types.wall) ? 0 : 1;
		});
	}

	isPointFree(pos) {
		const [x, y] = pos;

		if (x < 0 || x >= this.logicMap.length
			|| y < 0 || y >= this.logicMap[0].length)
			return false;

		if (this.#logicMap[x][y] === 0)
			return false;

		for (const component of this.components) {
			const [cx, cy] = component.pos;
			if (cx == x && cy == y)
				return false;
		}

		return true;
	}

	setDefaultAtPos(pos) {
		const [x, y] = pos;
		const id = x * this.#logicMap.length + y;

		const el = $(`#${id}`);

		el.removeClass();
		el.addClass(this.#mapRef[x][y].type);
	}

	getEntityAtPoint(pos) {
		const [x, y] = pos;

		for (const component of this.components) {
			const [cx, cy] = component.pos;
			if (cx == x && cy == y)
				return component.entity;
		}

		return null;
	}

	getFreePoints() {
		let res = [];

		this.#loopMap((i, j) => {
			if (this.#logicMap[i][j] === 1) {
				res.push([i, j]);
			}
		});

		return res;
	}

	#loopMap(func) {
		const width = this.#logicMap.length;
		const height = this.#logicMap[0].length;

		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				func(i, j);
			}
		}
	}

	update() {
		for (const component of this.components) {
			const [x, y] = component.pos;
			const [dx, dy] = component.move();

			if (x == dx && y == dy) continue;

			let htmlId = dx * this.#logicMap.length + dy;
			const element = $(`#${htmlId}`);

			if (component.entity.htmlElement != element)
				component.moveTo(element);

			component.pos = [dx, dy];
			component.dir = [0, 0];
		}
	}
}
