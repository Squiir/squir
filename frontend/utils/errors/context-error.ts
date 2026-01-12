export class ContextError extends Error {
	constructor(componentName: string, parentName: string) {
		const message = `<${componentName} /> must be used within a <${parentName} />.`;
		super(message);

		this.name = "ContextError";

		Object.setPrototypeOf(this, new.target.prototype);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
