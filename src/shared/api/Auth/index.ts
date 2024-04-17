import { API_ROUTES } from "@/shared/routes";
import { AuthPayloadDTO } from "./dto/AuthPayload.dto";
import { APP_URL } from "@/shared/constants";
import { RefreshTokensResponseDTO } from "@/app/api/auth/refresh/dto";
import { LoginResponseDTO } from "@/app/api/auth/login/dto";
import { RegisterResponseDTO } from "@/app/api/auth/register/dto";

export async function RegisterUser(
	payload: AuthPayloadDTO
): Promise<string> {
	const res = await fetch(API_ROUTES.register, {
		method: "POST",
		body: JSON.stringify(payload),
		cache: "no-store",
	});

	const body = (await res.json()) as RegisterResponseDTO;

	if (!body.ok) {
		throw new Error(body.message);
	}

	return body.accessToken;
}

export async function SignIn(
	payload: AuthPayloadDTO
): Promise<string> {
	const res = await fetch(API_ROUTES.login, {
		method: "POST",
		body: JSON.stringify(payload),
		cache: "no-store",
	});

	const body = (await res.json()) as LoginResponseDTO;

	if (!body.ok) {
		throw new Error(body.message);
	}

	return body.accessToken;
}

export async function Logout() {
	const res = await fetch(API_ROUTES.logout, {
		method: "GET",
		cache: "no-store",
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
	const res = await fetch(`${APP_URL}${API_ROUTES.refresh}`, {
		method: "GET",
		cache: "no-store",
	});
	
	const body = (await res.json()) as RefreshTokensResponseDTO;

	if (res.status === 401) {
		throw new Error(RefreshErrors.TokensIsExpired);
	}

	if (!body.ok) {
		throw new Error(body.message);
	}

	return body.accessToken;
}
