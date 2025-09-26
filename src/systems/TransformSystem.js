import { Point } from "../components/Point.js";
import { SystemBase } from "./SystemBase.js";

export class TransformSystem extends SystemBase {
	constructor() {
		super(typeof Point);
	}
}
