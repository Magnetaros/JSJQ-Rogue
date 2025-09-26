import { Tile } from "./Tile.js"
import { MazeGenerator } from "./MazeGenerator.js";

export class Map {
	isUpdating = false;
	#map;
	#mapWidth = 40;
	#mapHeight = 24;
	#mapGenerator;

	get map() { return this.#map; }

	constructor() {
		this.#map = [this.#mapWidth];
		for (let i = 0; i < this.#mapWidth; i++) {
			this.#map[i] = [this.#mapHeight];
			for (let j = 0; j < this.#mapHeight; j++) {
				this.#map[i][j] = new Tile();
			}
		}

		$(document).ready(this.redraw());
	}

	print() {
		console.log(this.#map)
	}

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
	#generateMap() {
		this.isUpdating = true
		const seed = new Date().getTime();
		const rand = this.#rundom(seed);

		this.#mapGenerator = new MazeGenerator(rand, this.#map);
		this.#mapGenerator.createRooms(this.#mapGenerator.getRundomIntFrom(5, 10));
		this.#mapGenerator.placePaths();

		this.isUpdating = false
	}

	// NOTE: копия кода Linear Congruential Generator (LCG)
	#rundom(seed) {
		let value = seed;
		return function() {
			value = (value * 16807) % 2147483647;
			return value / 2147483647;
		};
	}

	// TODO: create Level instance and store it someware
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

	render() {
		const width = this.map.length;
		const height = this.map[0].length;

		let sum = 0;
		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				const tile = this.map[i][j];
				if (tile.element == null || tile.element == undefined) continue;

				tile.element.removeClass();
				tile.element.addClass(tile.type);

				if (tile.type === Tile.types.empty) sum++;
			}
		}

		// console.log(`Rendered as eempty ${sum} tiles!`);
	}
}
