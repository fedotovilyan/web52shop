import type { GetCurrentUserResponseDTO } from "@/app/api/user/current/dto";
import { API_ROUTES } from "@/shared/routes";
import { interceptedFetch } from "../interceptedFetch";
import { IUser } from "@/entities/User";
import { UpdateUserResponseDTO } from "@/app/api/user/current/update/dto";

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

export async function UpdateCurrentUser(
	userData: Partial<IUser>,
	accessToken: string
): Promise<UpdateUserResponseDTO> {
	const res = await interceptedFetch(
		API_ROUTES.updateCurrentUser,
		accessToken,
		{
			method: "PATCH",
			cache: "no-store",
			body: JSON.stringify(userData),
		}
	);

	const body = await res.json();

	if (res.status !== 200) {
		throw new Error(body.message);
	}

	return body.data as UpdateUserResponseDTO;
}
