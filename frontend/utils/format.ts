import isISO8601 from "validator/lib/isISO8601";

export function interceptDatesFromResponse(body: any): any {
	if (body === null || typeof body !== "object") {
		return body;
	}

	for (const key in body) {
		const value = body[key];

		if (typeof value === "string" && isISO8601(value)) {
			body[key] = new Date(value);
		} else if (value !== null && typeof value === "object") {
			interceptDatesFromResponse(value);
		}
	}

	return body;
}

export function formatPrice(price: number) {
	return `${price.toFixed(2)} €`;
}
