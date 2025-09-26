import { Tile } from "./Tile.js"

export class MazeGenerator {
	#rand;
	#mapRef;
	#rooms = [];

	constructor(rundomGenerator, map) {
		this.#mapRef = map;
		this.#rand = rundomGenerator;
	}

	createRooms(roomCount) {
		console.log(`creating ${roomCount} rooms`);
		const maxAttempts = roomCount * 10;

		const minRoomSize = 3;
		const maxRoomSize = 8;
		const roomStartIdx = 1;
		const roomBoundaryOffset = 1;

		const mapWidth = this.#mapRef.length;
		const mapHeight = this.#mapRef[0].length;

		let attempt = 0;

		const AABBTest = (room) => {
			const offset = 1;
			return this.#rooms.some(r =>
				!(room.x + room.w + offset < r.x ||
					room.x > r.x + r.w + offset ||
					room.y + room.h + offset < r.y ||
					room.y > r.y + r.h + offset)
			);
		};

		while (this.#rooms.length < roomCount && attempt < maxAttempts) {
			let rw = this.getRundomIntFrom(minRoomSize, maxRoomSize);
			let rh = this.getRundomIntFrom(minRoomSize, maxRoomSize);
			let rx = this.getRundomIntFrom(roomStartIdx, mapWidth - rw - roomBoundaryOffset);
			let ry = this.getRundomIntFrom(roomStartIdx, mapHeight - rh - roomBoundaryOffset);

			const room = new Room(rx, ry, rw, rh);
			if (!AABBTest(room)) {
				this.#rooms.push(room);
			}

			attempt++;
		}

		// change tile type to standart for every tile that's inside a room
		for (const room of this.#rooms) {
			for (let i = room.x; i < room.x + room.w; i++) {
				for (let j = room.y; j < room.y + room.h; j++) {
					this.#mapRef[i][j].type = Tile.types.empty;
				}
			}
		}

		// connecting rooms
		this.#connectRooms();

		console.log(`[Attempts:${attempt}/${maxAttempts}].`);
	}

	#connectRooms() {
		const diractions = [[0, -1], [1, 0], [0, 1], [-1, 0]];

		let stack = [];
		let [sx, sy] = this.#rooms[0].center();
		stack.push([sx, sy, null]);

		const isInside = (x, y) => {
			return x > 0 && y > 0 && y < this.#mapRef.length - 1 && x < this.#mapRef[0].length - 1;
		}

		while (stack.length > 0) {
			let [x, y, prevDir] = stack[stack.length - 1];
			diractions.sort(() => this.#rand() - 0.5);

			if (prevDir) {
				diractions.sort((a, _) => {
					(a[0] === prevDir[0] && a[1] === prevDir[1]) ? -1 : 1
				});
			}

			let validDirs = diractions.filter(([dx, dy]) => {
				let nx = x + dx * 2;
				let ny = y + dy * 2;
				return isInside(nx, ny) && this.#mapRef[nx][ny]?.type == Tile.types.wall;
			});

			if (validDirs.length > 0) {
				let [dx, dy] = validDirs[0];
				let nx = x + dx * 2;
				let ny = y + dy * 2;

				this.#mapRef[x + dx][y + dy].type = Tile.types.empty;
				this.#mapRef[nx][ny].type = Tile.types.empty;

				stack.push([nx, ny, [dx, dy]]);
			} else {
				stack.pop();
			}
		}

		this.#rooms.sort(() => this.#rand() - 0.5);
		for (let i = 1; i < this.#rooms.length; i++) {
			this.#carveCorridor(this.#rooms[0], this.#rooms[i])
		}
	}

	#carveCorridor(roomA, roomB) {
		let [x1, y1] = roomA.pos();
		let [x2, y2] = roomB.pos();

		for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
			this.#mapRef[x][y1].type = Tile.types.empty;
		}
		for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
			this.#mapRef[x2][y].type = Tile.types.empty;
		}
	}

	placePaths() {
		const digTunnel = (from, dir) => {
			let [x, y] = [from.x, from.y];

			while (x < this.#mapRef.length && y < this.#mapRef[0].length) {
				this.#mapRef[x][y].type = Tile.types.empty;
				x = x + dir.x;
				y = y + dir.y;
			}
		};

		let verticals = [...Array(this.#mapRef.length).keys()]
			.sort(() => this.#rand() - 0.5).slice(0, this.getRundomIntFrom(3, 5));

		for (const x of verticals) {
			digTunnel({ x: x, y: 0 }, { x: 0, y: 1 });
		}

		let horizontals = [...Array(this.#mapRef[0].length).keys()]
			.sort(() => this.#rand() - 0.5).slice(0, this.getRundomIntFrom(3, 5));

		for (const y of horizontals) {
			digTunnel({ x: 0, y: y }, { x: 1, y: 0 });
		}
	}

	getRundomIntFrom(min, max) {
		return Math.floor(this.#rand() * (max - min + 1)) + min;
	}
}

export class Room {
	pos() { return [this.x, this.y]; }
	size() { return [this.w, this.h]; }

	constructor(x, y, w, h) {
		this.x = x;
		this.y = y
		this.w = w;
		this.h = h;
	}

	center() {
		return [
			Math.floor(this.x + this.w / 2),
			Math.floor(this.y + this.h / 2)
		];
	}

	isInside(x, y) {
		return (this.x <= x && x <= this.x + this.w &&
			this.y <= y && y <= this.y + this.h);
	}
}
