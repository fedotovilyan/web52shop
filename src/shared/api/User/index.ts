import { APP_URL } from "@/shared/constants";
import { RegisterUserPayloadDTO } from "./dto/RegisterUserPayload.dto";
import { API_ROUTES } from "@/shared/routes";
import { RegisterUserResponseDTO } from "./dto/RegisterUserResponse.dto";

export async function RegisterUser(
	payload: RegisterUserPayloadDTO
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
