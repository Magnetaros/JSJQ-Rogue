import { Tile } from "./Tile.js"

export class Map {
	isUpdating = false;
	#map;
	#mapWidth = 40;
	#mapHeight = 24;

	constructor() {
		this.#map = Array.from(
			{ length: this.#mapWidth },
			() => new Array(this.#mapHeight).fill(new Tile())
		);

		$(document).ready(this.redraw());
	}

	print() {
		console.log(this.#map)
	}

	#generateMap() {
		/* TODO:
		 *  add new module "LEVEL" - stores level data/ load, unload, save/ enemy, items, poutions count and their positions
		 *	set new seed - and save it in stack or queue to move between them
		 *	when moving between rooms previous room is saving inside hash or storage (if progression is intended)
		 *	generate map
		 *	connect logic with path finding
		 *
		 *
		 *	NOTE: 
		 *	rooms: 5 - 10
		 *	room-size: (3-8) width/height
		 * */
	}

	// NOTE: копия кода Linear Congruential Generator (LCG)
	#rundom(seed) {
		let value = seed;
		return function() {
			value = (value * 16807) % 2147483647;
			return value / 2147483647;
		};
	}

	redraw() {
		this.#generateMap();

		const container = $(".field").first();
		container.html = ""

		const tileWidth = container.width() / this.#mapWidth;
		const tileHeight = container.height() / this.#mapHeight;

		for (let i = 0; i < this.#mapWidth; i++) {
			for (let j = 0; j < this.#mapHeight; j++) {
				let id = i * this.#mapWidth + j;
				const tile = this.#map[i][j];
				const el = tile.element = $(`<div id="` + id + `" class="` + tile.type + `"></div>`);
				const pos = {
					left: tileWidth * i,
					top: tileHeight * j
				};

				el.offset(pos);
				el.width(tileWidth);
				el.height(tileHeight);
				container.append(el);
			}
		}

		// TODO: return seed
		return 2140;
	}

	// WARN: maybe delete? no usable code found
	render() {
	}
}
