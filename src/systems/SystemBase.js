// TODO: mb remove this class 
export class SystemBase {
	#componentType
	#components = [];

	get components() { return Object.freeze([...this.#components]); }
	get componentType() { return this.#componentType; }

	constructor(componentClass) {
		this.#componentType = componentClass;
	}

	addComponent(component) {
		if (!component.constructor == this.#componentType.constructor)
			return;

		this.#components.push(component);
	}

	removeComponent(component) {
		const idx = this.#components.indexOf(component);

		if (idx > -1) {
			this.#components.splice(idx, 1);
		}
	}

	update() {
		for (let i = 0; i < this.#components.length; i++) {
			const item = this.#components[i];

			if (item.constructor != this.#componentType.constructor) {
				this.removeComponent(item);
			}
		}
	}
}
