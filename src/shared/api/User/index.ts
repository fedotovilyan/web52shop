import type { GetCurrentUserResponseDTO } from "@/app/api/user/current/dto";
import { API_ROUTES } from "@/shared/routes";
import { interceptedFetch } from "../interceptedFetch";

export async function GetCurrentUser(
	accessToken: string
): Promise<GetCurrentUserResponseDTO> {
	const res = await interceptedFetch(API_ROUTES.getCurrentUser, accessToken, {
		method: "GET",
		cache: "no-store",
	});

	const body = await res.json();

	if (res.status !== 200) {
		throw new Error(body.message);
	}

	return body.data;
}
