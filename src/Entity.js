import { ObjectSystem } from "./systems/ObjectSystem.js";

export class Entity {
	static #instanceCount = 0;
	#components = [];
	#id;

	// readonly
	get components() {
		return Object.freeze([...this.#components]);
	}

	get id() {
		return this.#id;
	}

	/*
	 *	@param htmlElement - jQuery object element
	 * */
	constructor(htmlElement) {
		this.#id = Entity.#instanceCount++;
		this.htmlElement = htmlElement;

		console.log(`Created new entity ${this.id} with element ${htmlElement}`);
	}

	addComponent(component) {
		if (!component instanceof ComponentBase)
			return false;

		if (this.#components.some(ct => ct === component))
			return false;

		this.#components.push(component);
		return true;
	}

	removeComponent(component) {
		const idx = this.#components.indexOf(component);

		if (idx > -1) {
			const toDelete = this.#components.splice(idx, 1);

			for (const item of toDelete)
				item.destroy();
		}
	}

	destroy() {
		for (let i = 0; i < this.#components.length; i++) {
			this.removeComponent(this.#components[i]);
		}

		ObjectSystem.removeComponent(this);
	}
}

export class ComponentBase {
	static #instanceCount = 0;
	#entity;
	#id;

	get entity() { return this.#entity; }
	get id() {
		return this.#id;
	}

	constructor(entity) {
		this.#id = ComponentBase.#instanceCount++;
		this.#entity = entity;
		this.#entity.addComponent(this);

		console.log(`Component[${typeof this}](${this.id}) inside ${entity.id}`);
	}

	destroy() {
		console.log("component base destroy");
	}
}
