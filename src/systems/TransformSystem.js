import { Point } from "../components/Point.js";
import { Tile } from "../Tile.js";
import { SystemBase } from "./SystemBase.js";

export class TransformSystem extends SystemBase {
	#logicMap;
	#mapRef;

	constructor() {
		super(typeof Point);
	}

	setMap(map) {
		const width = map.length;
		const height = map[0].length;

		this.#mapRef = map;
		this.#logicMap = Array.from({ length: width }, () => Array(height).fill(0));

		// for (let i = 0; i < width; i++) {
		// 	for (let j = 0; j < height; j++) {
		// 		this.#logicMap[i][j] = map[i][j].type == Tile.types.wall ? 0 : 1;
		// 	}
		// }
		this.#loopMap((i, j) => {
			this.#logicMap[i][j] = (map[i][j].type === Tile.types.wall) ? 0 : 1;
		});
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
}
