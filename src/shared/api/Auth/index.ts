import { API_ROUTES } from "@/shared/routes";
import { AuthPayloadDTO } from "./dto/AuthPayload.dto";
import { RegisterUserResponseDTO } from "./dto/RegisterUserResponse.dto";

export async function RegisterUser(
	payload: AuthPayloadDTO
): Promise<RegisterUserResponseDTO> {
	const res = await fetch(API_ROUTES.register, {
		method: "POST",
		body: JSON.stringify(payload),
	});

	const body = await res.json();

	if (res.status !== 200) {
		throw new Error(body.message);
	}

	return body;
}

export async function SignIn(
	payload: AuthPayloadDTO
): Promise<RegisterUserResponseDTO> {
	const res = await fetch(API_ROUTES.login, {
		method: "POST",
		body: JSON.stringify(payload),
	});

	const body = await res.json();

	if (res.status !== 200) {
		throw new Error(body.message);
	}

	return body;
}

export async function Logout() {
	const res = await fetch(API_ROUTES.logout, {
		method: "GET",
	});

	const body = await res.json();

	if (res.status !== 200) {
		throw new Error(body.message);
	}

	return body;
}

export enum RefreshErrors {
	TokensIsExpired = "TokensIsExpired",
}

export async function Refresh() {
	const res = await fetch(API_ROUTES.refresh, {
		method: "GET",
		cache: "no-store",
	});

	const body = await res.json();

	if (res.status === 401) {
		throw new Error(RefreshErrors.TokensIsExpired);
	}

	if (res.status !== 200) {
		throw new Error(body.message);
	}

	return body;
}
