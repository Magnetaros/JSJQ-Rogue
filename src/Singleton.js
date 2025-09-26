export class Singleton {
	constructor() {
		if (!Singleton.instance)
			Singleton.instance = this;
		return Singleton.instance;
	}

	static getInstance() {
		if (!Singleton.instance) {
			Singleton.instance = new Singleton();
		}
		return Singleton.instance;
	}
}
