"use client";

import { parseJwt } from "./parseJwt";

export function isTokenExpired(token: string) {
	if (!token) return true;

	try {
		const decodedJwt = parseJwt(token);

		if (decodedJwt.exp * 1000 < Date.now()) {
			return true;
		}
	} catch (e) {
		return false;
	}

	return false;
}
