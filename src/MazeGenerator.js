import { Tile } from "./Tile.js"

export class MazeGenerator {
	#rand;
	#mapRef;
	#rooms = [];

	get rooms() { return this.#rooms; }

	constructor(rundomGenerator, map) {
		this.#mapRef = map;
		this.#rand = rundomGenerator;
	}

	createRooms(count) {
		console.log(`creating ${count} rooms`);
		const maxAttempts = count * 10;

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

		while (this.#rooms.length < count && attempt < maxAttempts) {
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

		// change tile tipe to standart for every tile that's inside a room
		let sum = 0;
		for (const room of this.#rooms) {
			let modified = 0;
			for (let i = room.x; i < room.x + room.w; i++) {
				for (let j = room.y; j < room.y + room.h; j++) {
					this.#mapRef[i][j].type = Tile.types.empty;
					modified++;
				}
			}
			console.log(`Modified ${modified}`);
			console.table(room);
			sum += modified;
		}
		console.log(`Modified sum = ${sum}`);

		console.log(`[Attempts:${attempt}/${maxAttempts}]. New rooms have been created! rooms = ${this.#rooms}`);
		// console.table(this.#rooms);
	}

	placePaths(count) {

	}

	getRundomIntFrom(min, max) {
		return Math.floor(this.#rand() * (max - min + 1)) + min;
	}
}

export class Room {
	get pos() { return [this.x, this.y]; }
	get size() { return [this.w, this.h]; }

	constructor(x, y, w, h) {
		this.x = x;
		this.y = y
		this.w = w;
		this.h = h;
	}

	isInside(x, y) {
		return (this.x <= x && x <= this.x + this.w &&
			this.y <= y && y <= this.y + this.h);
	}
}
